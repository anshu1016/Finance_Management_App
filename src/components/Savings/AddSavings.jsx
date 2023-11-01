import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addSaving } from "../../redux/SavingSlice";
import { useNavigate } from "react-router-dom";

function AddSavingComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [savingData, setSavingData] = useState({
    category: "",
    description: "",
    amount: 0
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSavingData({
      ...savingData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addSaving(savingData))
      .then(() => {
        navigate("/savings"); // Redirect to the savings list after adding
      })
      .catch((error) => {
        console.error("Add Saving failed:", error);
      });
  };

  return (
    <div className="container">
      <h2 className="mt-3">Add Saving</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            className="form-control"
            id="category"
            name="category"
            value={savingData.category}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={savingData.description}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            name="amount"
            value={savingData.amount}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add Saving
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/savings")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddSavingComponent;
