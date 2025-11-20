import { useEffect, useState } from "react";
import "../styles/Shop.css";
import ShopItem from "./ShopItem.jsx";

const API_URL = "https://fruticlick-backend.onrender.com/api/items";
//const API_URL = "http://localhost:3002/api/items";

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
    image: ""
  });
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
    if (values.image && values.image.trim().length > 0) {
      try {
        new URL(values.image);
      } catch {
        if (!values.image.startsWith("/") && !values.image.startsWith("./") && !values.image.startsWith("../") && !values.image.startsWith("//")) {
          errs.image = "Image must be a valid URL or a relative path.";
        }
      }
    }
    return errs;
  };

  const openForm = () => {
    setForm({ name: "", description: "", value: "", cost: "", type: "click", image: "" });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormResult("Sending...");
    const errs = validate(form);
    setFormErrors(errs);
    if (Object.keys(errs).length > 0) {
      setFormResult("Please fix the errors above.");
      return;
    }

    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      value: Number(form.value),
      cost: Number(form.cost),
      type: form.type,
      image: form.image.trim()
    };

    try {
      const resp = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
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
      const newItem = data.item ? data.item : data;
      setItems((prev) => [...prev, newItem]);
      setFormResult("Item added!");
      setTimeout(() => {
        setFormResult("");
        closeForm();
      }, 900);
    } catch {
      setFormResult("Network error while adding item.");
    }
  };

  return (
    <div id="shop">
      {error && <p className="shop-error">Error: {error.message}</p>}

      <div className="shop-list">
        <div className="shop-add-wrapper">
          <button aria-label="Add item" onClick={openForm} className="shop-add-button" title="Add a new shop item">+</button>
        </div>

        {items.map((item) => (
          <ShopItem key={item.id} item={item} />
        ))}
      </div>

      {showForm && (
        <div className="shop-modal-overlay" role="dialog" aria-modal="true">
          <div className="shop-modal">
            <button onClick={closeForm} className="shop-modal-close" aria-label="Close">&times;</button>

            <div className="shop-modal-header">
              <h3>Add new item</h3>
            </div>

            <form onSubmit={handleSubmit} className="shop-modal-form">
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
                  Image URL (full URL or relative path)
                  <input name="image" value={form.image} onChange={handleFormChange} placeholder="/images/..." />
                </label>
                {formErrors.image && <div className="shop-field-error">{formErrors.image}</div>}
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
