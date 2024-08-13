import { ContinentListType } from "../types/ContinentListType";
import { UserListType } from "../types/UserListType";

export const continentInitialState: ContinentListType = {
    id: 0, name: ""
}

export const userInitialState: UserListType = {
    id: "",
    firstName: "",
    lastName: "",
    continent: "",
    birthDate: "",
    createdAt: "",
    updatedAt: "",
}

// export const userFormInitialValues = { 
//     // id: "",
//     firstName: "",
//     lastName: "",
//     continent: "",
//     birthDate: "",
//     // createdAt: "",
//     // updatedAt: "",
// }

export enum HttpMethods {
    GET = "get",
    POST = "post",
    PUT = "put",
    PATCH = "patch",
    DELETE = "delete",
}

export const baseHeader = { 
    "Content-Type": "application/json" 
}
