import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:3002/api/items";
// const API_URL = "https://fruticlick-backend.onrender.com/api/items";

const ItemEditDialog = ({ item, onClose, onUpdated }) => {
  const [result, setResult] = useState("");
  const [form, setForm] = useState({
    name: item.name || "",
    description: item.description || "",
    value: item.value != null ? item.value : "",
    cost: item.cost != null ? item.cost : "",
    type: item.type || "click",
  });
  const [fileInput, setFileInput] = useState(null);
  const [previewSrc, setPreviewSrc] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (fileInput) {
      setPreviewSrc(URL.createObjectURL(fileInput));
      return () => URL.revokeObjectURL(previewSrc);
    }

    const raw = (item.image || "").trim();
    if (!raw) {
      setPreviewSrc("");
    } else {
      if (raw.startsWith("/")) {
        setPreviewSrc(raw);
      } else {
        setPreviewSrc(`/${raw}`);
      }
    }
  }, [fileInput]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const f = e.target.files && e.target.files[0];
    setFileInput(f || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult("... sending");
    setErrors({});
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      setResult("Please fix the errors above.");
      return;
    }

    if (!fileInput) {
      setResult("Please pick an image file to upload.");
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
      const response = await fetch(`${API_URL}/${item.id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();

      if (response.status === 200) {
        setResult("Item updated successfully");
        const updated = data.item ? data.item : data;
        if (updated && updated.image) {
            updated.image = updated.image.startsWith("/") ? updated.image : `/${updated.image}`;
            updated.image = `${updated.image}?ts=${Date.now()}`;
        }
        onUpdated(updated);
        onClose();
      } else {
        if (data && data.details) {
          const srvErrs = {};
          data.details.forEach((d) => {
            srvErrs[d.field] = d.message;
          });
          setErrors(srvErrs);
        }
        setResult(data.message || "Error editing item");
      }
    } catch (err) {
      console.error(err);
      setResult("Network error while editing item");
    }
  };

  return (
    <div className="shop-modal-overlay" role="dialog" aria-modal="true">
      <div className="shop-modal">
        <button onClick={onClose} className="shop-modal-close" aria-label="Close">&times;</button>
        <div className="shop-modal-header">
          <h3>Edit item</h3>
        </div>

        <form onSubmit={handleSubmit} className="shop-modal-form" encType="multipart/form-data">
          <div className="shop-field">
            <label>
              Name
              <input name="name" value={form.name} onChange={handleChange} required />
            </label>
            {errors.name && <div className="shop-field-error">{errors.name}</div>}
          </div>

          <div className="shop-field">
            <label>
              Description
              <textarea name="description" value={form.description} onChange={handleChange} required />
            </label>
            {errors.description && <div className="shop-field-error">{errors.description}</div>}
          </div>

          <div className="shop-grid-two">
            <label>
              Value
              <input name="value" type="number" min="0" value={form.value} onChange={handleChange} required />
            </label>

            <label>
              Cost
              <input name="cost" type="number" min="0" value={form.cost} onChange={handleChange} required />
            </label>
          </div>

          {errors.value && <div className="shop-field-error">{errors.value}</div>}
          {errors.cost && <div className="shop-field-error">{errors.cost}</div>}

          <div className="shop-field">
            <label>
              Type
              <select name="type" value={form.type} onChange={handleChange}>
                <option value="click">click</option>
                <option value="second">second</option>
              </select>
            </label>
            {errors.type && <div className="shop-field-error">{errors.type}</div>}
          </div>

          <div style={{ marginTop: 8 }}>
            <label>
              Pick an image file (required)
              <input type="file" accept="image/*" onChange={handleFileChange} required />
            </label>
          </div>

          {previewSrc && (
            <div style={{ marginTop: 8 }}>
              <img src={previewSrc} alt="preview" style={{ maxWidth: "100%", maxHeight: 180 }} />
            </div>
          )}

          <div className="shop-modal-actions">
            <button type="submit" className="shop-button-primary">Save</button>
            <button type="button" onClick={onClose} className="shop-button-secondary">Cancel</button>
            <div className="shop-modal-result" aria-live="polite">{result}</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemEditDialog;
