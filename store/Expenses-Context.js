import { createContext, useReducer } from "react";
import { DUMMY_EXPENSES } from "../Data/DummyData";


export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function ExpenseReducer(state, action) {
  switch (action.type) {
    case "Add":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];

    case "Update":
      const updatableIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      if (updatableIndex < 0) return state; // ID not found, return current state
      const updatedExpense = {
        ...state[updatableIndex],
        ...action.payload.data,
      };
      const updatedExpenses = [...state];
      updatedExpenses[updatableIndex] = updatedExpense;
      return updatedExpenses;

    case "Delete":
      const filteredExpenses = state.filter(
        (expense) => expense.id !== action.payload
      );
      return filteredExpenses;

    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(ExpenseReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: "Add", payload: expenseData });
  }
  function deleteExpense(id) {
    console.log("Attempting to delete expense with id:", id);
    dispatch({ type: "Delete", payload: id });
  }
  function updateExpense(id, expenseData) {
    dispatch({ type: "Update", payload: { id, data: expenseData }});
  }

  return (
    <ExpensesContext.Provider
      value={{
        expenses: expensesState,
        addExpense,
        deleteExpense,
        updateExpense,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;