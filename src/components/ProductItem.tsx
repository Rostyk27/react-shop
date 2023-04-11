import { useState, useContext } from 'react';
import { AddToCartContext } from './AddToCartContext';

import type { IProduct } from '../types';

export default function ProductItem({
  id,
  name,
  link,
  price,
  category,
  inStock,
  imageSrc,
  imageAlt,
}: IProduct) {
  const addToCart = useContext(AddToCartContext);

  const [buttonText, setButtonText] = useState('Add to cart');

  const handleButtonTextChange = () => {
    setButtonText('Added!');

    setTimeout(() => {
      setButtonText('Add to cart');
    }, 1000);
  };

  return (
    <li id={`pid_${id}`} className="product">
      <a
        href={link}
        tabIndex={-1}
        aria-hidden="true"
        className="mb-4 flex hover:opacity-75"
      >
        <figure className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-color-bg xl:aspect-h-8 xl:aspect-w-7">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="object-cover object-center"
          />
        </figure>
      </a>

      <small className="mb-3 inline-flex border-[1px] px-2 py-0.5 text-[10px] uppercase tracking-[0.1em] text-color-tertiary">
        {category}
      </small>

      <h3 className="mb-2">
        <a href={link} className="hover:text-color-tertiary">
          {name}
        </a>
      </h3>

      <p className="mb-5 lg:text-lg">
        <strong>${price}</strong>
      </p>

      {inStock ? (
        <button
          type="button"
          className="button"
          disabled={buttonText === 'Added!'}
          onClick={() => {
            addToCart(id);
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
    </li>
  );
}
