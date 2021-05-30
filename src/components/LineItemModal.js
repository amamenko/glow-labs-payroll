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
import { cloneDeep } from "lodash";

const LineItemModal = (props) => {
  const {
    modalActive,
    toggleModal,
    sectionTitle,
    sectionArr,
    changeFn,
    allCurrentPrices,
    changeAllCurrentPrices,
    bottomButtonsVisible,
    changeBottomButtonsVisible,
  } = props;

  const [newName, changeNewName] = useState("");
  const [newPriceOrPercent, changeNewPriceOrPercent] = useState("");
  const [percentageSelection, changePercentageSelection] = useState("");

  const handleChangeName = (e) => {
    changeNewName(e.target.value);
  };

  const handleChangePriceOrPercent = (e) => {
    const numbersRegex = new RegExp(/^(\d+)?([.]?\d{0,2})?$/);

    if (numbersRegex.test(e.target.value) || Number(e.target.value)) {
      changeNewPriceOrPercent(e.target.value);
    }
  };

  const handleAddItemClick = () => {
    toggleModal();
    const clone = [...sectionArr];
    clone.push({ name: newName, price: Number(newPriceOrPercent) });

    let allPricesClone = cloneDeep(allCurrentPrices);

    if (sectionTitle === "Main Treatments") {
      allPricesClone["facials"] = clone;
    } else if (sectionTitle === "Add Ons") {
      allPricesClone["addOns"] = clone;
    } else {
      allPricesClone["extras"] = clone;
    }

    if (!bottomButtonsVisible) {
      changeBottomButtonsVisible(true);
    }

    changeNewName("");
    changeNewPriceOrPercent("");
    changeAllCurrentPrices(allPricesClone);
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
        <br />
        {sectionTitle === "Extras" ? (
          <>
            <InputGroup className="percent_radio">
              <Input
                type="radio"
                name="percent_radio"
                onClick={() => changePercentageSelection("percentageOfPay")}
                checked={percentageSelection === "percentageOfPay"}
              />
              <p>Percentage of pay</p>
            </InputGroup>
            <InputGroup className="percent_radio">
              <Input
                type="radio"
                name="percent_radio"
                onClick={() =>
                  changePercentageSelection("percentageSubtracted")
                }
                checked={percentageSelection === "percentageSubtracted"}
              />
              <p>Percentage subtracted from pay</p>
            </InputGroup>
          </>
        ) : null}
      </ModalBody>
      <ModalFooter>
        <Button
          disabled={
            !newName ||
            !newPriceOrPercent ||
            (sectionTitle === "Extras" ? !percentageSelection : null)
          }
          color="primary"
          onClick={handleAddItemClick}
        >
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
