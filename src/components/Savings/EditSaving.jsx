import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSaving } from "../../redux/SavingSlice";
import { useNavigate, useParams } from "react-router-dom";

function EditSavingComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const savings = useSelector((state) => state.savings.savings);
  const saving = savings.find((item) => item._id === id);

  const [savingData, setSavingData] = useState({
    category: "",
    description: "",
    amount: 0
  });

  useEffect(() => {
    if (saving) {
      setSavingData({
        category: saving.category,
        description: saving.description || "",
        amount: saving.amount
      });
    }
  }, [saving]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSavingData({
      ...savingData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateSaving({ id, savingData }))
      .then(() => {
        navigate("/savings"); // Redirect to the savings list after updating
      })
      .catch((error) => {
        console.error("Update Saving failed:", error);
      });
  };

  return (
    <div className="container">
      <h2 className="mt-3">Edit Saving</h2>

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
          Update Saving
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

export default EditSavingComponent;
