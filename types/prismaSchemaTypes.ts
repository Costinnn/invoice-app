export type CompanyType = {
  id: string;
  name: string;
  cui: string;
  rc: string;
  address: string;
  capital: number;
  iban: string;
  email: string;
  clients: string[] | undefined;
};

export type CompanyClientType = {
  id: string;
  name: string;
  cui: string;
  rc?: string;
  address: string;
  iban?: string;
  email?: string;
  sellerId: string;
};
