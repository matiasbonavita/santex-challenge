import { render, screen, fireEvent } from "@testing-library/react";
import { ProductCardProps } from "./ProductCard";
import ProductCard from './ProductCard'

describe("ProductCard component", () => {
  const mockProduct = {
    assets: [{ id: "1", source: "image.jpg", name: "Product Image" }],
    description: "Product description",
  };

  const mockVariant = {
    id: "variant-1",
    name: "Variant 1",
    price: 10,
  };

  const mockAction = jest.fn();

  const setup = (props: ProductCardProps) => {
    render(<ProductCard {...props} />);
  };

  it("should render the product details and handle buy click", () => {
    setup({ product: mockProduct, variant: mockVariant, action: mockAction });

    const cardImage = screen.getByAltText("Product Image");
    const cardTitle = screen.getByText("Variant 1");
    const cardPrice = screen.getByText("$ 10");
    const cardDescription = screen.getByText("Product description");
    const buyButton = screen.getByText("BUY NOW!");

    expect(cardImage).toBeInTheDocument();
    expect(cardTitle).toBeInTheDocument();
    expect(cardPrice).toBeInTheDocument();
    expect(cardDescription).toBeInTheDocument();

    fireEvent.click(buyButton);

    expect(mockAction).toHaveBeenCalledWith("variant-1", 1);
  });
});