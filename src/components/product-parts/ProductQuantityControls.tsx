export default function ProductQuantityControls({
  a11y = {
    tabIndex: 0,
    'aria-hidden': false,
  },
  id,
  quantity,
  onQuantityChange,
}: {
  a11y?:
    | {
        tabIndex: number;
        'aria-hidden': boolean;
      }
    | boolean;
  id: number;
  quantity: number;
  onQuantityChange: (id: number, quantity: number) => void;
}) {
  return (
    <div className="flex w-[80px] items-center">
      <button
        type="button"
        disabled={quantity === 1}
        className="flex hover:text-color-success"
        onClick={() => onQuantityChange(id, quantity - 1)}
        {...(typeof a11y === 'object' && { ...a11y })}
      >
        <span className="material-symbols-outlined text-[20px]">remove</span>
      </button>

      <span className="w-[40px] text-center">{quantity}</span>

      <button
        type="button"
        className="flex hover:text-color-success"
        onClick={() => onQuantityChange(id, quantity + 1)}
        {...(typeof a11y === 'object' && { ...a11y })}
      >
        <span className="material-symbols-outlined text-[20px]">add</span>
      </button>
    </div>
  );
}
