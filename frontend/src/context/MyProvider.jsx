import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";
const MyContext = createContext();
const { getProducts, getCart } = require("../apis/index");

const MyProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [gst, setGst] = useState("");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [code, setCode] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setProducts(products.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchCart = async () => {
      try {
        const cart = await getCart();
        // console.log("Fetching initial cart items : ", cart.data.data);
        setCart(cart.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
    fetchCart();
  }, []);

  return (
    <MyContext.Provider
      value={{
        name,
        setName,
        price,
        setPrice,
        gst,
        setGst,
        products,
        setProducts,
        cart,
        setCart,
        total,
        setTotal,
        code,
        setCode,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => useContext(MyContext);

export default MyProvider;
