

export const handleInputChange = (
    e,
    sectionTitle,
    name,
    i,
    changeTips,
    changeProducts,
    numberOfMainServices,
    changeNumberOfMainServices,
    numberOfAddOns,
    changeNumberOfAddOns
) => {
    if (sectionTitle === "Extras") {
        if (e.target.value.includes(".")) {
            if (e.target.value.length > e.target.value.indexOf(".") + 3) {
                return null;
            } else {
                if (e.target.value.indexOf(".") === e.target.value.lastIndexOf(".")) {
                    if (name === "Tips") {
                        changeTips(e.target.value);
                    } else if (name === "Products") {
                        changeProducts(e.target.value);
                    } else {
                        return null;
                    }
                }
            }
        } else if (isNaN(Number(e.target.value))) {
            return null;
        } else if (e.target.value.length === 1 && e.target.value[0] === 0) {
            if (name === "Tips") {
                changeTips(e.target.value);
            } else if (name === "Products") {
                changeProducts(e.target.value);
            } else {
                return null;
            }
        } else if (e.target.value.indexOf(".") < 0) {
            if (name === "Tips") {
                changeTips(Number(e.target.value));
            } else if (name === "Products") {
                changeProducts(Number(e.target.value));
            } else {
                return null;
            }
        } else if (Number(e.target.value) || Number(e.target.value) === 0) {
            const twoDecimalPlaces = e.target.value.toLocaleString(undefined, {
                minimumFractionDigits: 2,
            });

            if (name === "Tips") {
                changeTips(twoDecimalPlaces);
            } else if (name === "Products") {
                changeProducts(twoDecimalPlaces);
            } else {
                return null;
            }
        } else {
            return null;
        }
        return null;
    } else {
        let arrCopy;

        if (sectionTitle === "Main Treatments") {
            arrCopy = numberOfMainServices.slice();
        } else {
            arrCopy = numberOfAddOns.slice();
        }

        if (e.target.value === "0") {
            arrCopy[i] = 0;
        } else if (Number(e.target.value)) {
            arrCopy[i] = Number(e.target.value);
        } else {
            arrCopy[i] = "";
        }

        if (sectionTitle === "Main Treatments") {
            changeNumberOfMainServices(arrCopy);
        } else {
            changeNumberOfAddOns(arrCopy);
        }
    }
}; 