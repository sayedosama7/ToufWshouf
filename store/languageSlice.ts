
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "./store";
import i18n from "i18next";

export interface LanguageState {
  dir: "ltr" | "rtl";
  language: "en" | "ar" | undefined;
}

const initialState: LanguageState = {
  dir: "ltr",
  language: "en",
};

export const languageSlice = createSlice({
  name: "language",
  initialState,

  reducers: {
    toggleLanguage: (state, action: PayloadAction<"en" | "ar" | undefined >) => {
      // eslint-disable-next-line default-case
      state.language = action.payload;

      if (state.language === "ar") {
        document.body.setAttribute("dir", "rtl");
        state.dir = "rtl";
        i18n.changeLanguage("ar");
      } else if (state.language === "en") {
        document.body.setAttribute("dir", "ltr");
        state.dir = "ltr";
        i18n.changeLanguage("en");
      }
      else if (state.language === undefined) {
        document.body.setAttribute("dir", "ltr");
        state.dir = "ltr";
        i18n.changeLanguage("en");
      }
    },

    onloadSetCurrentLanguage: (state, action: PayloadAction<"en" | "ar">) => {
      state.language = action.payload;
    },
    changeDir: (state) => {
      state.dir = state.dir === "ltr" ? "rtl" : "ltr";
    },
    changeLanguage: (state) => {
      state.language = state.language === "en" ? "ar" : "en";
    },
  },
});

export const { changeDir, toggleLanguage } = languageSlice.actions;

export const getDir = (state: RootState) => state.language.dir;
export const getLanguage = (state: RootState) => state.language.language;

export default languageSlice.reducer;
