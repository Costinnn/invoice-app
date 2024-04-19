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

export type ProductStateType = {
  id: string;
  name: string;
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

export type ReturnedInvoiceProductType = InvoiceProductType & {
  returnedInvoiceProductId: string;
  productId: string;
  companyId: string;
  invoiceId: string;
};

export type InvoiceType = {
  id: string;
  clientId: string;
  clientName: string;
  clientCui: string;
  clientAddress: string;
  clientRc?: string;
  clientIban?: string;
  clientEmail?: string;
  invoiceSeriesId: string;
  invoiceSerie: string;
  number: number;
  date: string;
  deadline: string;
  invoiceProductsId: string[];
  issuedByName: string;
  issuedByCnp: string;
  accompanyNotice: string;
  delegateName: string;
  delegateCnp: string;
  delegateAuto: string;
  terms: string[];
  remarks: string[];
  currency: string;
  subtotal: number;
  discount: number;
  tva: number;
  total: number;
};

export type DbInvoiceType = {
  id: string;
  clientName: string;
  clientCui: string;
  clientAddress: string;
  clientRc?: string;
  clientIban?: string;
  clientEmail?: string;
  invoiceSeriesId: string;
  invoiceSerie: string;
  number: number;
  date: string;
  deadline: string;
  productsData: string;
  issuedByName: string;
  issuedByCnp: string;
  accompanyNotice: string;
  delegateName: string;
  delegateCnp: string;
  delegateAuto: string;
  terms: string[];
  remarks: string[];
  currency: string;
  subtotal: number;
  discount: number;
  tva: number;
  total: number;
};
