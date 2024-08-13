import { useContext } from "react";
import { baseHeader, HttpMethods } from "../constants/constansts";
import { NewUserFlag, NewUserFlagType } from "../contexts/NewUserFlag";
import { useFetch } from "../hooks/useFetch";
import { DoubleFontSizeFlag, DoubleFontSizeFlagType } from "../contexts/DoubleFontSizeFlag";

export function DeleteAllUsers(): JSX.Element {
    const url = `${process.env.REACT_APP_API_HOST}/form`;
    const method = HttpMethods.DELETE;
    const {response, loading, error, runFetch } = useFetch<null>(url, method, baseHeader, null, null );
    const {newUserFlag, setNewUserFlag} =  useContext<NewUserFlagType>(NewUserFlag);
    const {doubleFontSizeFlag, setDoubleFontSizeFlag} = useContext<DoubleFontSizeFlagType>(DoubleFontSizeFlag);

    const handleOnClick = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (window.confirm("Usunąć wszystkich urzytkowników?")) {
            runFetch();
            setNewUserFlag(!newUserFlag);
        }
    }

    return (
        <div>
            <button
                onClick={handleOnClick}
                className={`w-full focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-${!doubleFontSizeFlag ? "sm" : "xl"} px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800`}
            >Usuń wszystkich urzytkowników</button>
        </div>
    );
}