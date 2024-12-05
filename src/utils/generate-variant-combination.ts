export function generateVariantCombinations(
  options: Record<string, string[]>
): string[] {
  const result: string[] = [];
  const optionKeys = Object.keys(options);

  if (optionKeys.length === 0) return result;

  const combine = (index: number, currentCombination: string[]) => {
    if (index === optionKeys.length) {
      result.push(currentCombination.join(' - ').trim());
      return;
    }

    const currentOptions = options[optionKeys[index]];
    for (const option of currentOptions) {
      combine(index + 1, [...currentCombination, option]);
    }
  };

  combine(0, []);
  return result;
}
