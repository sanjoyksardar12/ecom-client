import { useItemsContext } from "../../context/items";
import { formatDate } from "../../utils/index";
import "./items.css";

function Items({
  addItemToCart,
  selectedItems = [],
  filter = false,
  showHighlighted = false,
}) {
  let { items } = useItemsContext();

  if (filter) {
    items = items.filter((item) => selectedItems.includes(item.id));
  }
  return (
    <div className="items">
      {items.map((item) => (
        <Item
          key={item.id}
          item={item}
          addItemToCart={addItemToCart}
          isSelected={showHighlighted && selectedItems?.includes(item.id)}
        />
      ))}
    </div>
  );
}

function Item({ item, addItemToCart, isSelected }) {
  const { id, name, created_at: createdAt } = item;
  const addToCart = (event) => {
    event.stopPropagation();
    addItemToCart?.(id);
  };

  return (
    <div className={`item ${isSelected ? "selected" : ""}`} onClick={addToCart}>
      <strong>ID : </strong> {id}
      <br />
      <strong>Name : </strong> {name}
      <br />
      <strong>created At : </strong> {formatDate(createdAt)}
    </div>
  );
}

export default Items;
