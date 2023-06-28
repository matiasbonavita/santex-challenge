import { Variant } from "../types/graphqlTypes";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PRODUCTS } from "../graphql/queries";
import { ADD_ITEM_TO_ORDER } from "../graphql/mutations";
import { useOrderContext } from "../context/OrderContext";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { Navigation, Scrollbar } from "swiper";
import ProductCard from "./ProductCard";
import styled from "styled-components";
import {
  Product,
  GetProductsData,
  AddItemToOrderData,
} from "../types/graphqlTypes";


import "swiper/swiper.min.css";
import "swiper/modules/pagination/pagination.min.css";
import "swiper/modules/navigation/navigation.min.css";
import "swiper/modules/scrollbar/scrollbar.min.css";

const CardList = styled.ul`
  display: flex;
  list-style: none;
  justify-content: center;
  flex-wrap: wrap;
  gap: 50px;
  list-style: none;
  position: relative;
`;

export function ProductList() {
  const {
    loading: queryLoading,
    error: queryError,
    data: queryData,
  } = useQuery<GetProductsData>(GET_PRODUCTS);
  const [addItemToOrder] = useMutation<AddItemToOrderData>(ADD_ITEM_TO_ORDER);
  const { setOrderSubtotal } = useOrderContext();

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

      if (newItem && "lines" in newItem) {
        itemPrice =
          newItem.lines[newItem.lines.length - 1].productVariant.price;
      } else {
        itemPrice = undefined;
      }
      setOrderSubtotal((prevSubtotal) => prevSubtotal + (itemPrice || 0));
    } catch (error) {
      console.error(error);
    }
  };

  if (queryLoading) return <p>Loading...</p>;
  if (queryError) return <p>Error: {queryError.message}</p>;

  return (
    <>
        <CardList>
          {queryData?.products.items.map((product: Product) => {
            return (
              <Swiper
                key={product.id}
                spaceBetween={20}
                slidesPerView={1}
                style={{ width: "300px", borderRadius: "6px" }}
                navigation={product.variants.length > 1 ? true : false}
                scrollbar={{
                  hide: true,
                }}
                modules={[Scrollbar, Navigation]}
              >
                {product.variants.map((variant: Variant) => (
                  <SwiperSlide key={variant.id}>
                    <ProductCard
                      variant={variant}
                      key={product.id}
                      product={product}
                      action={handleAddItemToOrder}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            );
          })}
        </CardList>
    </>
  );
}
