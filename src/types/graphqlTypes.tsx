export interface Product {
  id: string;
  name: string;
  description: string;
  variants: {
    id: string;
    name: string;
    price: number;
    priceWithTax: number;
    stockLevel: string;
    sku: string;
  }[];
  assets: {
    id: string;
    name: string;
    source: string;
  }[];
}

export interface GetProductsData {
  products: {
    items: Product[];
  };
}

export interface AddItemToOrderData {
  addItemToOrder: {
    id: string;
    lines: {
      id: string;
      productVariant: {
        id: string;
        name: string;
        price: number;
        priceWithTax: number;
      };
      quantity: number;
    }[];
  } | {
    errorCode: string;
    message: string;
  } | undefined; // Added undefined type to handle potential undefined response
}