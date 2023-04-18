import { Link } from 'react-router-dom';

import ProductImage from '../product-parts/ProductImage';
import ProductQuantityControls from '../product-parts/ProductQuantityControls';

import { IProduct } from '../../types';

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
          to={`/products/${item.product.link}`}
          tabIndex={-1}
          aria-hidden="true"
          className="flex w-[60px] hover:opacity-75"
        >
          <ProductImage
            imageSrc={item.product.imageSrc}
            imageAlt={item.product.imageAlt}
            width="60px"
            height="60px"
          />
        </Link>

        <h5 className="flex-1 pl-4 pr-2 text-[13px]">
          <Link
            to={`/products/${item.product.link}`}
            {...a11y}
            className="hover:text-color-tertiary"
          >
            {item.product.name}
          </Link>
        </h5>
      </div>

      <div className="mt-6 flex items-center justify-end sm:mt-0 sm:justify-normal">
        <div className="flex w-[160px] items-center justify-center">
          <button
            {...a11y}
            type="button"
            className="mr-[20px] flex hover:text-color-error"
            onClick={() => onRemoveFromCart(item.product.id)}
          >
            <span className="material-symbols-outlined text-[20px]">
              delete
            </span>
          </button>

          <ProductQuantityControls
            a11y={a11y}
            id={item.product.id}
            quantity={item.quantity}
            onQuantityChange={onUpdateQuantity}
          />
        </div>

        <strong className="w-[50px] text-center">
          ${item.product.price * item.quantity}
        </strong>
      </div>
    </li>
  );
}
