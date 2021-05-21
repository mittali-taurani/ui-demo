import { CARD_TYPES_URL } from "./constants";

export const saveDataToLocalStorage = (key: string, value: any) =>
  localStorage.setItem(key, JSON.stringify(value));

export const getDataFromLocalStorage = (key: string) =>
  key && JSON.parse(localStorage.getItem(key) || '{}');

export async function getCardTypes() {
  try {
    const response = await fetch(CARD_TYPES_URL);
    const data = await response.json();
    console.log(data.cardTypes);
    return data.cardTypes;
  } catch (error) {
    console.log(error.message);
    throw new Error("Error occured in fetch api call");
  }
}
