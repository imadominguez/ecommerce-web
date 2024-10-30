export interface UserAddress {
  firstName: string;
  lastName: string;
  country: string;
  street: string;
  streetNumber: string;
  address2?: string;
  isApartment: boolean;
  floor?: string;
  apartment?: string;
  postalCode: string;
  phone: string;
  city: string;
  taxType: string;
  cuitCuil?: string;
  businessName?: string;
  vatCondition?: string;
}
