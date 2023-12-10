import React from "react";
import "./productContainer.css";
import Product from "../product/Product";
import { useMyContext } from "../../../context/MyProvider";

const ProductContainer = () => {
  const { products } = useMyContext();
  return (
    <div className="productContainer">
      {products && products.length > 0 ? (
        products.map((product) => (
          <Product
            key={product._id}
            id={product._id}
            name={product.name}
            price={product.price}
            gst={product.gst}
          />
        ))
      ) : (
        <div className="noProducts">
          <h1>No Products Found</h1>
        </div>
      )}
    </div>
  );
};

export default ProductContainer;
