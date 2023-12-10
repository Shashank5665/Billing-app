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
import React, { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { useMyContext } from "../../../context/MyProvider";
import "./addProduct.css";
import { useNavigate } from "react-router-dom";
const { createProduct } = require("../../../apis/index");

const AddProduct = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { name, setName, price, setPrice, gst, setGst, products, setProducts } =
    useMyContext();

  const handleAdd = async () => {
    var code = "A00" + Math.floor(Math.random() * 10);
    const product = {
      code,
      name,
      price,
      gst,
    };
    await createProduct(product);
    setProducts([...products, product]);
    setName("");
    setPrice("");
    setGst("");
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
          <ModalHeader>Add New Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Price</FormLabel>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>GST</FormLabel>
              <Input
                type="number"
                value={gst}
                onChange={(e) => setGst(e.target.value)}
              />
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
