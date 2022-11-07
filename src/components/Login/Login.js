import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import getErrorNotify from "../../common/functions/getErrorMessageFunction";

import useFormField from "../../common/functions/useFieldsFunction";

import { store } from "../../store";
import { fetchLogin } from "../../store/actions/login.action";
import { authTypes } from "../../store/types/auth.types";

import AuthFormInner from "../AuthFormInner/AuthFormInner";

function Login({ toggleLogin }) {
  const loginField = useFormField();
  const passField = useFormField();

  const login = async (e) => {
    e.preventDefault();
    const res = await store.dispatch(fetchLogin(loginField.value, passField.value))
    if (res.type === authTypes.AUTH_SUCCESS) {
      toggleLogin(true);
    } else {
      getErrorNotify(res.payload)
    }
  };
  return (
    <section className="login">
      <div className="container">
        <Form>
          <AuthFormInner
            loginField={loginField}
            passField={passField}
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
