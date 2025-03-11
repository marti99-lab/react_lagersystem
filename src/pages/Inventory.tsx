import { useState, useEffect } from "react";
import "./Inventory.css";
import NewMedicineForm from "../components/NewMedicineForm";

type InventoryItem = {
  id: string;
  orderNumber: string;
  name: string;
  stock: number;
  sold: number;
  weight: string;
  price: number;
  discount: number;
};

const Inventory = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/inventory")
      .then((response) => response.json())
      .then((data: InventoryItem[]) => {
        console.log("Daten von API:", data);
        setItems(data);
      })
      .catch((error) => console.error("Fehler beim Abruf:", error));
  }, []);
 
  const getNextId = () => {
    if (items.length === 0) return "1";
    const maxId = Math.max(...items.map((item) => parseInt(item.id, 10)).filter(Number.isFinite), 0);
    return (maxId + 1).toString();
  };

  const addItem = (newItem) => {
    const newId = getNextId();
    const itemWithId = { ...newItem, id: newId, sold: "0" };

    fetch("http://localhost:5000/inventory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(itemWithId),
    })
      .then((response) => response.json())
      .then((data) => setItems([...items, data]));
  };

  const deleteItem = (id) => {
    fetch(`http://localhost:5000/inventory/${id}`, { method: "DELETE" })
      .then(() => setItems(items.filter((item) => item.id !== id)));
  };
  

  return (
    <div className="inventory">
      <h2>Inventarliste</h2>
      <NewMedicineForm onAdd={addItem} items={items} /> 
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Bestellnummer</th>
            <th>Produkt</th>
            <th>Anzahl im Lager</th>
            <th>Anzahl verkauft</th>
            <th>Gewicht</th>
            <th>Preis (€)</th>
            <th>Rabatt (%)</th>
            <th>Aktion</th>             
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.orderNumber}</td>
                <td>{item.name}</td>
                <td>{item.stock}</td>
                <td>{item.sold}</td>
                <td>{item.weight}</td>
                <td>{Number(item.price).toFixed(2)} €</td>
                <td>{item.discount}%</td>
                <td>
                  <button onClick={() => deleteItem(item.id)}>🗑</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9}>Keine Daten verfügbar</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
  
};

export default Inventory;
