// import image from "../../assets/second-breakfast-9pwqBMaPyPE-unsplash.jpg";
import styles from "./item.module.css";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";
// import js from "@eslint/js";

const Item = ({ product }) => {
  const { id, title, price, image } = product;
  const productId = id;
  const { setCart } = useOutletContext();
  const [quantity, setQuantity] = useState(0);

  function addToCart() {
    if (quantity <= 0) return;
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] ?? 0) + quantity,
    }));
    setQuantity(0);
  }

  return (
    <div className={styles.layoutItem}>
      <p>{title}</p>
      <img src={image} className={styles.itemImg} alt="Item" />
      <p>{price} €</p>
      <div className="amountToOrder">
        <p>how Many?</p>
        <input
          type="number"
          min="0"
          step="1"
          // placeholder="0"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        {/* <button>+</button>
        <button>-</button> */}
      </div>
      <button type="button" onClick={addToCart}>
        add to Cart
      </button>
    </div>
  );
};

export default Item;
