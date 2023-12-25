import React, { useEffect } from "react";
import Cart from "../cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import { calculateNumbers } from "../../../features/cartSlice";

const BillingPage = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <div>
      <Cart />
    </div>
  );
};

export default BillingPage;
