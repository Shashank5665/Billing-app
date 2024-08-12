import React, { useEffect } from "react";
import "./productContainer.css";
import Product from "../product/Product";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../../features/productSlice";

//---------------------------------------------------------------------------------------------

const ProductContainer = () => {
  const dispatch = useDispatch();
  const { search, products } = useSelector((state) => state.products);

  //----------------------FUNCTIONS----------------------
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  //----------------------RETURN----------------------
  return (
    <div className="productContainer">
      {products ? (
        products
          .filter((product) => {
            return search.toLowerCase() === ""
              ? product
              : product.name.toLowerCase().includes(search.toLowerCase());
          })
          .map((product) => (
            <Product
              key={product._id}
              id={product._id}
              name={product.name}
              price={product.price}
              gst={product.gst}
            />
          ))
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default ProductContainer;
