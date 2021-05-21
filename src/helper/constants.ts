export const ROUTE = {
  HOME: "/",
  PAYMENT_PROCESS: "/payment_process",
};

export const CARD_TYPES_URL =
  "http://www.mocky.io/v2/5d145fa22f0000ff3ec4f030?pageSize=30";
export const PAYMENT_SUCCESS_URL =
  "http://www.mocky.io/v2/5d8de422310000b19d2b517a";
export const PAYMENT_FAILED_URL =
  "http://www.mocky.io/v2/5d8de441310000a2612b517c";

export const ERRORS = {
  CARD_TYPE_EMPTY: "This field is required. Please select Card Type",
  CARD_NUMBER_EMPTY: "This field is required. Please enter Card Number",
  CARD_NUMBER_INVALID: "Please enter valid Card Number",
  EXPIRY_EMPTY: "This field is required. Please enter Expiry date",
  EXPIRY_INVALID: "Please enter valid Expiry date, it should follow MM/YY format",
  NAME_EMPTY: "This field is required. Please enter your Name",
  NAME_INVALID: "Please enter valid Name, it should only include alphabets and space",
  EMAIL_INVALID: "Please enter valid Email address"
}
