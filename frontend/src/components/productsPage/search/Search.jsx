import React from "react";
import { Input, Button, Box } from "@chakra-ui/react";
import "./search.css";
import { useMyContext } from "../../../context/MyProvider";
import { getProducts } from "../../../apis";

const Search = () => {
  const { name, setName, code, setCode, setProducts } = useMyContext();

  const handleSearch = async () => {
    try {
      const filterAttributes = {};

      // If both name and code are provided, update the filterAttributes
      if (name) {
        filterAttributes.name = name;
      }

      if (code) {
        filterAttributes.code = code;
      }

      // Fetch products based on the filterAttributes
      const products = await getProducts(filterAttributes);
      console.log(products.data);
      setProducts(products.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box className="searchContainer">
      <Input
        placeholder="search products"
        htmlSize={75}
        style={{
          borderRadius: "10px 0px 0px 10px",
          boxShadow: "0px 0px 1px 1px grey",
        }}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="search by code"
        htmlSize={75}
        style={{
          borderRadius: "0",
          boxShadow: "0px 0px 1px 1px grey",
        }}
        onChange={(e) => setCode(e.target.value)}
      />
      <Button
        colorScheme="blue"
        variant="solid"
        style={{
          width: "150px",
          borderRadius: "0px 10px 10px 0px",
          boxShadow: "0px 0px 1px 1px grey",
        }}
        onClick={handleSearch}
      >
        Search
      </Button>
    </Box>
  );
};

export default Search;
