import React, { useEffect, useState } from "react";
import InputSection from "./components/InputSection";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import axios from "axios";
import "./App.scss";

const App = () => {
  const [tips, changeTips] = useState(0);
  const [products, changeProducts] = useState(0);
  const [numberOfMainServices, changeNumberOfMainServices] = useState([]);
  const [numberOfAddOns, changeNumberOfAddOns] = useState([]);
  const [totalFacialPrice, changeTotalFacialPrice] = useState(0);
  const [totalAddOnPrice, changeTotalAddOnPrice] = useState(0);
  const [estheticianResults, changeEstheticianResults] = useState("");

  // Current Esthetician Price Data
  const [currentEsthetician, changeCurrentEsthetician] = useState("");
  const [currentFacialPrices, changeCurrentFacialPrices] = useState("");
  const [currentAddOnPrices, changeCurrentAddOnPrices] = useState("");
  const [currentExtrasPrices, changeCurrentExtrasPrices] = useState("");

  useEffect(() => {
    if (currentFacialPrices) {
      changeNumberOfMainServices(
        new Array(currentFacialPrices.length).fill("")
      );
    }
  }, [currentFacialPrices]);

  console.log(numberOfMainServices);

  useEffect(() => {
    const estheticianQuery = `
      query {
        estheticianCollection {
          items {
            name
            facials 
            addOns
            extras
          }
        }
      }
    `;

    axios({
      url: `https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}`,
      method: "post",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN}`,
      },
      data: {
        query: estheticianQuery,
      },
    })
      .then((res) => res.data)
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }

        if (data) {
          if (data.estheticianCollection) {
            if (data.estheticianCollection.items) {
              changeEstheticianResults(data.estheticianCollection.items);

              if (data.estheticianCollection.items[0].name) {
                changeCurrentEsthetician(
                  data.estheticianCollection.items.sort((a, b) =>
                    a.name.localeCompare(b.name)
                  )[0].name
                );
              }
            }
          }
        }
      });
  }, []);

  useEffect(() => {
    if (estheticianResults) {
      changeTips(0);
      changeProducts(0);

      const filteredEsthetician = estheticianResults.filter(
        (esthetician) => esthetician.name === currentEsthetician
      );

      if (filteredEsthetician) {
        if (filteredEsthetician[0]) {
          changeCurrentFacialPrices(filteredEsthetician[0].facials);
          changeCurrentAddOnPrices(filteredEsthetician[0].addOns);
          changeCurrentExtrasPrices(filteredEsthetician[0].extras);
        }
      }
    }
  }, [currentEsthetician, estheticianResults]);

  useEffect(() => {
    if (currentAddOnPrices) {
      changeNumberOfAddOns(new Array(currentAddOnPrices.length).fill(""));
    }
  }, [currentAddOnPrices]);

  return (
    <>
      <NavigationBar
        currentEsthetician={currentEsthetician}
        changeCurrentEsthetician={changeCurrentEsthetician}
        estheticianResults={estheticianResults}
      />
      <div className="app_container">
        <div>
          <InputSection
            sectionTitle={"Main Treatments"}
            sectionArr={currentFacialPrices}
            numberOfMainServices={numberOfMainServices}
            changeNumberOfMainServices={changeNumberOfMainServices}
            facialPrices={currentFacialPrices}
            addOnPrices={currentAddOnPrices}
            totalFacialPrice={totalFacialPrice}
            changeTotalFacialPrice={changeTotalFacialPrice}
            totalAddOnPrice={totalAddOnPrice}
            changeTotalAddOnPrice={changeTotalAddOnPrice}
          />
        </div>
        <div>
          <InputSection
            sectionTitle={"Add Ons"}
            sectionArr={currentAddOnPrices}
            numberOfAddOns={numberOfAddOns}
            changeNumberOfAddOns={changeNumberOfAddOns}
            facialPrices={currentFacialPrices}
            addOnPrices={currentAddOnPrices}
            changeTotalAddOnPrice={changeTotalAddOnPrice}
          />
        </div>
        <div>
          <InputSection
            sectionTitle={"Extras"}
            sectionArr={currentExtrasPrices}
            tips={tips}
            changeTips={changeTips}
            products={products}
            changeProducts={changeProducts}
            totalFacialPrice={totalFacialPrice}
            changeTotalFacialPrice={changeTotalFacialPrice}
            totalAddOnPrice={totalAddOnPrice}
            changeTotalAddOnPrice={changeTotalAddOnPrice}
          />
        </div>
        <div>
          <InputSection
            sectionTitle={"Total"}
            totalFacialPrice={totalFacialPrice}
            changeTotalFacialPrice={changeTotalFacialPrice}
            totalAddOnPrice={totalAddOnPrice}
            changeTotalAddOnPrice={changeTotalAddOnPrice}
            currentExtrasPrices={currentExtrasPrices}
            currentFacialPrices={currentFacialPrices}
            tips={tips}
            products={products}
            numberOfMainServices={numberOfMainServices}
          />
        </div>
      </div>
    </>
  );
};

export default App;
