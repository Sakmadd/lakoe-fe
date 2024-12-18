export interface ProvinceType {
  provinsi: {
    id: number;
    nama: string;
  }[];
}

export interface RegencyType {
  kota_kabupaten: {
    id: number;
    id_provinsi: number;
    nama: string;
  }[];
}

export interface DistrictType {
  kecamatan: {
    id: number;
    id_kota: number;
    nama: string;
  }[];
}

export interface SubDistrictType {
  kelurahan: {
    id: number;
    id_kecamatan: number;
    nama: string;
  }[];
}
