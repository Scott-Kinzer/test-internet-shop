import React, { Component } from 'react'

import s from './productitem.module.css';
import addIcon from '../icons/circleAdd.svg';

import {connect} from 'react-redux';
import { AddItemCreator } from '../redux/Cart/cart.reducer';

class ProductItem extends Component {
    state = {
        isHovering: false
    }


    handleMouseEnter = () => {
        this.setState(prevState => {
          return { isHovering: !prevState.isHovering };
        });
      };
    
      handleMouseLeave = () => {
        this.setState(prevState => {
          return { isHovering: !prevState.isHovering };
        });
      };

  render() {

    const {product} = this.props;

    return (
      <div 
      
      onMouseEnter={() => this.handleMouseEnter()}
      onMouseLeave={() => this.handleMouseLeave()}
      className={s.itemProduct} >

                <div className={s.imgItem} >
                        <img src={product.gallery[0]} alt="" />
                </div>
                <div className={s.name}>{product.name}</div>
                <div>{product.prices[0].currency.symbol} {product.prices[0].amount}</div>
                <img onClick={() => this.props.AddItemCreator(product)} className={this.state.isHovering ? s.addIconShow: s.addIconHide} src={addIcon} alt="" />
               

      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {    
        carts: state.cart.cart
    }
};


  const mapDispatchToProps = dispatch => ({AddItemCreator: (product) => dispatch(AddItemCreator(product))})


export default connect(mapStateToProps, mapDispatchToProps)(ProductItem)








