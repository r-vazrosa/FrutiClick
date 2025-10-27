import { useEffect, useState } from "react";
import '../styles/Shop.css';
import ShopItem from "./ShopItem.jsx";

const Shop = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const url = "https://r-vazrosa.github.io/csce242/json/shop.json";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        setItems(data);
      } catch (e) {
            console.error("Error fetching data:", e);
            setError(e);
      }
    };

    getData();
  }, []);

  return (
    <div id="shop">
      {error && <p>Error: {error.message}</p>}

      {items.map((item) => (
        <ShopItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default Shop;
