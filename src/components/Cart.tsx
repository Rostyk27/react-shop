import { useState, useEffect } from 'react';
import CartItem from './CartItem';
import CartForm from './CartForm';
import type { IProduct } from '../types';

export default function Cart({
  cartItems,
  onUpdateQuantity,
  onRemoveFromCart,
  totalCartItems,
  totalCartPrice,
  isCartOpen,
  onHideCart,
  onClearCart,
}: {
  cartItems: { product: IProduct; quantity: number }[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveFromCart: (productId: number) => void;
  totalCartItems: number;
  totalCartPrice: number;
  isCartOpen: boolean;
  onHideCart: () => void;
  onClearCart: () => void;
}) {
  const [cartSuccessMessage, setCartSuccessMessage] = useState('');

  const handleSuccessMessage = (msg: string) => {
    setCartSuccessMessage(msg);

    setTimeout(() => {
      setCartSuccessMessage('');
    }, 3000);
  };

  useEffect(() => {
    if (totalCartItems === 0) {
      onHideCart();
    }
  }, [totalCartItems, onHideCart]);

  const a11y = !isCartOpen && { tabIndex: -1, 'aria-hidden': true };

  return (
    <>
      {totalCartItems > 0 && (
        <div
          className={`popup ${
            isCartOpen
              ? 'pointer-events-all opacity-100'
              : 'pointer-events-none opacity-0'
          }`}
        >
          <button
            {...a11y}
            type="button"
            onClick={onHideCart}
            className="absolute right-6 top-4 hover:text-color-error"
          >
            <span className="material-symbols-outlined">close</span>
          </button>

          <ul className="px-4 py-5 sm:px-6">
            {cartItems.map(item => (
              <CartItem
                key={item.product.id}
                item={item}
                onUpdateQuantity={onUpdateQuantity}
                onRemoveFromCart={onRemoveFromCart}
                isCartOpen={isCartOpen}
              />
            ))}
          </ul>

          <div className="bg-color-bg px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between px-4">
              <strong className="flex-1 pl-2">Total</strong>

              <strong className="mr-[40px] w-[40px] text-center">
                {totalCartItems}
              </strong>

              <strong className="w-[50px] text-center">
                ${totalCartPrice}
              </strong>
            </div>
          </div>

          <CartForm
            isCartOpen={isCartOpen}
            onHideCart={onHideCart}
            onClearCart={onClearCart}
            cartSuccessMessage={handleSuccessMessage}
          />
        </div>
      )}

      {cartSuccessMessage.length > 0 && (
        <div className="popup !p-7 text-center">{cartSuccessMessage}</div>
      )}
    </>
  );
}
