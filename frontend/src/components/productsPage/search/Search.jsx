import React, { useEffect, useState } from "react";
import { Input, Box } from "@chakra-ui/react";
import "./search.css";
import { useDispatch } from "react-redux";
import { searchProduct } from "../../../features/productSlice";

//---------------------------------------------------------------------------------------------

const Search = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  //----------------------FUNCTIONS----------------------
  useEffect(() => {
    dispatch(searchProduct(search));
  }, [search]);

  //----------------------RETURN----------------------
  return (
    <Box className="searchContainer">
      <Input
        placeholder="search products"
        htmlSize={75}
        style={{
          borderRadius: "10px 10px 10px 10px",
          boxShadow: "0px 0px 1px 1px grey",
        }}
        onChange={(e) => setSearch(e.target.value)}
      />
    </Box>
  );
};

export default Search;
