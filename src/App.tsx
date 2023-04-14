import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Cart from './components/cart/Cart';
import Footer from './components/Footer';
import Products from './components/pages/Products';
import ProductSingle from './components/pages/ProductSingle';
import Error404 from './components/pages/404';

import type { IProduct } from './types';

export default function App() {
  const [products, setProducts] = useState(null as IProduct[] | null);
  const savedCartItems: { product: IProduct; quantity: number }[] =
    localStorage.getItem('cart-items')
      ? JSON.parse(localStorage.getItem('cart-items') as string)
      : [];
  const [cartItems, setCartItems] = useState(() =>
    savedCartItems.length > 0 ? savedCartItems : []
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
    localStorage.setItem('cart-items', JSON.stringify(cartItems));
  }, [cartItems]);

  if (products === null) {
    return <div className="container">Loading...</div>;
  }

  const handleAddToCart = (productId: number, productQuantity: number = 1) => {
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
              ? { ...item, quantity: item.quantity + productQuantity }
              : item
          )
        );
      } else {
        setCartItems([
          ...cartItems,
          { product: productToAdd, quantity: productQuantity },
        ]);
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

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <Router>
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
          onClearCart={handleClearCart}
        />

        <main id="main" className="flex-[1_0_auto] overflow-hidden">
          <Routes>
            <Route
              path="/"
              element={
                <Products products={products} addToCart={handleAddToCart} />
              }
            />

            <Route
              path="/products/:productLink"
              element={
                <ProductSingle
                  products={products}
                  addToCart={handleAddToCart}
                />
              }
            />

            <Route path="*" element={<Error404 />} />
          </Routes>
        </main>

        <Footer />
      </>
    </Router>
  );
}
