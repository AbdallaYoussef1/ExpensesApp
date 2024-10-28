import ExpensesList from "../Components/ExpensesOutput/ExpensesList";
import {DUMMY_EXPENSES} from "../Data/DummyData"

function RecentExpenses() {
  const recentExpenses = DUMMY_EXPENSES.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = new Date(today.setDate(today.getDate() - 7));
    return expense.date >= date7DaysAgo;
  });

  return <ExpensesList expenses={recentExpenses} />;
}

export default RecentExpenses;
