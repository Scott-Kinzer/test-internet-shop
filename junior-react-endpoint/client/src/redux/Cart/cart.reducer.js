
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
                cart: [...state.cart, {...action.payload, count: 1,
                
                    attributes: action.payload.attributes.map(attr => {
                            return {
                                ...attr,
                                items: [...attr.items.map((value, i) => {
                                        if (i === 0) {
                                            return {
                                                ...value,
                                                chosenItem: true
                                            }

                                        }
                                         return {
                                            ...value,
                                            chosenItem: false
                                        };
                                })]
                            }
                    
                    })
                
                }]

            };

            case "INCREASE_ITEM_CART":

                return {
    
                    ...state, 
                    cart: state.cart.map(item => {
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

                                if (item.count === 1) {
                                    return {
                                        ...item, count: 1
                                    }
                                }
                                return {
                                    ...item, count: item.count - 1
                                }
                            }

                            return item;
                        })
        
                    };


                    case "SET_UP_CHOSEN_ATTRIBUTE":
                        return {
                                
                            ...state, 
                            cart: [...state.cart.map(item => {
                                if (item.id === action.payload.productID) {
                                    return {
                                        ...item,
                                        attributes: item.attributes.map(attr => {
                                            if (attr.id === action.payload.idOfAttribute) {
                                                return {
                                                    ...attr,
                                                    items: [...attr.items.map(value => {
                                                            if (value.id === action.payload.idValue) {
                                                                return {
                                                                    ...value,
                                                                    chosenItem: true
                                                                }

                                                            }
                                                             return {
                                                                ...value,
                                                                chosenItem: false
                                                            };
                                                    })]
                                                }
                                            }

                                            return attr;
                                        })
                                    }
                                }

                                return item;
                            })]
            
                        };

                        case "TRIGGER_TO_CHANGE_CURRENCY":

                            return {
                
                                ...state, 
                                cart: state.cart.map(item => {
                                    return {
                                        ...item,
                                            currentCurrency: item.prices.find(currency => {
                                            return currency.currency.label === action.payload
                                            })
                                    }
                                })
                
                            };

                            case "SET_UP_PRODUCT_FROM_DETAILS":

                            return {
                                    
                                ...state, 
                                cart: [...state.cart.filter(item => {
                                    return item.id !== action.payload.id
                                }), {...action.payload, count: 1}]
                
                            };

                            case "REMOVE_FROM_CART":

                                return {
                                    ...state, 
                                    cart: [...state.cart.filter(item => {
                                        return item.id !== action.payload;
                                    })]
                    
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


export function setUpChosenAttributesCreator(product) {
    return {
        type: "SET_UP_CHOSEN_ATTRIBUTE",
        payload: product
    }
}

export function setUpChosenProductFromDetails(product) {
    return {
        type: "SET_UP_PRODUCT_FROM_DETAILS",
        payload: product
    }
}


export function removeFromCart(id) {
    return {
        type: "REMOVE_FROM_CART",
        payload: id
    }
}


export function triggerCreator(label) {
 
    return {
        type: "TRIGGER_TO_CHANGE_CURRENCY",
        payload: label
    }
}

export default cartReducer;


