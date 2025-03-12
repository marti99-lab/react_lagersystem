import { useState } from "react";
import "../pages/Inventory.css";

const NewMedicineForm = ({ onAdd, items }) => {
  const getNextId = () => {
    if (items.length === 0) return 1;

    const maxId = items.reduce((max, item) => {
      const currentId = Number(item.id);
      return currentId > max ? currentId : max;
    }, 0);

    return maxId + 1;
  };

  const getNextOrderNumber = () => {
    if (items.length === 0) return "ORD-1001";

    const maxOrder = items.reduce((max, item) => {
      const orderNum = parseInt(item.orderNumber.replace("ORD-", ""), 10);
      return orderNum > max ? orderNum : max;
    }, 1000);

    return `ORD-${maxOrder + 1}`;
  };

  const [newItem, setNewItem] = useState({
    name: "",
    stock: "",
    sold: "0",
    weight: "",
    price: "",
    discount: "",
  });

  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = getNextId();
    const newOrderNumber = getNextOrderNumber();

    onAdd({
      id: newId,
      orderNumber: newOrderNumber,
      ...newItem,
    });

    setNewItem({
      name: "",
      stock: "",
      sold: "0",
      weight: "",
      price: "",
      discount: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      <input name="name" placeholder="Name" value={newItem.name} onChange={handleChange} required />
      <input name="stock" placeholder="Stock" type="number" value={newItem.stock} onChange={handleChange} required />
      <input name="weight" placeholder="Weight (mg/ml)" value={newItem.weight} onChange={handleChange} />
      <input name="price" placeholder="Price (€)" type="number" step="0.01" value={newItem.price} onChange={handleChange} required />
      <input name="discount" placeholder="Discount (%)" type="number" value={newItem.discount} onChange={handleChange} />
      <button type="submit">➕ Add Medicine</button>
    </form>
  );
};

export default NewMedicineForm;

