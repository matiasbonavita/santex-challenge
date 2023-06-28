import { useQuery, useMutation, gql } from '@apollo/client';
import { GET_PRODUCTS } from '../graphql/queries';
import { ADD_ITEM_TO_ORDER } from '../graphql/mutations';
import { useOrderContext } from '../context/OrderContext';
import {
  Product,
  GetProductsData,
  AddItemToOrderData,
} from '../types/graphqlTypes';

import ProductCard from '../ui/ProductCard';
import styled from 'styled-components';

const CardList = styled.ul`
display: flex;
    list-style: none;
    justify-content: center;
    flex-wrap: wrap;
    gap: 25px;
    list-style: none;
    position:relative;
`;


const REMOVE_ORDER_LINE = gql`
mutation RemoveOrderLine {
  removeAllOrderLines {
    ... on Order {
      id
    }
  }
}
`;

export function ProductList() {
  const {
    loading: queryLoading,
    error: queryError,
    data: queryData,
  } = useQuery<GetProductsData>(GET_PRODUCTS);
  const [addItemToOrder] = useMutation<AddItemToOrderData>(ADD_ITEM_TO_ORDER);
  const { setOrderSubtotal } = useOrderContext();

  const [removeOrderLine] = useMutation(REMOVE_ORDER_LINE);

  const handleAddItemToOrder = async (
    productVariantId: string,
    quantity: number
  ) => {
    try {
      const { data } = await addItemToOrder({
        variables: {
          productVariantId: productVariantId,
          quantity: quantity,
        },
      });

      const newItem = data?.addItemToOrder;
      let itemPrice: number | undefined;

      if (newItem && 'lines' in newItem) {
        itemPrice =
          newItem.lines[newItem.lines.length - 1].productVariant.price;
      } else {
        itemPrice = undefined;
      }
      console.log(data);
      console.log(itemPrice);
      setOrderSubtotal((prevSubtotal) => prevSubtotal + (itemPrice || 0));
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveOrderLine = async (orderLineId:any) => {
    try {
      const { data } = await removeOrderLine({
        variables: {
          orderLineId: '201',
        },
      });
      console.log('Order line removed:', data.removeOrderLine);
      setOrderSubtotal(0);
    } catch (error) {
      console.error('Error removing order line:', error);
    }
  };

  if (queryLoading) return <p>Loading...</p>;
  if (queryError) return <p>Error: {queryError.message}</p>;

  return (
    <>
      <div>
        <button onClick={handleRemoveOrderLine}>Remove all items</button>
        <CardList style={{ listStyle: 'none' }}>
          {queryData?.products.items.map((product: Product) => {
            return (
              <ProductCard key={product.id} product={product} action={handleAddItemToOrder}/>
            );
          })}
        </CardList>
      </div>
    </>
  );
}
