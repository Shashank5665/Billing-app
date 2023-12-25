import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import "./addProduct.css";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../../features/productSlice";
import { useDispatch } from "react-redux";

//---------------------------------------------------------------------------------------------

const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const nameRef = useRef();
  const priceRef = useRef();
  const gstRef = useRef();

  const handleAdd = () => {
    const product = {};
    product.name = nameRef.current.value;
    product.price = priceRef.current.value * 1;
    product.gst = gstRef.current.value * 1;
    dispatch(addProduct(product));
    setIsOpen(false);
  };

  return (
    <div className="addProductContainer">
      <Button
        colorScheme="green"
        p="0 2em 0 2em"
        m="1em 3em 1em 5em"
        onClick={() => navigate("/billing")}
      >
        <FaArrowUpRightFromSquare />
        Go to billing
      </Button>
      <Button
        colorScheme="green"
        p="0 2em 0 2em"
        m="1em 5em 1em 3em"
        onClick={() => setIsOpen(true)}
      >
        <IoIosAddCircle fontSize="1.5em" />
        Add New product
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> New Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input type="text" ref={nameRef} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Price</FormLabel>
              <Input type="number" ref={priceRef} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>GST</FormLabel>
              <Input type="number" ref={gstRef} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAdd}>
              Add
            </Button>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddProduct;
