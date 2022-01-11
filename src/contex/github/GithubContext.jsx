import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

//create a GithubContext object using createContext() method.
const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  //the useReducer is an alternative to useState. we switches useState to useReducer
  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(true);
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  //Clear users from state///we moved it to UserSearch.jsx, now it dispatched right from the UserSearch
  // const clearUsers = () => dispatch({ type: "CLEAR_USERS" });
  //Set loading. we moved it to UserSearch.jsx, now it dispatched right from the UserSearch
  // const setLoading = () => dispatch({ type: "SET_LOADING" });

  return (
    <GithubContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
