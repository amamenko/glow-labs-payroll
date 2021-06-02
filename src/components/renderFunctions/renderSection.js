import { handleDeleteItem } from "../handlerFunctions/handleDeleteItem";
import { handleInputChange } from "../handlerFunctions/handleInputChange";
import { handlePriceOrPercentChange } from "../handlerFunctions/handlePriceOrPercentChange";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";

export const renderSection = (
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
  changeProducts,
  bottomButtonsVisible,
  changeBottomButtonsVisible
) => {
  if (sectionArr) {
    return sectionArr.map((item, i) => {
      const priceOrPercent = sectionTitle === "Extras" ? "percent" : "price";

      const priceOrPercentValue = item.percent ? item.percent : item.price;

      return (
        <div key={i}>
          <InputGroup className="section_input_group">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>{item.name}</InputGroupText>
            </InputGroupAddon>
            <Input
              maxLength={8}
              value={priceOrPercentValue ? priceOrPercentValue : ""}
              onChange={(e) =>
                handlePriceOrPercentChange(
                  e,
                  sectionTitle,
                  priceOrPercent,
                  i,
                  sectionArr,
                  allCurrentPrices,
                  changeAllCurrentPrices,
                  sectionTitle === "Main Treatments"
                    ? changeCurrentFacialPrices
                    : sectionTitle === "Add Ons"
                    ? changeCurrentAddOnPrices
                    : changeCurrentExtrasPrices,
                  bottomButtonsVisible,
                  changeBottomButtonsVisible
                )
              }
            />
            <Input
              maxLength={8}
              onChange={(e) =>
                handleInputChange(
                  e,
                  sectionTitle,
                  item.name,
                  i,
                  changeTips,
                  changeProducts,
                  numberOfMainServices,
                  changeNumberOfMainServices,
                  numberOfAddOns,
                  changeNumberOfAddOns
                )
              }
              value={
                item.name === "Tips"
                  ? tips
                  : item.name === "Products"
                  ? products
                  : sectionTitle === "Main Treatments"
                  ? numberOfMainServices
                    ? numberOfMainServices[i] || numberOfMainServices[i] === 0
                      ? numberOfMainServices[i]
                      : ""
                    : ""
                  : numberOfAddOns
                  ? numberOfAddOns[i] || numberOfAddOns[i] === 0
                    ? numberOfAddOns[i]
                    : ""
                  : ""
              }
            />
            {item.name === "Tips" ||
            item.name === "Products" ||
            item.name === "Facial" ? null : (
              <RiDeleteBin5Fill
                fill="#cb2431"
                onClick={() =>
                  handleDeleteItem(
                    sectionTitle,
                    i,
                    allCurrentPrices,
                    changeAllCurrentPrices,
                    sectionTitle === "Main Treatments"
                      ? changeCurrentFacialPrices
                      : sectionTitle === "Add Ons"
                      ? changeCurrentAddOnPrices
                      : changeCurrentExtrasPrices,
                    bottomButtonsVisible,
                    changeBottomButtonsVisible
                  )
                }
              />
            )}
          </InputGroup>
          <br />
        </div>
      );
    });
  }
};
