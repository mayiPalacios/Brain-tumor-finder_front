export interface IdiagnosticsContainer {
  items: [Idiagnostics];
  total: number;
  limit: number;
  offset: number;
}

export interface Idiagnostics {
  id: string;
  image_url: string;
  positive_probability: number;
  negative_probability: number;
  result_by_doctor: number;
  created_at: string;
  remark: string;
  patient: {
    first_name: string;
    last_name: string;
    birthday: string;
    email: string;
    id: number;
    gender: string;
    country: string;
  };
}
