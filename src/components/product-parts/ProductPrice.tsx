export default function ProductPrice({ price }: { price: number }) {
  return (
    <p className="mb-5 lg:text-lg">
      <strong>${price}</strong>
    </p>
  );
}
