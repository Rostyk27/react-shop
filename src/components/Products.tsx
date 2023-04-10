import { useState, useEffect } from 'react';

import ProductSearch from './ProductSearch';
import ProductFilter from './ProductFilter';
import ProductSort from './ProductSort';
import ProductInStock from './ProductInStock';
import ProductItem from './ProductItem';
import Pagination from './Pagination';

import type { IProduct } from '../types';

export default function Products() {
  const [products, setProducts] = useState(null as IProduct[] | null);
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
    const fetchData = async () => {
      try {
        const response = await fetch('/products-data.json');
        const jsonFile: { products: IProduct[] } = await response.json();
        const productsData: IProduct[] = jsonFile.products;
        setProducts(productsData);
        setCategories([
          'all',
          ...new Set(productsData.map((product: IProduct) => product.category)),
        ]);
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

    let filteredProducts = products;

    filteredProducts = products.filter((product: IProduct) => {
      return (
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.imageAlt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    if (selectedCategory !== 'all') {
      filteredProducts = filteredProducts.filter((product: IProduct) => {
        return product.category === selectedCategory;
      });
    }

    if (selectedSort === 'name-asc') {
      filteredProducts.sort((a: IProduct, b: IProduct) => {
        return a.name.localeCompare(b.name);
      });
    } else if (selectedSort === 'name-desc') {
      filteredProducts.sort((a: IProduct, b: IProduct) => {
        return b.name.localeCompare(a.name);
      });
    } else if (selectedSort === 'price-asc') {
      filteredProducts.sort((a: IProduct, b: IProduct) => {
        return a.price - b.price;
      });
    } else if (selectedSort === 'price-desc') {
      filteredProducts.sort((a: IProduct, b: IProduct) => {
        return b.price - a.price;
      });
    } else {
      filteredProducts.sort((a: IProduct, b: IProduct) => {
        return a.id - b.id;
      });
    }

    if (inStockOnly) {
      filteredProducts = filteredProducts.filter((product: IProduct) => {
        return product.inStock;
      });
    }

    setFilteredProducts(filteredProducts);
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
        <h2 className="mb-5 text-2xl font-bold lg:mb-7 lg:text-3xl">
          All products
        </h2>

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
          <ul className="product__list grid grid-cols-1 gap-x-6 gap-y-8  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 xl:gap-y-10">
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
              />
            ))}
          </ul>
        )}

        {currentProducts.length > 0 && (
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
