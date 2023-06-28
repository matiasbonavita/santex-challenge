import styled from "styled-components";

const StyledButton = styled.button`
  border-radius: 6px;
  background: rgba(154, 83, 187);
  color: white;
  border: 1px solid #9a53bb;
  padding: 5px 10px;
  cursor: pointer;
  transition: all 0.2s ease-out;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  &:hover {
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
      0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  }
  &:active {
    box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
      0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
    transform: scale(1.1);
  }
`;

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export default function Button({ children, onClick }: ButtonProps) {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
}