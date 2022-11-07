import { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { ERROR_ADD_ITEM_DATA } from "../../common/constants/constants";
import getErrorNotify from "../../common/functions/getErrorMessageFunction";
import useFormField from "../../common/functions/useFieldsFunction";
import { store } from "../../store";
import { fetchDeleteItem } from "../../store/actions/itemDelete.action";
import { fetchEditItem } from "../../store/actions/itemEdit.action";
import { itemTypes } from "../../store/types/item.types";
import styles from "./Item.module.scss";

function Item({ item, updateItems }) {
  
  const [isEdit, setIsEdit] = useState(false);
  const textField = useFormField(item.text);

  const editItem = async (id, checked, text) => {
    const res = await store.dispatch(fetchEditItem(text, id, checked));

    if (res.type === itemTypes.ITEM_CHANGE) {
      if (!res.payload) {
        getErrorNotify(ERROR_ADD_ITEM_DATA);
        return;
      }
      updateItems(true);
      return;
    }

    getErrorNotify(res.payload);
  };

  const deleteItem = async (id) => {
    const res = await store.dispatch(fetchDeleteItem(id));

    if (res.type === itemTypes.ITEM_DELETE) {
      updateItems(true);
      return;
    }
    getErrorNotify(res.payload);
  };

  const keyPressHandler = (e) => {
    if (e.key === "Enter") {
      editItem(item.id, item.checked, textField.value);
    }
  };

  return (
    <li className={styles.item}>
      <Form.Check
        type="checkbox"
        checked={item.checked}
        onChange={() => editItem(item.id, !item.checked, item.text)}
      />
      {!isEdit ? (
        <p
          className={
            item.checked ? `${styles.text} ${styles.checked}` : styles.text
          }
        >
          {item.text}
        </p>
      ) : (
        <Form.Control
          type="text"
          value={item.text}
          {...textField}
          onKeyPress={keyPressHandler}
        />
      )}
      <Button
        variant="outline-warning"
        onClick={() => {
          setIsEdit((prev) => !prev);
        }}
      >
        Edit
      </Button>
      <Button
        variant="outline-success"
        onClick={() => editItem(item.id, item.checked, textField.value)}
      >
        Save
      </Button>
      <Button variant="outline-danger" onClick={() => deleteItem(item.id)}>
        Delete
      </Button>
    </li>
  );
}

export default Item;
