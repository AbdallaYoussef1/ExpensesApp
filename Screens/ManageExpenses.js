import { useContext, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../Components/UI/IconButton";
import { ExpensesContext } from "../store/Expenses-Context";
import ExpenseForm from "../Components/ManageExpense/ExpenseForm";

const ManageExpenses = ({ route, navigation }) => {
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

  function DeleteExpenseHandler() {
    ExpensesCtx.deleteExpense(EditedExpenseId);
    ClosingModalHandler();
  }

  function ConfirmExpenseHandler(ExpenseData) {
    if (isEditing) {
      ExpensesCtx.updateExpense(EditedExpenseId, ExpenseData);
    } else {
      ExpensesCtx.addExpense(ExpenseData);
    }
    ClosingModalHandler();
  }

  function CancelHandler() {
    ClosingModalHandler();
  }

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
