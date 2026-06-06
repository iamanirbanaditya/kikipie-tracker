import { calculateDistance } from "./calculateDistance";

export function detectHalts(logs: any[]) {

  const halts = [];

  let haltStart = null;

  for (
    let i = 1;
    i < logs.length;
    i++
  ) {

    const prev =
      logs[i - 1];

    const curr =
      logs[i];

    const distance =
      calculateDistance(
        prev.latitude,
        prev.longitude,
        curr.latitude,
        curr.longitude
      );

    if (
      distance < 0.05
    ) {

      if (!haltStart) {
        haltStart = prev;
      }

    } else {

      if (haltStart) {

        const haltDuration =
          (
            new Date(
              prev.createdAt
            ).getTime() -
            new Date(
              haltStart.createdAt
            ).getTime()
          ) /
          (1000 * 60);

        if (
          haltDuration >= 10
        ) {

          halts.push({
            latitude:
              haltStart.latitude,

            longitude:
              haltStart.longitude,

            startTime:
              haltStart.createdAt,

            endTime:
              prev.createdAt,

            duration:
              Math.round(
                haltDuration
              ),
          });
        }

        haltStart =
          null;
      }
    }
  }

  return halts;
}