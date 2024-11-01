import axios from "axios";

const BACKEND_URL = "https://expenseapp-a7eba-default-rtdb.firebaseio.com/";
export async function PostExpense(ExpenseData) {
  const response = await axios.post(BACKEND_URL + "Expenses.json", ExpenseData);
  const id = response.data.name;
  return id;
}

export async function GetExpense() {
  const Response = await axios.get(BACKEND_URL + "Expenses.json");
  const Expense = [];

  for (const key in Response.data) {
    const ExpenseObj = {
      id: key,
      amount: Response.data[key].amount,
      description: Response.data[key].description,
      date: new Date(Response.data[key].date),
    };
    Expense.push(ExpenseObj);
  }
  return Expense;
}

export function UpdateExpense(id, ExpenseData) {
  return axios.put(BACKEND_URL + `Expenses/${id}.json`, ExpenseData);
}
export function DeleteExpense(id) {
  return axios.delete(BACKEND_URL + `Expenses/${id}.json`);
}
