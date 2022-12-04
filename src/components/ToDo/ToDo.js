import { Component } from "react";
import Pagination from "react-bootstrap/Pagination";

import getErrorNotify from "../../common/functions/getErrorMessageFunction";
import { store } from "../../store";
import { fetchToDo } from "../../store/actions/todo.action";
import { todoTypes } from "../../store/types/todo.types";
import AddItem from "../AddItem/AddItem";
import Items from "../Items/Items";
import styles from "./ToDo.module.scss";

const itemsOnPage = 5;

/**
 * Можна винести пагінацію в окремий компонент
 */
class ToDo extends Component {
  state = {
    isLoading: true,
    active: 1,
    items: [],
  };
  getPages = () => {
    let pages = [];
    for (
      let number = 1;
      number <= Math.ceil(this.state.items.length / itemsOnPage);
      number++
    ) {
      pages.push(
        <Pagination.Item
          key={number}
          active={number === this.state.active}
          onClick={() => {
            this.setState(() => ({ active: number }));
          }}
        >
          {number}
        </Pagination.Item>
      );
    }

    return pages;
  };
  updateItems = (isUpdate) => {
    if (isUpdate) {
      this.setState({ isLoading: true });
    }
  };
  getItems = async () => {
    const res = await store.dispatch(fetchToDo());
    this.setState({ isLoading: res.payload.loading });
    if (res.type === todoTypes.TODO_SUCCESS) {
      this.setState({ items: res.payload });
      return;
    }
    getErrorNotify(res.payload.error);
  };
  componentDidMount() {
    this.getItems();
  }

  componentDidUpdate(prevState) {
    if (this.state.items !== prevState.items) {
      this.getItems();
    }
  }

  render() {
    const { isLoading } = this.state;
    const pages = this.getPages();
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
                <Items
                  items={this.state.items.slice(
                    (this.state.active - 1) * itemsOnPage,
                    this.state.active * itemsOnPage
                  )}
                  updateItems={this.updateItems}
                />
              </div>
            </>
          )}

          {pages.length > 1 && (
            <div className={styles.pagWrap}>
              <Pagination size="sm" className={styles.pag}>
                {pages}
              </Pagination>
            </div>
          )}
        </div>
      </section>
    );
  }
}

export default ToDo;
