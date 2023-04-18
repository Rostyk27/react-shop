import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ProductImage from '../product-parts/ProductImage';
import ProductCategory from '../product-parts/ProductCategory';
import ProductPrice from '../product-parts/ProductPrice';
import ProductQuantityControls from '../product-parts/ProductQuantityControls';
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

  const handleQuantityChange = (id: number, quantity: number) => {
    setProductQuantity(quantity);
  };

  if (product === null) {
    return <Error404 />;
  }

  return (
    <div className="product__single mb-20 md:mb-24">
      <div className="container">
        <h1>{product.name}</h1>

        <div className="max-w-[940px] md:flex">
          <ProductImage
            imageSrc={product.imageSrc}
            imageAlt={product.imageAlt}
            className="mb-10 w-[320px] max-w-full shadow-lg md:mb-0 lg:w-[440px]"
          />

          <div className="md:flex-1 md:pl-16">
            <ProductCategory name={product.category} />

            <p className="pb-6 pt-2 text-[15px]">{product.description}</p>

            <ProductPrice price={product.price} />

            <div className="flex items-center pt-3 lg:pt-5">
              {product.inStock && (
                <div className="mr-7">
                  <ProductQuantityControls
                    id={product.id}
                    quantity={productQuantity}
                    onQuantityChange={handleQuantityChange}
                  />
                </div>
              )}

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
    </div>
  );
}
