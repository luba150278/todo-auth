import { Component } from "react";
import { Button } from "react-bootstrap";
import getErrorNotify from "../../common/functions/getErrorMessageFunction";
import { store } from "../../store";
import { fetchLogout } from "../../store/actions/logout.action";
import { logoutTypes } from "../../store/types/logout.types";
import styles from "./Header.module.scss";

class Header extends Component {
  logoutFunction = async () => {
    const res = await store.dispatch(fetchLogout());
    if (res.type === logoutTypes.LOGOUT_SUCCESS) {
      this.props.toggleLogin(false);
      return;
    }
    getErrorNotify(res.payload);
  };
  render() {
    return (
      <header>
        <div className="container">
          <div className={styles.header} onClick={this.logoutFunction}>
            <Button variant="primary">Logout</Button>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
