export function formatRupiah(amount: number | undefined): string {
  return `Rp ${amount?.toLocaleString('id-ID')}`;
}
