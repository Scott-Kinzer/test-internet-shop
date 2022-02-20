import React, { Component } from 'react'
import CartItem from '../CartItem/CartItem';

import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import s from './popUp.module.css';
import { triggerCreator } from '../../redux/Cart/cart.reducer';

class PopUpCart extends Component {


  componentDidMount() {
    this.props.triggerCreator(this.props.value);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.value !== this.props.value) {
      this.props.triggerCreator(this.props.value);
    }
  }

  render() {

    const items = this.props.productsCart;
    return (
      <div className={s.popUpWrapper}>
        <div>My bag, {items.length} items</div>
        <div className={s.popUpSubWrapper}>
          {items.map(product => {
            return <CartItem key={product.id}  item={product} />
          })}
        </div>
        {!!items.length &&

          <div className={s.totalWrapper}>
           <div style={{display: 'flex', justifyContent: 'space-around', width: '100%'}}>
             <div>Total:</div>
             <div>
            {helperTotalCount(items).toFixed(3) }
            {items[0].currentCurrency.currency.symbol}
            </div>
           </div>

          <button className={s.goCart}>
          <NavLink style={{textDecoration: 'none'}} to="/cart" >View bag</NavLink>
          </button>
            

          </div>
        }
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    value: state.products.products.chosenCurrency
  }
};

const mapDispatchToProps = dispatch => {
  return {
    triggerCreator: (product) => dispatch(triggerCreator(product)),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopUpCart);



function helperTotalCount(arr) {
  let total = 0;
  let currentSymbol = arr[0].currentCurrency.currency.symbol;
  arr.forEach(element => {
    total += (element.currentCurrency.amount * element.count);
  });

  return total;
}