import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

//create a GithubContext object using createContext() method.
const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  //the useReducer is an alternative to useState. we switches useState to useReducer
  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(true);
  const initialState = {
    users: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  //Get search results
  const searchUsers = async (text) => {
    setLoading();
    const params = new URLSearchParams({
      q: text,
    });
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      header: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    const { items } = await response.json();
    console.log(items);

    //we don't need these two lines, because we use useReduser hook
    // setUsers(data);
    // setLoading(false);
    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };
  //Clear users from state
  const clearUsers = () => dispatch({ type: "CLEAR_USERS" });
  //Set loading
  const setLoading = () => dispatch({ type: "SET_LOADING" });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
        clearUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
