import React from 'react';
import './Cart.css';
import '../products/Products';

const Cart = React.forwardRef((props, ref) => {
    const cart = props.cart;
    const price = props.price;
    const discountCode = props.discountCode;
    const discountCodeUsed = props.discountCodeUsed;

    console.log(cart);

    return (
        <div className='Cart'>
            {!discountCodeUsed ? <><b>Kod Rabatowy:</b><input ref={ref} className='kodRabatowy'></input>
            <button onClick={() => discountCode(ref.current.value)} className='btnRabat'>Oblicz Rabat</button> </> : null};
            <h2>Cart</h2>
            {cart.map((item, index) => {
                return <div>
                    <p key={index}>{item.name}</p>
                    <b>Rozmiar: </b> <p>{ item.setSize }</p>
                    <button onClick={() => props.removeProd(item)}>Clear this Product</button>
                </div>    
            })};
            <button className='btnClearCart' onClick={() => props.clearCart()}>Clear</button> 
            <p><b>SUMA:</b> {price} zł</p>
        </div>         
    );
});


export default Cart;
