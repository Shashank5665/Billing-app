import React, { useState, useEffect } from "react";
import { Box, IconButton, Input, Flex, Text, Grid } from "@chakra-ui/react";
import { MdRemove, MdAdd } from "react-icons/md";
import { useMyContext } from "../../../context/MyProvider";
import "./cartItem.css";
import { getCart, updateCart, updateProduct } from "../../../apis";

const CartItem = ({ id, name, price, gst, quantity, productId }) => {
  const [localQuantity, setLocalQuantity] = useState(quantity);
  const { cart, setCart, total, setTotal } = useMyContext();

  const handleIncrement = async (productId) => {
    const cartDataParams = {
      productId: productId,
      quantity: localQuantity + 1,
    };
    const updatedData = await updateCart(productId, cartDataParams);
    setLocalQuantity(localQuantity + 1);
  };

  const handleDecrement = async (productId) => {
    const cartDataParams = {
      productId: productId,
      quantity: localQuantity - 1,
    };
    const updatedData = await updateCart(productId, cartDataParams);
    setLocalQuantity(localQuantity - 1);
  };

  useEffect(() => {
    calculateTotal();
  }, []);

  const calculateTotal = () => {
    let totalPrice = 0;
    cart.forEach((item) => {
      const itemTotal = calculateItemTotal(item);
      totalPrice += itemTotal;
    });
    setTotal(totalPrice);
  };
  const calculateItemTotal = (item) => {
    const itemPrice = item.product.price * item.quantity;
    const itemGST = (item.product.gst / 100) * itemPrice;
    const itemTotal = itemPrice + itemGST;
    return itemTotal;
  };

  return (
    <Flex justifyContent="center" gap="3em" className="billingProducts">
      <Grid className="innerBill" w="60%">
        <Text>{name}</Text>
        <Text>$ {price}</Text>
        <Text>{gst}%</Text>
        <Flex justifyContent="center">
          <IconButton
            aria-label="Decrement"
            icon={<MdRemove />}
            onClick={() => handleDecrement(productId)}
            borderRadius="25px"
            m="0.1em 1em 0.1em 1em"
            boxShadow="md"
          />
          <Text>{localQuantity}</Text>
          <IconButton
            aria-label="Increment"
            icon={<MdAdd />}
            onClick={() => handleIncrement(productId)}
            borderRadius="25px"
            m="0.1em 1em 0.1em 1em"
            boxShadow="md"
          />
        </Flex>
      </Grid>
    </Flex>
  );
};

export default CartItem;
