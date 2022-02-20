import React, { Component } from 'react'
import { connect } from 'react-redux';
import CartItem from '../CartItem/CartItem';

class CartPage extends Component {

   
    
  render() {
    return (
      <div>
          <h2>Cart</h2>

        {this.props.carts.map(cart => {
            return (
                <>
                <hr />
                <CartItem item={cart} />
                </>
            )
        })}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {    
        carts: state.cart.cart
    }
};


export default connect(mapStateToProps)(CartPage)


