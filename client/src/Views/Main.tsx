import { DeleteAllUsers } from "../components/DeleteAllUsers";
import { UserForm } from "../components/UserForm";
import { UserTable } from "../components/UserTable";

export function Main(): JSX.Element {
    return (
        <div>
            <br/>
            <div className="max-w-sm mx-auto" >
                <UserForm/>
            </div>
            <br/>
            <div className="max-w-sm mx-auto" >
                <DeleteAllUsers/>
            </div>
            <div className="flex flex-row min-h-screen justify-center items-center">
                <UserTable/>
            </div>
            <br/>
        </div>
    );
}
