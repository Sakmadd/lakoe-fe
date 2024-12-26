export function formatCityName(input: string) {
  return input.replace(/^(KAB\.\s*|KOTA\s*)/i, '').toLowerCase();
}
