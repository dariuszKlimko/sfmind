import { baseHeader, HttpMethods, userInitialState } from "../constants/constansts";
import { useFetch } from "../hooks/useFetch";
import { UserListType } from "../types/UserListType";
import { User, UserType } from "../contexts/User";
import { useContext, useEffect } from "react";
import { DoubleFontSizeFlag, DoubleFontSizeFlagType } from "../contexts/DoubleFontSizeFlag";

export function GetOneUser(props: { userId: string }): JSX.Element {
    const url = `${process.env.REACT_APP_API_HOST}/form/${props.userId}`;
    const method = HttpMethods.GET;
    const {response, loading, error, runFetch} = useFetch<UserListType>(url, method, baseHeader, null, userInitialState );
    const {user, setUser} = useContext<UserType>(User);
    const {doubleFontSizeFlag, setDoubleFontSizeFlag} = useContext<DoubleFontSizeFlagType>(DoubleFontSizeFlag);

    useEffect(() => {
        runFetch();
    },[]);
    
    const handleOnClick = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        setUser(response); 
        alert(JSON.stringify(response))
    }

    return (
        <div>
            <button
                onClick={handleOnClick}
                className={`w-full focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-${!doubleFontSizeFlag ? "sm" : "xl"} px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800`}
            >Informacje</button>
        </div>
    );
};
