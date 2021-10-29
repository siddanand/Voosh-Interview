import "./App.css";
import { useReducer, useState, useEffect } from "react";
import UserList from "./users/components/userlist.js";
import User from "./users/components/user.js";
const reducer = (state, action) => {
  if (action.type === "add") {
    state = action.value;
    state = [...state];
    return state;
  }
  return state;
};
function App() {
  const [timer, setTimer] = useState();
  const [display, setDisplay] = useState("userlist");
  const [list, dispatch] = useReducer(reducer, []);
  const [currentuser, setCurrentuser] = useState();
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let response = await fetch(`https://api.github.com/users`);
    response = await response.json();
    dispatch({ type: "add", value: response });
  };
  const userSearch = (e) => {
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(() => {
        getSearchdata(e);
      }, 300)
    );
  };
  const getSearchdata = async (e) => {
    if (e !== "") {
      let response = await fetch(`https://api.github.com/search/users?q=${e}`);
      response = await response.json();
      dispatch({ type: "add", value: response.items });
    } else {
      getData();
    }
  };
  return (
    <div className="container" style={{ padding: "10px" }}>
      {display === "userlist" ? (
        <div>
          <input
            type="text"
            placeholder="Search User"
            id="searchbox"
            onChange={(e) => userSearch(e.target.value)}
          />
          <hr id="line" />
          <UserList value={{ list, display, setDisplay, setCurrentuser }} />
        </div>
      ) : (
        <User value={{ display, setDisplay, currentuser, getData }} />
      )}
    </div>
  );
}

export default App;
