import { Link } from "react-router-dom";
import styles from "./cart.module.css";
import { useOutletContext } from "react-router-dom";

const Cart = () => {
  const { cart, products, setCart, totalCount } = useOutletContext();

  const totalPrice = Object.entries(cart).reduce(
    (sum, [productId, quantity]) => {
      const product = products.find((p) => p.id === Number(productId));
      if (!product) return sum;
      return sum + product.price * quantity;
    },
    0,
  );

  return (
    <div className={styles.layoutCart}>
      <h1>Cart</h1>

      {Object.entries(cart).length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        Object.entries(cart).map(([productId, quantity]) => {
          const product = products.find((p) => p.id === Number(productId));

          if (!product) return null;

          return (
            <div key={productId} className={styles.itemInCart}>
              <div>
                <p>Product: {product.title}</p>
                <p>{product.price} €</p>
                <img src={product.image} className={styles.img} alt="Item" />
              </div>
              <input
                type="number"
                min="0"
                step="1"
                // placeholder="0"
                value={quantity}
                onChange={(e) => {
                  setCart((prev) => ({
                    ...prev,
                    [productId]: Number(e.target.value),
                  }));
                }}
              />
              <button
                onClick={() => {
                  setCart((prev) => ({
                    ...prev,
                    [productId]: Number(0),
                  }));
                }}
              >
                x
              </button>
            </div>
          );
        })
      )}

      <p>Total Items: {totalCount}</p>
      <p>Total price: {totalPrice} </p>
      <button>Check Out</button>
      <Link to="/">Click here to go back</Link>
    </div>
  );
};

export default Cart;
