export function detectHalts(logs: any[]) {

  const halts = [];

  for (
    let i = 1;
    i < logs.length;
    i++
  ) {

    const prev = logs[i - 1];
    const curr = logs[i];

    const latDiff =
      Math.abs(
        prev.latitude -
          curr.latitude
      );

    const lngDiff =
      Math.abs(
        prev.longitude -
          curr.longitude
      );

    if (
      latDiff < 0.0001 &&
      lngDiff < 0.0001
    ) {

      halts.push({
        latitude:
          curr.latitude,

        longitude:
          curr.longitude,

        time:
          curr.timestamp,
      });
    }
  }

  return halts;
}