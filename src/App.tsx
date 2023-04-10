import { useState, useEffect } from 'react';

import Header from './components/Header';
import Content from './components/Content';
import Products from './components/Products';
import Footer from './components/Footer';

import type { IProduct } from './types';

export default function App() {
  const [products, setProducts] = useState(null as IProduct[] | null);
  const [cartItems, setCartItems] = useState(
    [] as { product: IProduct; quantity: number }[]
  );

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
    console.log(cartItems);
  }, [cartItems]);

  if (products === null) {
    return <div className="container">Loading...</div>;
  }

  const addToCart = (productId: number) => {
    const productToAdd = products.find(
      (product: IProduct) => product.id === productId
    );
    if (productToAdd) {
      const existingCartItem = cartItems.find(
        item => item.product.id === productId
      );
      if (existingCartItem) {
        setCartItems(
          cartItems.map(item =>
            item.product.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        setCartItems([...cartItems, { product: productToAdd, quantity: 1 }]);
      }
    }
  };

  // const removeFromCart = (productId: number) => {
  //   setCartItems(cartItems.filter(item => item.id !== productId));
  // };

  return (
    <>
      <Header />

      <main id="main" className="flex-[1_0_auto] overflow-hidden">
        <Content />
        <Products products={products} addToCart={addToCart} />
      </main>

      <Footer />
    </>
  );
}
