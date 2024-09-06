'use client';

import { useCartStore } from '@/store/shopping-cart/shopping-cart.store';
import { redirect } from 'next/navigation';
import { useState } from 'react';

const cartItems = [
  {
    id: 1,
    name: 'Basic Tee',
    color: 'Sienna',
    size: 'Large',
    price: 32,
    image: '/placeholder.svg?height=80&width=80',
    quantity: 1,
    inStock: true,
  },
  {
    id: 2,
    name: 'Basic Tee',
    color: 'Black',
    size: 'Large',
    price: 32,
    image: '/placeholder.svg?height=80&width=80',
    quantity: 1,
    inStock: false,
    shippingTime: 'Ships in 3-4 weeks',
  },
  {
    id: 3,
    name: 'Nomad Tumbler',
    color: 'White',
    size: '',
    price: 35,
    image: '/placeholder.svg?height=80&width=80',
    quantity: 1,
    inStock: true,
  },
];

const subtotal = cartItems.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
);
const shippingEstimate = 5;
const taxEstimate = subtotal * 0.08;
const orderTotal = subtotal + shippingEstimate + taxEstimate;

export const ProdcutsCart = () => {
  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);

  if (productsInCart.length === 0) {
    redirect('/empty');
  }
  return (
    <div className="lg:col-span-2">
      {cartItems.map((item) => (
        <div key={item.id} className="flex border-b py-6">
          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
            {/* <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" /> */}
          </div>
          <div className="ml-4 flex flex-1 flex-col">
            <div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <h3>{item.name}</h3>
                <p className="ml-4">${item.price.toFixed(2)}</p>
              </div>
              <p className="mt-1 text-sm text-gray-500">{item.color}</p>
              {item.size && (
                <p className="mt-1 text-sm text-gray-500">{item.size}</p>
              )}
            </div>
            <div className="flex flex-1 items-end justify-between text-sm">
              <div className="flex items-center">
                {/* <Select
              value={item.quantity.toString()}
              onValueChange={(value) => updateQuantity(item.id, parseInt(value))}
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num.toString()}>{num}</option>
              ))}
            </Select> */}
              </div>
              <div className="flex">
                <button
                  type="button"
                  // onClick={() => removeItem(item.id)}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Remove
                </button>
              </div>
            </div>
            {item.inStock ? (
              <p className="mt-2 text-sm text-green-500">In stock</p>
            ) : (
              <p className="mt-2 text-sm text-gray-500">{item.shippingTime}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
