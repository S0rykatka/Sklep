import React from 'react';
import './Products.css';
import '../cart/Cart';

const Products = (props) => {
    const products = props.products;
    const filtrProducts = props.filtrProducts;
    const setSize = props.setSize;

    const addCart = (product) => {
        if (!product.setSize) {
            alert("Wybierz rozmiar");
        }
        else {
            props.setCart(product);
        };
    };

    return (
        <div>
            <h2>Products</h2>
            <button onClick={() => filtrProducts('>')} className='btnFiltr'>Filtruj od najmniejszej ceny</button>
            <button onClick={() => filtrProducts('<')} className='btnFiltr'>Filtruj od najwiekszej ceny</button>
            <div className='products'>
            {products.map((product) => {
                return <div className='product' key={product.id}>
                    <img src={product.pic} className='img' alt='produkt'></img>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <button onClick={() => setSize(product, product.size1) } className={product.setSize === product.size1 ? 'choosen': 'btnSize'}>{ product.size1 }</button>
                    <button onClick={() => setSize(product, product.size2) } className={product.setSize === product.size2 ? 'choosen': 'btnSize'}>{ product.size2 }</button>
                    <button onClick={() => setSize(product, product.size3) } className={product.setSize === product.size3 ? 'choosen': 'btnSize'}>{ product.size3 }</button>
                    
                    {product.promoPrice 
                        ? <p>cena:  <span>{product.price}zł</span> cena promocyjna:  <b>{product.promoPrice}zł</b></p>
                        : <p>cena: {product.price}zł</p>};
                    {product.promoPrice 
                        ? <p className='save'><span>Oszczędzasz:</span> <b>{product.price - product.promoPrice}zł</b></p>
                        : null};
                    <button onClick={() => addCart(product)} className='btn'>Add to card</button>
                </div>
            })};
            </div>
        </div>
    );
};

export default Products;