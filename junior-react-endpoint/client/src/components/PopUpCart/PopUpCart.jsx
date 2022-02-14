import React, { Component } from 'react'
import CartItem from '../CartItem/CartItem';

import { connect } from 'react-redux';

import s from './popUp.module.css';
import { triggerCreator } from '../../redux/Cart/cart.reducer';

class PopUpCart extends Component {


  componentDidMount() {
    console.log(this.props);
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
        My bag, {items.length} items
        <div className={s.popUpSubWrapper}>
          {items.map(product => {
            return <CartItem item={product} />
          })}
        </div>
        {!!items.length &&

          <div>Total:

            {helperTotalCount(items) }
            {items[0].currentCurrency.currency.symbol}

          </div>
        }
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  // console.log(state.products, "STATE TO PROPS");

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
    console.log(element)
    total += (element.currentCurrency.amount * element.count);
  });

  return total;
}