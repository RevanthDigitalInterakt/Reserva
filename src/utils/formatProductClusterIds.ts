export function formatProductClusterIds(input: string) {
  input = input.toLowerCase();
  const words = ['product', 'cluster', 'ids'];
  const camelCaseString = words.map((word, index) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1))).join('');
  return camelCaseString;
}
