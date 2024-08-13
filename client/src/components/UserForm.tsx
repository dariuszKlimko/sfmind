import { ContinentListType } from "../types/ContinentListType";
import { SetStateAction, useContext, useEffect, useState } from "react";
import { baseHeader, continentInitialState, HttpMethods, userInitialState } from "../constants/constansts";
import { validateAge, validateDate, validateEuAndLastName, validateFirstName } from "../validations/UserFormValidation";
import { DoubleFontSizeFlag, DoubleFontSizeFlagType} from "../contexts/DoubleFontSizeFlag";
import { useFetch } from "../hooks/useFetch";
import { UserListType } from "../types/UserListType";
import { NewUserFlag, NewUserFlagType } from "../contexts/NewUserFlag";

export function UserForm(): JSX.Element {
    const urlContinents = `${process.env.REACT_APP_API_HOST}/continents`;
    const methodContinents = HttpMethods.GET;
    const urlUsers = `${process.env.REACT_APP_API_HOST}/form`;
    const methodUsers = HttpMethods.POST;

    const [userData, setUserData] = useState<UserListType>(userInitialState);

    const {response: continents, loading: loadingContinents, error: errorContinents, runFetch: getContinents} = useFetch<ContinentListType[]>(urlContinents, methodContinents, baseHeader, null, [continentInitialState]);
    const {response: users, loading: ladingUsers, error: errorUsers, runFetch: postUser} = useFetch<UserListType>(urlUsers, methodUsers, baseHeader, userData, userInitialState );

    const {doubleFontSizeFlag, setDoubleFontSizeFlag} =  useContext<DoubleFontSizeFlagType>(DoubleFontSizeFlag);
    const {newUserFlag, setNewUserFlag} =  useContext<NewUserFlagType>(NewUserFlag);

    const [continentList, setContinentList] = useState<ContinentListType[]>([]);
    const [buttonFlag, setButtonflag] = useState<boolean>(false);
    const [euLastNameFlag, setEuLastNameFlag] = useState<boolean>(false);
    const [firstNameFlag, setFirstNameFlag] = useState<boolean>(false);
    const [firstNameTypedFlag, setFirstNameTypedFlag] = useState<boolean>(false);
    const [inputContinent, setInputContinent] = useState<string>("");
    const [inputFirstName, setInputFirstName] = useState<string>("");
    const [inputLastName, setInputLastName] = useState<string>("");
    const [inputBirthDate, setInputBirthDate] = useState<string>("");

    useEffect(() => {
        getContinents();
    }, []);

    useEffect(() => {
        if (continents) {
            setContinentList(continents);
        };
    }, [continents]);

    useEffect(() => {
        if (inputBirthDate) {
            const flag = validateDate(inputBirthDate);
            setButtonflag(flag);
        }
    }, [inputBirthDate]);

    const handleChangeContinent = (e: { target: { value: SetStateAction<string>; }; }) => {
        setInputContinent(e.target.value);
    };

    const handleChangeFirstName = (e: { target: { value: SetStateAction<string>; }; }) => {
        setFirstNameTypedFlag(true);
        setInputFirstName(e.target.value);
    };

    const handleChangeLastName = (e: { target: { value: SetStateAction<string>; }; }) => {
        setInputLastName(e.target.value);
    };
    
    const handleChangeBirthDate = (e: { target: { value: SetStateAction<string>; }; }) => {
        setInputBirthDate(e.target.value);
    };
    
    const handleSubmit =async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const flag = validateDate(inputBirthDate);
        const flagAge = validateAge(inputBirthDate);
        const flagEuLastName = validateEuAndLastName(inputContinent, inputLastName);
        const flagFirstName = validateFirstName(inputFirstName);
        setButtonflag(flag);
        setDoubleFontSizeFlag(flagAge);
        setEuLastNameFlag(flagEuLastName);
        setFirstNameFlag(flagFirstName);

        if (!flag && !flagAge && !flagEuLastName && !flagFirstName) {
            setUserData({
                id: "",
                continent: inputContinent,
                firstName: inputFirstName,
                lastName: inputLastName,
                birthDate: inputBirthDate,
                createdAt: "",
                updatedAt: "",
            });
            postUser();
            setNewUserFlag(!newUserFlag);
            alert("sukces");
            setInputContinent("");
            setInputFirstName("");
            setInputLastName("");
            setInputBirthDate("");
        }         
    };

    return (
        <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-50 white:border-gray-700 ">
            <form 
                onSubmit={handleSubmit}
                className="max-w-sm mx-auto"
            >
                <div>
                    <label htmlFor="continent" className={`block mb-2 text-${!doubleFontSizeFlag ? "sm" : "xl"} font-medium text-gray-900 white:text-dark`}>Kontynent</label>
                    <select 
                        id="continent" 
                        name="continent" 
                        value={inputContinent} 
                        onChange={handleChangeContinent} 
                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-${!doubleFontSizeFlag ? "sm" : "xl"} rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 white:bg-gray-700 dark:border-gray-600 white:placeholder-gray-200 white:focus:ring-blue-500 dark:focus:border-blue-500`}
                    >
                        <option disabled value="">-- Wybierz kontynent --</option>
                        {continentList.map(continent => {
                            return <option key={continent.id} value={continent.name}>
                                {continent.name}
                            </option>
                        })}
                    </select>
                </div>
                <div>
                    <label htmlFor="firstName" className={!firstNameFlag ? `block mb-2 text-${!doubleFontSizeFlag ? "sm" : "xl"} font-medium text-gray-900 white:text-dark` : `block mb-2 text-${!doubleFontSizeFlag ? "sm" : "xl"} font-medium text-red-400 white:text-dark`}>Imię</label>
                    <input 
                        id="firstName" 
                        name="firstName" 
                        placeholder="Imię" 
                        value={inputFirstName} 
                        onChange={handleChangeFirstName}
                        className={!firstNameFlag ? `bg-gray-50 border border-gray-300 text-gray-900 text-${!doubleFontSizeFlag ? "sm" : "xl"} rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 white:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 white:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500` : `bg-red-50 border border-red-300 text-red-400 text-${!doubleFontSizeFlag ? "sm" : "xl"} rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 white:bg-red-700 dark:border-red-600 dark:placeholder-red-400 white:text-red dark:focus:ring-red-400 dark:focus:border-red-400`}
                    />
                    {firstNameFlag &&<p className={`mt-2 text-${!doubleFontSizeFlag ? "sm" : "xl"} text-red-600 dark:text-red-500`}>To pole jest wymagane</p>}
                </div>
                <div>
                    <label htmlFor="lastName" className={!euLastNameFlag ? `block mb-2 text-${!doubleFontSizeFlag ? "sm" : "xl"} font-medium text-gray-900 white:text-dark` : `block mb-2 text-${!doubleFontSizeFlag ? "sm" : "xl"} font-medium text-red-400 white:text-dark`}>Nazwisko</label>
                    <input 
                        id="lastName" 
                        name="lastName" 
                        placeholder="Nazwisko" 
                        value={inputLastName} 
                        onChange={handleChangeLastName}
                        className={!euLastNameFlag ? `bg-gray-50 border border-gray-300 text-gray-900 text-${!doubleFontSizeFlag ? "sm" : "xl"} rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 white:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 white:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500` : `bg-red-50 border border-red-300 text-red-400 text-${!doubleFontSizeFlag ? "sm" : "xl"} rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 white:bg-red-700 dark:border-red-600 dark:placeholder-red-400 white:text-red dark:focus:ring-red-400 dark:focus:border-red-400`}
                    />
                    {euLastNameFlag &&<p className={`mt-2 text-${!doubleFontSizeFlag ? "sm" : "xl"} text-red-600 dark:text-red-500`}>Nie spełnione kryteria</p>}
                </div>
                <div>
                    <label htmlFor="birthDate" className={`block mb-2 text-${!doubleFontSizeFlag ? "sm" : "xl"} font-medium text-gray-900 white:text-dark`}>Data urodzenia</label>
                    <input 
                        id="birthDate" 
                        name="birthDate" 
                        type="date" 
                        value={inputBirthDate} 
                        onChange={handleChangeBirthDate}
                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-${!doubleFontSizeFlag ? "sm" : "xl"} rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 white:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 white:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    />
                </div>
                <div>
                    <label className="block mb-4"></label>
                    <button 
                        disabled={buttonFlag} 
                        type="submit"
                        className={!buttonFlag ? `w-full focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-${!doubleFontSizeFlag ? "sm" : "xl"} px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800` : `w-full text-white bg-gray-700  font-medium rounded-lg text-${!doubleFontSizeFlag ? "sm" : "xl"} px-5 py-2.5 me-2 mb-2 dark:bg-gray-300` }
                    >Wyślij</button>
                </div>
            </form>
        </div>
    );
}
