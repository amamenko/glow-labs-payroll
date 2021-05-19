import isEqual from "lodash/isEqual";
import { Button } from "reactstrap";
import { createClient } from "contentful-management";
import { Spinner } from "reactstrap";
import { RiDeleteBinLine, RiSave2Line } from "react-icons/ri";
/* eslint-disable no-useless-escape */

export const renderSaveButton = (
    sectionTitle,
    allInitialPrices,
    changeAllInitialPrices,
    allCurrentPrices,
    changeAllCurrentPrices,
    currentEsthetician,
    sectionArr,
    changeSectionArr,
    spinnerLoading,
    changeSpinnerLoading
) => {
    const mapToStringFunction = (item, priceOrPercent) => {
        return {
            name: item.name,
            price: JSON.stringify(item[priceOrPercent]).replace(/\"/g, ""),
        };
    };

    const handleSaveClick = () => {
        changeSpinnerLoading(true);

        const client = createClient({
            accessToken: process.env.REACT_APP_CONTENTFUL_MANAGEMENT_TOKEN,
        });

        client.getSpace(process.env.REACT_APP_CONTENTFUL_SPACE_ID).then((space) => {
            space.getEnvironment("master").then((environment) => {
                environment.getEntries().then((entries) => {
                    const namesArr = entries.items.map(
                        (item) => item.fields.name["en-US"]
                    );
                    const currentIndex = namesArr.indexOf(currentEsthetician);

                    if (currentIndex >= 0) {
                        const currentID = entries.items[currentIndex].sys.id;

                        environment.getEntry(currentID).then((entry) => {
                            entry.fields[
                                sectionTitle === "Main Treatments"
                                    ? "facials"
                                    : sectionTitle === "Add Ons"
                                        ? "addOns"
                                        : "extras"
                            ] = {
                                "en-US": sectionArr.map((item) => {
                                    if (sectionTitle !== "Extras") {
                                        return { name: item.name, price: Number(item.price) };
                                    } else {
                                        return { name: item.name, percent: Number(item.percent) };
                                    }
                                }),
                            };

                            entry.update().then(() => {
                                environment.getEntry(currentID).then((updatedEntry) => {
                                    updatedEntry.publish();

                                    const initialPriceClone = { ...allInitialPrices };

                                    if (sectionTitle === "Main Treatments") {
                                        initialPriceClone.facials =
                                            updatedEntry.fields.facials["en-US"];
                                    } else if (sectionTitle === "Add Ons") {
                                        initialPriceClone.addOns =
                                            updatedEntry.fields.addOns["en-US"];
                                    } else {
                                        initialPriceClone.extras =
                                            updatedEntry.fields.extras["en-US"];
                                    }

                                    changeAllInitialPrices(initialPriceClone);
                                    changeAllCurrentPrices(initialPriceClone);

                                    changeSpinnerLoading(false);
                                });
                            });
                        });
                    } else {
                        changeSpinnerLoading(false);
                    }
                });
            });
        });
    };

    const handleResetClick = () => {
        changeAllInitialPrices(allInitialPrices);
        changeAllCurrentPrices(allInitialPrices);
        
        if (sectionTitle === "Main Treatments") {
            if (changeSectionArr) {
                changeSectionArr(allInitialPrices.facials)
            }
        } else if (sectionTitle === "Add Ons") {
            if (changeSectionArr) {
                changeSectionArr(allInitialPrices.addOns)
            }
        } else {
            if (changeSectionArr) {
                changeSectionArr(allInitialPrices.extras)
            }
        }
    }

    const showButtons = () => {
        return (
            <>
                <div className="save_button_container">
                    <Button className="section_button" color="primary" onClick={handleSaveClick}>
                        <RiSave2Line /> Save Changes
              </Button>
                    {spinnerLoading ? <Spinner color="primary" /> : null}
                </div>
                <div className="save_button_container">
                    <Button className="section_button" outline color="danger" onClick={handleResetClick}>
                        <RiDeleteBinLine />  Discard Changes
              </Button>
                </div>
            </>
        );
    }

    if (sectionTitle !== "Total") {
        if (sectionTitle === "Main Treatments") {
            if (allInitialPrices && allCurrentPrices) {
                const changesMade = !isEqual(
                    allInitialPrices.facials.map((item) =>
                        mapToStringFunction(item, "price")
                    ),
                    allCurrentPrices.facials.map((item) =>
                        mapToStringFunction(item, "price")
                    )
                );

                if (changesMade) {
                    return showButtons();
                }
            }
        } else if (sectionTitle === "Add Ons") {
            if (allInitialPrices && allCurrentPrices) {
                const changesMade = !isEqual(
                    allInitialPrices.addOns.map((item) =>
                        mapToStringFunction(item, "price")
                    ),
                    allCurrentPrices.addOns.map((item) =>
                        mapToStringFunction(item, "price")
                    )
                );

                if (changesMade) {
                    return showButtons();
                }
            }
        } else {
            if (sectionTitle === "Extras") {
                if (allInitialPrices && allCurrentPrices) {
                    const changesMade = !isEqual(
                        allInitialPrices.extras.map((item) =>
                            mapToStringFunction(item, "percent")
                        ),
                        allCurrentPrices.extras.map((item) =>
                            mapToStringFunction(item, "percent")
                        )
                    );

                    if (changesMade) {
                        return showButtons();
                    }
                }
            }
        }
    }
};
