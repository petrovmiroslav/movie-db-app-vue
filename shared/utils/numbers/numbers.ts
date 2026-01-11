import round from "lodash/round.js";

export const roundTo = (
  number: number,
  precision?: number | undefined,
): number => round(number, precision);
