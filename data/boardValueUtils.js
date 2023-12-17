export const getDefaultSpaces = () => {
  return [
    ["open"],
    ["filled", "filled"],
    ["filled", "filled", "filled"],
    ["filled", "filled", "filled", "filled"],
    ["filled", "filled", "filled", "filled", "filled"],
  ];
};

export const getAllFilledSpaces = () => {
  return [
    ["filled"],
    ["filled", "filled"],
    ["filled", "filled", "filled"],
    ["filled", "filled", "filled", "filled"],
    ["filled", "filled", "filled", "filled", "filled"],
  ];
};

export const getSpecificEmpty = (col, row) => {
  let tempSpaces = getAllFilledSpaces();
  tempSpaces[row][col] = "open";
  return tempSpaces;
};
