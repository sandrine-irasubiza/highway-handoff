const CITY_COORDINATES = {
  "Chicago": { lat: 41.8781, lng: -87.6298, state: "IL" },
  "St. Louis": { lat: 38.6270, lng: -90.1994, state: "MO" },
  "Indianapolis": { lat: 39.7684, lng: -86.1581, state: "IN" },
  "Columbus": { lat: 39.9612, lng: -82.9988, state: "OH" },
  "Cleveland": { lat: 41.4993, lng: -81.6944, state: "OH" },
  "Nashville": { lat: 36.1627, lng: -86.7816, state: "TN" },
  "Atlanta": { lat: 33.7490, lng: -84.3880, state: "GA" },
  "Kansas City": { lat: 39.0997, lng: -94.5786, state: "MO" },
  "Memphis": { lat: 35.1495, lng: -90.0490, state: "TN" },
  "Dallas": { lat: 32.7767, lng: -96.7970, state: "TX" },
  "Houston": { lat: 29.7604, lng: -95.3698, state: "TX" },
  "Denver": { lat: 39.7392, lng: -104.9903, state: "CO" },
  "Salt Lake City": { lat: 40.7608, lng: -111.8910, state: "UT" },
  "Milwaukee": { lat: 43.0389, lng: -87.9065, state: "WI" },
  "Detroit": { lat: 42.3314, lng: -83.0458, state: "MI" },
  "Pittsburgh": { lat: 40.4406, lng: -79.9959, state: "PA" },
  "Cincinnati": { lat: 39.1031, lng: -84.5120, state: "OH" },
  "Louisville": { lat: 38.2527, lng: -85.7585, state: "KY" },
  "St. Paul": { lat: 44.9537, lng: -93.0900, state: "MN" },
  "Minneapolis": { lat: 44.9778, lng: -93.2650, state: "MN" },
  "Omaha": { lat: 41.2565, lng: -95.9345, state: "NE" },
  "Oklahoma City": { lat: 35.4676, lng: -97.5164, state: "OK" },
  "Little Rock": { lat: 34.7465, lng: -92.2896, state: "AR" },
  "Birmingham": { lat: 33.5207, lng: -86.8025, state: "AL" },
  "Charlotte": { lat: 35.2271, lng: -80.8431, state: "NC" },
  "Jacksonville": { lat: 30.3322, lng: -81.6557, state: "FL" },
  "Tampa": { lat: 27.9506, lng: -82.4572, state: "FL" },
  "Miami": { lat: 25.7617, lng: -80.1918, state: "FL" },
  "New Orleans": { lat: 29.9511, lng: -90.0715, state: "LA" },
  "San Antonio": { lat: 29.4241, lng: -98.4936, state: "TX" },
  "El Paso": { lat: 31.7619, lng: -106.4850, state: "TX" },
  "Phoenix": { lat: 33.4484, lng: -112.0740, state: "AZ" },
  "Albuquerque": { lat: 35.0844, lng: -106.6504, state: "NM" },
  "Tucson": { lat: 32.2226, lng: -110.9747, state: "AZ" },
  "Las Vegas": { lat: 36.1699, lng: -115.1398, state: "NV" },
  "Los Angeles": { lat: 34.0522, lng: -118.2437, state: "CA" },
  "San Francisco": { lat: 37.7749, lng: -122.4194, state: "CA" },
  "Portland": { lat: 45.5152, lng: -122.6784, state: "OR" },
  "Seattle": { lat: 47.6062, lng: -122.3321, state: "WA" },
  "Boise": { lat: 43.6150, lng: -116.2023, state: "ID" },
  "Billings": { lat: 45.7833, lng: -108.5007, state: "MT" },
  "Fargo": { lat: 46.8772, lng: -96.7898, state: "ND" },
  "Sioux Falls": { lat: 43.5446, lng: -96.7311, state: "SD" },
  "Lincoln": { lat: 40.8136, lng: -96.7026, state: "NE" },
  "Wichita": { lat: 37.6872, lng: -97.3301, state: "KS" },
  "Tulsa": { lat: 36.1540, lng: -95.9928, state: "OK" },
  "Amarillo": { lat: 35.2220, lng: -101.8313, state: "TX" },
  "Santa Fe": { lat: 35.6870, lng: -105.9378, state: "NM" },
};

