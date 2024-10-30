import { useContext } from "react";
import ExpensesList from "../Components/ExpensesOutput/ExpensesList";
import { ExpensesContext } from "../store/Expenses-Context";

// Utility function to get a date X days before the given date
function getDateMinus7days(date, days) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() - days); // Adjust date directly
  return newDate;
}

function RecentExpenses() {
  const { expenses } = useContext(ExpensesContext); // Extract expenses from context

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinus7days(today, 7);

    // Convert expense date if it's not already a Date object
    const expenseDate = new Date(expense.date);

    return expenseDate >= date7DaysAgo && expenseDate <= today;
  });

  return <ExpensesList expenses={recentExpenses} />;
}

export default RecentExpenses;
