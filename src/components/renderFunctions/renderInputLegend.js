export const renderInputLegend = (sectionTitle) => {
    return (
      <div className="input_legend">
        <p>
          {sectionTitle === "Main Treatments" || sectionTitle === "Add Ons"
            ? "Treatment"
            : ""}
        </p>
        <p>
          {sectionTitle === "Main Treatments" || sectionTitle === "Add Ons"
            ? "Commissions ($)"
            : "Percentage (%)"}
        </p>
        <p>
          {sectionTitle === "Main Treatments" || sectionTitle === "Add Ons"
            ? "# of Services"
            : "Total Cash ($)"}
        </p>
      </div>
    );
  };