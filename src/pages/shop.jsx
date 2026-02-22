import { Link } from "react-router-dom";
import Item from "../components/item/item";
import styles from "./shop.module.css";
import useShopAPI from "../hooks/useShopAPI";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

// import { useOutletContext } from "react-router-dom";

function Shop() {
  const { data, error, loading } = useShopAPI();
  const { products, setProducts } = useOutletContext();

  useEffect(() => {
    if (data) setProducts(data);
  }, [data, setProducts]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered</p>;
  // const { cart, setCart } = useOutletContext();
  return (
    <div className={styles.layoutShop}>
      <h1>Shop</h1>
      <div className={styles.layoutItems}>
        {products.map((product) => (
          <Item key={product.id} product={product} />
        ))}
        {/* <button
          onClick={() => setCart({ ...cart, test: (cart.test ?? 0) + 1 })}
        >
          Add test item
        </button> */}
      </div>
      <Link to="/cart">Go To Cart</Link>
      <Link to="/">Click here to go back home</Link>
    </div>
  );
}

export default Shop;
