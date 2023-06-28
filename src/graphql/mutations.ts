import { gql, DocumentNode } from '@apollo/client';

export const ADD_ITEM_TO_ORDER: DocumentNode = gql`
  mutation AddItemToOrder($productVariantId: ID!, $quantity: Int!) {
    addItemToOrder(productVariantId: $productVariantId, quantity: $quantity) {
      ... on Order {
        id
        lines {
          id
          productVariant {
            id
            name
            price
            priceWithTax
          }
          quantity
        }
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;
