import { useState } from 'react';

export default function ProductButton({
  id,
  inStock,
  addToCart,
  addToCartQuantity = 1,
}: {
  id: number;
  inStock: boolean;
  addToCart: (productId: number, productQuantity?: number) => void;
  addToCartQuantity?: number;
}) {
  const [buttonText, setButtonText] = useState('Add to cart');

  const handleButtonTextChange = () => {
    setButtonText('Added!');

    setTimeout(() => {
      setButtonText('Add to cart');
    }, 1000);
  };

  return (
    <>
      {inStock ? (
        <button
          type="button"
          className="button"
          disabled={buttonText === 'Added!'}
          onClick={() => {
            addToCart(id, addToCartQuantity);
            handleButtonTextChange();
          }}
        >
          {buttonText}
        </button>
      ) : (
        <button className="button" disabled type="button">
          Out of stock
        </button>
      )}
    </>
  );
}
