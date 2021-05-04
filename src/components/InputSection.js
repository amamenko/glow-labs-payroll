import React from "react";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";

const InputSection = (props) => {
  const {
    sectionTitle,
    sectionArr,
    tips,
    changeTips,
    products,
    changeProducts,
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

  const handleInputChange = (e, sectionTitle, name) => {
    if (sectionTitle === "Extras") {
      if (e.target.value.includes(".")) {
        if (e.target.value.length > e.target.value.indexOf(".") + 3) {
          return null;
        }
      }

      if (e.target.value.length === 1 && e.target.value[0] === 0) {
        if (name === "Tips") {
          changeTips(e.target.value);
        } else if (name === "Products") {
          changeProducts(e.target.value);
        } else {
          return null;
        }
      } else if (e.target.value.length > 1 && e.target.value.indexOf(".") < 0) {
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
      return Number(e.target.value);
    }
  };

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
                  maxLength={10}
                  value={
                    item.percent
                      ? item.percent.toFixed(2)
                      : item.price.toFixed(2)
                  }
                />
                <Input
                  maxLength={10}
                  onChange={(e) =>
                    handleInputChange(e, sectionTitle, item.name)
                  }
                  value={
                    item.name === "Tips"
                      ? tips
                      : item.name === "Products"
                      ? products
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
            <Input />
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
              value={(Number(tips) + Number(products)).toFixed(2)}
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
