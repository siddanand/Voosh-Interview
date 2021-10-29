import Styles from "../styles/userlist.module.css";

export default function UserList(props) {
  return (
    <div>
      {props.value.list.length !== 0 ? (
        <div className={Styles.container}>
          {props.value.list.map((item) => {
            return (
              <div key={item.id} id={Styles.box}>
                <img id={Styles.avatar} src={item.avatar_url} alt="" />
                <div id={Styles.info}>
                  <div id={Styles.infoheading}>
                    Username: <span id={Styles.infodescr}> {item.login}</span>
                  </div>
                  <div id={Styles.infoheading}>
                    Type: <span id={Styles.infodescr}> {item.type}</span>
                  </div>
                  <div id={Styles.infolink}>
                    <a id={Styles.infolink} href={item.html_url}>
                      Github Link
                    </a>
                  </div>
                  <button
                    id={Styles.infobutton}
                    onClick={() => {
                      props.value.setCurrentuser(item);
                      props.value.setDisplay("user");
                    }}
                  >
                    {" "}
                    More Info
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
