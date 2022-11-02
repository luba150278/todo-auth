import { useEffect, useState } from 'react';
import instance from "../../api/request";

function Items() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    async function getItems() {
      const res = await instance.post('router?action=getItems', {
        activeID: localStorage.getItem('activeID'),
      })
      setItems(res.data.items)
    }

    getItems();

  }, []);

  const dataDisplay = () => {
    return ({ items.map })
  }
  return (
    <div>
      {items.length === 0 ? <p>No data</p> : dataDisplay}
    </div>
  );
}

export default Items;