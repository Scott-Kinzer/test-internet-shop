import React, { Component } from 'react'

import { connect } from 'react-redux';

class ProductDetailsPage extends Component {


  render() {

    return (
      <div>ProductDetailsPage</div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
      
  }
};

const mapDispatchToProps = dispatch => {
    return {
      

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsPage);






