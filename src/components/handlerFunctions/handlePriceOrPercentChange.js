import cloneDeep from "lodash/cloneDeep";

export const handlePriceOrPercentChange = (
  e,
  sectionTitle,
  priceOrPercent,
  index,
  sectionArr,
  allCurrentPrices,
  changeAllCurrentPrices,
  sectionChangeFn,
  bottomButtonsVisible,
  changeBottomButtonsVisible
) => {
  const numbersRegex = new RegExp(/^(\d+)?([.]?\d{0,2})?$/);

  const changeSectionFunction = (section, arr, changeFn) => {
    if (!bottomButtonsVisible) {
      changeBottomButtonsVisible(true);
    }

    let allPricesClone = cloneDeep(allCurrentPrices);

    if (numbersRegex.test(e.target.value) || Number(e.target.value)) {
      let newSection = arr;

      if (priceOrPercent === "price") {
        newSection[index].price = e.target.value;
      } else {
        newSection[index].percent = e.target.value;
      }

      allPricesClone[section] = newSection;

      changeAllCurrentPrices(allPricesClone);
      changeFn(newSection);
    }
  };

  if (priceOrPercent === "price") {
    if (sectionTitle === "Main Treatments") {
      changeSectionFunction("facials", sectionArr, sectionChangeFn);
    } else {
      if (sectionTitle === "Add Ons") {
        changeSectionFunction("addOns", sectionArr, sectionChangeFn);
      }
    }
  } else {
    if (sectionTitle === "Extras") {
      changeSectionFunction("extras", sectionArr, sectionChangeFn);
    }
  }
};
