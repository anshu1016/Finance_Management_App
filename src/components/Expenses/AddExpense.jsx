import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addExpense } from "../../redux/ExpenseSlice";
import { useNavigate, Link } from "react-router-dom";
function AddExpensePage({ history }) {
  const dispatch = useDispatch();
  const [expenseData, setExpenseData] = useState({
    category: "",
    date: "",
    description: "",
    amount: 0
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseData({ ...expenseData, [name]: value });
  };

  const handleAddExpense = () => {
    dispatch(addExpense(expenseData)).then(() => {
      navigate("/expenses"); // Redirect to the expenses list page after adding expense
    });
  };

  return (
    <div className="container">
      <h2 className="mt-3">Add Expense</h2>
      <form>
        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            className="form-control"
            name="category"
            value={expenseData.category}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            className="form-control"
            name="date"
            value={expenseData.date}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            className="form-control"
            name="description"
            value={expenseData.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            className="form-control"
            name="amount"
            value={expenseData.amount}
            onChange={handleChange}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAddExpense}
        >
          Add Expense
        </button>
      </form>
      <button
        className="btn btn-danger mt-3"
        onClick={() => navigate("/expenses")}
      >
        Back to Expenses List
      </button>
    </div>
  );
}

export default AddExpensePage;
