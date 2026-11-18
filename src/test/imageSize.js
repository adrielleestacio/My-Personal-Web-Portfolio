import { readFileSync } from "node:fs";

/**
 * Reads the pixel dimensions out of a WebP file's header. Every image in
 * public/ is WebP, so this covers all three container forms without pulling
 * in an image library just for the tests.
 */
export const webpSize = (path) => {
  const b = readFileSync(path);

  if (b.toString("ascii", 0, 4) !== "RIFF" || b.toString("ascii", 8, 12) !== "WEBP") {
    throw new Error(`${path} is not a WebP file`);
  }

  const format = b.toString("ascii", 12, 16);

  if (format === "VP8X") {
    return {
      w: (b[24] | (b[25] << 8) | (b[26] << 16)) + 1,
      h: (b[27] | (b[28] << 8) | (b[29] << 16)) + 1,
    };
  }

  if (format === "VP8L") {
    const bits = b[21] | (b[22] << 8) | (b[23] << 16) | (b[24] << 24);
    return {
      w: (bits & 0x3fff) + 1,
      h: ((bits >> 14) & 0x3fff) + 1,
    };
  }

  if (format === "VP8 ") {
    return {
      w: ((b[26] | (b[27] << 8)) & 0x3fff),
      h: ((b[28] | (b[29] << 8)) & 0x3fff),
    };
  }

  throw new Error(`${path} has an unrecognised WebP format: ${format}`);
};
