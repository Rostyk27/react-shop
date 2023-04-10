export default function Header() {
  return (
    <header className="mb-14 bg-color-primary py-8 lg:mb-[10vh]">
      <div className="container flex items-center justify-between">
        <span className="flex items-center">
          Shop app <span className="material-symbols-outlined ml-1">apps</span>
        </span>

        <button className="relative inline-flex pr-[26px]">
          <span className="material-symbols-outlined text-[36px]">
            shopping_cart
          </span>

          <span className="center-y right-0 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-color-secondary text-[11px] font-bold leading-[22px] text-white">
            0
          </span>
        </button>
      </div>
    </header>
  );
}
