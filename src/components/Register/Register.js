import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import useFormField from "../../common/useFieldsFunction";
import { store } from "../../store";
import { fetchLogin } from "../../store/actions/login";
import { fetchReg } from "../../store/actions/reg";
import { authTypes } from "../../store/types/auth";
import AuthFormInner from "../AuthFormInner/AuthFormInner";

function Register({ toggleLogin }) {
  const loginField = useFormField();
  const passField = useFormField();
  const [error, setError] = useState("");

  const showMessage = (message) => {
    setError(message);
      setTimeout(() => {
        setError("");
      }, 3000);
  }

  const registerFunction = async (e) => {
    e.preventDefault();
    const res = await store.dispatch(fetchReg(loginField.value, passField.value))
    if (res.type === authTypes.AUTH_SUCCESS) {
      const login = await store.dispatch(fetchLogin(loginField.value, passField.value))
      if (login.type === authTypes.AUTH_SUCCESS) {
        toggleLogin(true);
      } else {
        showMessage(login.payload)
      }
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
          <Button variant="primary" type="submit" onClick={registerFunction}>
            Register
          </Button>
        </Form>
      </div>
    </section>
  );
}

export default Register;
