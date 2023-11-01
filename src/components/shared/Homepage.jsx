import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Set the root element for the modal

const FinancialReport = () => {
  const [reportType, setReportType] = useState("Income vs. Expenses");
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const incomeData = useSelector((state) => state.incomes.incomes);
  const expenseData = useSelector((state) => state.expenses.expenses);
  const savingsData = useSelector((state) => state.savings.savings);

  const calculateIncomeTotal = () => {
    return incomeData.reduce((total, income) => total + income.amount, 0);
  };

  const calculateExpenseTotal = () => {
    return expenseData.reduce((total, expense) => total + expense.amount, 0);
  };

  const calculateSavingsTotal = () => {
    return savingsData.reduce((total, saving) => total + saving.amount, 0);
  };

  const calculateExpenseBreakdown = () => {
    const expenseCategories = {};

    expenseData.forEach((expense) => {
      if (expense.category in expenseCategories) {
        expenseCategories[expense.category] += expense.amount;
      } else {
        expenseCategories[expense.category] = expense.amount;
      }
    });

    return expenseCategories;
  };

  const openReportModal = () => {
    setIsReportModalOpen(true);
  };

  const closeReportModal = () => {
    setIsReportModalOpen(false);
  };

  const renderIncomeVsExpensesReport = () => {
    const totalIncome = calculateIncomeTotal();
    const totalExpenses = calculateExpenseTotal();
    const totalSavings = calculateSavingsTotal();

    return (
      <div>
        <h2>Income vs. Expenses Report</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Report Type</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Total Income</td>
              <td>${totalIncome}</td>
            </tr>
            <tr>
              <td>Total Expenses</td>
              <td>${totalExpenses}</td>
            </tr>
            <tr>
              <td>Total Savings</td>
              <td>${totalSavings}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  };

  const renderExpenseBreakdownReport = () => {
    const breakdown = calculateExpenseBreakdown();

    return (
      <div>
        <h2>Expense Breakdown Report</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Expense Category</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(breakdown).map(([category, amount]) => (
              <tr key={category}>
                <td>{category}</td>
                <td>${amount}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  };

  const generateReport = () => {
    openReportModal();
  };

  return (
    <Container>
      <Row className="mt-3">
        <Col>
          <Form>
            <Form.Group controlId="reportType">
              <Form.Label>Select Report Type</Form.Label>
              <Form.Control
                as="select"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <option value="Income vs. Expenses">Income vs. Expenses</option>
                <option value="Expense Breakdown">Expense Breakdown</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Col>
        <Col>
          <Button onClick={generateReport}>Generate Report</Button>
        </Col>
      </Row>

      <Modal
        isOpen={isReportModalOpen}
        onRequestClose={closeReportModal}
        contentLabel="Financial Report"
      >
        {reportType === "Income vs. Expenses"
          ? renderIncomeVsExpensesReport()
          : renderExpenseBreakdownReport()}

        <Button onClick={closeReportModal}>Close</Button>
      </Modal>
    </Container>
  );
};

export default FinancialReport;
