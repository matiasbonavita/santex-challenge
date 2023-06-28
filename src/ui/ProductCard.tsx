import { useState } from 'react';
import { Product } from '../types/graphqlTypes';

import styled from 'styled-components';

const CardDescription = styled.p`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 8;
  overflow: hidden;
  margin: 0;
  flex: 1;
  margin-bottom: 0px;
`;

const Card = styled.li`
  width: 300px;
  height: 516px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1), 0 -1px 2px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
  border-radius: 6px;
  padding: 10px;
  transition: all 0.1s ease;
  position: relative;
  cursor: default;
  &:hover {
    box-shadow: 0 25px 20px 0 rgba(0, 0, 0, 0.16),
      0 -1px 2px 0 rgba(0, 0, 0, 0.1);
    height: 100%;
    // transform: scaleY(2.5)
    transform: translate(1, 1) scale(0);
    ${CardDescription} {
      overflow: unset;
      -webkit-line-clamp: unset;
      -webkit-box-orient: inherit;
    }
  }
`;

const CardTitle = styled.span`
  font-weight: bold;
  font-size: 22px;
  margin-bottom: 5px;
`;

const CardImage = styled.img`
  height: 284px;
  width: 100%;
  min-height: 284px;
  max-height: 284px;
  object-fit: cover;
`;

const CardPrice = styled.h5`
  // color: #333;
  // display: -webkit-flex;
  // display: flex;
  // font-size: 24px;
  // position: absolute;
  // bottom: 0;
  // align-items: center;
  // gap: 10px;
  margin: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

interface ProductCardProps {
  product: Product;
  action: (variantId: string, quantity: number) => void;
}

interface Variant {
  id: string;
  name: string;
  price: number;
  stockLevel: string;
}

export default function ProductCard({ product, action }: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState<Variant>(
    product.variants[0]
  );

  const handleVariantChange = (variant: Variant) => {
    setSelectedVariant(variant);
  };

  const handleBuyClick = () => {
    action(selectedVariant.id, 1);
  };

  return (
    <div style={{ position: 'relative' }}>
      <Card key={product.id}>
        <CardImage
          key={product?.assets[0]?.id}
          src={product?.assets[0]?.source}
          alt={product?.assets[0]?.name}
        />
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
        {product.variants.length === 1 ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CardPrice>
              <span>$ {product.variants[0].price}</span>
              <button onClick={handleBuyClick}>BUY!</button>
            </CardPrice>
          </div>
        ) : (
          <CardPrice>
            <select
              value={selectedVariant ? selectedVariant.id : ''}
              onChange={(e) => {
                const variantId = e.target.value;
                const variant = product.variants.find(
                  (v: Variant) => v.id === variantId
                );
                if (variant) {
                  handleVariantChange(variant);
                }
              }}
            >
              {product.variants.map((variant: Variant) => (
                <option key={variant.id} value={variant.id}>
                  {variant.name} - ${variant.price}
                </option>
              ))}
            </select>
            <button onClick={handleBuyClick} disabled={!selectedVariant}>
              BUY!
            </button>
          </CardPrice>
        )}
      </Card>
    </div>
  );
}
