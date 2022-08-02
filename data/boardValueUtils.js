export const getDefaultSpaces = () => {
  return [
    ["open"],
    ["filled", "filled"],
    ["filled", "filled", "filled"],
    ["filled", "filled", "filled", "filled"],
    ["filled", "filled", "filled", "filled", "filled"],
  ];
};

export const getAllEmptySpaces = () => {
  return [
    ["filled"],
    ["filled", "filled"],
    ["filled", "filled", "filled"],
    ["filled", "filled", "filled", "filled"],
    ["filled", "filled", "filled", "filled", "filled"],
  ];
};

export const getSpecificEmpty = (col, row) => {
  let tempSpaces = getAllEmptySpaces();
  tempSpaces[row][col] = "open";
  return tempSpaces;
};
