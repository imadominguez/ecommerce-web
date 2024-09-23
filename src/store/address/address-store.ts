import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface State {
  address: {
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
  };

  // Methods
  setAddress: (address: State['address']) => void;
}

export const useAddressStore = create<State>()(
  devtools(
    persist(
      (set, get) => ({
        address: {
          firstName: '',
          lastName: '',
          country: '',
          street: '',
          streetNumber: '',
          address2: undefined,
          isApartment: false,
          floor: undefined,
          apartment: undefined,
          postalCode: '',
          phone: '',
          city: '',
          taxType: '',
          cuitCuil: undefined,
          businessName: undefined,
          vatCondition: undefined,
        },

        setAddress: (address) => {
          set({ address });
        },
      }),
      {
        name: 'address-storage',
      }
    )
  )
);
