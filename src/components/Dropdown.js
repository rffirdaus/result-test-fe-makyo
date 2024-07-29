import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";

const Dropdown = ({
  options,
  multiple = false,
  searchable = false,
  value = multiple ? [] : null,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLabel, setSelectedLabel] = useState("Select ...");

  useEffect(() => {
    setSelectedLabel("")
    if (multiple && value && Array.isArray(value)) {
      setSelectedLabel(value);
    } else if (!multiple && value) {
      console.log('b')
      if (Array.isArray(value)) {
        setSelectedLabel("Select ...");
      } else {
        setSelectedLabel(value.label)
      }
    } else {
      setSelectedLabel("Select ...");
    }
  }, [value, multiple]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    if (multiple) {
      let newValue = Array.isArray(value) ? [...value] : [];
      const index = newValue.findIndex((v) => v.value === option.value);
      if (index === -1) {
        newValue.push(option);
      } else {
        newValue.splice(index, 1);
      }
      onChange(newValue);
      setSelectedLabel(newValue);
    } else {
      onChange(option);
      setSelectedLabel(option.label);
      setIsOpen(false);
    }
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const deleteData = (option) => {
    const newValue = selectedLabel.filter((v) => v.value !== option.value);
    setSelectedLabel(newValue);
    onChange(newValue);
  };

  const renderSelectedLabel = () => {
    if (Array.isArray(selectedLabel)) {
      return selectedLabel.map((item, index) => (
        <span
          key={index}
          className={
            item !== "Select ..."
              ? "border rounded-xl px-4 py-2 mr-2 z-50 relative bg-gray-100 flex items-center"
              : ""
          }
        >
          {typeof item === "object" && item.label ? item.label : item}
          <button
            className="rounded-full cursor-pointer border ml-2 p-1"
            onClick={(e) => {
              e.stopPropagation(); // Prevent dropdown toggle
              deleteData(item);
            }}
          >
            <CloseIcon style={{ fontSize: 18, color: "#4A4A4A" }} />
          </button>
        </span>
      ));
    } else {
      return (
        <span
          className={
            selectedLabel !== "Select ..."
              ? "border rounded-xl px-4 py-2 mr-2 z-50 relative bg-gray-100 flex items-center"
              : ""
          }
        >
          {typeof selectedLabel === "object" && selectedLabel.label
            ? selectedLabel.label || selectedLabel
            : selectedLabel}
        </span>
      );
    }
  };

  return (
    <div className="flex items-center">
      <p className="mr-16">Label</p>
      <div className="relative w-full">
        <div
          onClick={toggleDropdown}
          className="cursor-pointer border p-4 rounded h-14 flex items-center"
        >
          {renderSelectedLabel()}
          <span className="ml-auto">▼</span>
        </div>
        {isOpen && (
          <div className="absolute w-full bg-white border mt-1 rounded z-50">
            {searchable && (
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-2 w-full border-b"
                placeholder="Search..."
              />
            )}
            {filteredOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => selectOption(option)}
                className="cursor-pointer p-2 hover:bg-gray-200"
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;