import React, { useEffect, useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button,
} from "reactstrap";
import { renderInputLegend } from "./renderFunctions/renderInputLegend";
import { renderSaveButton } from "./renderFunctions/renderSaveButton";
import { renderSection } from "./renderFunctions/renderSection";
import { IoMdAddCircleOutline } from "react-icons/io";

const InputSection = (props) => {
  const {
    sectionTitle,
    sectionArr,
    tips,
    changeTips,
    products,
    changeProducts,
    facialPrices,
    addOnPrices,
    numberOfMainServices,
    changeNumberOfMainServices,
    numberOfAddOns,
    changeNumberOfAddOns,
    changeTotalFacialPrice,
    totalAddOnPrice,
    changeTotalAddOnPrice,
    currentExtrasPrices,
    changeCurrentExtrasPrices,
    currentFacialPrices,
    changeCurrentFacialPrices,
    changeCurrentAddOnPrices,
    allCurrentPrices,
    changeAllCurrentPrices,
    allInitialPrices,
    currentEsthetician,
    changeAllInitialPrices,
  } = props;

  const [spinnerLoading, changeSpinnerLoading] = useState(false);

  useEffect(() => {
    if (numberOfMainServices) {
      const totalPrice = numberOfMainServices
        .map((item, i) => {
          if (facialPrices) {
            return Number(item) * Number(facialPrices[i].price);
          } else {
            return null;
          }
        })
        .reduce((a, b) => a + b, 0);

      changeTotalFacialPrice(totalPrice);
    }
  }, [facialPrices, numberOfMainServices, changeTotalFacialPrice]);

  useEffect(() => {
    if (numberOfAddOns) {
      const totalPrice = numberOfAddOns
        .map((item, i) => {
          if (addOnPrices[i]) {
            return Number(item) * Number(addOnPrices[i].price);
          } else {
            return 0;
          }
        })
        .reduce((a, b) => a + b, 0);

      changeTotalAddOnPrice(totalPrice);
    }
  }, [addOnPrices, numberOfAddOns, changeTotalAddOnPrice]);

  return (
    <>
      <h2 className="section_title">{sectionTitle}</h2>
      {sectionTitle !== "Total" && renderInputLegend(sectionTitle)}
      {renderSection(
        sectionArr,
        sectionTitle,
        allCurrentPrices,
        changeAllCurrentPrices,
        numberOfMainServices,
        changeNumberOfMainServices,
        numberOfAddOns,
        changeNumberOfAddOns,
        changeCurrentFacialPrices,
        changeCurrentAddOnPrices,
        changeCurrentExtrasPrices,
        tips,
        changeTips,
        products,
        changeProducts
      )}
      {sectionTitle === "Main Treatments" ? (
        <>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <b>Total Facials</b>
              </InputGroupText>
            </InputGroupAddon>
            <Input readOnly className="disabled_input" />
            <Input
              className="subtotal_input"
              value={numberOfMainServices.reduce(
                (a, b) => Number(a) + Number(b),
                0
              )}
              readOnly
            />
          </InputGroup>
          <br />
        </>
      ) : null}
      <div className="section_button_container">
        {renderSaveButton(
          sectionTitle,
          allInitialPrices,
          changeAllInitialPrices,
          allCurrentPrices,
          changeAllCurrentPrices,
          currentEsthetician,
          sectionArr,
          changeCurrentFacialPrices
            ? changeCurrentFacialPrices
            : changeCurrentAddOnPrices
            ? changeCurrentAddOnPrices
            : changeCurrentExtrasPrices
            ? changeCurrentExtrasPrices
            : null,
          spinnerLoading,
          changeSpinnerLoading
        )}
        {sectionTitle !== "Total" ? (
          <Button outline color="secondary" className="section_button">
            <IoMdAddCircleOutline /> Add Line Item
          </Button>
        ) : null}
      </div>
      {sectionTitle === "Total" ? (
        <>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <b>Base Pay ($)</b>
              </InputGroupText>
            </InputGroupAddon>
            <Input
              maxLength={15}
              className="subtotal_input"
              value={
                currentFacialPrices
                  ? currentFacialPrices[0]
                    ? (
                        numberOfMainServices.reduce(
                          (a, b) => Number(a) + Number(b),
                          0
                        ) * currentFacialPrices[0].price
                      ).toFixed(2)
                    : 0
                  : 0
              }
              readOnly
            />
          </InputGroup>
          <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <b>Additional Pay ($)</b>
              </InputGroupText>
            </InputGroupAddon>
            <Input
              maxLength={15}
              className="subtotal_input"
              value={(
                Number(totalAddOnPrice) +
                (currentExtrasPrices
                  ? currentExtrasPrices[1]
                    ? Number(products) * (currentExtrasPrices[1].percent / 100)
                    : 0
                  : 0) +
                numberOfMainServices
                  .map((item, i) => {
                    let difference = 0;

                    if (currentFacialPrices[i]) {
                      difference =
                        item * currentFacialPrices[i].price -
                        currentFacialPrices[0].price;
                    }

                    if (difference > 0) {
                      return difference;
                    } else {
                      return 0;
                    }
                  })
                  .reduce((a, b) => a + b, 0)
              ).toFixed(2)}
              readOnly
            />
          </InputGroup>
          <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <b>Paycheck Tips ($)</b>
              </InputGroupText>
            </InputGroupAddon>
            <Input
              maxLength={15}
              className="subtotal_input"
              value={(currentExtrasPrices
                ? currentExtrasPrices[0]
                  ? Number(tips) *
                    ((100 - currentExtrasPrices[0].percent) / 100)
                  : 0
                : 0
              ).toFixed(2)}
              readOnly
            />
          </InputGroup>
          <br />
        </>
      ) : null}
    </>
  );
};

export default InputSection;
