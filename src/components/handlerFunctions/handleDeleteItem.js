import cloneDeep from "lodash/cloneDeep";

export const handleDeleteItem =
    (
        sectionTitle,
        index,
        allCurrentPrices,
        changeAllCurrentPrices,
        sectionChangeFn
    ) => {
        let allPricesClone = cloneDeep(allCurrentPrices);

        const changeSectionFunction = (section, changeFn) => {
            allPricesClone[section].splice(index, 1);

            changeAllCurrentPrices(allPricesClone);
            changeFn(allPricesClone[section]);
        };

        if (sectionTitle === "Main Treatments") {
            changeSectionFunction("facials", sectionChangeFn);
        } else if (sectionTitle === "Add Ons") {
            changeSectionFunction("addOns", sectionChangeFn);
        } else {
            if (sectionTitle === "Extras") {
                changeSectionFunction("extras", sectionChangeFn);
            }
        }
    };