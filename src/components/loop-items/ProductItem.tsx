import { useContext } from 'react';
import { Link } from 'react-router-dom';

import ProductImage from '../product-parts/ProductImage';
import ProductCategory from '../product-parts/ProductCategory';
import ProductPrice from '../product-parts/ProductPrice';
import ProductButton from '../product-parts/ProductButton';

import { AddToCartContext } from '../AddToCartContext';
import type { IProduct } from '../../types';

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
        <ProductImage
          imageSrc={imageSrc}
          imageAlt={imageAlt}
          className="aspect-h-1 aspect-w-1 w-full bg-color-bg xl:aspect-h-8 xl:aspect-w-7"
        />
      </Link>

      <ProductCategory name={category} />

      <h3 className="mb-2">
        <Link to={`/products/${link}`} className="hover:text-color-tertiary">
          {name}
        </Link>
      </h3>

      <ProductPrice price={price} />

      <ProductButton id={id} inStock={inStock} addToCart={addToCart} />
    </li>
  );
}
