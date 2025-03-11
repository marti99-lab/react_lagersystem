import { useState, useEffect } from "react";
import "./Inventory.css";

type InventoryItem = {
  id: number;
  orderNumber: string;
  name: string;
  stock: number;
  sold: number;
  weight: number;
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
  

  return (
    <div className="inventory">
      <h2>Inventarliste</h2>
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
                <td>{item.price.toFixed(2)} €</td>
                <td>{item.discount}%</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8}>Keine Daten verfügbar</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
  
};

export default Inventory;
