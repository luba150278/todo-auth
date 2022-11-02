import { useState, useCallback } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import instance from "../../api/request";
import loginFunction from "../../common/loginFunction";
import AuthFormInner from "../AuthFormInner/AuthFormInner";

const useFormField = () => {
  const [value, setValue] = useState("");
  const onChange = useCallback((e) => setValue(e.target.value), []);
  return { value, onChange };
};

function Register({ toggleLogin }) {
  const loginField = useFormField();
  const passField = useFormField();
  const [error, setError] = useState("");

  const registerFunction = async (e) => {
    e.preventDefault();
    if (loginField.value==='' || passField.value==='') {
      setError('Empty field');
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
   
    try {
      const user = { login: loginField.value, pass: passField.value };
      const res = await instance.post("router?action=register", { ...user });
      if (res.data.ok && !res.data.alreadyExist) {
        const data = await loginFunction(loginField.value, passField.value);

        if (data.isLogin) {
          toggleLogin(true);
        } else {
          setError(data.message);
          setTimeout(() => {
            setError("");
          }, 3000);
        }
      }
      if (res.data.ok && res.data.alreadyExist) {
        setError("Такий user вже існує");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    } catch (e) {
      setError("Помилка сервера");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };
  return (
    <section className="login">
      <div className="container">
        <Form>
          <AuthFormInner loginField={loginField} passField={passField} error={error} />
          <Button variant="primary" type="submit" onClick={registerFunction}>
            Register
          </Button>
        </Form>
      </div>
    </section>
  );
}

export default Register;
