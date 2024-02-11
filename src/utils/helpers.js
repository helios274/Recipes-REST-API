export function formatString(str) {
  str = str.trim();
  str = str.replace(/\s{2,}/g, " ");
  return str.replace(
    /\w\S*/g,
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
}
