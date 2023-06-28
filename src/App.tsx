import { Header } from "./components/Header";
import { ProductList } from "./components/ProductList";
import { OrderProvider } from "./context/OrderContext";
import Banner from "./components/Banner";

const App: React.FC = () => {
  return (
    <OrderProvider>
      <Header />
      <Banner />
      <div>
        <ProductList></ProductList>
      </div>
    </OrderProvider>
  );
};

export default App;
