import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  selectProducts,
} from "../features/products/productSlice";

const ProductPage = () => {
  const dispatch = useDispatch();
  const productData = useSelector(selectProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return <div>ProductPage</div>;
};

export default ProductPage;
