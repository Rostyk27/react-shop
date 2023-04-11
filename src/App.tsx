import { useState, useEffect } from 'react';

import Header from './components/Header';
import Cart from './components/Cart';
import Content from './components/Content';
import Products from './components/Products';
import Footer from './components/Footer';

import type { IProduct } from './types';

export default function App() {
  const [products, setProducts] = useState(null as IProduct[] | null);
  const [cartItems, setCartItems] = useState(
    [] as { product: IProduct; quantity: number }[]
  );
  const [isCartOpen, setIsCartOpen] = useState(false);

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

  const handleAddToCart = (productId: number) => {
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

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    setCartItems(
      cartItems.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: number) => {
    setCartItems(cartItems.filter(item => item.product.id !== productId));
  };

  const totalCartItems = cartItems.reduce(
    (acc: number, item) => acc + item.quantity,
    0
  );

  const totalCartPrice = cartItems.reduce(
    (acc: number, item) => acc + item.product.price * item.quantity,
    0
  );

  const handleShowCart = () => {
    setIsCartOpen(true);
  };

  const handleHideCart = () => {
    setIsCartOpen(false);
  };

  return (
    <>
      <Header totalCartItems={totalCartItems} onShowCart={handleShowCart} />

      <Cart
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveFromCart={handleRemoveFromCart}
        totalCartItems={totalCartItems}
        totalCartPrice={totalCartPrice}
        isCartOpen={isCartOpen}
        onHideCart={handleHideCart}
      />

      <main id="main" className="flex-[1_0_auto] overflow-hidden">
        <Content />
        <Products products={products} addToCart={handleAddToCart} />
      </main>

      <Footer />
    </>
  );
}
