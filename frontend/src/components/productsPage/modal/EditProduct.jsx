import { useState } from "react";
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
import { useMyContext } from "../../../context/MyProvider";

const EditProduct = ({
  isOpen,
  onClose,
  initialName,
  initialPrice,
  initialGst,
  onUpdate,
}) => {
  const {
    name: contextName,
    setName,
    price: contextPrice,
    setPrice,
    gst: contextGst,
    setGst,
  } = useMyContext();
  const [name, setLocalName] = useState(initialName);
  const [price, setLocalPrice] = useState(initialPrice);
  const [gst, setLocalGst] = useState(initialGst);

  const handleUpdate = () => {
    onUpdate({
      name: name || contextName,
      price: price || contextPrice,
      gst: gst || contextGst,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              value={name}
              onChange={(e) => setLocalName(e.target.value)}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Price</FormLabel>
            <Input
              type="number"
              value={price}
              onChange={(e) => setLocalPrice(e.target.value)}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>GST</FormLabel>
            <Input
              type="number"
              value={gst}
              onChange={(e) => setLocalGst(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
            Update
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditProduct;
