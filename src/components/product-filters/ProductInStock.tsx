export default function ProductInStock({
  inStockOnly,
  onInStockChange,
}: {
  inStockOnly: boolean;
  onInStockChange: (inStock: boolean) => void;
}) {
  return (
    <div>
      <label htmlFor="inStock">
        <small>Show only products in stock</small>
      </label>

      <input
        id="inStock"
        type="checkbox"
        checked={inStockOnly}
        onChange={e => onInStockChange(e.target.checked)}
      />
    </div>
  );
}
