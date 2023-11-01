// expenseSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  expenses: [],
  loading: "idle",
  error: null
};

// Define an async thunk for fetching expenses
export const fetchExpenses = createAsyncThunk(
  "expenses/fetchExpenses",
  async () => {
    const response = await axios.get(
      "https://finance-management-mqeg.onrender.com/expenses"
    );
    return response.data;
  }
);

// Define an async thunk for adding an expense
export const addExpense = createAsyncThunk(
  "expenses/addExpense",
  async (expenseData) => {
    const response = await axios.post(
      "https://finance-management-mqeg.onrender.com/expenses",
      expenseData
    );
    return response.data;
  }
);

// Define an async thunk for deleting an expense
export const deleteExpense = createAsyncThunk(
  "expenses/deleteExpense",
  async (id) => {
    const response = await axios.delete(
      `https://finance-management-mqeg.onrender.com/expenses/${id}`
    );
    return response.data;
  }
);

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = "loading";
        state.error = null;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.expenses = action.payload.data;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.expenses.push(action.payload.data);
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.expenses = state.expenses.filter(
          (expense) => expense._id !== action.payload.data._id
        );
      });
  }
});

export default expenseSlice.reducer;
