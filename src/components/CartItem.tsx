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

        <h5 className="flex-1 pl-4 pr-2 text-[13px]">
          <a
            {...a11y}
            href={item.product.link}
            className="hover:text-color-tertiary"
          >
            {item.product.name}
          </a>
        </h5>
      </div>

      <div className="mt-4 flex items-center justify-end sm:mt-0 sm:justify-normal">
        <div className="flex w-[160px] items-center justify-center">
          <button
            {...a11y}
            type="button"
            className="flex hover:text-[#ff3264]"
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
              className="flex hover:text-[#41d348]"
              onClick={() =>
                onUpdateQuantity(item.product.id, item.quantity - 1)
              }
            >
              <span className="material-symbols-outlined text-[20px]">
                remove
              </span>
            </button>

            <input
              type="text"
              name="quantity"
              readOnly
              tabIndex={-1}
              aria-hidden="true"
              value={item.quantity}
              className="no_styles !focus:ring-0 w-[40px] cursor-default text-center transition-none focus-visible:outline-none focus-visible:ring-0"
            />

            <button
              {...a11y}
              type="button"
              className="flex hover:text-[#41d348]"
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
