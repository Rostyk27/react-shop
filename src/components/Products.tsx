import Product from './Product';
import { useState, useEffect } from 'react';

import type IProduct from '../types';

export default function Products() {
  const [products, setProducts] = useState(null as IProduct[] | null);

  useEffect(() => {
    // fetch('http://localhost:8000/products')
    //   .then(response => response.json())
    //   .then(data => setProducts(data));

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (products === null) {
    return <div className="container">Loading...</div>;
  }

  return (
    <section className="products mb-16 lg:mb-20">
      <div className="container">
        <h2 className="mb-6 text-2xl font-bold lg:mb-8 lg:text-3xl">
          All products
        </h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 xl:gap-y-10">
          {products !== null &&
            products.map((product: IProduct) => (
              <Product
                key={product.id}
                id={product.id}
                name={product.name}
                link={product.link}
                price={product.price}
                imageSrc={product.imageSrc}
                imageAlt={product.imageAlt}
              />
            ))}
        </div>
      </div>
    </section>
  );
}
