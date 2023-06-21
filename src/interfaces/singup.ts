export interface Isingup {
  email: string;
  first_name: string;
  last_name: string;
  carnet: string;
  country: string;
  password: string;
}

export interface IsingupSucces {
  id: number;
  password: string;
  email: string;
}
