// savingSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  savings: [],
  loading: "idle",
  isError: null
};

// Define an async thunk for fetching savings
export const fetchSavings = createAsyncThunk(
  "savings/fetchSavings",
  async () => {
    const response = await axios.get(
      "https://finance-management-mqeg.onrender.com/savings"
    );
    return response.data;
  }
);

// Define an async thunk for adding a saving
export const addSaving = createAsyncThunk(
  "savings/addSaving",
  async (savingData) => {
    const response = await axios.post(
      "https://finance-management-mqeg.onrender.com/savings",
      savingData
    );
    return response.data;
  }
);

// Define an async thunk for deleting a saving
export const deleteSaving = createAsyncThunk(
  "savings/deleteSaving",
  async (id) => {
    const response = await axios.delete(
      `https://finance-management-mqeg.onrender.com/savings/${id}`
    );
    return response.data;
  }
);

// Define an async thunk for updating a saving
export const updateSaving = createAsyncThunk(
  "savings/updateSaving",
  async ({ id, savingData }) => {
    const response = await axios.put(
      `https://finance-management-mqeg.onrender.com/savings/${id}`,
      savingData
    );
    return response.data;
  }
);

const savingSlice = createSlice({
  name: "savings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSavings.pending, (state) => {
        state.loading = "loading";
        state.isError = null;
      })
      .addCase(fetchSavings.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.savings = action.payload;
      })
      .addCase(fetchSavings.rejected, (state, action) => {
        state.loading = "failed";
        state.isError = action.error.message;
      })
      .addCase(addSaving.fulfilled, (state, action) => {
        state.savings.push(action.payload.data);
      })
      .addCase(deleteSaving.fulfilled, (state, action) => {
        state.savings = state.savings.filter(
          (saving) => saving._id !== action.payload.data._id
        );
      })
      .addCase(updateSaving.fulfilled, (state, action) => {
        // Handle saving update here if needed
        // You might want to update the specific saving item in the state
      });
  }
});

export default savingSlice.reducer;
