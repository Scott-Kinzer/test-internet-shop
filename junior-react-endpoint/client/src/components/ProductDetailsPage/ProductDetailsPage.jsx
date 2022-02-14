import React, { Component } from 'react'

import { connect } from 'react-redux';
import { AddItemCreator, setUpChosenProductFromDetails } from '../../redux/Cart/cart.reducer';
import { setUpProductDetailsChosenAttributeCreator } from '../../redux/Details/details.reducer';
import { attributeChecker } from '../CartItem/CartItem';
import s from './product.details.module.css'


class ProductDetailsPage extends Component {


  render() {
    console.log(this.props.details);

    return (


      <div style={{ display: 'flex' }}>

        <div style={{ display: 'flex', alignItems: 'center' }}>



          <div>
            {this.props.details.gallery.filter((_, i) => {
              return i < 3;
            }).map(photo => {
              return <div className={s.productDetailsWrapperImage}>
                <img className={s.productDetailsImage} src={photo} alt="" />
              </div>
            })}
          </div>

          <div>
            <div className={s.bigPhotoWrapper}>
              <img className={s.productDetailsBigImage} src={this.props.details.gallery[0]} alt="" />
            </div>
          </div>


        </div>

        <div className={s.rightSideProductDetails}>


          <div className={s.productName}>{this.props.details.name}</div>

          <div className={s.attrWrapper} >


            {!!this.props.details.attributes.length && <div>{
              attributeChecker(this.props.details.attributes, this.props.details, this.props.setUpProductDetailsChosenAttributeCreator)
            }</div>}
          </div>

            <div>Price:</div>
          <div className={s.productAmount}>{
            this.props.details.currentCurrency.amount
          }</div>

          <button onClick={() => this.props.setUpChosenProductFromDetails(this.props.details)} className={s.cartBtn}>ADD TO CART</button>

          <div className={s.descrProduct} dangerouslySetInnerHTML={{ __html: this.props.details.description }} ></div>


        </div>

      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    details: state.details.details
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setUpProductDetailsChosenAttributeCreator: ({productID, idOfAttribute, idValue}) => 
    dispatch(setUpProductDetailsChosenAttributeCreator({productID, idOfAttribute, idValue})),
    AddItemCreator: (product) => dispatch(AddItemCreator(product)),
    setUpChosenProductFromDetails : (product) => dispatch(setUpChosenProductFromDetails(product))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsPage);






