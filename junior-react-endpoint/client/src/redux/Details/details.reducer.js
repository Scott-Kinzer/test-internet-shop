
const INITIAL_STATE = {

    details: {}
};


const detailsReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case "SET_UP_PRODUCT_DETAILS":
            console.log(action.payload, "PROOODUCT");
            return {

                ...state,
                details: {
                    ...action.payload,
                attributes: action.payload.attributes.map(attr => {
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

            


        default: return state;

    }

};

export function setUpProductDetailsCreator(product) {
    return {
        type: "SET_UP_PRODUCT_DETAILS",
        payload: product
    }
}




export default detailsReducer;


