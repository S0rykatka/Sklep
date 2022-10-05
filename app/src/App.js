import React, { useState, useEffect } from 'react';
import './App.css';
import Products from './components/products/Products';
import Cart from './components/cart/Cart';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [price, setPrice] = useState(0);
  const [discountCodeUsed, setDiscountCodeUsed] = useState(false);
  const inputRef = React.createRef();

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('./products.json');
      const data = await response.json();

      setProducts(data.products);
    };
  
    getData();
  }, []);

  // Dodawanie przedmiotów do koszyka
  const setCartDelegate = (product) => {
    if ( product.avaible === true) {
      setPrice(price + (product.promoPrice ? product.promoPrice : product.price));
      setCart([...cart, product]);
      alert('Przedmiot dodany do koszyka');
    }
    else {
      alert('Nie ma dostępnego produktu');
    };
  };

  // Wybieranie rozmiaru
  const setSize = (product ,size) => {
    product.setSize = size;

    cart.push(product);

    setCart([...cart]);
  };

  // Usuwanie przedmiotów z koszyka
  const clearCartDelegate = () => {
    setPrice(0);
    setCart([]);
  };

  // Kod rabatowy
  const discountCode = (code) => {
    if (code === 'kuchackonie009') {
      setPrice(price - price*0.15);
      setDiscountCodeUsed(true);
    };
  };

  // Usuwanie jednego przedmiotów z koszyka
  const removeProductDelegate = (id) => {
    let prod = cart.indexOf((i) => i.name === id.name);
    cart.splice(prod,1);
    
    cart.forEach( item => {
      setPrice(price - (item.promoPrice ? item.promoPrice : item.price));
    });
    setCart([...cart]);
  };

  // Filtrowanie produktów od najwiekszej do najmniejszej ceny
  const filtrProducts = (howSort) => {
    if (howSort === '>') {
      setProducts([...products.sort((a,b) => a.price - b.price)]);
    }
    else {
      setProducts([...products.sort((a,b) => b.price - a.price)]);
    };
  };

  return (
    <div className="App">
      <h1>Sklep Jezdziecki</h1>
      {!!cart.length && <Cart discountCodeUsed={discountCodeUsed} discountCode={discountCode} price={price} ref={inputRef} cart={cart} clearCart={clearCartDelegate} removeProd={removeProductDelegate} className="outerCart"/>}
      <Products setSize={setSize} filtrProducts={filtrProducts} products={products} setCart={setCartDelegate} />
    </div>
  );
};

export default App;
