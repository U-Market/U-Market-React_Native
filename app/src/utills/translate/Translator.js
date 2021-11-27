import en from "./locales/en";
import ko from "./locales/ko";

class Translator {
  static #language = "ko";
  static #dictionary = {
    ko,
    en,
  };

  static getLanguage() {
    return this.#language;
  }

  static async setLanguage(s) {
    this.#language = s;
  }

  static print(s) {
    return this.#dictionary[this.#language][s];
  }
}

export default Translator;
