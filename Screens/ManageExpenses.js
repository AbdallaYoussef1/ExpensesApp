import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../Components/UI/IconButton";
import { ExpensesContext } from "../store/Expenses-Context";
import ExpenseForm from "../Components/ManageExpense/ExpenseForm";
import { PostExpense, UpdateExpense, DeleteExpense } from "../Utility/Http";
import LoadingOverlay from "../Components/UI/LoadingOverlay";
import ErrorOverlay from "../Components/UI/ErrorOverlay";

const ManageExpenses = ({ route, navigation }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [Error, setError] = useState();
  const ExpensesCtx = useContext(ExpensesContext);
  const EditedExpenseId = route.params?.expenseId;
  const isEditing = !!EditedExpenseId;

  const defaultValues = ExpensesCtx.expenses.find(
    (expense) => expense.id === EditedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  function ClosingModalHandler() {
    navigation.goBack();
  }

  async function DeleteExpenseHandler() {
    setIsFetching(true);
    try {
      ExpensesCtx.deleteExpense(EditedExpenseId);
      await DeleteExpense(EditedExpenseId);
      ClosingModalHandler();
    } catch (error) {
      setError("could't delete this item please try again later");
      setIsFetching(false);
    }
  }

  async function ConfirmExpenseHandler(ExpenseData) {
    setIsFetching(true);

    try {
      if (isEditing) {
        ExpensesCtx.updateExpense(EditedExpenseId, ExpenseData);
        await UpdateExpense(EditedExpenseId, ExpenseData);
      } else {
        const id = await PostExpense(ExpenseData);
        ExpensesCtx.addExpense({ ...ExpenseData, id: id });
        setIsFetching(true);
      }
      ClosingModalHandler();
    } catch (error) {
      setError("could't add or update the Expense please try again later");
      setIsFetching(false);
    }
  }

  function CancelHandler() {
    ClosingModalHandler();
  }

  function ErrorButtonHandler() {
    setError(null);
  }
  if (Error && !isFetching) {
    <ErrorOverlay message={Error} onConfirm={ErrorButtonHandler} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <ExpenseForm
            onCancel={CancelHandler}
            isEditing={isEditing}
            onSubmit={ConfirmExpenseHandler}
            DefaultValues={defaultValues}
          />
        </View>
        {isEditing && (
          <View style={styles.deleteContainer}>
            <IconButton
              name="trash"
              size={36}
              color="#d9534f"
              onPress={DeleteExpenseHandler}
            />
          </View>
        )}
      </View>
    );
  }
};

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f2f2",
  },
  formContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  deleteContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});
