import React, {useState} from 'react';

// const myUser = {};
// const myToken = {};

const initialState = {
  user: {},
  token: '',
};

export const Context = React.createContext();

// const Store = ({children}) => {
//   const [user, setUser] = useState(myUser);
//   const [token, setToken] = useState(myToken);
//   return (
//     <Context.Provider value={([user, setUser], [token, setToken])}>
//       {children}
//     </Context.Provider>
//   );
// };

const Store = ({children}) => {
  const [state, setState] = useState(initialState);
  return (
    <Context.Provider value={[state, setState]}>{children}</Context.Provider>
  );
};

export default Store;
