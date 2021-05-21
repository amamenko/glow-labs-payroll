import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";

const LineItemModal = (props) => {
  const { modalActive, toggleModal, sectionTitle } = props;

  return (
    <Modal isOpen={modalActive} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>
        Add a New{" "}
        {sectionTitle === "Main Treatments"
          ? "Main Treatment"
          : sectionTitle === "Add Ons"
          ? "Add On"
          : "Extra Item"}
      </ModalHeader>
      <ModalBody>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Name</InputGroupText>
          </InputGroupAddon>
          <Input />
        </InputGroup>
        <br />
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Price</InputGroupText>
          </InputGroupAddon>
          <Input />
        </InputGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggleModal}>
          Add Item
        </Button>{" "}
        <Button color="secondary" onClick={toggleModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default LineItemModal;
