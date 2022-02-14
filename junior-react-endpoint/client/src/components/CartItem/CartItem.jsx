import React, { Component } from 'react'

import s from './cartitem.module.css';

import {connect} from 'react-redux';
import { DecreaseItemCreator, IncreaseItemCreator, setUpChosenAttributesCreator } from '../../redux/Cart/cart.reducer';

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
                <div>{product.currentCurrency.currency.symbol} {product.currentCurrency.amount * product.count}</div>

                {!!product.attributes.length && <div>{
                        attributeChecker(product.attributes, product, this.props.setUpChosenAttributesCreator)
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






export function attributeChecker(attributes, product, setUpChosenAttributesCreator ) {
    return (
        <div style={{display: "flex", flexWrap: "wrap"}}>
            {attributes.map(obj => {
                if(obj.type === 'swatch') {
                    return obj.items.map(item => {
                        return <div onClick={() => {
                            setUpChosenAttributesCreator({productID: product.id, 
                                idOfAttribute: obj.id, idValue: item.id
                            })
                        }}  style={
                            item.chosenItem ? 
                            {width: "30px", height: "30px", background:`${item.value}`, border: "1px solid black"}:
                         {width: "30px", height: "30px", background:`${item.value}`}
                         }></div>
                    })
                } else {
                    return obj.items.map(item => {
                        return <div style={item.chosenItem ? {border: "1px solid black"} : {}}
                        onClick={() => {
                            setUpChosenAttributesCreator({productID: product.id, 
                                idOfAttribute: obj.id, idValue: item.id
                            })
                        }}
                        >{item.value}</div>
                    })
                }
            })}
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        products: state.products
    }
};

  const mapDispatchToProps = dispatch => {
      return {
        IncreaseItemCreator: (product) => dispatch(IncreaseItemCreator(product)),
        DecreaseItemCreator: (product) => dispatch(DecreaseItemCreator(product)),
        setUpChosenAttributesCreator: ({productID, idOfAttribute, idValue}) => 
        dispatch(setUpChosenAttributesCreator({productID, idOfAttribute, idValue}))

      }
  }



  export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
