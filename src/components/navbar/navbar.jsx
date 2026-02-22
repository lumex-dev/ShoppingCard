import styles from "./navbar.module.css";
import { Link } from "react-router-dom";

function NavigationBar({ totalCount }) {
  return (
    <>
      <nav className={styles.NavBar}>
        <ul>
          <Link to="home">Home</Link>
          <Link to="shop">Shop</Link>
          <Link to="cart">Cart {totalCount > 0 ? `(${totalCount})` : ""}</Link>
        </ul>
      </nav>
    </>
  );
}

export default NavigationBar;
