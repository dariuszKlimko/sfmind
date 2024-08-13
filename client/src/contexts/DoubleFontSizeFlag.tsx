import {createContext, useContext} from "react";

export type DoubleFontSizeFlagType = {
    doubleFontSizeFlag: boolean;
    setDoubleFontSizeFlag: React.Dispatch<React.SetStateAction<boolean>>
}

export const DoubleFontSizeFlag = createContext<DoubleFontSizeFlagType>({
    doubleFontSizeFlag: false,
    setDoubleFontSizeFlag: () => {},
});
