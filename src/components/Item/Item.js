import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import styles from "./Item.module.scss";

function Item({ item }) {
  return (
    <li className={styles.item}>
      <Form.Check type="checkbox" />
      {item.text}
      <Button variant="outline-success">Edit</Button>
      <Button variant="outline-danger">Delete</Button>
    </li>
  );
}

export default Item;
