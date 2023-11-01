import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchExpenses,
  deleteExpense,
  expenseSlice
} from "../../redux/ExpenseSlice";
import { Link } from "react-router-dom";
import "./expense.css";

function ExpenseComponent() {
  const dispatch = useDispatch();
  const { expenses, loading, error } = useSelector((state) => state.expenses);
  const [localExpenses, setLocalExpenses] = useState(expenses);

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  // useEffect(() => {
  //   // Update localExpenses when expenses prop changes
  //   setLocalExpenses(expenses);
  // }, [expenses]);

  const handleDeleteExpense = (id) => {
    // Optimistic update: remove the expense locally
    const updatedExpenses = localExpenses.filter(
      (expense) => expense._id !== id
    );

    // Send the delete request to the server
    dispatch(deleteExpense(id))
      .then(() => {
        // Handle success if needed
      })
      .catch((error) => {
        // Revert the local state if the server operation fails
        setLocalExpenses(localExpenses);
        console.error("Delete failed:", error);
      });
    setLocalExpenses(updatedExpenses);
  };

  return (
    <div className="container">
      <h2 className="mt-3">Expenses</h2>

      <div className="row">
        {localExpenses.map((expense) => (
          <div key={expense._id} className="col-lg-4 col-md-6 mb-3">
            <div className="card expense-card">
              <div className="card-body">
                <h5 className="card-title">{expense.category}</h5>
                <p className="card-text">Description: {expense.description}</p>
                <p className="card-text">Amount: ${expense.amount}</p>
                <button
                  onClick={() => handleDeleteExpense(expense._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed-add-button">
        <Link to="/addExpense">
          <button className="btn btn-primary">Add Expense</button>
        </Link>
      </div>
    </div>
  );
}

export default ExpenseComponent;
