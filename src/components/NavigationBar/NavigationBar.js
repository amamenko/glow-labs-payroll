import React from "react";
import Select from "react-select";
import "./NavigationBar.scss";

const NavigationBar = () => {
  const options = [
    { value: "Nayla", label: "Nayla" },
    { value: "Nicole", label: "Nicole" },
    { value: "Erin", label: "Erin" },
    { value: "Jenna", label: "Jenna" },
  ];

  return (
    <div className="navigation_bar">
      <div className="logo_container">Glow Labs Payroll</div>
      <Select className="esthetician_select_container" options={options} />
    </div>
  );
};

export default NavigationBar;
