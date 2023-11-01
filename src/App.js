import AddExpensePage from "./components/Expenses/AddExpense";
import ExpenseComponent from "./components/Expenses/ExpenseList";
import AddIncomeComponent from "./components/Incomes/AddIncome";
import EditIncomeComponent from "./components/Incomes/EditIncome";
import IncomeComponent from "./components/Incomes/IncomeList";
import AddSavingComponent from "./components/Savings/AddSavings";
import EditSavingComponent from "./components/Savings/EditSaving";
import SavingListComponent from "./components/Savings/SavingList";
import FinancialReports from "./components/shared/Homepage";
import Navbar from "./components/shared/Navbar";
import "./styles.css";
import { Routes, Route } from "react-router-dom";
export default function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<FinancialReports />} />
        <Route path="/incomes" element={<IncomeComponent />} />
        <Route
          path="/incomes/editIncome/:id"
          element={<EditIncomeComponent />}
        />
        <Route path="/incomes/addIncome" element={<AddIncomeComponent />} />
        <Route path="/expenses" element={<ExpenseComponent />} />
        <Route path="/addExpense" element={<AddExpensePage />} />
        <Route path="/savings" element={<SavingListComponent />} />
        <Route path="/savings/addSaving" element={<AddSavingComponent />} />
        <Route
          path="/savings/editSaving/:id"
          element={<EditSavingComponent />}
        />
      </Routes>
    </div>
  );
}
