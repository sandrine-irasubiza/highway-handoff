"use client";

import { useState } from "react";
import {
  MdLocalShipping,
  MdInventory2,
  MdRoute,
  MdLocationOn,
  MdLocationOff,
  MdScale,
  MdCategory,
  MdAccessTime,
  MdSpeed,
  MdSecurity,
  MdAttachMoney,
  MdDescription,
  MdPhotoCamera,
  MdCheckCircle,
  MdArrowForward,
  MdArrowBack,
  MdInfo,
  MdVerifiedUser,
  MdSchedule,
  MdGpsFixed,
} from "react-icons/md";

const steps = [
  { id: 1, title: "Sender Details", icon: MdVerifiedUser },
  { id: 2, title: "Package Info", icon: MdInventory2 },
  { id: 3, title: "Route & Locations", icon: MdRoute },
  { id: 4, title: "Schedule & Timing", icon: MdSchedule },
  { id: 5, title: "Pricing & Review", icon: MdAttachMoney },
];

const packageTypes = ["Document", "Small Box", "Medium Box", "Large Box", "Fragile", "Perishable"];
const vehicleTypes = ["Any", "Bike", "Van", "Truck", "Semi-Truck"];

export default function SenderRoutingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    senderName: "",
    senderPhone: "",
    senderEmail: "",
    receiverName: "",
    receiverPhone: "",
    packageType: "Small Box",
    weight: "",
    dimensions: "",
    description: "",
    pickupLocation: "",
    deliveryLocation: "",
    preferredVehicle: "Any",
    deliverySpeed: "standard",
    insurance: false,
    specialHandling: false,
    photos: [],
    budget: "",
    deliveryDate: "",
    deliveryTime: "",
    instructions: "",
  });

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    console.log("Routing submitted:", formData);
    alert("Delivery request submitted successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10" />
            {steps.map((step) => (
              <button
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                className={`relative flex flex-col items-center gap-2 ${
                  step.id <= currentStep ? "text-blue-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    step.id < currentStep
                      ? "bg-blue-600 text-white"
                      : step.id === currentStep
                      ? "bg-blue-100 text-blue-600 ring-2 ring-blue-600"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {step.id < currentStep ? (
                    <MdCheckCircle className="text-lg" />
                  ) : (
                    <step.icon className="text-lg" />
                  )}
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wide hidden sm:block">
                  {step.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          {/* Step 1: Sender Details */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <MdVerifiedUser className="text-2xl text-blue-600" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Sender Details</h2>
                  <p className="text-sm text-gray-500">Provide sender and receiver information</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Sender Name *
                  </label>
                  <input
                    type="text"
                    value={formData.senderName}
                    onChange={(e) => updateFormData("senderName", e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Sender Phone *
                  </label>
                  <input
                    type="tel"
                    value={formData.senderPhone}
                    onChange={(e) => updateFormData("senderPhone", e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Sender Email *
                  </label>
                  <input
                    type="email"
                    value={formData.senderEmail}
                    onChange={(e) => updateFormData("senderEmail", e.target.value)}
                    placeholder="john@example.com"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-sm font-bold text-gray-700 mb-4">Receiver Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Receiver Name *
                    </label>
                    <input
                      type="text"
                      value={formData.receiverName}
                      onChange={(e) => updateFormData("receiverName", e.target.value)}
                      placeholder="Jane Smith"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Receiver Phone *
                    </label>
                    <input
                      type="tel"
                      value={formData.receiverPhone}
                      onChange={(e) => updateFormData("receiverPhone", e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Package Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <MdInventory2 className="text-2xl text-blue-600" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Package Information</h2>
                  <p className="text-sm text-gray-500">Describe your package details</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Package Type *
                  </label>
                  <select
                    value={formData.packageType}
                    onChange={(e) => updateFormData("packageType", e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                  >
                    {packageTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Weight (kg) *
                  </label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => updateFormData("weight", e.target.value)}
                    placeholder="0.0"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Dimensions (L x W x H cm)
                  </label>
                  <input
                    type="text"
                    value={formData.dimensions}
                    onChange={(e) => updateFormData("dimensions", e.target.value)}
                    placeholder="30 x 20 x 15"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Package Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => updateFormData("description", e.target.value)}
                    placeholder="Describe your package contents..."
                    rows={3}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm resize-none"
                  />
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-3 pt-4 border-t border-gray-100">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.insurance}
                    onChange={(e) => updateFormData("insurance", e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500/20"
                  />
                  <div className="flex items-center gap-2">
                    <MdSecurity className="text-blue-600" />
                    <span className="text-sm font-semibold text-gray-700">Add Insurance Coverage</span>
                  </div>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.specialHandling}
                    onChange={(e) => updateFormData("specialHandling", e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500/20"
                  />
                  <div className="flex items-center gap-2">
                    <MdInfo className="text-amber-500" />
                    <span className="text-sm font-semibold text-gray-700">Special Handling Required</span>
                  </div>
                </label>
              </div>

              {/* Photo Upload */}
              <div className="pt-4 border-t border-gray-100">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Package Photos
                </label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <MdPhotoCamera className="text-4xl text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Route & Locations */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <MdRoute className="text-2xl text-blue-600" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Route & Locations</h2>
                  <p className="text-sm text-gray-500">Set pickup and delivery locations</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-blue-200" />
                  <div className="relative flex items-start gap-4 mb-6">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 z-10">
                      <MdLocationOn className="text-green-600" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Pickup Location *
                      </label>
                      <input
                        type="text"
                        value={formData.pickupLocation}
                        onChange={(e) => updateFormData("pickupLocation", e.target.value)}
                        placeholder="Enter pickup address"
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                      />
                    </div>
                  </div>
                  <div className="relative flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 z-10">
                      <MdLocationOff className="text-red-600" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Delivery Location *
                      </label>
                      <input
                        type="text"
                        value={formData.deliveryLocation}
                        onChange={(e) => updateFormData("deliveryLocation", e.target.value)}
                        placeholder="Enter delivery address"
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Preferred Vehicle Type
                </label>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                  {vehicleTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => updateFormData("preferredVehicle", type)}
                      className={`p-3 rounded-xl border-2 transition-all text-sm font-semibold ${
                        formData.preferredVehicle === type
                          ? "border-blue-500 bg-blue-50 text-blue-600"
                          : "border-gray-200 hover:border-gray-300 text-gray-600"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Schedule & Timing */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <MdSchedule className="text-2xl text-blue-600" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Schedule & Timing</h2>
                  <p className="text-sm text-gray-500">Set delivery date and time preferences</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Delivery Date *
                  </label>
                  <input
                    type="date"
                    value={formData.deliveryDate}
                    onChange={(e) => updateFormData("deliveryDate", e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Preferred Time *
                  </label>
                  <input
                    type="time"
                    value={formData.deliveryTime}
                    onChange={(e) => updateFormData("deliveryTime", e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Delivery Speed
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: "standard", label: "Standard", time: "2-3 days", icon: MdSpeed },
                    { value: "express", label: "Express", time: "24 hours", icon: MdGpsFixed },
                    { value: "urgent", label: "Urgent", time: "Same day", icon: MdAccessTime },
                  ].map(({ value, label, time, icon: Icon }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => updateFormData("deliverySpeed", value)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.deliverySpeed === value
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Icon className={`text-2xl mx-auto mb-2 ${
                        formData.deliverySpeed === value ? "text-blue-600" : "text-gray-400"
                      }`} />
                      <p className="font-bold text-sm text-gray-900">{label}</p>
                      <p className="text-xs text-gray-500 mt-1">{time}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Special Instructions
                </label>
                <textarea
                  value={formData.instructions}
                  onChange={(e) => updateFormData("instructions", e.target.value)}
                  placeholder="Gate code, floor number, etc..."
                  rows={3}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 5: Pricing & Review */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <MdAttachMoney className="text-2xl text-blue-600" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Pricing & Review</h2>
                  <p className="text-sm text-gray-500">Set your budget and review details</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Your Budget ($)
                  </label>
                  <input
                    type="number"
                    value={formData.budget}
                    onChange={(e) => updateFormData("budget", e.target.value)}
                    placeholder="0.00"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-xl p-5 space-y-3">
                <h3 className="font-bold text-sm text-gray-700 mb-3">Order Summary</h3>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Package Type</span>
                  <span className="font-semibold text-gray-900">{formData.packageType}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Weight</span>
                  <span className="font-semibold text-gray-900">{formData.weight || "0"} kg</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">From</span>
                  <span className="font-semibold text-gray-900 truncate max-w-[200px]">
                    {formData.pickupLocation || "Not set"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">To</span>
                  <span className="font-semibold text-gray-900 truncate max-w-[200px]">
                    {formData.deliveryLocation || "Not set"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Speed</span>
                  <span className="font-semibold text-gray-900 capitalize">{formData.deliverySpeed}</span>
                </div>
                <div className="pt-3 border-t border-gray-200 flex justify-between">
                  <span className="font-bold text-gray-900">Est. Price</span>
                  <span className="font-bold text-lg text-blue-600">
                    ${formData.budget || "0.00"}
                  </span>
                </div>
              </div>

              {formData.insurance && (
                <div className="flex items-center gap-2 p-3 bg-green-50 rounded-xl">
                  <MdCheckCircle className="text-green-600" />
                  <span className="text-sm text-green-700 font-semibold">Insurance coverage included</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              currentStep === 1
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <MdArrowBack />
            Back
          </button>

          {currentStep < 5 ? (
            <button
              onClick={nextStep}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors"
            >
              Next
              <MdArrowForward />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-blue-500/25 transition-all"
            >
              <MdCheckCircle />
              Submit Request
            </button>
          )}
        </div>
    </div>
  );
}
