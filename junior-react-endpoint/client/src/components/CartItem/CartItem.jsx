import React, { Component } from 'react'

import s from './cartitem.module.css';

import {connect} from 'react-redux';
import { DecreaseItemCreator, IncreaseItemCreator } from '../../redux/Cart/cart.reducer';

 class CartItem extends Component {
  render() {
    const product = this.props.item;
    console.log(product);

    console.log(this.props);
    return (
      <div className={s.cartItemWrapper}
      
      >
          <div  className={s.leftSideCart}>

               <div> {product.name}</div>
                <div>{product.prices[0].amount}</div>

                {!!product.attributes.length && <div>{
                        attributeChecker(product.attributes)
                }</div>}
          </div>

          <div className={s.rightSideCart}>
                <div className={s.counterCart}>
                    <div onClick={() => this.props.IncreaseItemCreator(product)} className={s.increase}>+</div>
                    <div>{product.count}</div>
                    <div  onClick={() => this.props.DecreaseItemCreator(product)}className={s.decrease}>-</div>
                </div>
              <div className={s.imgItem}>
              <img  src={product.gallery[0]} alt="" />
              </div>
                
          </div>
          
          </div>
    )
  }
}


const mapStateToProps = (state) => {
    return {
        products: state.products
    }
};

  const mapDispatchToProps = dispatch => {
      return {
        IncreaseItemCreator: (product) => dispatch(IncreaseItemCreator(product)),
        DecreaseItemCreator: (product) => dispatch(DecreaseItemCreator(product))
      }
  }

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);


function attributeChecker(attributes) {
    return (
        <div style={{display: "flex", flexWrap: "wrap"}}>
            {attributes.map(obj => {
                if(obj.type === 'swatch') {
                    return obj.items.map(item => {
                        return <div style={{width: "30px", height: "30px", background:`${item.value}`}}></div>
                    })
                } else {
                    return obj.items.map(item => {
                        return <div>{item.value}</div>
                    })
                }
            })}
        </div>
    )
}


