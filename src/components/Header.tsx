import { useOrderContext } from '../context/OrderContext';
//import styled from 'styled-components';

// const StyledButton = styled.button`
// background-color: black;
// font-size: 32px;
// color: white;
// `;

export function Header() {
  const { orderSubtotal } = useOrderContext();
  console.log('order from header:', orderSubtotal);

  return (
    <header style={{ background: 'black', color:'white' }}>
      <img
        src="https://santex.wpengine.com/wp-content/uploads/2019/02/logo-santex@3x.png"
        alt="logo"
      />
      <div>$ {orderSubtotal}</div>
    </header>
  );
}
