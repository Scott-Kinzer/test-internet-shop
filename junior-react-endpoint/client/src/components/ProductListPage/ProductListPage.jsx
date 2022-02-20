import React, { Component } from 'react'

import { connect } from 'react-redux';
import ProductItem from '../../ProductItem/ProductItem';
import { fetchCurrentProductsThunk } from '../../redux/Products/product.reducer';
import { withRouter } from '../../withRouter/withRouter';

 class ProductListPage extends Component {

    componentDidMount() {

        const productCategory = this.props.params.productsCategory;
        this.props.fetchCurrentProductsThunk(productCategory);
        
    }


    componentDidUpdate(prevProps, prevState) {
        if (this.props.params.productsCategory !== prevProps.params.productsCategory)
        {
      
            const productCategory = this.props.params.productsCategory;
            this.props.fetchCurrentProductsThunk(productCategory);
        }

    }
  render() {
    return (
      <div>
          <h2 style={{marginTop: '80px'}}>{""+this.props.products.products.name.toUpperCase()}</h2>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
            {this.props.products.products.products.map((item, id) => <ProductItem key={id} product={item} />)}
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

  const mapDispatchToProps = dispatch => ({fetchCurrentProductsThunk: (title) => dispatch(fetchCurrentProductsThunk(title))})


  export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductListPage))

