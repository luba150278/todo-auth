import { Component } from "react";

import getErrorNotify from "../../common/functions/getErrorMessageFunction";
import { store } from "../../store";
import { fetchToDo } from "../../store/actions/todo.action";
import { todoTypes } from "../../store/types/todo.types";
import AddItem from "../AddItem/AddItem";
import Items from "../Items/Items";
import styles from "./ToDo.module.scss";

class ToDo extends Component {
  state = {
    isLoading: true,
    items: [],
  }


  updateItems = (isUpdate) => {
    if (isUpdate) {
      this.setState({ isLoading: true});
    }
  };
  getItems = async()=> {
    const res = await store.dispatch(fetchToDo());
    this.setState({ isLoading: res.payload.loading });
    if (res.type === todoTypes.TODO_SUCCESS) {
      this.setState({ items: res.payload });
      return;
    }
    getErrorNotify(res.payload.error);
  }
  componentDidMount() {
    this.getItems();
  }

  componentDidUpdate(prevState) {
    if (this.state.items !== prevState.items) {
      this.getItems();
    }
  }

  render() {
    const { isLoading, items } = this.state;
    return (
      <section>
        <div className="container">
          {isLoading ? (
            "loading"
          ) : (
            <>
              <h1 className={styles.title}>Додату нову задачу:</h1>
              <div className={styles.todoWrap}>
                <AddItem updateItems={this.updateItems} />
                <Items items={items} updateItems={this.updateItems} />
              </div>
            </>
          )}
        </div>
      </section>
    );
  }
}

export default ToDo;
