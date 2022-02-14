import React, { Component } from 'react'

import s from './productitem.module.css';
import addIcon from '../icons/circleAdd.svg';

import {connect} from 'react-redux';
import  { withRouter } from '../components/UseNavigateHoc/UseNavigateHoc';
import { setUpProductDetailsCreator } from '../redux/Details/details.reducer';
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
    console.log(this.props)
    return (
      <div 

      onClick={ () => {

        if (product.inStock) {
          this.props.setUpProductDetailsCreator(product);
          this.props.router.navigate('/details');
        }
      
        
      }}
      style={{position: 'relative', cursor: 'pointer'}}
      onMouseEnter={() => this.handleMouseEnter()}
      onMouseLeave={() => this.handleMouseLeave()}
      className={s.itemProduct} >

                <div className={s.imgItem} >
                        <img src={product.gallery[0]} alt="" />
                </div>
                <div className={s.name}>{product.name}</div>
                <div>{product.currentCurrency.currency.symbol} {product.currentCurrency.amount}</div>
                <img onClick={(e) => {
                  e.stopPropagation();
                  this.props.AddItemCreator(product)
                }} className={this.state.isHovering ? s.addIconShow: s.addIconHide} src={addIcon} alt="" />
               
      {!product.inStock && <div onClick={(e) => e.preventDefault()} className={s.isStock}></div>}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {    
        carts: state.cart.cart
    }
};


  const mapDispatchToProps = dispatch =>  {
    return {
      setUpProductDetailsCreator: (product) => dispatch(setUpProductDetailsCreator(product)),
      AddItemCreator: (product) => dispatch(AddItemCreator(product))
    }
  }
  

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductItem))








