import { Component } from "react";
import Item from "../Item/Item";
import styles from "./Items.module.scss";

class Items extends Component {
  render() {
    return (
      <div>
        {this.props.items.length === 0 ? (
          <p>No data</p>
        ) : (
          <ul className={styles.items}>
            {this.props.items.map((item, i) => (
              <Item
                key={`${item.text}-${i}`}
                item={item}
                updateItems={this.props.updateItems}
              />
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default Items;
