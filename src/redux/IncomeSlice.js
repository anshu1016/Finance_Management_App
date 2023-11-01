import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  incomes: [],
  loading: "idle",
  error: null
};

// Define an async thunk for fetching incomes
export const fetchIncomes = createAsyncThunk(
  "incomes/fetchIncomes",
  async () => {
    const response = await axios.get(
      "https://finance-management-mqeg.onrender.com/incomes"
    );
    return response.data;
  }
);

// Define an async thunk for adding an income
export const addIncome = createAsyncThunk(
  "incomes/addIncome",
  async (incomeData) => {
    const response = await axios.post(
      "https://finance-management-mqeg.onrender.com/incomes",
      incomeData
    );
    return response.data;
  }
);

// Define an async thunk for deleting an income
export const deleteIncome = createAsyncThunk(
  "incomes/deleteIncome",
  async (id) => {
    const response = await axios.delete(
      `https://finance-management-mqeg.onrender.com/incomes/${id}`
    );
    return response.data;
  }
);

// Define an async thunk for updating an income
export const updateIncome = createAsyncThunk(
  "incomes/updateIncome",
  async ({ id, incomeData }) => {
    const response = await axios.post(
      `https://finance-management-mqeg.onrender.com/incomes/${id}`,
      incomeData
    );
    return response.data;
  }
);

// Define the Income Slice
const incomeSlice = createSlice({
  name: "incomes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIncomes.pending, (state) => {
        state.loading = "loading";
        state.error = null;
      })
      .addCase(fetchIncomes.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.incomes = action.payload.data;
      })
      .addCase(fetchIncomes.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(addIncome.fulfilled, (state, action) => {
        state.incomes.push(action.payload.data);
      })
      .addCase(deleteIncome.fulfilled, (state, action) => {
        state.incomes = state.incomes.filter(
          (income) => income._id !== action.payload.data._id
        );
      })
      .addCase(updateIncome.fulfilled, (state, action) => {
        // Handle income update here if needed
        // You might want to update the specific income item in the state
      });
  }
});

export default incomeSlice.reducer;
