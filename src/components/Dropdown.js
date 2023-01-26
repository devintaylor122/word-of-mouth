import React from "react";
import "./OwnerForm";
import { useState } from "react";
import { useEffect } from "react";

const Dropdown = ({ placeHolder, isMulti, onChange }) => {
  const [menu, setMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState(isMulti ? [] : null);

  useEffect(() => {
    const handler = () => setMenu(false);

    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  });
  const handleInputClick = (e) => {
    e.stopPropagation();
    setMenu(!menu);
  };

  const getDisplay = () => {
    if (!selectedValue || selectedValue.length === 0) {
      return placeHolder;
    }
    if (isMulti) {
      return (
        <div className="dropdown-tags">
          {selectedValue.map((option) => (
            <div key={option.value} className="dropdown-tag-item">
              {option.label}
              <span
                onClick={(e) => onTagRemove(e, option)}
                className="dropdown-tag-close"
              ></span>
            </div>
          ))}
        </div>
      );
    }
    return selectedValue.label;
  };
  const removeOption = (option) => {
    return selectedValue.filter((o) => o.value !== option.value);
  };
  const onTagRemove = (option) => {
    const newValue = removeOption(option);
    setSelectedValue(newValue);
    onChange(newValue);
  };

  const onItemClick = (option) => {
    let newValue;
    if (isMulti) {
      if (selectedValue.findIndex((o) => o.value === option.value) >= 0) {
        newValue = removeOption(option);
      } else {
        newValue = [...selectedValue, option];
      }
    } else {
      newValue = option;
    }
    setSelectedValue(newValue);
    onChange(newValue);
  };

  const isSelected = (option) => {
    if (isMulti) {
      return selectedValue.filter((o) => o.value === option.value).length > 0;
    }
    if (!selectedValue) {
      return false;
    }
    return selectedValue.value === option.value;
  };

  const options = [
    { value: "Food", lable: "Food" },
    { value: "Beauty", lable: "Beauty" },
    { value: "Therapy", lable: "Therapy" },
    { value: "Housework", lable: "Housework" },
    { value: "Lawncare", lable: "Lawncare" },
    { value: "Petcare", lable: "Petcare" },
    { value: "Childcare", lable: "Childcare" },
    { value: "Cleaning Services", lable: "Cleaning Services" },
    { value: "Seamstress", lable: "Seamstress" },
    { value: "Entertainment", lable: "Entertainment" },
  ];

  return (
    <div className="dropdown-container">
      <div onClick={handleInputClick} className="dropdown-input">
        <div className="dropdown-selected-value">{getDisplay()}</div>
        <div className="dropdown-tools">
          <div className="dropdown-tool"></div>
        </div>
      </div>
      {menu && (
        <div className="dropdown-menu">
          {options.map((option) => (
            <div
              onClick={() => onItemClick(option)}
              key={option.value}
              className={`dropdown-item ${isSelected(option) && "selected"}`}
            >
              {option.lable}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
