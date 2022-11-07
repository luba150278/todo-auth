import { Button } from "react-bootstrap";
import getErrorNotify from "../../common/getErrorMessageFunction";
import { store } from "../../store";
import { fetchLogout } from "../../store/actions/logout.action";
import { logoutTypes } from "../../store/types/logout.types";
import styles from "./Header.module.scss";

function Header({ toggleLogin }) {
  const logoutFunction = async () => {
    
      const res = await store.dispatch(fetchLogout());
      if (res.type === logoutTypes.LOGOUT_SUCCESS) {
        toggleLogin(false);
        return;
      }
      getErrorNotify(res.payload);
  };
  return (
    <header>
      <div className="container">
        <div className={styles.header} onClick={logoutFunction}>
          <Button variant="primary">Logout</Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
