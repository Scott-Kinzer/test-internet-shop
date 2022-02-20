
const INITIAL_STATE = {

    details: {}
};


const detailsReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case "SET_UP_PRODUCT_DETAILS":
            return {

                ...state,
                details: {
                    ...action.payload,
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

                    return attr;
                })
                }
            }

            case "SET_UP_PRODUCT_DETAILS_ATTRIBUTE":

                return {
                    ...state, 
                    details: {
                        ...state.details,
                        attributes: state.details.attributes.map(attr => {
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
                case "TRIGGER_TO_CHANGE_CURRENCY_DETAILS":

                            return {
                
                                ...state, 
                                details: {
                                    ...state.details,
                                    currentCurrency: state.details.prices.find(currency => {
                                        return currency.currency.label === action.payload
                                        })
                                }
                
                            };

            


        default: return state;

    }

};

export function setUpProductDetailsCreator(product) {
    return {
        type: "SET_UP_PRODUCT_DETAILS",
        payload: product
    }
}

export function setUpProductDetailsChosenAttributeCreator(product) {
    return {
        type: "SET_UP_PRODUCT_DETAILS_ATTRIBUTE",
        payload: product
    }
}


export function triggerCreatorDetails(label) {
 
    return {
        type: "TRIGGER_TO_CHANGE_CURRENCY_DETAILS",
        payload: label
    }
}





export default detailsReducer;


