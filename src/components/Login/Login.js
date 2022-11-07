import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import loginFunction from "../../common/loginFunction";
import { saveLoginDataFunction } from "../../common/saveLoginDataFunction";
import useFormField from "../../common/useFieldsFunction";

import { store } from "../../store";
import { fetchLogin } from "../../store/actions/login";

import { loginTypes } from "../../store/types/login";
import AuthFormInner from "../AuthFormInner/AuthFormInner";

function Login({ toggleLogin }) {
  const loginField = useFormField();
  const passField = useFormField();
  const [error, setError] = useState("");
  // const { loginReducer } = useActions();

  const showMessage = (message) => {
    setError(message);
    setTimeout(() => {
      setError("");
    }, 3000);
  };
  const login = async (e) => {
    e.preventDefault();
    //const res = await loginReducer(loginField.value, passField.value);
    const res = await store.dispatch(fetchLogin(loginField.value, passField.value))
    if (res.type === loginTypes.LOGIN_SUCCESS) {
      saveLoginDataFunction(res.payload.token, res.payload.activeID)
    } else {
      showMessage(res.payload)
    }
  };
  return (
    <section className="login">
      <div className="container">
        <Form>
          <AuthFormInner
            loginField={loginField}
            passField={passField}
            error={error}
          />
          <Button variant="primary" type="submit" onClick={login}>
            Login
          </Button>
        </Form>
      </div>
    </section>
  );
}

export default Login;
