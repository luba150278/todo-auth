import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import instance from "../../api/request";
import useFormField from "../../common/useFieldsFunction";
import styles from "./AddItem.module.scss";

function AddItem({ updateItems }) {
  const taskField = useFormField();
  const addItemFunction = async (e) => {
    e.preventDefault();
    try {
      const res = await instance.post("router?action=createItem", {
        activeID: localStorage.getItem("activeID"),
        text: taskField.value,
      });
      if (res.data.id !== "") {
        updateItems(true);
      } else {
        console.log("empty id");
      }
    } catch (err) {
      console.log("server error");
    }
  };
  return (
    <Form className={styles.inputNewTask}>
      <Form.Control type="text" placeholder="Нова задача" {...taskField} />
      <Button variant="outline-primary" onClick={addItemFunction} type="submit">
        Додати задачу
      </Button>
    </Form>
  );
}

export default AddItem;
