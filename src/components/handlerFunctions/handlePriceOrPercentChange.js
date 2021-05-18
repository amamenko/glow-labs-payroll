import cloneDeep from "lodash/cloneDeep";

export const handlePriceOrPercentChange = (
    e,
    sectionTitle,
    priceOrPercent,
    index,
    sectionArr,
    allCurrentPrices, 
    changeAllCurrentPrices,
    sectionChangeFn
  ) => {
    let allPricesClone = cloneDeep(allCurrentPrices);
    const numbersRegex = new RegExp(/^(\d+)?([.]?\d{0,2})?$/);

    const changeSectionFunction = (arr, changeFn) => {
      if (numbersRegex.test(e.target.value) || Number(e.target.value)) {
        let newSection = arr;

        if (priceOrPercent === "price") {
          newSection[index].price = e.target.value;
        } else {
          newSection[index].percent = e.target.value;
        }

        allPricesClone.section = newSection;

        changeAllCurrentPrices(allPricesClone);
        changeFn(newSection);
      }
    };

    if (priceOrPercent === "price") {
      if (sectionTitle === "Main Treatments") {
        changeSectionFunction(sectionArr, sectionChangeFn);
      } else {
        if (sectionTitle === "Add Ons") {
          changeSectionFunction(sectionArr, sectionChangeFn);
        }
      }
    } else {
      if (sectionTitle === "Extras") {
        changeSectionFunction(sectionArr, sectionChangeFn);
      }
    }
  };