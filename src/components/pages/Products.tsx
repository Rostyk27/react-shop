import { useState, useEffect } from 'react';

import ProductSearch from '../product-filters/ProductSearch';
import ProductFilter from '../product-filters/ProductFilter';
import ProductSort from '../product-filters/ProductSort';
import ProductInStock from '../product-filters/ProductInStock';
import ProductItem from '../loop-items/ProductItem';
import Pagination from '../product-filters/Pagination';

import { AddToCartContext } from '../AddToCartContext';
import type { IProduct } from '../../types';

export default function Products({
  products,
  addToCart,
}: {
  products: IProduct[] | null;
  addToCart: (productId: number, productQuantity?: number) => void;
}) {
  const [categories, setCategories] = useState(['all'] as string[]);
  const [searchTerm, setSearchTerm] = useState('' as string);
  const [selectedCategory, setSelectedCategory] = useState('all' as string);
  const [selectedSort, setSelectedSort] = useState('id' as string);
  const [inStockOnly, setInStockOnly] = useState(false as boolean);
  const [filteredProducts, setFilteredProducts] = useState(
    [] as IProduct[] | []
  );
  const [currentPage, setCurrentPage] = useState(1 as number);
  const [currentProducts, setCurrentProducts] = useState([] as IProduct[] | []);
  const productsPerPage: number = 4;

  useEffect(() => {
    if (products === null) {
      return;
    }

    setCategories([
      'all',
      ...new Set(products.map((product: IProduct) => product.category)),
    ]);
  }, [products]);

  useEffect(() => {
    if (products === null) {
      return;
    }

    let filteredItems = products;

    filteredItems = products.filter((product: IProduct) => {
      return (
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.imageAlt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    if (selectedCategory !== 'all') {
      filteredItems = filteredItems.filter((product: IProduct) => {
        return product.category === selectedCategory;
      });
    }

    if (selectedSort === 'name-asc') {
      filteredItems.sort((a: IProduct, b: IProduct) => {
        return a.name.localeCompare(b.name);
      });
    } else if (selectedSort === 'name-desc') {
      filteredItems.sort((a: IProduct, b: IProduct) => {
        return b.name.localeCompare(a.name);
      });
    } else if (selectedSort === 'price-asc') {
      filteredItems.sort((a: IProduct, b: IProduct) => {
        return a.price - b.price;
      });
    } else if (selectedSort === 'price-desc') {
      filteredItems.sort((a: IProduct, b: IProduct) => {
        return b.price - a.price;
      });
    } else {
      filteredItems.sort((a: IProduct, b: IProduct) => {
        return a.id - b.id;
      });
    }

    if (inStockOnly) {
      filteredItems = filteredItems.filter((product: IProduct) => {
        return product.inStock;
      });
    }

    setFilteredProducts(filteredItems);
    setCurrentPage(1);
  }, [products, searchTerm, selectedCategory, selectedSort, inStockOnly]);

  useEffect(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    setCurrentProducts(
      filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
    );
  }, [filteredProducts, currentPage]);

  if (products === null) {
    return <div className="container">Loading...</div>;
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (sort: string) => {
    setSelectedSort(sort);
  };

  const handleInStockChange = (inStock: boolean) => {
    setInStockOnly(inStock);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="products mb-16 lg:mb-20">
      <div className="container">
        <h1>All products</h1>

        <div className="product__actions mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 xl:gap-8">
          <ProductSearch searchTerm={searchTerm} onSearch={handleSearch} />

          <ProductFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />

          <ProductSort
            selectedSort={selectedSort}
            onSortChange={handleSortChange}
          />

          <ProductInStock
            inStockOnly={inStockOnly}
            onInStockChange={handleInStockChange}
          />
        </div>

        {currentProducts.length > 0 && (
          <ul className="product__list grid grid-cols-1 gap-x-6 gap-y-14  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            <AddToCartContext.Provider value={addToCart}>
              {currentProducts.map((product: IProduct) => (
                <ProductItem
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  link={product.link}
                  price={product.price}
                  category={product.category}
                  inStock={product.inStock}
                  imageSrc={product.imageSrc}
                  imageAlt={product.imageAlt}
                  description={product.description}
                />
              ))}
            </AddToCartContext.Provider>
          </ul>
        )}

        {filteredProducts.length > productsPerPage && (
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={filteredProducts.length}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}

        {currentProducts.length === 0 && <p>No products found</p>}
      </div>
    </section>
  );
}
