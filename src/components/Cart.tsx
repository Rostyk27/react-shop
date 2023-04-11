import { useEffect } from 'react';
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
          className={` fixed right-[24px] top-8 z-10 max-h-[calc(100vh-64px)] w-[600px] max-w-[calc(100%-48px)] overflow-y-auto rounded-lg bg-white  shadow-xl transition-all lg:right-[72px] ${
            isCartOpen
              ? 'pointer-events-all opacity-100'
              : 'pointer-events-none opacity-0'
          }`}
        >
          <ul className="px-6 py-5">
            {cartItems.map(item => (
              <li
                key={item.product.id}
                className="flex w-full items-center justify-between border-b-[1px] border-color-primary p-4"
              >
                <a
                  href={item.product.link}
                  tabIndex={-1}
                  aria-hidden="true"
                  className="flex w-[60px] hover:opacity-75"
                >
                  <figure className="flex overflow-hidden rounded-lg">
                    <img
                      src={item.product.imageSrc}
                      alt={item.product.imageAlt}
                      width="60px"
                      height="60px"
                    />
                  </figure>
                </a>

                <h5 className="flex-1 pl-4 text-[13px]">
                  <a href={item.product.link}>{item.product.name}</a>
                </h5>

                <div className="flex w-[140px] items-center justify-center">
                  <button
                    className="flex"
                    onClick={() => onRemoveFromCart(item.product.id)}
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>

                  <label className="mb-0 ml-3 block w-[45px]">
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      min="1"
                      value={item.quantity}
                      onKeyDown={e => {
                        if (
                          e.key !== 'Tab' &&
                          e.key !== 'ArrowUp' &&
                          e.key !== 'ArrowDown'
                        ) {
                          e.preventDefault();
                        }
                      }}
                      onChange={e => {
                        onUpdateQuantity(
                          item.product.id,
                          parseInt(e.target.value)
                        );
                      }}
                      className="w-full rounded-md border border-color-secondary text-center"
                    />
                  </label>
                </div>

                <strong className="w-[50px] text-center">
                  ${item.product.price * item.quantity}
                </strong>
              </li>
            ))}
          </ul>

          <div className="bg-color-bg px-6 py-4">
            <div className="mb-6 flex items-center justify-between p-4">
              <strong className="flex-1 pl-2">Total</strong>

              <strong className="mr-14 w-[140px] text-right">
                {totalCartItems}
              </strong>

              <strong className="w-[50px] text-center">
                ${totalCartPrice}
              </strong>
            </div>

            <button type="button" onClick={onHideCart} className="button">
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
