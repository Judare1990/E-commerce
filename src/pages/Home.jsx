import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardProduct from "../components/Home/CardProduct";
import {
  getAllProductsThunk,
  getProductsByName,
} from "../store/slices/products.slice";
import "./styles/home.css";

const Home = () => {
  const [categories, setCategories] = useState();
  const [fromTo, setFromTo] = useState({
    from: 0,
    to: Infinity,
  });

  const { products } = useSelector((state) => state);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target.inputSearch.value.trim().toLowerCase();
    dispatch(getProductsByName(input));
  };

  useEffect(() => {
    const url = "https://e-commerce-api-v2.academlo.tech/api/v1/categories";
    axios
      .get(url)
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err.response));
  }, []);

  const handleClickCategory = (id) => {
    dispatch(getProductsByName(id, true));
  };

  const handleSubmitPrice = (e) => {
    e.preventDefault();
    const from = Number(e.target.from.value.trim());
    const to = Number(e.target.to.value.trim());

    if (from && to) {
      setFromTo({ from, to });
    } else if (from && !to) {
      setFromTo({ from, to: Infinity });
    } else if (!!from && to) {
      setFromTo({ from: 0, to });
    } else {
      setFromTo({ from: 0, to: Infinity });
    }
  };

  const filterProduct = (product) =>
    +product.price >= fromTo.from && +product.price <= fromTo.to;

  return (
    <div className="home_main-container">
      <form className="home_input-container" onSubmit={handleSubmit}>
        <input
          className="home_input"
          placeholder="What are you looking for?"
          id="inputSearch"
          type="text"
        />
        <button className="home_input-button">
          <i className="bx bx-search-alt-2"></i>
        </button>
      </form>

      <div className="home_products">
        {products?.length === 0 ? (
          <h1>This product does not exist</h1>
        ) : (
          products
            ?.filter(filterProduct)
            .map((product) => (
              <CardProduct key={product.id} product={product} />
            ))
        )}
      </div>

      <article className="card_main-container">
        <section className="filter_container">
          <header className="filter_price">
            <h3 className="filter_price-name">Price</h3>
            <i className="bx bx-chevron-down"></i>
          </header>
          <hr />
          <form className="filter_form" onSubmit={handleSubmitPrice}>
            <div className="from_to">
              <label htmlFor="from">From</label>
              <input className="filter_input" type="number" id="from" />
              <label htmlFor="to">To</label>
              <input className="filter_input" type="number" id="to" />
            </div>
            <button className="filter_button">Filter Price</button>
          </form>
        </section>
        <section>
          <header>
            <h3>Category</h3>
            <i className="bx bx-chevron-down"></i>
          </header>
          <ul>
            <li onClick={() => dispatch(getAllProductsThunk())}>
              All Products
            </li>
            {categories?.map((category) => (
              <li
                key={category.id}
                onClick={() => handleClickCategory(category.id)}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </section>
      </article>
    </div>
  );
};

export default Home;
