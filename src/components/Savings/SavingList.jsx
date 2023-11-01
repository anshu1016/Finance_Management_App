import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSavings, deleteSaving } from "../../redux/SavingSlice";
import { Link } from "react-router-dom";
function SavingListComponent() {
  const dispatch = useDispatch();
  const { savings, loading, error } = useSelector((state) => state.savings);
  const [localSavings, setLocalSavings] = useState([]);

  useEffect(() => {
    dispatch(fetchSavings());
  }, [dispatch]);

  useEffect(() => {
    setLocalSavings(savings);
  }, [savings]);

  const handleDeleteSaving = (id) => {
    // Optimistic update: remove the saving locally
    const updatedSavings = localSavings.filter((saving) => saving._id !== id);

    // Send the delete request to the server
    dispatch(deleteSaving(id))
      .then(() => {
        // Handle success if needed
        // The local state has already been updated optimistically
      })
      .catch((error) => {
        // Revert the local state if the server operation fails
        setLocalSavings(updatedSavings);
        console.error("Delete failed:", error);
      });
  };

  console.log(savings, localSavings, "SAVINGS");

  return (
    <div className="container">
      <h2 className="mt-3">Savings</h2>
      {loading === "failed" && <div>Error: {error}</div>}
      {loading === "loading" && <div>Loading...</div>}
      <div className="row">
        {localSavings?.map((saving) => (
          <div key={saving?._id} className="col-lg-4 col-md-6 mb-3">
            <div className="card income-card">
              <div className="card-body">
                <h5 className="card-title">{saving?.category}</h5>
                <p className="card-text">Description: {saving?.description}</p>
                <p className="card-text">Amount: ${saving?.amount}</p>
                <div className="button-container">
                  <button
                    onClick={() => handleDeleteSaving(saving._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                  <Link
                    to={`/savings/editSaving/${saving?._id}`}
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
        <Link to="/savings/addSaving">
          <button className="btn btn-primary">Add Saving</button>
        </Link>
      </div>
    </div>
  );
}

export default SavingListComponent;
