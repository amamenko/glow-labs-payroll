import React, { useState } from "react";
import InputSection from "./components/InputSection";
import "./App.scss";

const App = () => {
  const [tips, changeTips] = useState(0);
  const [products, changeProducts] = useState(0);

  const facialPrices = [
    {
      name: "Facial",
      price: 23,
    },
    {
      name: "Dermaplaning",
      price: 34,
    },
    {
      name: "Chem Peel",
      price: 30,
    },
    {
      name: "Bacial",
      price: 26,
    },
    {
      name: "Microneedling",
      price: 50,
    },
    {
      name: "CBD Facial",
      price: 25,
    },
    {
      name: "Hydra Jet Peel",
      price: 60,
    },
  ];

  const addOnPrices = [
    {
      name: "Extra Massage Time",
      price: 5,
    },
    {
      name: "Extra Extraction Time",
      price: 3,
    },
    {
      name: "Party Prep Mini Peel",
      price: 5,
    },
    {
      name: "Microdermabrasion",
      price: 4,
    },
    {
      name: "Beard Deep Cleanse",
      price: 6,
    },
    {
      name: "Dermarolling",
      price: 2,
    },
    {
      name: "Gua Sha",
      price: 8,
    },
    {
      name: "Hydroboost",
      price: 2,
    },
    {
      name: "LED Extra Time",
      price: 2,
    },
    {
      name: "Microcurrent",
      price: 4,
    },
  ];

  return (
    <div className="app_container">
      <div>
        <InputSection
          sectionTitle={"Main Treatments"}
          sectionArr={facialPrices}
        />
        <InputSection sectionTitle={"Add Ons"} sectionArr={addOnPrices} />
      </div>
      <div>
        <InputSection
          sectionTitle={"Extras"}
          sectionArr={[
            { name: "Tips", percent: 3 },
            { name: "Products", percent: 10 },
          ]}
          tips={tips}
          changeTips={changeTips}
          products={products}
          changeProducts={changeProducts}
        />
      </div>
      <div>
        <InputSection sectionTitle={"Total"}
          tips={tips}
          products={products}
        />
      </div>
    </div>
  );
};

export default App;
