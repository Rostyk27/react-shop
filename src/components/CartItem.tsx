import { IProduct } from '../types';

export default function CartItem({
  item,
  onUpdateQuantity,
  onRemoveFromCart,
}: {
  item: { product: IProduct; quantity: number };
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveFromCart: (productId: number) => void;
}) {
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

        <h5 className="flex-1 pl-4 text-[13px]">
          <a href={item.product.link} className="hover:text-color-tertiary">
            {item.product.name}
          </a>
        </h5>
      </div>

      <div className="mt-3 flex items-center justify-end sm:mt-0 sm:justify-normal">
        <div className="flex w-[100px] items-center justify-center sm:w-[140px]">
          <button
            className="flex hover:text-[#ff3264]"
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
                onUpdateQuantity(item.product.id, parseInt(e.target.value));
              }}
              className="w-full rounded-md border border-color-secondary text-center"
            />
          </label>
        </div>

        <strong className="w-[50px] text-center">
          ${item.product.price * item.quantity}
        </strong>
      </div>
    </li>
  );
}
