import React, { Component } from 'react'

import { connect } from 'react-redux';
import { AddItemCreator, setUpChosenProductFromDetails } from '../../redux/Cart/cart.reducer';
import { setUpProductDetailsChosenAttributeCreator, triggerCreatorDetails } from '../../redux/Details/details.reducer';
import { attributeChecker } from '../CartItem/CartItem';
import s from './product.details.module.css'


class ProductDetailsPage extends Component {

  componentDidMount() {
    this.props.triggerCreatorDetails(this.props.value);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.value !== this.props.value) {
      this.props.triggerCreatorDetails(this.props.value);
    }
  }


  render() {
  

    return (


        <>
          {this.props.details ? <div style={{ display: 'flex' , marginTop: '50px'}}>

<div style={{ display: 'flex', alignItems: 'center' }}>



  <div>
    {this.props.details.gallery.filter((_, i) => {
      return i < 3;
    }).map((photo, id) => {
      return <div key={id} className={s.productDetailsWrapperImage}>
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

    <div>Price:

    <div className={s.productAmount}>{
    this.props.details.currentCurrency.amount
  }
  {this.props.details.currentCurrency.currency.symbol}
  </div>
    </div>
  
  <button  onClick={() => this.props.setUpChosenProductFromDetails(this.props.details)} className={s.cartBtn}>ADD TO CART</button>


  <div className={s.descrProduct} dangerouslySetInnerHTML={{ __html: this.props.details.description }} ></div>


</div>

</div> : <div>Something went wrong</div>}
        </>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    details: state.details.details,
    value: state.products.products.chosenCurrency
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setUpProductDetailsChosenAttributeCreator: ({productID, idOfAttribute, idValue}) => 
    dispatch(setUpProductDetailsChosenAttributeCreator({productID, idOfAttribute, idValue})),
    AddItemCreator: (product) => dispatch(AddItemCreator(product)),
    setUpChosenProductFromDetails : (product) => dispatch(setUpChosenProductFromDetails(product)),
    triggerCreatorDetails: (label) => dispatch(triggerCreatorDetails(label))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsPage);






