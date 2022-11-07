import Form from "react-bootstrap/Form";

function AuthFormInner({loginField, passField}) {

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="text" placeholder="Enter login" {...loginField} />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" {...passField}/>
      </Form.Group>
    </>
  );
}

export default AuthFormInner;
