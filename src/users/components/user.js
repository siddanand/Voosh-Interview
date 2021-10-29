import { useEffect, useState } from "react";
import Styles from "../styles/user.module.css";

export default function User(props) {
  const [repos, setRepos] = useState([]);
  const [gist, setGist] = useState([]);
  const [user, setUser] = useState();
  const getRepo = async () => {
    let response = await fetch(
      `https://api.github.com/users/${props.value.currentuser.login}/repos`
    );
    response = await response.json();
    setRepos(response);
  };
  const getGist = async () => {
    let response = await fetch(
      `https://api.github.com/users/${props.value.currentuser.login}/gists`
    );
    response = await response.json();
    setGist(response);
  };
  const getUserdata = async () => {
    let response = await fetch(
      `https://api.github.com/users/${props.value.currentuser.login}`
    );
    response = await response.json();
    setUser(response);
  };
  useEffect(() => {
    getUserdata();
    getRepo();
    getGist();
  }, []);
  console.log(user);
  return (
    <div>
      <div className={Styles.container1}>
        <img
          id={Styles.avatar}
          src={props.value.currentuser.avatar_url}
          alt=""
        />
        <div>
          <p id={Styles.username}>Username: {props.value.currentuser.login}</p>
          {user ? (
            <div>
              <p id={Styles.username}>Name: {user.name}</p>
              <p id={Styles.username}>Followers: {user.followers}</p>
              <p id={Styles.username}>Following: {user.following}</p>
            </div>
          ) : null}
        </div>
      </div>
      <button
        id={Styles.button}
        onClick={() => {
          props.value.getData();
          props.value.setDisplay("userlist");
        }}
      >
        All Users
      </button>
      <hr id="line" />
      <div className={Styles.container2}>
        <div>
          <p id={Styles.heading}>Repos</p>
          {repos.map((item) => {
            return (
              <div key={item.id} id={Styles.box}>
                {item.name}
              </div>
            );
          })}
        </div>
        <div>
          <p id={Styles.heading}>Gist</p>
          {gist.map((item) => {
            return (
              <div key={item.id} id={Styles.box}>
                {item.id}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
