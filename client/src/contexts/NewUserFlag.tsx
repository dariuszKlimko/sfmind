import {createContext, useContext} from "react";

export type NewUserFlagType = {
    newUserFlag: boolean;
    setNewUserFlag: React.Dispatch<React.SetStateAction<boolean>>
}

export const NewUserFlag = createContext<NewUserFlagType>({
    newUserFlag: false,
    setNewUserFlag: () => {},
});
