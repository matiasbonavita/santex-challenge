import { Product, Variant } from "../types/graphqlTypes";
import Button from "../ui/Button";

import "swiper/swiper.min.css";
import "swiper/modules/pagination/pagination.min.css";
import "swiper/modules/navigation/navigation.min.css";
import "swiper/modules/scrollbar/scrollbar.min.css";

import styled from "styled-components";

const CardDescription = styled.p`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 8;
  overflow: hidden;
  margin: 0;
  font-size: 13px;
`;

const Card = styled.li`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 10px;
  transition: all 0.1s ease;
  position: relative;
  cursor: default;
  padding-bottom: 40px;
`;

const CardTitle = styled.span`
  font-weight: bolder;
  font-size: 20px;
  margin-bottom: 2px;
`;

const CardImage = styled.img`
  height: 284px;
  width: 100%;
  min-height: 284px;
  max-height: 284px;
  object-fit: cover;
`;

const CardPrice = styled.h5`
  margin: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-family: SF-Pro-bold;
  color: #9a53bb;
  margin-bottom: 5px;
`;

export interface ProductCardProps {
  product: Product;
  action: (variantId: string, quantity: number) => void;
  variant: Variant;
}


export default function ProductCard({
  product,
  action,
  variant,
}: ProductCardProps) {
  const handleBuyClick = (id: string) => {
    action(id, 1);
  };

  return (
    <Card>
      <CardImage
        key={product?.assets[0]?.id}
        src={product?.assets[0]?.source}
        alt={product?.assets[0]?.name}
      />
      <CardTitle>{variant.name}</CardTitle>
      <CardPrice>
        <span>$ {variant.price}</span>
      </CardPrice>
      <CardDescription>{product.description}</CardDescription>
      <div style={{ position: "absolute", bottom: "55px" }}>
        <Button onClick={() => handleBuyClick(variant.id)}>BUY NOW!</Button>
      </div>
    </Card>
  );
}
