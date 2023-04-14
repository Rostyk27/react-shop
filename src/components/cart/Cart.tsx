import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import CartItem from '../loop-items/CartItem';
import CartForm from './CartForm';
import type { IProduct } from '../../types';

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
  // const closeRef = useRef(null);
  const location = useLocation();
  const a11y = !isCartOpen && { tabIndex: -1, 'aria-hidden': true };

  const [cartSuccessMessage, setCartSuccessMessage] = useState('');

  const handleSuccessMessage = (msg: string) => {
    setCartSuccessMessage(msg);
  };

  useEffect(() => {
    if (totalCartItems === 0) {
      // if (closeRef.current === null) return;
      // (closeRef.current as HTMLButtonElement).click();
      onHideCart();
    }
  }, [totalCartItems]);

  useEffect(() => {
    onHideCart();
  }, [location]);

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
            // ref={closeRef}
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
        <div className="popup !py-12 px-7 text-center">
          {cartSuccessMessage}

          <button
            {...a11y}
            type="button"
            onClick={() => handleSuccessMessage('')}
            className="absolute right-6 top-4 hover:text-color-error"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
      )}
    </>
  );
}
