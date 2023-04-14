import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ProductButton from './ProductButton';
import Error404 from './404';

import type { IProduct } from '../types';

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

        <figure className="flex w-[400px] overflow-hidden rounded-lg shadow-lg">
          <img
            className="object-cover object-center"
            src={product.imageSrc}
            alt={product.imageAlt}
          />
        </figure>

        <ProductButton
          id={product.id}
          inStock={product.inStock}
          addToCart={addToCart}
          addToCartQuantity={productQuantity}
        />
      </div>
    </div>
  );
}
