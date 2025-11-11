import React, { useEffect, useState } from "react";
import "../styles/ShopItem.css";

const STAR_COOKIE = "fruti-starries";
const SHOP_COOKIE = "fruti-shop-items";

function setCookie(name, value, days = 365) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; path=/`;
}

function getCookie(name) {
  const v = `; ${document.cookie}`;
  const parts = v.split(`; ${name}=`);
  if (parts.length === 2)
    return decodeURIComponent(parts.pop().split(";").shift() || "");
  return null;
}

function getShopData() {
  try {
    const data = getCookie(SHOP_COOKIE);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

function setShopData(data) {
  setCookie(SHOP_COOKIE, JSON.stringify(data));
}

const ShopItem = ({ item }) => {
  const isEven = item.id % 2 === 0;
  const itemClass = isEven ? "shop-item-alternate" : "shop-item";
  const descriptionClass = isEven
    ? "shop-item-description-alternate"
    : "shop-item-description";

  const publicUrl = process.env.PUBLIC_URL || "";

  const [balance, setBalance] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [count, setCount] = useState(0);
  const [dynamicCost, setDynamicCost] = useState(item.cost);

  useEffect(() => {
    const saved = parseInt(getCookie(STAR_COOKIE), 10);
    if (!isNaN(saved)) setBalance(saved);

    const shopData = getShopData();
    const itemCount = shopData[item.name] || 0;
    setCount(itemCount);

    const adjustedCost = Math.round(item.cost * (1 + itemCount / 5));
    setDynamicCost(adjustedCost);
  }, [item.name, item.cost]);

  const notifyBalanceChange = (newBalance) => {
    try {
      window.dispatchEvent(
        new CustomEvent("starriesUpdated", { detail: newBalance })
      );
    } catch {}
  };

  const handlePurchase = () => {
    if (processing) return;
    setProcessing(true);

    const saved = parseInt(getCookie(STAR_COOKIE), 10) || 0;
    const shopData = getShopData();
    const itemCount = shopData[item.name] || 0;
    const cost = Math.round(item.cost * (1 + itemCount / 5));

    if (saved < cost) {
      window.alert("Not enough starries to buy this item.");
      setProcessing(false);
      return;
    }

    const newBalance = saved - cost;
    setCookie(STAR_COOKIE, newBalance);
    setBalance(newBalance);
    notifyBalanceChange(newBalance);

    const newCount = itemCount + 1;
    shopData[item.name] = newCount;
    setShopData(shopData);
    setCount(newCount);

    const newCost = Math.round(item.cost * (1 + newCount / 5));
    setDynamicCost(newCost);

    setProcessing(false);
  };

  const afford = balance >= dynamicCost;

  return (
    <div className={itemClass}>
      <div className={descriptionClass}>
        <img src={`${publicUrl}/${item.image}`} alt={item.name} />
        <div>
          <h2>
            {item.name} ( +{item.value} / {item.type} ) — Cost: {dynamicCost}
          </h2>
          <p>{item.description}</p>
          <p style={{ fontSize: "0.9em", opacity: 0.8 }}>
            Owned: {count}
          </p>
        </div>
      </div>

      <div className="shop-item-purchase">
        <img
          src={`${publicUrl}/images/shop-purchase.png`}
          alt="purchase"
          onClick={handlePurchase}
          style={{
            cursor: afford && !processing ? "pointer" : "not-allowed",
            opacity: afford && !processing ? 1 : 0.5,
            userSelect: "none",
          }}
          title={afford ? `Buy for ${dynamicCost} starries` : "Insufficient starries"}
        />
      </div>
    </div>
  );
};

export default ShopItem;
