/**
 * https://stackoverflow.com/a/11508164/7957792
 * @param hex
 */
export function hex2rgb(hex: string) {
  const bigint = parseInt(hex.slice(1), 16)
  // eslint-disable-next-line no-bitwise
  const r = (bigint >> 16) & 255
  // eslint-disable-next-line no-bitwise
  const g = (bigint >> 8) & 255
  // eslint-disable-next-line no-bitwise
  const b = bigint & 255

  return `${r},${g},${b}`
}
