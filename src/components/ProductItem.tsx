import { useContext } from 'react';
import { Link } from 'react-router-dom';

import ProductButton from './ProductButton';

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

  return (
    <li id={`pid_${id}`} className="product">
      <Link
        to={`/products/${link}`}
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
      </Link>

      <small className="mb-3 inline-flex border-[1px] px-2 py-0.5 text-[10px] uppercase tracking-[0.1em] text-color-tertiary">
        {category}
      </small>

      <h3 className="mb-2">
        <Link to={`/products/${link}`} className="hover:text-color-tertiary">
          {name}
        </Link>
      </h3>

      <p className="mb-5 lg:text-lg">
        <strong>${price}</strong>
      </p>

      <ProductButton id={id} inStock={inStock} addToCart={addToCart} />
    </li>
  );
}