function haversineDistance(lat1, lng1, lat2, lng2) {
  const R = 3959;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function getCityCoordinates(city, state) {
  const key = city?.trim();
  if (!key) return null;
  const direct = CITY_COORDINATES[key];
  if (direct) return direct;
  for (const [name, coords] of Object.entries(CITY_COORDINATES)) {
    if (name.toLowerCase() === key.toLowerCase()) return coords;
  }
  return null;
}

export function getDistanceBetweenCities(city1, state1, city2, state2) {
  const c1 = getCityCoordinates(city1, state1);
  const c2 = getCityCoordinates(city2, state2);
  if (!c1 || !c2) return null;
  return Math.round(haversineDistance(c1.lat, c1.lng, c2.lat, c2.lng));
}

export function isCityOnRoute(origin, destination, waypoint, maxDetourMiles = 100) {
  const o = getCityCoordinates(origin.city, origin.state);
  const d = getCityCoordinates(destination.city, destination.state);
  const w = getCityCoordinates(waypoint.city, waypoint.state);
  if (!o || !d || !w) return { onRoute: false, distance: null, detour: null };

  const totalDist = haversineDistance(o.lat, o.lng, d.lat, d.lng);
  const distToWaypoint = haversineDistance(o.lat, o.lng, w.lat, w.lng);
  const distFromWaypoint = haversineDistance(w.lat, w.lng, d.lat, d.lng);
  const detour = distToWaypoint + distFromWaypoint - totalDist;

  return {
    onRoute: detour <= maxDetourMiles,
    distance: Math.round(totalDist),
    detour: Math.round(detour),
    distToWaypoint: Math.round(distToWaypoint),
  };
}

export function scoreRouteMatch(shipmentOrigin, shipmentDest, driverTrip, vehicleCapacity, shipmentWeight) {
  let score = 0;
  let reasons = [];

  const routeCheck = isCityOnRoute(
    driverTrip.origin,
    driverTrip.destination,
    shipmentOrigin,
    150
  );

  if (routeCheck.onRoute) {
    const detourPenalty = Math.max(0, routeCheck.detour);
    score += Math.max(0, 50 - detourPenalty * 0.5);
    reasons.push(`On route (${routeCheck.detour}mi detour)`);
  } else {
    const directDist = getDistanceBetweenCities(
      driverTrip.origin.city, driverTrip.origin.state,
      shipmentOrigin.city, shipmentOrigin.state
    );
    if (directDist && directDist < 200) {
      score += Math.max(0, 30 - directDist * 0.1);
      reasons.push(`Near route (${directDist}mi away)`);
    } else {
      score -= 20;
      reasons.push("Off route");
    }
  }

  if (vehicleCapacity && shipmentWeight) {
    if (shipmentWeight <= vehicleCapacity) {
      score += 20;
      reasons.push("Fits capacity");
    } else {
      score -= 30;
      reasons.push("Exceeds capacity");
    }
  }

  const destCheck = isCityOnRoute(
    driverTrip.origin,
    driverTrip.destination,
    shipmentDest,
    150
  );
  if (destCheck.onRoute) {
    score += 15;
    reasons.push("Destination on route");
  }

  return { score: Math.round(score * 10) / 10, reasons };
}

export function getAllCities() {
  return Object.entries(CITY_COORDINATES).map(([name, coords]) => ({
    name,
    state: coords.state,
    lat: coords.lat,
    lng: coords.lng,
  }));
}
