import Product from './Product';
import ProductSearch from './ProductSearch';
import { useState, useEffect } from 'react';

import type IProduct from '../types';

export default function Products() {
  const [products, setProducts] = useState(null as IProduct[] | null);
  const [searchTerm, setSearchTerm] = useState('' as string);
  const [searchParam] = useState(['name', 'imageAlt'] as string[]);
  const [searchResults, setSearchResults] = useState([] as IProduct[] | []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/products-data.json');
        const jsonFile: { products: IProduct[] } = await response.json();
        const productsData: IProduct[] = jsonFile.products;
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (products === null) {
      return;
    }

    setSearchResults(
      products.filter((product: IProduct) =>
        searchParam.some((param: string) => {
          if (param === 'name') {
            return product.name
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
          } else if (param === 'imageAlt') {
            return product.imageAlt
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
          }
        })
      )
    );
  }, [products, searchTerm, searchParam]);

  if (products === null) {
    return <div className="container">Loading...</div>;
  }

  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };

  return (
    <section className="products mb-16 lg:mb-20">
      <div className="container">
        <h2 className="mb-6 text-2xl font-bold lg:mb-8 lg:text-3xl">
          All products
        </h2>

        <ProductSearch searchTerm={searchTerm} onSearch={handleSearch} />

        {searchResults.length > 0 && (
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 xl:gap-y-10">
            {searchResults.map((product: IProduct) => (
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
        )}

        {searchResults.length === 0 && (
          <p>No products found for "{searchTerm}".</p>
        )}
      </div>
    </section>
  );
}
