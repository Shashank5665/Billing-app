import { useEffect, useState } from "react";
import { Box, Button, ButtonGroup, Heading } from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import EditProduct from "../../productsPage/modal/EditProduct";
import { useMyContext } from "../../../context/MyProvider";
import { useNavigate } from "react-router-dom";
const { updateProduct, addToCart, getCart } = require("../../../apis/index");

const Product = ({ id, name, price, gst }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const handleEditOpen = () => setIsEditOpen(true);
  const { products, setProducts, cart, setCart } = useMyContext();
  const navigate = useNavigate();

  const handleUpdate = async (updatedProduct) => {
    await updateProduct(id, updatedProduct);
    const index = products.findIndex((product) => product._id === id);
    const newProducts = [...products];
    newProducts[index] = updatedProduct;
    setProducts(newProducts);
    setIsEditOpen(false);
  };

  const handleAddToCart = async (id) => {
    const cartDataParams = {
      productId: id,
      quantity: 1,
    };
    const addedData = await addToCart(id, cartDataParams);
    navigate("/billing");
  };

  return (
    <Box m={5} display="flex" justifyContent="center" alignItems="center">
      <Box w="17em" boxShadow="xl" borderRadius="25px">
        <Heading fontFamily="poppins light">{name}</Heading>
        <Box className="numbers">
          <Heading size="md" fontFamily="poppins light" m="1em 0 1em 0">
            $ {price}{" "}
          </Heading>
          <Heading size="md" fontFamily="poppins light">
            GST : {gst}%{" "}
          </Heading>
        </Box>
        <ButtonGroup>
          <Button
            colorScheme="blue"
            p="0 2em 0 2em"
            m="1em 0 1em 0"
            onClick={handleEditOpen}
            borderRadius="25px"
            width="7em"
            boxShadow="md"
          >
            <FaEdit fontSize="1.3em" />
            Edit
          </Button>
          <Button
            colorScheme="green"
            m="1em 0 1em 0"
            onClick={() => handleAddToCart(id)}
            borderRadius="25px"
            width="7em"
            boxShadow="md"
          >
            <FaCartPlus fontSize="1.3em" />
            Add
          </Button>
        </ButtonGroup>
      </Box>
      {isEditOpen && (
        <EditProduct
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          initialName={name}
          initialPrice={price}
          initialGst={gst}
          onUpdate={handleUpdate}
        />
      )}
    </Box>
  );
};

export default Product;
