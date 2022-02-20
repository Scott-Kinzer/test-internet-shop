import React, { Component } from 'react'
import ProductItem from '../../ProductItem/ProductItem';

import {connect} from 'react-redux';
import { fetchAllProductsThunk } from '../../redux/Products/product.reducer';

 class HomePage extends Component {


    componentDidMount() {
        this.props.fetchAllProductsThunk();
    }
    
  render() {
    return (
        <>
        <h2 style={{marginTop: '80px'}}>ALL</h2>
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>

        {this.props.products.products.products.map((item, id) => <ProductItem key={id} product={item} />)}

      </div>
      </>
    )
  }
}


const mapStateToProps = (state) => {
    return {
        products: state.products
    }
};

  const mapDispatchToProps = dispatch => ({fetchAllProductsThunk: () => dispatch(fetchAllProductsThunk())})


export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
