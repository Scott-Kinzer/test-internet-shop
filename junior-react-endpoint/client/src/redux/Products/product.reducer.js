import { service } from "../../service/service";

const INITIAL_STATE = {

    products: {
        name: "",
        products: []
    }
};


const productReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case "SET_UP_PRODUCTS":

            return {

                ...state, products: {
                    name: "",
                    products: [...action.payload]
                }

            };

            case "SET_UP_CATEGORIES_PRODUCTS": 

            return {
                ...state, products: {
                    ...action.payload
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

export function fetchAllProductsThunk() {
    
    return async function fetchProducts(dispatch) {

        const response = await service.fetchAllProducts();
        // console.log(response, "REESPONSE");
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


