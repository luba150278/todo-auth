import { useState, useEffect } from "react";
import { store } from "../../store";
import { fetchItem } from "../../store/dispatches/item.dispatch";
import AddItem from "../AddItem/AddItem";
import Items from "../Items/Items";
import styles from "./ToDo.module.scss";

function ToDo() {
  const [items, setItems] = useState([]);
  const [isItemsUpdate, setIsItemsUpdate] = useState(0);

  const updateItems = (isUpdate) => {
    if (isUpdate) {
      setIsItemsUpdate(isItemsUpdate + 1);
    }
  };

  async function getItems() {

    const data = await store.dispatch(fetchItem());

    if (data.payload) {
      setItems(data.payload);
      return;
    }
  }

  useEffect(() => {
    getItems();
  }, [isItemsUpdate]);

  return (
    <section>
      <div className="container">
        <h1 className={styles.title}>Додату нову задачу:</h1>
        <div className={styles.todoWrap}>
          <AddItem updateItems={updateItems} />
          <Items items={items} updateItems={updateItems} />
        </div>
      </div>
    </section>
  );
}

export default ToDo;
