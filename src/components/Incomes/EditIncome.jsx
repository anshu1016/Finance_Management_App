// EditIncomeComponent.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateIncome, fetchIncomes } from "../../redux/IncomeSlice";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./income.css";

function EditIncomeComponent() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { incomes } = useSelector((state) => state.incomes);
  const [incomeData, setIncomeData] = useState({
    category: "",
    date: new Date(),
    description: "",
    amount: 0
  });
  const navigate = useNavigate();
  useEffect(() => {
    const income = incomes.find((income) => income._id === id);
    if (income) {
      setIncomeData(income);
    } else {
      dispatch(fetchIncomes());
    }
  }, [id, incomes, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncomeData({
      ...incomeData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateIncome({ id, incomeData }))
      .then(() => {
        // Handle success if needed
        // Redirect to the income list or do something else
      })
      .catch((error) => {
        // Handle the error
        console.error("Edit Income failed:", error);
      });
    navigate("/incomes");
  };

  return (
    <div className="container">
      <h2 className="mt-3">Edit Income</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <input
            type="text"
            className="form-control"
            id="category"
            name="category"
            value={incomeData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            value={incomeData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={incomeData.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            id="amount"
            name="amount"
            value={incomeData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <Link to="/incomes" className="btn btn-secondary ml-2">
          Cancel
        </Link>
      </form>
    </div>
  );
}

export default EditIncomeComponent;
