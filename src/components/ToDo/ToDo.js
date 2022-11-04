import { useState, useEffect } from "react";
import instance from "../../api/request";
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
    try {
      const res = await instance.post("router?action=getItems", {
        activeID: localStorage.getItem("activeID"),
      });
      if (res.data.items) {
        setItems(res.data.items);
        return;
      }
      console.log("No data");
    } catch (err) {
      console.log("Server error");
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
