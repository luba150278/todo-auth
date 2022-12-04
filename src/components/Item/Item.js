import { Component } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { ERROR_ADD_ITEM_DATA } from "../../common/constants/constants";
import getErrorNotify from "../../common/functions/getErrorMessageFunction";
import { store } from "../../store";
import { fetchDeleteItem } from "../../store/actions/itemDelete.action";
import { fetchEditItem } from "../../store/actions/itemEdit.action";
import { itemTypes } from "../../store/types/item.types";
import styles from "./Item.module.scss";

class Item extends Component {
  state = {
    isEdit: false,
    inputValue: this.props.item.text,
  };

  editItem = async (id, checked, text) => {
    const res = await store.dispatch(fetchEditItem(text, id, checked));
    this.setIsEdit(false);
    if (res.type === itemTypes.ITEM_CHANGE) {
      if (!res.payload) {
        getErrorNotify(ERROR_ADD_ITEM_DATA);
        return;
      }
      this.updateItems(true);
      return;
    }

    getErrorNotify(res.payload);
  };

  deleteItem = async (id) => {
    const res = await store.dispatch(fetchDeleteItem(id));

    if (res.type === itemTypes.ITEM_DELETE) {
      this.props.updateItems(true);
      return;
    }
    getErrorNotify(res.payload);
  };

  editItemText = () => {
    this.editItem(
      this.props.item.id,
      this.props.item.checked,
      this.state.inputValue
    );
  };

  keyPressHandler = (e) => {
    if (e.key === "Enter") {
      this.editItemText();
    }
  };

  setIsEdit = (isEditVal) => {
    this.setState(() => ({ isEdit: isEditVal }));
  };
  render() {
    return (
      <li className={styles.item}>
        <Form.Check
          type="checkbox"
          checked={this.props.item.checked}
          onChange={() =>
            this.editItem(
              this.props.item.id,
              !this.props.item.checked,
              this.props.item.text
            )
          }
        />
        {!this.state.isEdit ? (
          <p
            className={
              this.props.item.checked
                ? `${styles.text} ${styles.checked}`
                : styles.text
            }
            onClick={() => this.setIsEdit(true)}
          >
            {this.props.item.text}
          </p>
        ) : (
          <Form.Control
            type="text"
            value={this.state.inputValue}
            onChange={(e) =>
              this.setState(() => ({ inputValue: e.target.value }))
            }
            onKeyPress={(e) => this.keyPressHandler(e)}
            onBlur={() => this.editItemText()}
          />
        )}
        <Button variant="outline-warning" onClick={() => this.setIsEdit(true)}>
          Edit
        </Button>
        <Button variant="outline-success" onClick={() => this.editItemText()}>
          Save
        </Button>
        <Button
          variant="outline-danger"
          onClick={() => this.deleteItem(this.props.item.id)}
        >
          Delete
        </Button>
      </li>
    );
  }
}

export default Item;
