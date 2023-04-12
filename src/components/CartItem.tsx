import { Link } from 'react-router-dom';
import { IProduct } from '../types';

export default function CartItem({
  item,
  onUpdateQuantity,
  onRemoveFromCart,
  isCartOpen,
}: {
  item: { product: IProduct; quantity: number };
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveFromCart: (productId: number) => void;
  isCartOpen: boolean;
}) {
  const a11y = !isCartOpen && { tabIndex: -1, 'aria-hidden': true };

  return (
    <li className="w-full border-b-[1px] border-color-primary p-4 sm:flex sm:items-center sm:justify-between">
      <div className="flex flex-1 items-center">
        <Link
          to={`/product/${item.product.link}`}
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
        </Link>

        <h5 className="flex-1 pl-4 pr-2 text-[13px]">
          <Link
            to={`/product/${item.product.link}`}
            {...a11y}
            className="hover:text-color-tertiary"
          >
            {item.product.name}
          </Link>
        </h5>
      </div>

      <div className="mt-4 flex items-center justify-end sm:mt-0 sm:justify-normal">
        <div className="flex w-[160px] items-center justify-center">
          <button
            {...a11y}
            type="button"
            className="flex hover:text-color-error"
            onClick={() => onRemoveFromCart(item.product.id)}
          >
            <span className="material-symbols-outlined text-[20px]">
              delete
            </span>
          </button>

          <div className="ml-[20px] flex w-[80px] items-center">
            <button
              {...a11y}
              type="button"
              disabled={item.quantity === 1}
              className="flex hover:text-color-success"
              onClick={() =>
                onUpdateQuantity(item.product.id, item.quantity - 1)
              }
            >
              <span className="material-symbols-outlined text-[20px]">
                remove
              </span>
            </button>

            <span className="w-[40px] text-center">{item.quantity}</span>

            <button
              {...a11y}
              type="button"
              className="flex hover:text-color-success"
              onClick={() =>
                onUpdateQuantity(item.product.id, item.quantity + 1)
              }
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
            </button>
          </div>
        </div>

        <strong className="w-[50px] text-center">
          ${item.product.price * item.quantity}
        </strong>
      </div>
    </li>
  );
}
