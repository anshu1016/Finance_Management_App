import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIncomes, deleteIncome } from "../../redux/IncomeSlice";
import { Link } from "react-router-dom";
import "./income.css";

function IncomeComponent() {
  const dispatch = useDispatch();
  const { incomes, loading, error } = useSelector((state) => state.incomes);
  const [localIncomes, setLocalIncomes] = useState([]);

  useEffect(() => {
    dispatch(fetchIncomes());
  }, [dispatch]);

  useEffect(() => {
    setLocalIncomes(incomes);
  }, [incomes]);

  const handleDeleteIncome = (id) => {
    // Optimistic update: remove the income locally
    const updatedIncomes = localIncomes.filter((income) => income._id !== id);

    // Send the delete request to the server
    dispatch(deleteIncome(id))
      .then(() => {
        // Handle success if needed
        // The local state has already been updated optimistically
      })
      .catch((error) => {
        // Revert the local state if the server operation fails
        setLocalIncomes(localIncomes);
        console.error("Delete failed:", error);
      });
  };

  return (
    <div className="container">
      <h2 className="mt-3">Incomes</h2>

      <div className="row">
        {localIncomes.map((income) => (
          <div key={income._id} className="col-lg-4 col-md-6 mb-3">
            <div className="card income-card">
              <div className="card-body">
                <h5 className="card-title">{income.category}</h5>
                <p className="card-text">Description: {income.description}</p>
                <p className="card-text">Amount: ${income.amount}</p>
                <div className="button-container">
                  <button
                    onClick={() => handleDeleteIncome(income._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                  <Link
                    to={`/incomes/editIncome/${income._id}`}
                    className="btn btn-primary"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed-add-button">
        <Link to="/incomes/addIncome">
          <button className="btn btn-primary">Add Income</button>
        </Link>
      </div>
    </div>
  );
}

export default IncomeComponent;
