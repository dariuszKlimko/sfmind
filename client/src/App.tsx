import { useState } from 'react';
import './App.css';
import { DoubleFontSizeFlag } from './contexts/DoubleFontSizeFlag';
import { Main } from './Views/Main';
import { NewUserFlag } from './contexts/NewUserFlag';
import { UserListType } from './types/UserListType';
import { userInitialState } from './constants/constansts';
import { User } from './contexts/User';

function App(): JSX.Element {
  const [doubleFontSizeFlag, setDoubleFontSizeFlag] = useState<boolean>(false);
  const [newUserFlag, setNewUserFlag] = useState<boolean>(false);
  const [user, setUser] = useState<UserListType>(userInitialState);

  return (
    <User.Provider value={{user, setUser}}>
    <NewUserFlag.Provider value={{newUserFlag, setNewUserFlag}}>
    <DoubleFontSizeFlag.Provider value={{doubleFontSizeFlag, setDoubleFontSizeFlag}}>
      <div>
        <Main/>
      </div>
    </DoubleFontSizeFlag.Provider>
    </NewUserFlag.Provider>
    </User.Provider>
  );
}

export default App;
