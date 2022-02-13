import { combineReducers } from 'redux';
import cartReducer from './Cart/cart.reducer';


import productsReducer from './Products/product.reducer';

const rootReducer = combineReducers({

    products: productsReducer,
    cart: cartReducer
});


export default rootReducer;