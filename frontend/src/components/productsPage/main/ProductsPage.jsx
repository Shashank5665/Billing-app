import React from "react";
import ProductContainer from "../productContainer/ProductContainer";
import AddProduct from "../addProduct/AddProduct";
import { Heading } from "@chakra-ui/react";
import "./main.css";
import Search from "../search/Search";

//---------------------------------------------------------------------------------------------

const Main = () => {
  return (
    <div className="mainProductPage">
      <Heading
        m="0em 1em 0.5em 1em"
        size="4xl"
        style={{
          fontWeight: "500",
          color: "#11bf45",
        }}
      >
        𝓖ɾσƈҽɾყ 𝓢ƚσɾҽ
      </Heading>
      <Search />
      <AddProduct />
      <ProductContainer />
    </div>
  );
};

export default Main;
