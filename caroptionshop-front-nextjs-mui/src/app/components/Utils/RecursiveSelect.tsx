import { MenuItem } from "@mui/material";
import React from "react";

const RecursiveSelectOptions = ({
  textField,
  valueField,
  keyField,
  items,
  parentText = null,
}: {
  textField: string;
  valueField: string;
  keyField: string;
  items: any[];
  parentText?: string | null;
}) => {
  return items?.map((item) => {
    let childrenFields = null;
    const field = (
      <option value={item[valueField]} key={item[keyField]}>
        {parentText ? `${parentText} >> ` : ""}
        {item[textField]}
      </option>
    );
    if (item.children?.length > 0) {
      childrenFields = (
        <RecursiveSelectOptions
          keyField={keyField}
          valueField={valueField}
          textField={textField}
          items={item.children}
          parentText={item[textField]}
        />
      );
    }

    return (
      <React.Fragment key={item[keyField]}>
        {field}
        {childrenFields}
      </React.Fragment>
    );
  });
};
const RecursiveSelectMenuItems = ({
  textField,
  valueField,
  keyField,
  items,
  parentText = null,
}: {
  textField: string;
  valueField: string;
  keyField: string;
  items: any[];
  parentText?: string | null;
}) => {
  return items?.map((item) => {
    let childrenFields = null;
    const field = (
      <MenuItem value={item[valueField]} key={item[keyField]}>
        {parentText ? `${parentText} >> ` : ""}
        {item[textField]}
      </MenuItem>
    );
    if (item.children?.length > 0) {
      childrenFields = (
        <RecursiveSelectMenuItems
          keyField={keyField}
          valueField={valueField}
          textField={textField}
          items={item.children}
          parentText={item[textField]}
        />
      );
    }

    return (
      <React.Fragment key={item[keyField]}>
        {field}
        {childrenFields}
      </React.Fragment>
    );
  });
};

export { RecursiveSelectOptions, RecursiveSelectMenuItems };
