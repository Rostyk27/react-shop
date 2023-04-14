import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ProductCategory from '../product-parts/ProductCategory';
import ProductPrice from '../product-parts/ProductPrice';
import ProductButton from '../product-parts/ProductButton';
import Error404 from './404';

import type { IProduct } from '../../types';

export default function ProductSingle({
  products,
  addToCart,
}: {
  products: IProduct[] | null;
  addToCart: (productId: number, productQuantity?: number) => void;
}) {
  const { productLink } = useParams();

  const [product, setProduct] = useState(null as IProduct | null);
  const [productQuantity, setProductQuantity] = useState(1);

  useEffect(() => {
    if (products === null) {
      return;
    }

    const foundProduct = products.find(product => product.link === productLink);

    setProduct(foundProduct || null);
  }, [products, productLink]);

  if (product === null) {
    return <Error404 />;
  }

  return (
    <div className="product__single">
      <div className="container">
        <h1>{product.name}</h1>

        <div className="max-w-[940px] md:flex">
          <figure className="flex w-[440px] overflow-hidden rounded-lg shadow-lg">
            <img
              className="object-cover object-center"
              src={product.imageSrc}
              alt={product.imageAlt}
            />
          </figure>

          <div className="md:flex-1 md:pl-16">
            <ProductCategory name={product.category} />

            <p className="pb-6 pt-2 text-[15px]">{product.description}</p>

            <ProductPrice price={product.price} />

            <ProductButton
              id={product.id}
              inStock={product.inStock}
              addToCart={addToCart}
              addToCartQuantity={productQuantity}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
