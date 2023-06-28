export interface Ievaluate {
  is_approved: number;
  remark: string;
}

export interface IdiagnosticsResult {
  success: true;
  content: {
    id: number;
    negative_probability: number;
    created_at: string;
    doctor_id: number;
    positive_probability: number;
    image_url: string;
    result_by_doctor: number;
    remark: string;
    patient_id: number;
  };
}
