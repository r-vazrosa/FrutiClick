import React, { useState } from "react";

const API_URL = "http://localhost:3002/api/items";
// const API_URL = "https://fruticlick-backend.onrender.com/api/items";

const ItemDeleteDialog = ({ item, onClose, onDeleted }) => {
  const [result, setResult] = useState("");

  const deleteItem = async () => {
    setResult("Deleting...");
    try {
      const resp = await fetch(`${API_URL}/${item.id}`, { method: "DELETE" });
      const data = await resp.json();
      if (!resp.ok) {
        setResult(data.message || "Could not delete item.");
        return;
      }
      setResult("Deleted.");
      onDeleted(item.id);
      onClose();
    } catch (err) {
      console.error(err);
      setResult("Network error while deleting item.");
    }
  };

  return (
    <div className="shop-modal-overlay" role="dialog" aria-modal="true">
      <div className="shop-modal">
        <div className="shop-modal-header">
          <h3>Delete item</h3>
        </div>
        <div style={{ padding: "0 16px 16px" }}>
          <p>Are you sure you want to delete <strong>{item.name}</strong>?</p>
          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={onClose} className="shop-button-cancel">No</button>
            <button onClick={deleteItem} className="shop-button-delete-confirm">Yes, delete</button>
            </div>
          <div style={{ marginTop: 8 }} aria-live="polite">{result}</div>
        </div>
      </div>
    </div>
  );
};

export default ItemDeleteDialog;
