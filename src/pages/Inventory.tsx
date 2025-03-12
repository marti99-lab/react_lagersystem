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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<InventoryItem>>({});
  const [searchTerm, setSearchTerm] = useState("");

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

  const startEdit = (item: InventoryItem) => {
    setEditingId(item.id);
    setEditValues(item);
  };

  const handleEditChange = (e) => {
    setEditValues({ ...editValues, [e.target.name]: e.target.value });
  };

  const saveEdit = (id: string) => {
    fetch(`http://localhost:5000/inventory/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editValues),
    })
      .then((response) => response.json())
      .then((updatedItem) => {
        setItems(items.map((item) => (item.id === id ? updatedItem : item)));
        setEditingId(null);
      });
  };

  // 🔍 **Filtering logic (Search Function)**
  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.id.includes(searchTerm)
  );

  return (
    <div className="inventory">
      <h2>Inventarliste</h2>

      {/* Medicine Form */}
      <NewMedicineForm onAdd={addItem} items={items} /> 

      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="🔍 Suche nach ID oder Name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
      />

      {/* Inventory Table */}
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
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.orderNumber}</td>
                <td>{item.name}</td>
                <td>
                  {editingId === item.id ? (
                    <input
                      type="number"
                      name="stock"
                      value={editValues.stock || ""}
                      onChange={handleEditChange}
                    />
                  ) : (
                    item.stock
                  )}
                </td>
                <td>{item.sold}</td>
                <td>{item.weight}</td>
                <td>
                  {editingId === item.id ? (
                    <input
                      type="number"
                      name="price"
                      step="0.01"
                      value={editValues.price || ""}
                      onChange={handleEditChange}
                    />
                  ) : (
                    `${Number(item.price).toFixed(2)} €`
                  )}
                </td>
                <td>
                  {editingId === item.id ? (
                    <input
                      type="number"
                      name="discount"
                      value={editValues.discount || ""}
                      onChange={handleEditChange}
                    />
                  ) : (
                    `${item.discount}%`
                  )}
                </td>
                <td>
                  {editingId === item.id ? (
                    <>
                      <button onClick={() => saveEdit(item.id)}>💾 Save</button>
                      <button onClick={() => setEditingId(null)}>❌ Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEdit(item)}>✏️ Edit</button>
                      <button onClick={() => deleteItem(item.id)}>🗑 Delete</button>
                    </>
                  )}
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
