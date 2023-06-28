import React, { createContext, useContext } from 'react';
import useStateWithStorage from '../hooks/useStateWithStorage';

type OrderContextType = {
  orderSubtotal: number;
  setOrderSubtotal: React.Dispatch<React.SetStateAction<number>>;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrderContext = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrderContext must be used within an OrderProvider');
  }
  return context;
};

type OrderProviderProps = {
  children: React.ReactNode;
};

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
    const [orderSubtotal, setOrderSubtotal] = useStateWithStorage<number>('orderSubtotal', 0);

  const value: OrderContextType = {
    orderSubtotal,
    setOrderSubtotal,
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};