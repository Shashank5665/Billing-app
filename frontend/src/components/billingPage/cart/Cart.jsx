import React, { useEffect } from "react";
import CartItem from "../cartItem/CartItem";
import { Button, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { IoArrowBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { calculateNumbers, fetchCartItems } from "../../../features/cartSlice";
import { useNavigate } from "react-router-dom";
import "./cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, count, totalAmount, gst, billAmount } = useSelector(
    (state) => state.cart
  );

  //----------------------------------------------------------------------------------------------------

  useEffect(() => {
    dispatch(fetchCartItems());
  }, []);

  useEffect(() => {
    dispatch(calculateNumbers());
  }, [cartItems]);

  //----------------------------------------------------------------------------------------------------

  if (cartItems.length === 0) {
    return (
      <>
        <Flex w="100%" justifyContent="flex-start">
          <Button
            m="2em 0 0 10em"
            backgroundColor="rgb(49,130,206)"
            color="white"
            onClick={() => navigate("/")}
          >
            <IoArrowBack />
            Back
          </Button>
        </Flex>
        <Flex justifyContent="center" alignItems="center" h="100vh">
          <Heading fontFamily="poppins">Your cart is empty</Heading>
        </Flex>
      </>
    );
  }

  return (
    <>
      <Flex w="100%" justifyContent="flex-start">
        <Button
          m="2em 0 0 10em"
          backgroundColor="rgb(49,130,206)"
          color="white"
          onClick={() => navigate("/")}
        >
          <IoArrowBack />
          Back
        </Button>
      </Flex>
      <div className="cartComponent">
        <Heading fontFamily="poppins" m="1em 2em 1em 2em">
          Your Cart
        </Heading>
        <Grid
          className="innerBill"
          w="60%"
          mb="0.5em"
          pb="0.5em"
          borderBottom="2px solid grey"
        >
          <Text fontWeight="bold">PRODUCT</Text>
          <Text fontWeight="bold">PRICE</Text>
          <Text fontWeight="bold">GST</Text>
          <Text fontWeight="bold">QTY</Text>
        </Grid>
        {/* ---------------------------------------------------- */}
        {cartItems.map((item) => (
          <CartItem
            key={item?._id}
            id={item?._id}
            name={item?.product.name}
            price={item?.product.price}
            gst={item?.product.gst}
            quantity={item?.quantity}
            productId={item?.product._id}
          />
        ))}
        {/* ---------------------------------------------------- */}
      </div>
      <br />
      <hr />
      <Flex w="100%" justifyContent="center">
        <Flex
          className="amount"
          w="50%"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          mt="1em"
        >
          <Flex justifyContent="space-between" width="60%">
            <Text>Total items :</Text>
            <Text>{count}</Text>
          </Flex>
          <Flex justifyContent="space-between" width="60%">
            <Text>Total :</Text>
            <Text>
              <span>$</span>
              {totalAmount}
            </Text>
          </Flex>
          <Flex justifyContent="space-between" width="60%">
            <Text>Gst :</Text>
            <Text>
              <span>$</span>
              {gst}
            </Text>
          </Flex>
          <Flex justifyContent="space-between" width="60%">
            <Text as="b">Bill to pay :</Text>
            <Text as="b">
              <span>$</span>
              {billAmount}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Cart;
