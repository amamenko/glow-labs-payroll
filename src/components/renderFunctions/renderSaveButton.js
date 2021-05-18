import isEqual from "lodash/isEqual";
import { Button } from "reactstrap";
/* eslint-disable no-useless-escape */

export const renderSaveButton = (sectionTitle, allInitialPrices, allCurrentPrices) => {
    const mapToStringFunction = (item, priceOrPercent) => {
        return {
            name: item.name,
            price: JSON.stringify(item[priceOrPercent]).replace(/\"/g, ""),
        };
    }


    if (sectionTitle !== "Total") {
        if (sectionTitle === "Main Treatments") {
            if (allInitialPrices && allCurrentPrices) {
                const changesMade = !isEqual(
                    allInitialPrices.facials.map((item) => mapToStringFunction(item, "price")),
                    allCurrentPrices.facials.map(((item) => mapToStringFunction(item, "price")))
                );

                if (changesMade) {
                    return (
                        <Button color="primary">Save Changes</Button>
                    )
                }
            }
        } else if (sectionTitle === "Add Ons") {
            if (allInitialPrices && allCurrentPrices) {
                const changesMade = !isEqual(
                    allInitialPrices.addOns.map((item) => mapToStringFunction(item, "price")),
                    allCurrentPrices.addOns.map(((item) => mapToStringFunction(item, "price")))
                );

                if (changesMade) {
                    return (
                        <Button color="primary">Save Changes</Button>
                    )
                }
            }
        } else {
            if (sectionTitle === "Extras") {
                if (allInitialPrices && allCurrentPrices) {
                    const changesMade = !isEqual(
                        allInitialPrices.extras.map((item) => mapToStringFunction(item, "percent")),
                        allCurrentPrices.extras.map(((item) => mapToStringFunction(item, "percent")))
                    );

                    if (changesMade) {
                        return (
                            <Button color="primary">Save Changes</Button>
                        )
                    }
                }
            }
        }
    }
}