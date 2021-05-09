import React from "react";
import Select from "react-select";
import "./NavigationBar.scss";

const NavigationBar = (props) => {
  const {
    currentEsthetician,
    changeCurrentEsthetician,
    estheticianResults,
  } = props;

  const options =
    estheticianResults &&
    estheticianResults
      .map((item) => {
        return {
          value: item.name,
          label: item.name,
        };
      })
      .sort((a, b) => a.value.localeCompare(b.value));

  const customStyles = {
    option: (provided, state) => {
      return {
        ...provided,
        background:
          state.isFocused && state.data.value !== currentEsthetician
            ? "rgba(178,212,255, 0.4)"
            : state.data.value === currentEsthetician
            ? "rgb(178,212,255)"
            : "#fff",
      };
    },
  };

  return (
    <div className="navigation_bar">
      <div className="logo_container">Glow Labs Payroll</div>
      <Select
        styles={customStyles}
        value={currentEsthetician}
        placeholder={currentEsthetician}
        className="esthetician_select_container"
        options={options}
        onChange={(item) => changeCurrentEsthetician(item.value)}
      />
    </div>
  );
};

export default NavigationBar;
