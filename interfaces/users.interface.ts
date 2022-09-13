export interface AddressDocument {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: [Object];
}

export interface CompanyDocument {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface UserInfoDocument {
  id?: number;
  name: string;
  gender: string;
  email: string;
  status: string;
}
