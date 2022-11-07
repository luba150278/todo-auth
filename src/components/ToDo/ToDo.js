import { useState, useEffect } from "react";

import getErrorNotify from "../../common/functions/getErrorMessageFunction";
import { store } from "../../store";
import { fetchToDo } from "../../store/actions/todo.action";
import { todoTypes } from "../../store/types/todo.types";
import AddItem from "../AddItem/AddItem";
import Items from "../Items/Items";
import styles from "./ToDo.module.scss";

function ToDo() {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [isItemsUpdate, setIsItemsUpdate] = useState(0);

  const updateItems = (isUpdate) => {
    if (isUpdate) {
      setIsLoading(true);
      setIsItemsUpdate(isItemsUpdate + 1);
    }
  };

  async function getItems() {
    const res = await store.dispatch(fetchToDo());
    setIsLoading(res.payload.loading);
    if (res.type === todoTypes.TODO_SUCCESS) {
      setItems(res.payload);
      return;
    }
    getErrorNotify(res.payload.error);
  }

  useEffect(() => {
    getItems();
  }, [isItemsUpdate]);

  return (
    <section>
      <div className="container">
        {isLoading ? (
          "loading"
        ) : (
          <>
            <h1 className={styles.title}>Додату нову задачу:</h1>
            <div className={styles.todoWrap}>
              <AddItem updateItems={updateItems} />
              <Items items={items} updateItems={updateItems} />
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default ToDo;
