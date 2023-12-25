import { useState } from "react";
import { Box, Button, ButtonGroup, Heading } from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import EditProduct from "../../productsPage/modal/EditProduct";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../../features/productSlice";
import { addCartItem } from "../../../features/cartSlice";

const Product = ({ id, name, price, gst }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const dispatch = useDispatch();
  const handleEditOpen = () => {
    setIsEditOpen(true);
  };

  const handleAddToCart = async (id) => {
    const payload = { productId: id };
    dispatch(addCartItem(payload));
  };

  const handleDelete = async (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <Box m={5} display="flex" justifyContent="center" alignItems="center">
      <Box w="17em" boxShadow="xl" borderRadius="25px">
        <Heading fontFamily="poppins light">{name}</Heading>
        <Box className="numbers">
          <Heading size="md" fontFamily="poppins light" m="1em 0 1em 0">
            $ {price}
          </Heading>
          <Heading size="md" fontFamily="poppins light">
            GST : {gst}%
          </Heading>
        </Box>
        <ButtonGroup>
          <Button
            colorScheme="blue"
            m="1.5em 0.5em 1.5em 0.5em"
            onClick={handleEditOpen}
            borderRadius="20px"
            boxShadow="md"
            p="0 1em 0 1em"
          >
            <FaEdit fontSize="1.3em" />
            Edit
          </Button>
          <Button
            colorScheme="green"
            m="1.5em 0.5em 1.5em 0.5em"
            onClick={() => handleAddToCart(id)}
            borderRadius="20px"
            boxShadow="md"
            p="0 1em 0 1em"
          >
            <FaCartShopping fontSize="1.3em" />
            Add
          </Button>
          <Button
            colorScheme="red"
            m="1.5em 0.5em 1.5em 0.5em"
            onClick={() => handleDelete(id)}
            borderRadius="20px"
            boxShadow="md"
            p="0"
          >
            <FaRegTrashAlt fontSize="1.3em" />
          </Button>
        </ButtonGroup>
      </Box>
      {isEditOpen && (
        <EditProduct
          id={id}
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          initialName={name}
          initialPrice={price}
          initialGst={gst}
        />
      )}
    </Box>
  );
};

export default Product;
