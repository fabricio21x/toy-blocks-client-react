export function leftPadding(number, padLen, padChar = "0") {
  const pad = new Array(1 + padLen).join(padChar);
  return (pad + number).slice(-pad.length);
}
