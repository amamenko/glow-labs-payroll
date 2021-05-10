import React, { useEffect } from "react";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";

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
    totalFacialPrice,
    changeTotalFacialPrice,
    totalAddOnPrice,
    changeTotalAddOnPrice,
    currentExtrasPrices,
  } = props;

  const renderInputLegend = () => {
    return (
      <div className="input_legend">
        <p>
          {sectionTitle === "Main Treatments" || sectionTitle === "Add Ons"
            ? "Treatment"
            : ""}
        </p>
        <p>
          {sectionTitle === "Main Treatments" || sectionTitle === "Add Ons"
            ? "Commissions ($)"
            : "Withheld (%)"}
        </p>
        <p>
          {sectionTitle === "Main Treatments" || sectionTitle === "Add Ons"
            ? "# of Services"
            : "Total Cash ($)"}
        </p>
      </div>
    );
  };

  const handleInputChange = (e, sectionTitle, name, i) => {
    if (sectionTitle === "Extras") {
      if (e.target.value.includes(".")) {
        if (e.target.value.length > e.target.value.indexOf(".") + 3) {
          return null;
        } else {
          if (e.target.value.indexOf(".") === e.target.value.lastIndexOf(".")) {
            if (name === "Tips") {
              changeTips(e.target.value);
            } else if (name === "Products") {
              changeProducts(e.target.value);
            } else {
              return null;
            }
          }
        }
      } else if (isNaN(Number(e.target.value))) {
        return null;
      } else if (e.target.value.length === 1 && e.target.value[0] === 0) {
        if (name === "Tips") {
          changeTips(e.target.value);
        } else if (name === "Products") {
          changeProducts(e.target.value);
        } else {
          return null;
        }
      } else if (e.target.value.indexOf(".") < 0) {
        if (name === "Tips") {
          changeTips(Number(e.target.value));
        } else if (name === "Products") {
          changeProducts(Number(e.target.value));
        } else {
          return null;
        }
      } else if (Number(e.target.value) || Number(e.target.value) === 0) {
        const twoDecimalPlaces = e.target.value.toLocaleString(undefined, {
          minimumFractionDigits: 2,
        });

        if (name === "Tips") {
          changeTips(twoDecimalPlaces);
        } else if (name === "Products") {
          changeProducts(twoDecimalPlaces);
        } else {
          return null;
        }
      } else {
        return null;
      }
      return null;
    } else {
      let arrCopy;

      if (sectionTitle === "Main Treatments") {
        arrCopy = numberOfMainServices.slice();
      } else {
        arrCopy = numberOfAddOns.slice();
      }

      if (e.target.value === "0") {
        arrCopy[i] = 0;
      } else if (Number(e.target.value)) {
        arrCopy[i] = Number(e.target.value);
      } else {
        arrCopy[i] = "";
      }

      if (sectionTitle === "Main Treatments") {
        changeNumberOfMainServices(arrCopy);
      } else {
        changeNumberOfAddOns(arrCopy);
      }
    }
  };

  useEffect(() => {
    if (numberOfMainServices) {
      const totalPrice = numberOfMainServices
        .map((item, i) => Number(item) * Number(facialPrices[i].price))
        .reduce((a, b) => a + b, 0);

      changeTotalFacialPrice(totalPrice);
    }
  }, [facialPrices, numberOfMainServices, changeTotalFacialPrice]);

  useEffect(() => {
    if (numberOfAddOns) {
      const totalPrice = numberOfAddOns
        .map((item, i) => Number(item) * Number(addOnPrices[i].price))
        .reduce((a, b) => a + b, 0);

      changeTotalAddOnPrice(totalPrice);
    }
  }, [addOnPrices, numberOfAddOns, changeTotalAddOnPrice]);

  return (
    <>
      <h2 className="section_title">{sectionTitle}</h2>
      {sectionTitle !== "Total" && renderInputLegend()}
      {sectionArr &&
        sectionArr.map((item, i) => {
          return (
            <div key={i}>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>{item.name}</InputGroupText>
                </InputGroupAddon>
                <Input
                  maxLength={8}
                  value={
                    item.percent
                      ? item.percent.toFixed(2)
                      : item.price.toFixed(2)
                  }
                />
                <Input
                  maxLength={8}
                  onChange={(e) =>
                    handleInputChange(e, sectionTitle, item.name, i)
                  }
                  value={
                    item.name === "Tips"
                      ? tips
                      : item.name === "Products"
                      ? products
                      : sectionTitle === "Main Treatments"
                      ? numberOfMainServices[i] || numberOfMainServices[i] === 0
                        ? numberOfMainServices[i]
                        : ""
                      : numberOfAddOns[i] || numberOfAddOns[i] === 0
                      ? numberOfAddOns[i]
                      : ""
                  }
                />
              </InputGroup>
              <br />
            </div>
          );
        })}
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
      {sectionTitle === "Total" ? (
        <>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <b>Subtotal ($)</b>
              </InputGroupText>
            </InputGroupAddon>
            <Input
              maxLength={15}
              className="subtotal_input"
              value={(
                Number(totalFacialPrice) +
                Number(totalAddOnPrice) +
                (currentExtrasPrices
                  ? Number(tips) *
                    ((100 - currentExtrasPrices[0].percent) / 100)
                  : 0) +
                (currentExtrasPrices
                  ? Number(products) *
                    ((100 - currentExtrasPrices[1].percent) / 100)
                  : 0)
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
