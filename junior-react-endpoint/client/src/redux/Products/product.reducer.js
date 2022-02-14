import { service } from "../../service/service";

const INITIAL_STATE = {

    products: {
        name: "",
        products: [],
        chosenCurrency: "USD"
    }
};


const productReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case "SET_UP_PRODUCTS":

            return {

                ...state, 
                products: {
                    ...state.products,
                    name: "",
                    products: [...action.payload.map(prod => {
                        return {
                            ...prod,
                            currentCurrency: prod.prices.find(currency => {
                               return currency.currency.label === state.products.chosenCurrency
                            })
                        }
                    })]
                }

            };

            case "SET_UP_CATEGORIES_PRODUCTS": 

            return {
                ...state, products: {
                    ...state.products,
                    ...action.payload,
                    products: [...action.payload.products.map(prod => {
                        console.log(prod, "PROD");
                        return {
                            ...prod,
                            currentCurrency: prod.prices.find(currency => {
                               return currency.currency.label === state.products.chosenCurrency
                            })
                        }
                    })]
                }
            }

            case "SET_UP_CURRENCY": 

            return {
                ...state, 
                products: {
                    ...state.products,
                    chosenCurrency: action.payload,
                    products: [...state.products.products.map(prod => {
                        return {
                            ...prod,
                            currentCurrency: prod.prices.find(currency => {
                               return currency.currency.label === action.payload
                            })
                        }
                    })],

                }
            }

        default: return state;

    }

};

function setUpItemsCreator(listsOfProducts) {
    return {
        type: "SET_UP_PRODUCTS",
        payload: listsOfProducts
    }
}

function setUpItemsCategoriesCreator(object) {
    return {
        type: "SET_UP_CATEGORIES_PRODUCTS",
        payload: object
    }
}

export function setUpCurrencyCreator(currenc) {
    return {
        type: "SET_UP_CURRENCY",
        payload: currenc
    }
}


export function fetchAllProductsThunk() {
    
    return async function fetchProducts(dispatch) {

        const response = await service.fetchAllProducts();
        dispatch(setUpItemsCreator(response))
    }
}

export function fetchCurrentProductsThunk(title) {
  
    return async function fetchProducts(dispatch) {
     
        const response = await service.fetchProductsByTitle(title);
     
        dispatch(setUpItemsCategoriesCreator(response))
    }
}

export default productReducer;


