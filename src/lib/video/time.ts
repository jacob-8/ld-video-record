export function formatTime(seconds) {
  const mm = Math.floor(seconds / 60);
  const ss = zeroPadded(seconds % 60);
  return `${mm}:${ss}`;
}

function zeroPadded(number) {
  return number >= 10 ? number.toString() : `0${number}`;
}
