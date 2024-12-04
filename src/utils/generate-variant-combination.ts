export function generateVariantCombination(
  options: Record<string, string[]>
): { name: string; options: string }[] {
  const result: { name: string; options: string }[] = [];

  // Ambil semua kategori (misalnya "color", "size")
  const optionNames = Object.keys(options);

  // Fungsi rekursif untuk menggabungkan semua kombinasi
  const combine = (index: number, currentCombination: string[]) => {
    if (index === optionNames.length) {
      // Gabungkan kategori dan opsi menjadi objek { name, options }
      result.push({
        name: currentCombination[0], // Nilai kategori pertama (misalnya "red")
        options: currentCombination[1], // Nilai opsi kedua (misalnya "s")
      });
      return;
    }

    // Ambil opsi untuk kategori saat ini
    const currentOptions = options[optionNames[index]];

    for (const option of currentOptions) {
      // Lanjutkan rekursi dengan menambahkan opsi saat ini ke kombinasi
      combine(index + 1, [...currentCombination, option]);
    }
  };

  // Mulai rekursi dari index 0
  combine(0, []);

  return result;
}
