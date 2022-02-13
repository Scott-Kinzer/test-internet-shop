import React, { Component } from 'react'
import CartItem from '../CartItem/CartItem';


import s from './popUp.module.css';

export default class PopUpCart extends Component {


  render() {

       const items =  this.props.productsCart;
    return (
      <div className={s.popUpWrapper}>
          My bag, {items.length} items
        <div className={s.popUpSubWrapper}>
            {items.map(product => {
                return <CartItem item={product}/>
            })}
        </div>

      </div>
    )
  }
}
