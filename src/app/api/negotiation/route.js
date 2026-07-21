import { connectToDatabase } from "@/lib/mongodb";
import { getAuthUser } from "@/lib/auth";
import Shipment from "@/lib/models/Shipment";
import Notification from "@/lib/models/Notification";
import { Conversation, Message } from "@/lib/models/Message";

export async function POST(request) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const { shipmentId, action, price, message } = await request.json();

    if (!shipmentId || !action) {
      return Response.json({ error: "shipmentId and action are required" }, { status: 400 });
    }

    const shipment = await Shipment.findById(shipmentId);
    if (!shipment) return Response.json({ error: "Shipment not found" }, { status: 404 });

    const isSender = user.role === "sender" && shipment.sender.toString() === user._id.toString();
    const isDriver = user.role === "driver" && shipment.driver && shipment.driver.toString() === user._id.toString();

    if (!isSender && !isDriver) {
      return Response.json({ error: "Not authorized for this shipment" }, { status: 403 });
    }

    if (!shipment.negotiation) {
      shipment.negotiation = { status: "none" };
    }

    const otherUserId = isSender ? shipment.driver : shipment.sender;

    switch (action) {
      case "propose": {
        if (!isSender) {
          return Response.json({ error: "Only senders can propose" }, { status: 403 });
        }
        if (!price || price <= 0) {
          return Response.json({ error: "Valid price required" }, { status: 400 });
        }
        shipment.negotiation = {
          status: "pending",
          senderProposedPrice: price,
          driverCounterPrice: undefined,
          lastOfferBy: user._id,
          message: message || "",
          updatedAt: new Date(),
        };
        await shipment.save();

        if (otherUserId) {
          await Notification.create({
            user: otherUserId,
            type: "match",
            title: "Price Proposal",
            message: `${user.firstName} ${user.lastName} proposed $${price} for ${shipment.trackingId}.`,
            link: `/driver/load-board`,
          });
        }

        if (otherUserId) {
          let convo = await Conversation.findOne({
            participants: { $all: [user._id, otherUserId] },
            shipment: shipment._id,
          });
          if (convo) {
            await Message.create({
              conversation: convo._id,
              sender: user._id,
              text: `I'd like to offer $${price} for this delivery.${message ? ` ${message}` : ""}`,
            });
            convo.lastMessage = `Price proposal: $${price}`;
            convo.lastMessageTime = new Date();
            await convo.save();
          }
        }

        return Response.json({ shipment, negotiation: shipment.negotiation }, { status: 200 });
      }

      case "counter": {
        if (!isDriver) {
          return Response.json({ error: "Only drivers can counter-offer" }, { status: 403 });
        }
        if (!price || price <= 0) {
          return Response.json({ error: "Valid price required" }, { status: 400 });
        }
        shipment.negotiation = {
          ...shipment.negotiation,
          status: "counter_offer",
          driverCounterPrice: price,
          lastOfferBy: user._id,
          message: message || "",
          updatedAt: new Date(),
        };
        await shipment.save();

        if (otherUserId) {
          await Notification.create({
            user: otherUserId,
            type: "match",
            title: "Counter Offer",
            message: `${user.firstName} ${user.lastName} countered with $${price} for ${shipment.trackingId}.`,
            link: `/sender/smart-match`,
          });
        }

        if (otherUserId) {
          let convo = await Conversation.findOne({
            participants: { $all: [user._id, otherUserId] },
            shipment: shipment._id,
          });
          if (convo) {
            await Message.create({
              conversation: convo._id,
              sender: user._id,
              text: `I'd counter at $${price}.${message ? ` ${message}` : ""}`,
            });
            convo.lastMessage = `Counter offer: $${price}`;
            convo.lastMessageTime = new Date();
            await convo.save();
          }
        }

        return Response.json({ shipment, negotiation: shipment.negotiation }, { status: 200 });
      }

      case "accept": {
        shipment.negotiation = {
          ...shipment.negotiation,
          status: "agreed",
          updatedAt: new Date(),
        };
        if (shipment.negotiation.driverCounterPrice) {
          shipment.pricing.amount = shipment.negotiation.driverCounterPrice;
        } else if (shipment.negotiation.senderProposedPrice) {
          shipment.pricing.amount = shipment.negotiation.senderProposedPrice;
        }
        await shipment.save();

        if (otherUserId) {
          await Notification.create({
            user: otherUserId,
            type: "match",
            title: "Deal Accepted",
            message: `The deal for ${shipment.trackingId} has been accepted at $${shipment.pricing.amount}.`,
            link: isSender ? "/sender/shipments" : "/driver/trips",
          });
        }

        if (otherUserId) {
          let convo = await Conversation.findOne({
            participants: { $all: [user._id, otherUserId] },
            shipment: shipment._id,
          });
          if (convo) {
            await Message.create({
              conversation: convo._id,
              sender: user._id,
              text: `Deal accepted at $${shipment.pricing.amount}! Let's proceed.`,
            });
            convo.lastMessage = `Deal accepted at $${shipment.pricing.amount}`;
            convo.lastMessageTime = new Date();
            await convo.save();
          }
        }

        return Response.json({ shipment, negotiation: shipment.negotiation }, { status: 200 });
      }

      case "reject": {
        shipment.negotiation = {
          ...shipment.negotiation,
          status: "rejected",
          updatedAt: new Date(),
        };
        await shipment.save();

        if (otherUserId) {
          await Notification.create({
            user: otherUserId,
            type: "match",
            title: "Negotiation Ended",
            message: `The negotiation for ${shipment.trackingId} has been declined.`,
            link: isSender ? "/sender/smart-match" : "/driver/load-board",
          });
        }

        return Response.json({ shipment, negotiation: shipment.negotiation }, { status: 200 });
      }

      default:
        return Response.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
