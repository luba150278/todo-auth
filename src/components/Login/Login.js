import { useState, useCallback } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import loginFunction from "../../common/loginFunction";
import AuthFormInner from "../AuthFormInner/AuthFormInner";

const useFormField = () => {
  const [value, setValue] = useState("");
  const onChange = useCallback((e) => setValue(e.target.value), []);
  return { value, onChange };
};

function Login({ toggleLogin }) {
  const loginField = useFormField();
  const passField = useFormField();
  const [error, setError] = useState('');
  const login = async (e) => {
    e.preventDefault();
    if (loginField.value==='' || passField.value==='') {
      setError('Empty field');
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    const data = await loginFunction(loginField.value, passField.value);

    if (data.isLogin) {
      toggleLogin(true);
    } else {
      setError(data.message);
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };
  return (
    <section className="login">
      <div className="container">
        <Form>
          <AuthFormInner loginField={loginField} passField={passField} error={error} />
          <Button variant="primary" type="submit" onClick={login}>
            Login
          </Button>
        </Form>
      </div>
    </section>
  );
}

export default Login;
