import React from "react";
import { changeLanguage } from "../api/apiCalls";
import { withTranslation } from "react-i18next";

const LanguageSelector = (props) => {
  const onChangeLanguage = (lang) => {
    const { i18n } = props;
    i18n.changeLanguage(lang);
    changeLanguage(lang);
  };
  return (
    <div className="container">
      <img
        src="https://www.countryflagicons.com/FLAT/24/TR.png"
        alt="Turkish Flag"
        onClick={() => onChangeLanguage("tr")}
        style={{ cursor: "pointer" }}
      />
      <img
        src="https://www.countryflagicons.com/FLAT/24/US.png"
        alt="USA Flag"
        onClick={() => onChangeLanguage("en")}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
};

export default withTranslation()(LanguageSelector);
