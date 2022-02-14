import React, { Component } from 'react'

import s from './header.module.css';
import Cart from '../../icons/cart.svg';
import Update from '../../icons/update.svg';
import { NavLink } from 'react-router-dom';
import PopUpCart from '../PopUpCart/PopUpCart';
import { connect } from 'react-redux';
import { setUpCurrencyCreator } from '../../redux/Products/product.reducer';

 class Header extends Component {

    state = {
        activeId: 0,
        isPopUpActive: false,
        value: "USD"
    }

     handlePopUp = () => {
        this.setState({isPopUpActive: !this.state.isPopUpActive});
    }

    handleChange = (e) => {
        this.setState({value: e.target.value});
        this.props.setUpCurrencyCreator(e.target.value);
    }

    render() {
        return (
            <div className={s.header}>

                <div className={s.navWrapper}>
            
                    <div className={s.divWrapNav} >
                        
                    <NavLink
                    
                    onClick={() => this.setState({activeId: 0})}
                    className={s.navLink}
                    
                    
                    to="/">All</NavLink>
                        <div className={this.state.activeId === 0 ? s.active : ""}></div>
                    </div>


                    <div className={s.divWrapNav}><NavLink className={s.navLink}
                    
                    onClick={() => this.setState({activeId: 1})}
                    to="/clothes/list">Clothes</NavLink>
                    <div className={this.state.activeId === 1 ? s.active : ""}></div>

                    </div>

                    <div className={s.divWrapNav}>
                        <NavLink className={s.navLink}
                    
                    onClick={() => this.setState({activeId: 2})}

                            to="/tech/list">Tech
                        </NavLink>

                        <div className={this.state.activeId === 2 ? s.active : ""}></div>
                    </div>

                </div>

                <div>
                    <img src={Update} alt="" />
                </div>

                <div className={s.rightSideNav}>
                    <select value={this.state.value} onChange={this.handleChange} >
                        <option value="USD">USD $</option>
                        <option value="GBP">GBP £</option>
                        <option value="AUD">AUD A$</option>
                        <option value="JPY">JPY ¥</option>
                        <option value="RUB">RUB ₽</option>


                    </select>

                    <div className={s.cartWrapper}> 
                        <img onClick={() => {
                            this.handlePopUp();
                            this.props.handleCart();
                        }} className={s.cart} src={Cart} alt="" />
                        <div className={s.circleWrapper}>{this.props.carts.length}</div>
                    </div>
                    
                </div>

                {this.state.isPopUpActive && <PopUpCart productsCart={this.props.carts} />}
               

               
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {    
        carts: state.cart.cart
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setUpCurrencyCreator: (product) => dispatch(setUpCurrencyCreator(product)),
 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)