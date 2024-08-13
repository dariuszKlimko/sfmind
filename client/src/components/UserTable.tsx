import { useContext, useEffect, useState } from "react";
import { UserListType } from "../types/UserListType";
import { baseHeader, HttpMethods, userInitialState } from "../constants/constansts";
import { useFetch } from "../hooks/useFetch";
import { NewUserFlag, NewUserFlagType } from "../contexts/NewUserFlag";
import { GetOneUser } from "./GetOneUser";
import { DoubleFontSizeFlag, DoubleFontSizeFlagType } from "../contexts/DoubleFontSizeFlag";

export function UserTable(): JSX.Element {
    const url = `${process.env.REACT_APP_API_HOST}/form`;
    const method = HttpMethods.GET;

    const {newUserFlag, setNewUserFlag} =  useContext<NewUserFlagType>(NewUserFlag);
    const {doubleFontSizeFlag, setDoubleFontSizeFlag} = useContext<DoubleFontSizeFlagType>(DoubleFontSizeFlag);
    const {response, loading, error, runFetch } = useFetch<UserListType[]>(url, method, baseHeader, null, [userInitialState] );
    const [userList, setUserList] = useState<UserListType[]>([]);

    useEffect(() => {
        if (response) {
            const runEffect = async() =>  {
                runFetch();
                setUserList(response);
            }
            runEffect()
        }
    },[newUserFlag]);

    useEffect(() => {
        if (response) {
            setUserList(response);
        }
    }, [response]);

    return (
        <div className="w-4/6 p-4 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-50 white:border-gray-700 ">
            <table className={`w-full text-${!doubleFontSizeFlag ? "sm" : "xl"} text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg`}>
                <thead className={`rounded-lg text-${!doubleFontSizeFlag ? "sm" : "xl"} text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400`}>
                    <tr>
                        <th scope="col" className="px-6 py-3">Kontynent</th>
                        <th scope="col" className="px-6 py-3">Imię</th>
                        <th scope="col" className="px-6 py-3">Nazwisko</th>
                        <th scope="col" className="px-6 py-3">Data urodzenia</th>
                        <th scope="col" className="px-6 py-3"/>
                    </tr>
                </thead>
                <tbody>
                    {userList.map(user => {
                        return <tr key={user.id} className="bg-white border-b white:bg-gray-800 dark:border-gray-700">
                            <td className="px-6 py-">{user.continent&&user.continent}</td>
                            <td className="px-6 py-4">{user.firstName&&user.firstName}</td>
                            <td className="px-6 py-4">{user.lastName&&user.lastName}</td>
                            <td className="px-6 py-4">{user.birthDate&&user.birthDate.slice(0,10)}</td>
                            <td className="px-6 py-4"><GetOneUser userId={user.id}/></td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    );
}