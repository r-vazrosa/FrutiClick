import { useEffect, useState } from "react";
import "../styles/Shop.css";
import ShopItem from "./ShopItem.jsx";

//const API_URL = "http://localhost:3002/api/items";
const API_URL = "https://fruticlick-backend.onrender.com/api/items";

const Shop = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    value: "",
    cost: "",
    type: "click",
  });
  const [fileInput, setFileInput] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [formResult, setFormResult] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP ${response.status} - ${response.statusText}`);
        const data = await response.json();
        setItems(data);
      } catch (e) {
        setError(e);
      }
    };
    getData();
  }, []);

  const validate = (values) => {
    const errs = {};
    if (!values.name || values.name.trim().length < 3) errs.name = "Name must be at least 3 characters.";
    if (!values.description || values.description.trim().length < 10) errs.description = "Description must be at least 10 characters.";
    const valueNum = Number(values.value);
    if (Number.isNaN(valueNum) || valueNum < 0) errs.value = "Value must be a number >= 0.";
    const costNum = Number(values.cost);
    if (Number.isNaN(costNum) || costNum < 0) errs.cost = "Cost must be a number >= 0.";
    if (!["click", "second"].includes(values.type)) errs.type = 'Type must be "click" or "second".';
    return errs;
  };

  const openForm = () => {
    setForm({ name: "", description: "", value: "", cost: "", type: "click" });
    setFileInput(null);
    setFormErrors({});
    setFormResult("");
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    setFileInput(file || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormResult("Sending...");
    const errs = validate(form);
    setFormErrors(errs);
    if (Object.keys(errs).length > 0) {
      setFormResult("Please fix the errors above.");
      return;
    }

    if (!fileInput) {
      setFormResult("Please pick an image file.");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name.trim());
    formData.append("description", form.description.trim());
    formData.append("value", String(Number(form.value)));
    formData.append("cost", String(Number(form.cost)));
    formData.append("type", form.type);
    formData.append("image", fileInput);

    try {
      const resp = await fetch(API_URL, {
        method: "POST",
        body: formData
      });
      const data = await resp.json();
      if (!resp.ok) {
        if (data && data.details) {
          const srvErrs = {};
          data.details.forEach((d) => {
            srvErrs[d.field] = d.message;
          });
          setFormErrors(srvErrs);
        }
        setFormResult(data.message || "Error adding item.");
        return;
      }
      let newItem = data.item ? data.item : data;
      if (newItem && newItem.image) {
        newItem.image = newItem.image.startsWith("/") ? newItem.image : `/${newItem.image}`;
        newItem.image = `${newItem.image}?ts=${Date.now()}`;
      }
      setItems((prev) => [...prev, newItem]);
      setFormResult("Item added!");
      setTimeout(() => {
        setFormResult("");
        closeForm();
      }, 900);
    } catch (err) {
      console.error(err);
      setFormResult("Network error while adding item.");
    }
  };

  const handleItemUpdated = (updatedItem) => {
    setItems(prev => prev.map(it => it.id === updatedItem.id ? updatedItem : it));
  };

  const handleItemDeleted = (deletedId) => {
    setItems(prev => prev.filter(it => it.id !== deletedId));
  };

  return (
    <div id="shop">
      {error && <p className="shop-error">Error: {error.message}</p>}

      <div className="shop-list">
        <div className="shop-add-wrapper">
          <button aria-label="Add item" onClick={openForm} className="shop-add-button" title="Add a new shop item">+</button>
        </div>

        {items.map((item) => (
          <ShopItem
            key={item.id}
            item={item}
            onItemUpdated={handleItemUpdated}
            onItemDeleted={handleItemDeleted}
          />
        ))}
      </div>

      {showForm && (
        <div className="shop-modal-overlay" role="dialog" aria-modal="true">
          <div className="shop-modal">
            <button onClick={closeForm} className="shop-modal-close" aria-label="Close">&times;</button>

            <div className="shop-modal-header">
              <h3>Add new item</h3>
            </div>

            <form onSubmit={handleSubmit} className="shop-modal-form" encType="multipart/form-data">
              <div className="shop-field">
                <label>
                  Name
                  <input name="name" value={form.name} onChange={handleFormChange} required />
                </label>
                {formErrors.name && <div className="shop-field-error">{formErrors.name}</div>}
              </div>

              <div className="shop-field">
                <label>
                  Description
                  <textarea name="description" value={form.description} onChange={handleFormChange} required />
                </label>
                {formErrors.description && <div className="shop-field-error">{formErrors.description}</div>}
              </div>

              <div className="shop-grid-two">
                <label>
                  Value
                  <input name="value" type="number" min="0" value={form.value} onChange={handleFormChange} required />
                </label>

                <label>
                  Cost
                  <input name="cost" type="number" min="0" value={form.cost} onChange={handleFormChange} required />
                </label>
              </div>

              {formErrors.value && <div className="shop-field-error">{formErrors.value}</div>}
              {formErrors.cost && <div className="shop-field-error">{formErrors.cost}</div>}

              <div className="shop-field">
                <label>
                  Type
                  <select name="type" value={form.type} onChange={handleFormChange}>
                    <option value="click">click</option>
                    <option value="second">second</option>
                  </select>
                </label>
                {formErrors.type && <div className="shop-field-error">{formErrors.type}</div>}
              </div>

              <div className="shop-field">
                <label>
                  Choose an image file (required)
                  <input type="file" accept="image/*" onChange={handleFileChange} required />
                </label>
              </div>

              <div className="shop-modal-actions">
                <button type="submit" className="shop-button-primary">Add item</button>
                <button type="button" onClick={closeForm} className="shop-button-secondary">Cancel</button>
                <div className="shop-modal-result" aria-live="polite">{formResult}</div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
