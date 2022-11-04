import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import loginFunction from "../../common/loginFunction";
import useFormField from "../../common/useFieldsFunction";
import AuthFormInner from "../AuthFormInner/AuthFormInner";

function Login({ toggleLogin }) {
  const loginField = useFormField();
  const passField = useFormField();
  const [error, setError] = useState("");
  const showMessage = (message) => {
    setError(message);
    setTimeout(() => {
      setError("");
    }, 3000);
  };
  const login = async (e) => {
    e.preventDefault();
    try {
      if (loginField.value === "" || passField.value === "") {
        showMessage("Empty field");
        return;
      }
      const data = await loginFunction(loginField.value, passField.value);

      if (data.isLogin) {
        toggleLogin(true);
      } else {
        showMessage(data.message);
      }
    } catch (err) {
      showMessage("Помилка сервера");
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
