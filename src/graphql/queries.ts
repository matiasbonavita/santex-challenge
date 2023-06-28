import { gql, DocumentNode } from '@apollo/client';

export const GET_PRODUCTS: DocumentNode = gql`
  query GetProducts {
    products {
      items {
        id
        name
        description
        variants {
          id
          name
          price
          priceWithTax
          stockLevel
          sku
          assets {
            id
            createdAt
            name
            preview
            source
          }
        }
        assets {
          id
          name
          source
        }
      }
    }
  }
`;