import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpenses: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function ExpenseReducer(state, action) {
  switch (action.type) {
    case "Add":
      return [action.payload, ...state];
    case "Set":
      const inverted = action.payload.reverse();
      return inverted;
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
  const [expensesState, dispatch] = useReducer(ExpenseReducer, []);

  function addExpense(expenseData) {
    dispatch({ type: "Add", payload: expenseData });
  }
  function setExpenses(expenses) {
    dispatch({ type: "Set", payload: expenses });
  }
  function deleteExpense(id) {
    console.log("Attempting to delete expense with id:", id);
    dispatch({ type: "Delete", payload: id });
  }
  function updateExpense(id, expenseData) {
    dispatch({ type: "Update", payload: { id, data: expenseData } });
  }

  return (
    <ExpensesContext.Provider
      value={{
        expenses: expensesState,
        addExpense,
        setExpenses,
        deleteExpense,
        updateExpense,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
