import { gql } from "@apollo/client";
import { client } from "../apollo-client/apollo.client";

 function FetchAPI() {
    this.fetchAllProducts = () => {
        return client
        .query({
          query: gql`
          query {
            categories {
                name
              products {
                id
                name
                category
                inStock
                gallery
                description
                attributes {
                  id
                  name
                  type 
                  items {
                    value
                    id 
                  }
                }
                prices {
                  currency {
                    label
                    symbol
                  }
                  amount
                }
                brand
              }
            }
          }
          
            `
        }).then(data => data.data).then(categories => {
            let items = [];
            for (let obj of categories.categories) {
                items = items.concat(...obj["products"])
            }
            // console.log(items);
            return items;

        })
    }

    this.fetchProductsByTitle = (category) => {
        return client
        .query({
          query: gql`
         
query {
    category (input: {title: "${category}"})  {
     name
      products {
        id
        name
        category
        inStock
        gallery
        description
        attributes {
          id
          name
          type 
          items {
            value
            id 
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }
  
            `
        }).then(data => data.data).then(categories => {
      
            return categories.category;
        })
    }
}

export const service = new FetchAPI();

