import '../styles/ShopItem.css';


const ShopItem = ({ item }) => {
  const isEven = item.id % 2 === 0;
  const itemClass = isEven ? "shop-item-alternate" : "shop-item";
  const descriptionClass = isEven
    ? "shop-item-description-alternate"
    : "shop-item-description";

  const publicUrl = process.env.PUBLIC_URL || "";

  return (
    <div className={itemClass}>
      <div className={descriptionClass}>
        <img
          src={`${publicUrl}/${item.image}`}
          alt={item.name}
        />
        <div>
          <h2>
            {item.name} ( +{item.value} / {item.type} )
          </h2>
          <p>{item.description}</p>
        </div>
      </div>

      <div className="shop-item-purchase">
        <img src={`${publicUrl}/images/shop-purchase.png`} alt="purchase" />
      </div>
    </div>
  );
};

export default ShopItem;
