import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import instance from "../../api/request";
import loginFunction from "../../common/loginFunction";
import useFormField from "../../common/useFieldsFunction";
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
    if (loginField.value === "" || passField.value === "") {
      showMessage("Empty field");
    }

    try {
      const user = { login: loginField.value, pass: passField.value };
      const res = await instance.post("router?action=register", { ...user });
      if (res.data.ok && !res.data.alreadyExist) {
        const data = await loginFunction(loginField.value, passField.value);

        if (data.isLogin) {
          toggleLogin(true);
        } else {
          showMessage(data.message);
        }
      }
      if (res.data.ok && res.data.alreadyExist) {
        showMessage("Такий user вже існує");
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
          <Button variant="primary" type="submit" onClick={registerFunction}>
            Register
          </Button>
        </Form>
      </div>
    </section>
  );
}

export default Register;
