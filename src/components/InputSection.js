import React from "react";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";

const InputSection = (props) => {
  const { sectionTitle, sectionArr } = props;

  const renderInputLegend = () => {
    return (
      <div className="input_legend">
        <p>Treatment</p>
        <p>Commissions</p>
        <p># of Services</p>
      </div>
    );
  };

  return (
    <>
      <h2 className="section_title">{sectionTitle}</h2>
      {renderInputLegend()}
      {sectionArr.map((item) => {
        return (
          <>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>{item.name}</InputGroupText>
              </InputGroupAddon>
              <Input value={"$" + item.price} />
              <Input />
            </InputGroup>
            <br />
          </>
        );
      })}
    </>
  );
};

export default InputSection;
