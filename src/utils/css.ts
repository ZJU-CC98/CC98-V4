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

export function rgb2hex(rgb: string) {
  const [r, g, b] = rgb.split(',').map(item => parseInt(item, 10))
  // eslint-disable-next-line no-bitwise
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}
