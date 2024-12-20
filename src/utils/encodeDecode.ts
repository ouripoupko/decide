// credit: the following code is taken from https://github.com/sindresorhus/uint8Array-extras

const cachedDecoders: { [encoding: string]: TextDecoder } = {
  utf8: new TextDecoder("utf8"),
};

const cachedEncoder = new TextEncoder();

const byteToHexLookupTable = Object.fromEntries(
  Array.from({ length: 256 }, (_, value) => [
    value,
    value.toString(16).padStart(2, "0"),
  ])
);

const hexToDecimalLookupTable: { [key: number | string]: number } = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  a: 10,
  b: 11,
  c: 12,
  d: 13,
  e: 14,
  f: 15,
  A: 10,
  B: 11,
  C: 12,
  D: 13,
  E: 14,
  F: 15,
};

export function concatUint8Arrays(arrays: Uint8Array[]) {
  if (arrays.length === 0) {
    return new Uint8Array(0);
  }

  const totalLength = arrays.reduce(
    (accumulator, currentValue) => accumulator + currentValue.length,
    0
  );

  const returnValue = new Uint8Array(totalLength);

  let offset = 0;
  for (const array of arrays) {
    returnValue.set(array, offset);
    offset += array.length;
  }

  return returnValue;
}

export function uint8ArrayToString(
  array: Uint8Array,
  encoding = "utf8"
): string {
  if (encoding === "latin1") {
    return String.fromCharCode(...array);
  }
  cachedDecoders[encoding] ??= new TextDecoder(encoding);
  return cachedDecoders[encoding].decode(array);
}

export function stringToUint8Array(value: string, encoding = ""): Uint8Array {
  if (encoding === "latin1") {
    return new Uint8Array([...value].map((char) => char.charCodeAt(0)));
  }
  return new Uint8Array(cachedEncoder.encode(value));
}

export function uint8ArrayToHex(array: Uint8Array): string {
  return Array.from(array, byte => byteToHexLookupTable[byte]).join('');
}

export function hexToUint8Array(hexString: string): Uint8Array {
  const resultLength = hexString.length / 2;
  const bytes = new Uint8Array(resultLength);

  if (hexString.length % 2 == 0) {
    for (let index = 0; index < resultLength; index++) {
      const highNibble = hexToDecimalLookupTable[hexString[index * 2]];
      const lowNibble = hexToDecimalLookupTable[hexString[index * 2 + 1]];

      if (highNibble === undefined || lowNibble === undefined) {
        return new Uint8Array();
      }

      bytes[index] = (highNibble << 4) | lowNibble;
    }
  }

  return bytes;
}
