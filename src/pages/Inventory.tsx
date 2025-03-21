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
  const [sortConfig, setSortConfig] = useState<{ key: keyof InventoryItem; direction: "asc" | "desc" } | null>(null);
  const [originalItems, setOriginalItems] = useState<InventoryItem[]>([]);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/inventory")
      .then((response) => response.json())
      .then((data: InventoryItem[]) => {
        console.log("Daten von API:", data);
        setItems(data);
        setOriginalItems(data);
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
      .then(() => {
        setItems(items.filter((item) => item.id !== id));
        setStatusMessage("🗑️ Medikament erfolgreich gelöscht");
        setTimeout(() => setStatusMessage(""), 3000);
      });
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
        setStatusMessage("💾 Änderungen gespeichert");
        setTimeout(() => setStatusMessage(""), 3000);
      });
  };

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.id.includes(searchTerm)
  );

  const sortItems = (key: keyof InventoryItem) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sorted = [...filteredItems].sort((a, b) => {
      const aValue = typeof a[key] === "string" ? a[key].toString().toLowerCase() : a[key];
      const bValue = typeof b[key] === "string" ? b[key].toString().toLowerCase() : b[key];

      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setItems(sorted);
  };

  return (
    <div className="inventory">
      <h2>Inventarliste</h2>
      {statusMessage && (
        <p style={{ color: "green", marginBottom: "1rem", fontWeight: "bold" }}>
          {statusMessage}
        </p>
      )}
      <div className="inventory-controls">
        <button onClick={() => setItems(originalItems)}>🔄 Sortierung zurücksetzen</button>
        <input
          type="text"
          placeholder="🔍 Suche nach ID oder Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="inventory-search"
        />
      </div>
      <NewMedicineForm onAdd={addItem} items={items} />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Bestellnummer</th>
            <th onClick={() => sortItems("name")} style={{ cursor: "pointer", textAlign: "center" }}>
              <span>🔼</span>
              <span>Produkt</span>
              <span>🔽</span>
            </th>
            <th onClick={() => sortItems("stock")} style={{ cursor: "pointer", textAlign: "center" }}>
              <span>🔼</span>
              <span>Anzahl im Lager</span>
              <span>🔽</span>
            </th>
            <th>Anzahl verkauft</th>
            <th>Gewicht</th>
            <th onClick={() => sortItems("price")} style={{ cursor: "pointer", textAlign: "center" }}>
              <span>🔼</span>
              <span>Preis (€)</span>
              <span>🔽</span>
            </th>
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
                      <button className="save-btn" onClick={() => saveEdit(item.id)}>💾 Save</button>
                      <button className="cancel-btn" onClick={() => setEditingId(null)}>❌ Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="edit-btn" onClick={() => startEdit(item)}>✏️ Edit</button>
                      <button className="delete-btn" onClick={() => deleteItem(item.id)}>🗑 Delete</button>
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
