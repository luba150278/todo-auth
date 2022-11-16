import { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import getErrorNotify from "../../common/functions/getErrorMessageFunction";

import { store } from "../../store";
import { fetchReg } from "../../store/actions/reg.action";
import { authTypes } from "../../store/types/auth.types";

import AuthFormInner from "../AuthFormInner/AuthFormInner";

class Register extends Component {
  state = {
    login: "",
    pass: "",
  };

  getLogin = (login) => {
    this.setState({ login });
  };
  getPass = (pass) => {
    this.setState({ pass });
  };

  registerFunction = async (e) => {
    e.preventDefault();
    const res = await store.dispatch(fetchReg(this.state.login, this.state.pass))
    if (res.type === authTypes.AUTH_SUCCESS) {
      this.props.toggleLogin(true);
    } else {
      getErrorNotify(res.payload)
    }

  };
  render() {
    const loginField = {
      login: this.state.login,
      getLogin: this.getLogin,
    };
    const passField = {
      pass: this.state.pass,
      getPass: this.getPass,
    };
    return (
      <section className="login">
        <div className="container">
          <Form>
            <AuthFormInner loginField={loginField} passField={passField} />
            <Button variant="primary" type="submit" onClick={this.registerFunction}>
              Register
            </Button>
          </Form>
        </div>
      </section>
    );
  }
}

export default Register;
