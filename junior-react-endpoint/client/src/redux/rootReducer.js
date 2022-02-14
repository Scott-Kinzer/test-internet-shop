import { combineReducers } from 'redux';
import cartReducer from './Cart/cart.reducer';
import productsReducer from './Products/product.reducer';
import detailsReducer from './Details/details.reducer';


const rootReducer = combineReducers({

    products: productsReducer,
    cart: cartReducer,
    details: detailsReducer
});


export default rootReducer;