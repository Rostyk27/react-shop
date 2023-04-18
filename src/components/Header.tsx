import { Link } from 'react-router-dom';

export default function Header({
  totalCartItems,
  onShowCart,
}: {
  totalCartItems: number;
  onShowCart: () => void;
}) {
  return (
    <header className="fixed left-0 right-0 top-0 z-10 bg-color-primary py-8">
      <div className="container flex items-center justify-between">
        <Link to={'/'} className="flex items-center hover:text-color-tertiary">
          Shop app <span className="material-symbols-outlined ml-1">apps</span>
        </Link>

        <button
          disabled={totalCartItems === 0}
          onClick={onShowCart}
          className="relative inline-flex pr-[26px] hover:text-color-tertiary"
        >
          <span className="material-symbols-outlined text-[36px]">
            shopping_cart
          </span>

          <span className="center-y right-0 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-color-secondary text-[11px] font-bold leading-[22px] text-white">
            {totalCartItems}
          </span>
        </button>
      </div>
    </header>
  );
}
