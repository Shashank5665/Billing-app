import React, { useEffect, useState } from "react";
import CartItem from "../cartItem/CartItem";
import { Button, Grid, Heading, Text } from "@chakra-ui/react";
import { useMyContext } from "../../../context/MyProvider";
import "./cart.css";
import { getCart } from "../../../apis";

const Cart = () => {
  const { cart, setCart, total, setTotal } = useMyContext();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cart = await getCart();
        setCart(cart.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCart();
  }, []);

  // useEffect(() => {
  //   //refresh the page once
  //   window.location.reload();
  // }, []);

  console.log("cart------>", cart);

  return (
    <div className="cartComponent">
      <Heading fontFamily="poppins light" m="1em 2em 1em 2em">
        Shopping Cart
      </Heading>
      <Grid className="innerBill" w="60%">
        <Text fontWeight="bold" backgroundColor="#f2f7ff" m="0.2em">
          PRODUCT
        </Text>
        <Text fontWeight="bold" backgroundColor="#f2f7ff" m="0.2em">
          PRICE
        </Text>
        <Text fontWeight="bold" backgroundColor="#f2f7ff" m="0.2em">
          GST
        </Text>
        <Text fontWeight="bold" backgroundColor="#f2f7ff" m="0.2em">
          QTY
        </Text>
      </Grid>
      {cart && cart.length > 0 ? (
        cart.map((item) => (
          <CartItem
            key={item._id}
            id={item._id}
            name={item.product.name}
            price={item.product.price}
            gst={item.product.gst}
            quantity={item.quantity}
            productId={item.product._id}
          />
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
      {cart && cart.length > 0 && (
        <Heading fontFamily="poppins light" m="1em 2em 1em 2em">
          Total Bill: $
          <span style={{ fontWeight: "bold", fontSize: "1.5em" }}>
            {" "}
            {total.toFixed(2)}
          </span>
        </Heading>
      )}
    </div>
  );
};

export default Cart;
