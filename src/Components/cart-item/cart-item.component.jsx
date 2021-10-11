import React from 'react';
import './cart-item.styles.scss';

const CartItem = ({ item: { imageurl, name, price, quantity } }) => (
    <div className='cart-item'>
        <image src={imageurl} alt='item' />
        <div className='item-details'>
            <span className='name'>{name}</span>
            <span className='price'>{quantity} X ${price}</span>
        </div>
    </div>
);

export default CartItem;