import {createContext, useContext} from "react";
import { UserListType } from "../types/UserListType";
import { userInitialState } from "../constants/constansts";

export type UserType = {
    user: UserListType;
    setUser: React.Dispatch<React.SetStateAction<UserListType>>
}

export const User = createContext<UserType>({
    user: userInitialState,
    setUser: () =>  {},
});
