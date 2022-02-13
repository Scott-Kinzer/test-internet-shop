import { service } from "../../service/service";

const INITIAL_STATE = {

    cart: []
};


const cartReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case "ADD_ITEM_CART":

            const find = state.cart.find(item => {
                return item.id === action.payload.id;
            })

            if (find) {
                return state;
            }
            return {

                ...state, 
                cart: [...state.cart, {...action.payload, count: 0}]

            };

            case "INCREASE_ITEM_CART":

                return {
    
                    ...state, 
                    cart: state.cart.map(item => {
                        console.log(action.payload);
                        if (item.id === action.payload.id) {
                            return {
                                ...item, count: item.count + 1
                            }
                        }

                        return item;
                    })
    
                };

                case "DECREASE_ITEM_CART":

                    return {
        
                        ...state, 
                        cart: state.cart.map(item => {
                            if (item.id === action.payload.id) {

                                if (item.count === 0) {
                                    return {
                                        ...item, count: 0
                                    }
                                }
                                return {
                                    ...item, count: item.count - 1
                                }
                            }

                            return item;
                        })
        
                    };

            

        default: return state;

    }

};

export function AddItemCreator(product) {
    return {
        type: "ADD_ITEM_CART",
        payload: product
    }
}


export function IncreaseItemCreator(product) {
    return {
        type: "INCREASE_ITEM_CART",
        payload: product
    }
}

export function DecreaseItemCreator(product) {
    return {
        type: "DECREASE_ITEM_CART",
        payload: product
    }
}


export default cartReducer;


