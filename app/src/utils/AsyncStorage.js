import AsyncStorage from "@react-native-async-storage/async-storage";

const isEmpty = function (value) {
  if (
    value === "" ||
    value === null ||
    value === undefined ||
    (value !== null && typeof value === "object" && !Object.keys(value).length)
  ) {
    return true;
  } else {
    return false;
  }
};

export const setItemToAsync = (key, value) => {
  if (isEmpty(key)) {
    throw Error("Storage Name is empty");
  }

  return new Promise((resolve, reject) => {
    AsyncStorage.setItem(key, value, (error) => {
      if (error) {
        reject(error);
      }

      resolve(true);
    });
  });
};

export const getItemFromAsync = (key) => {
  if (isEmpty(key)) {
    throw Error("Storage Name is empty");
  }

  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(key, (err, result) => {
      if (err) {
        reject(err);
      }

      if (result === null) {
        resolve(null);
      }

      resolve(result);
    });
  });
};
