import AddItem from "../AddItem/AddItem";
import Items from "../Items/Items";
import styles from "./ToDo.module.scss";

function ToDo() {
  return (
    <section>
      <div className="container">
        <div className={styles.todoWrap}>
          <AddItem />
          <Items />
        </div>
      </div>
    </section>
  );
}

export default ToDo;
