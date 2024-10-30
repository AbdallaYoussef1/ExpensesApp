import { createContext, useReducer } from "react";


const DUMMY_EXPENSES = [
  { id: "e1", description: "Shoes", amount: 59.99, date: new Date("2021-09-15") },
  { id: "e2", description: "Groceries", amount: 120.45, date: new Date("2021-09-18") },
  { id: "e3", description: "Electricity Bill", amount: 89.99, date: new Date("2021-09-20") },
  { id: "e4", description: "Phone Repair", amount: 29.99, date: new Date("2021-09-21") },
  { id: "e5", description: "Books", amount: 42.5, date: new Date("2021-09-24") },
  { id: "e6", description: "New Headphones", amount: 80.75, date: new Date("2021-09-27") },
  { id: "e7", description: "Dinner", amount: 45.99, date: new Date("2024-10-29") },
  { id: "e8", description: "Taxi Ride", amount: 14.99, date: new Date("2024-10-25") },
  { id: "e9", description: "Taxi Ride", amount: 14.99, date: new Date("2024-10-25") },
  { id: "e10", description: "Taxi Ride", amount: 14.99, date: new Date("2024-10-25") },
  { id: "e11", description: "Taxi Ride", amount: 14.99, date: new Date("2024-10-25") },
];

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