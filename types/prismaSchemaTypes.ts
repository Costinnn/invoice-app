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

export type InvoiceSeriesType = {
  id: string;
  name: string;
  lastNumber: number;
  numbers: number[];
};

export type ProductType = {
  id: string;
  name: string;
  um: string;
};

export type InvoiceProductType = {
  id: string;
  name: string;
  um: string;
  quantity: number;
  price: number;
  tva: number;
  totalValue: number;
};
