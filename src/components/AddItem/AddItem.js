import { Component } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import { ERROR_ADD_ITEM_DATA } from "../../common/constants/constants";
import getErrorNotify from "../../common/functions/getErrorMessageFunction";
import { store } from "../../store";
import { fetchAddItem } from "../../store/actions/itemAdd.action";
import { itemTypes } from "../../store/types/item.types";
import styles from "./AddItem.module.scss";

class AddItem extends Component {
  // const taskField = useFormField();
  state = {
    task: ''
  }
  addItemFunction = async (e) => {
    e.preventDefault();

    const res = await store.dispatch(fetchAddItem(this.state.task));
    if (res.type === itemTypes.ITEM_ADD) {
      if (res.payload === "") {
        getErrorNotify(ERROR_ADD_ITEM_DATA);
        return;
      }
      this.props.updateItems(true);
      return;
    }

    getErrorNotify(res.payload);
  };
  render() {
    const { task } = this.state;
    return (
      <Form className={styles.inputNewTask}>
        <Form.Control type="text" placeholder="Нова задача" value={task} onChange={(e) => this.setState({ task: e.target.value })} />
        <Button variant="outline-primary" onClick={this.addItemFunction} type="submit">
          Додати задачу
        </Button>
      </Form>
    );
  }
}

export default AddItem;
