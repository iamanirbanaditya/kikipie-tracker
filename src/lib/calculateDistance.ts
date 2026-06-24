export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {

  // Skip invalid coordinates
  if (
    !lat1 ||
    !lon1 ||
    !lat2 ||
    !lon2
  ) {
    return 0;
  }

  const R = 6371; // Earth radius in KM

  const dLat =
    ((lat2 - lat1) * Math.PI) / 180;

  const dLon =
    ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) *
      Math.sin(dLat / 2) +
    Math.cos(
      (lat1 * Math.PI) / 180
    ) *
      Math.cos(
        (lat2 * Math.PI) / 180
      ) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  const distance = R * c;

  // Ignore GPS drift/noise (< 30 meters)
  if (distance < 0.03) {
    return 0;
  }

  // Ignore impossible GPS jumps (> 50 KM)
  if (distance > 50) {
    return 0;
  }

  return distance;
}