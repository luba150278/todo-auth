import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import styles from './AddItem.module.scss';

function AddItem() {
  return (
    <div className={styles.inputNewTask}>
      <Form.Control type="email" placeholder="Нова задача" />
      <Button variant="outline-primary">Додати задачу</Button>
    </div>
  );
}

export default AddItem;
