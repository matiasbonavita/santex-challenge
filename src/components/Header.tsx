import { useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { useOrderContext } from "../context/OrderContext";
import Logo from "../ui/Logo";
import styled from "styled-components";
import Button from "../ui/Button";
import { REMOVE_ORDER_LINE } from "../graphql/mutations";

const StyledHeader = styled.header<{ scrolling?: boolean }>`
  background-color: ${(props) => (props.scrolling ? "rgb(33,0,33)" : "")};
  color: white;
  justify-content: space-around;
  display: flex;
  align-items: center;
  position: ${(props) => (props.scrolling ? "fixed" : "absolute")};
  width: 100%;
  transition: background-color 0.3s ease;
  z-index: 2;
`;


export function Header() {
  const { orderSubtotal, setOrderSubtotal } = useOrderContext();
  const [removeOrderLine] = useMutation(REMOVE_ORDER_LINE);
  const [scrolling, setScrolling] = useState<Boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0 && !scrolling) {
        setScrolling(true);
      } else if (window.scrollY === 0 && scrolling) {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolling]);

  const handleRemoveOrderLine = async () => {
    try {
      const { data } = await removeOrderLine({
        variables: {
          orderLineId: "201",
        },
      });
      console.log("Order line removed:", data?.removeOrderLine);
      setOrderSubtotal(0);
    } catch (error) {
      console.error("Error removing order line:", error);
    }
  };

  return (
    <StyledHeader scrolling={scrolling ? true : undefined}>
      <Logo />
      <div>
        <span style={{ marginRight: "10px" }}>Order subtotal: $ {orderSubtotal}</span>
        <Button onClick={handleRemoveOrderLine}>Reset Order</Button>
      </div>
    </StyledHeader>
  );
}
