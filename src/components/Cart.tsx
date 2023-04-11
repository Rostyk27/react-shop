import { useEffect } from 'react';
import CartItem from './CartItem';
import type { IProduct } from '../types';

export default function Cart({
  cartItems,
  onUpdateQuantity,
  onRemoveFromCart,
  totalCartItems,
  totalCartPrice,
  isCartOpen,
  onHideCart,
}: {
  cartItems: { product: IProduct; quantity: number }[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveFromCart: (productId: number) => void;
  totalCartItems: number;
  totalCartPrice: number;
  isCartOpen: boolean;
  onHideCart: () => void;
}) {
  useEffect(() => {
    if (totalCartItems === 0) {
      onHideCart();
    }
  }, [totalCartItems, onHideCart]);

  return (
    <>
      {totalCartItems > 0 && (
        <div
          className={`fixed right-[24px] top-8 z-10 max-h-[calc(100vh-64px)] w-[600px] max-w-[calc(100%-48px)] overflow-y-auto rounded-lg bg-white  pt-4 shadow-xl transition-all lg:right-[72px] ${
            isCartOpen
              ? 'pointer-events-all opacity-100'
              : 'pointer-events-none opacity-0'
          }`}
        >
          <button
            type="button"
            onClick={onHideCart}
            className="absolute right-6 top-4 hover:text-[#ff3264]"
          >
            <span className="material-symbols-outlined">close</span>
          </button>

          <ul className="px-6 py-5">
            {cartItems.map(item => (
              <CartItem
                key={item.product.id}
                item={item}
                onUpdateQuantity={onUpdateQuantity}
                onRemoveFromCart={onRemoveFromCart}
              />
            ))}
          </ul>

          <div className="bg-color-bg px-6 py-4">
            <div className="flex items-center justify-between p-4">
              <strong className="flex-1 pl-2">Total</strong>

              <strong className="mr-14 w-[140px] text-right">
                {totalCartItems}
              </strong>

              <strong className="w-[50px] text-center">
                ${totalCartPrice}
              </strong>
            </div>
          </div>

          <div className="flex items-center justify-end px-6 py-5">
            <button
              type="button"
              onClick={onHideCart}
              className="button is_empty"
            >
              Close
            </button>

            <button type="button" className="button ml-4">
              Order
            </button>
          </div>
        </div>
      )}
    </>
  );
}
