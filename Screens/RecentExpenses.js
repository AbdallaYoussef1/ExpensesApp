import { useContext, useEffect, useState } from "react";
import ExpensesList from "../Components/ExpensesOutput/ExpensesList";
import { ExpensesContext } from "../store/Expenses-Context";
import { GetExpense } from "../Utility/Http";
import { getDateMinusDays } from "../Utility/date";
import LoadingOverlay from "../Components/UI/LoadingOverlay";
import ErrorOverlay from "../Components/UI/ErrorOverlay";

function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext); // Extract expenses from context
  const [isFetching, setIsFetching] = useState(true);
  const [Error, setError] = useState();

  useEffect(() => {
    async function FetchExpenses() {
      setIsFetching(true);
      try {
        const Expenses = await GetExpense();
        expensesCtx.setExpenses(Expenses);
      } catch (error) {
        setError("Something gone wrong!!!!")
      }
      setIsFetching(false);
    }

    FetchExpenses();
  }, []);

  function ErrorButtonHandler(){
    setError(null)
  }

  

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    // Convert expense date if it's not already a Date object
    const expenseDate = new Date(expense.date);

    return expenseDate >= date7DaysAgo && expenseDate <= today;
  });

  if(Error && !isFetching){
    return <ErrorOverlay message={Error} onConfirm={ErrorButtonHandler} />
  }
  if (isFetching) {
    return <LoadingOverlay />;
  }

  return <ExpensesList expenses={recentExpenses} />;
}

export default RecentExpenses;
