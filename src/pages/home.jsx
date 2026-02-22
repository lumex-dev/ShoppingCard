import { Link } from "react-router-dom";

import image from "../assets/mike-petrucci-c9FQyqIECds-unsplash.jpg";
import styles from "../pages/home.module.css";

const Homepage = () => {
  return (
    <div className={styles.layoutHomepage}>
      <h1>Home</h1>
      <p>hey we have some great stuff here. Check out in our shop</p>
      <Link to="/shop" className={styles.imageLink}>
        <img className={styles.imgHome} src={image} alt="shop" />
      </Link>
      <p></p>
      {/* <Link to="/">Click here to go back</Link> */}
    </div>
  );
};

export default Homepage;
