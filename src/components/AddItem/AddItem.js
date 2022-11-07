import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import { ERROR_ADD_ITEM_DATA } from "../../common/constants/constants";
import getErrorNotify from "../../common/functions/getErrorMessageFunction";
import useFormField from "../../common/functions/useFieldsFunction";
import { store } from "../../store";
import { fetchAddItem } from "../../store/actions/itemAdd.action";
import { itemTypes } from "../../store/types/item.types";
import styles from "./AddItem.module.scss";

function AddItem({ updateItems }) {
  const taskField = useFormField();
  const addItemFunction = async (e) => {
    e.preventDefault();

    const res = await store.dispatch(fetchAddItem(taskField.value));
    if (res.type === itemTypes.ITEM_ADD) {
      if (res.payload === "") {
        getErrorNotify(ERROR_ADD_ITEM_DATA);
        return;
      }
      updateItems(true);
      return;
    }

    getErrorNotify(res.payload);
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
