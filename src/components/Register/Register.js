import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import getErrorNotify from "../../common/getErrorMessageFunction";
import useFormField from "../../common/useFieldsFunction";

import { store } from "../../store";
import { fetchReg } from "../../store/actions/reg.action";
import { authTypes } from "../../store/types/auth.types";

import AuthFormInner from "../AuthFormInner/AuthFormInner";

function Register({ toggleLogin }) {
  const loginField = useFormField();
  const passField = useFormField();

  const registerFunction = async (e) => {
    e.preventDefault();
    const res = await store.dispatch(fetchReg(loginField.value, passField.value))
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
          <Button variant="primary" type="submit" onClick={registerFunction}>
            Register
          </Button>
        </Form>
      </div>
    </section>
  );
}

export default Register;
