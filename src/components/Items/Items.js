import { useEffect, useState } from "react";
import instance from "../../api/request";
import Item from "../Item/Item";
import styles from './Items.module.scss';

function Items() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    async function getItems() {
      const res = await instance.post("router?action=getItems", {
        activeID: localStorage.getItem("activeID"),
      });
      setItems(res.data.items);
    }

    getItems();
  }, []);

  return (
    <div>
      {items.length === 0 ? (
        <p>No data</p>
      ) : (
        <ul className={styles.items}>
          {items.map((item, i) => (
            // <li key={`${item.text}-${i}`}>{item.text}</li>
            <Item key={`${item.text}-${i}`} item={item} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default Items;
