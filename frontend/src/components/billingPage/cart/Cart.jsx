import React, { useEffect } from "react";
import CartItem from "../cartItem/CartItem";
import { Button, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { IoArrowBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "../../../features/cartSlice";
import { useNavigate } from "react-router-dom";
import "./cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, count, totalAmount, gst, billAmount } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    dispatch(fetchCartItems());
  }, []);

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
          <Heading fontFamily="poppins light">Your cart is empty</Heading>
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
        <Heading fontFamily="poppins light" m="1em 2em 1em 2em">
          Your Cart
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
        {/* ---------------------------------------------------- */}
        {cartItems.map((item) => (
          <CartItem
            key={item._id}
            id={item._id}
            name={item.product.name}
            price={item.product.price}
            gst={item.product.gst}
            quantity={item.quantity}
            productId={item.product._id}
          />
        ))}
        {/* ---------------------------------------------------- */}
      </div>
      <br />
      <hr />
      <Flex w="100%" justifyContent="center">
        <Flex
          className="amount"
          w="60%"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Flex justifyContent="space-between" width="60%">
            <Text fontWeight="bold" m="1em">
              Total items :
            </Text>
            <Text fontWeight="bold" m="1em">
              {count}
            </Text>
          </Flex>
          <Flex justifyContent="space-between" width="60%">
            <Text fontWeight="bold" m="1em">
              Total :
            </Text>
            <Text fontWeight="bold" m="1em">
              <span>$</span>
              {totalAmount}
            </Text>
          </Flex>
          <Flex justifyContent="space-between" width="60%">
            <Text fontWeight="bold" m="1em">
              Gst :
            </Text>
            <Text fontWeight="bold" m="1em">
              <span>$</span>
              {gst}
            </Text>
          </Flex>
          <Flex justifyContent="space-between" width="60%">
            <Text fontWeight="bold" m="1em">
              Bill to pay :
            </Text>
            <Text fontWeight="bold" m="1em">
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
