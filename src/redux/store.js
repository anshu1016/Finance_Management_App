// store.js
import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./ExpenseSlice";
import incomeReducer from "./IncomeSlice";
import savingReducer from "./SavingSlice";
const store = configureStore({
  reducer: {
    expenses: expenseReducer,
    incomes: incomeReducer,
    savings: savingReducer
  }
});

export default store;
