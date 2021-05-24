import React, { useState } from "react";
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
  const { modalActive, toggleModal, sectionTitle, sectionArr, changeFn } =
    props;

  const [newName, changeNewName] = useState("");
  const [newPriceOrPercent, changeNewPriceOrPercent] = useState("");

  const handleChangeName = (e) => {
    changeNewName(e.target.value);
  };

  const handleChangePriceOrPercent = (e) => {
    changeNewPriceOrPercent(e.target.value);
  };

  const handleAddItemClick = () => {
    toggleModal();
    const clone = [...sectionArr];
    clone.push({ name: newName, price: newPriceOrPercent });

    changeFn(clone);
  };

  const handleCancelClick = () => {
    toggleModal();
    changeNewName("");
    changeNewPriceOrPercent("");
  };

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
          <Input maxLength={50} onChange={handleChangeName} value={newName} />
        </InputGroup>
        <br />
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              {sectionTitle === "Extras" ? "Percent" : "Price"}
            </InputGroupText>
          </InputGroupAddon>
          <Input
            maxLength={50}
            onChange={handleChangePriceOrPercent}
            value={newPriceOrPercent}
          />
        </InputGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleAddItemClick}>
          Add Item
        </Button>
        <Button color="secondary" onClick={handleCancelClick}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default LineItemModal;
