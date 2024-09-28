import "./App.css";
import Header from "./Components/Header";
import { Outlet } from "react-router-dom";
import useProducts from "./Components/useProducts"; // Imported custom hook

function App() {
  const { products, error } = useProducts(); // Fetching products

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Header />

      <Outlet context={{ products }} />
    </>
  );
}

export default App;
