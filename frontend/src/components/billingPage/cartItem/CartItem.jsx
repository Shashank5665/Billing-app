import React, { useState, useEffect, useRef } from "react";
import { Flex, Text, Grid, Button } from "@chakra-ui/react";
import { FaRegTrashAlt } from "react-icons/fa";
import "./cartItem.css";
import { useDispatch } from "react-redux";
import { deleteCartItems, updateCartItem } from "../../../features/cartSlice";
import { calculateNumbers } from "../../../features/cartSlice";

//----------------------------------------------------------------------------------------------------

const CartItem = ({ id, name, price, gst, quantity }) => {
  const dispatch = useDispatch();
  const quantityRef = useRef();

  const increment = () => {
    dispatch(
      updateCartItem({
        id,
        quantity: parseInt(quantityRef.current.innerText) + 1,
      })
    );
  };
  const decrement = () => {
    if (parseInt(quantityRef.current.innerText) > 1) {
      dispatch(
        updateCartItem({
          id,
          quantity: parseInt(quantityRef.current.innerText) - 1,
        })
      );
    }
  };

  const deleteCartItem = (id) => {
    dispatch(deleteCartItems(id));
  };

  useEffect(() => {
    dispatch(calculateNumbers());
  }, []);

  //----------------------------------------------------------------------------------------------------

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      gap="3em"
      className="billingProducts"
    >
      <Grid
        className="innerBill"
        w="60%"
        justifyContent="center"
        alignItems="center"
      >
        <Text>{name}</Text>
        <Text>$ {price}</Text>
        <Text>{gst}%</Text>
        <Flex justifyContent="center" alignItems="center">
          <Button
            aria-label="Decrement"
            onClick={() => decrement()}
            borderRadius="10px 0 0 10px"
            m="0.1em 1em 0.1em 1em"
          >
            -
          </Button>
          <Text w="2em" ref={quantityRef}>
            {quantity}
          </Text>
          <Button
            aria-label="Increment"
            onClick={() => increment()}
            borderRadius="0 10px 10px 0"
            m="0.1em 1em 0.1em 1em"
          >
            +
          </Button>
        </Flex>
        <Button
          padding="0"
          color="red"
          backgroundColor="transparent"
          onClick={() => deleteCartItem(id)}
        >
          <FaRegTrashAlt fontSize="1em" />
        </Button>
      </Grid>
    </Flex>
  );
};

export default CartItem;
