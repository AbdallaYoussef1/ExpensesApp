import { useContext, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import CustomButton from "../Components/UI/CustomButton";
import IconButton from "../Components/UI/IconButton";
import { ExpensesContext } from "../store/Expenses-Context";

const ManageExpenses = ({ route, navigation }) => {
  const ExpensesCtx = useContext(ExpensesContext);
  const EditedExpenseId = route.params?.expenseId;

  const isEditing = !!EditedExpenseId;

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
    console.log(EditedExpenseId);

    ClosingModalHandler();
  }
  function ConfirmExpenseHandler() {
    if (isEditing) {
      ExpensesCtx.updateExpense(
        EditedExpenseId,
        {
        description: "new car",
        amount: 1500.77,
        date: new Date("2001-04-05"),
      });
    } else {
      ExpensesCtx.addExpense({
        description: "new pizza",
        amount: 15.77,
        date: new Date("2001-04-18"),
      });
    }
    ClosingModalHandler();
  }
  function CancelHandler() {
    ClosingModalHandler();
  }

  return (
    <View style={styles.main}>
      <View style={[styles.ButtonContainer, { borderBottomWidth: 3 }]}>
        <CustomButton
          mode="secondary"
          style={styles.button}
          onPress={CancelHandler}
        >
          Cancel
        </CustomButton>
        <CustomButton onPress={ConfirmExpenseHandler}>
          {isEditing ? "Update" : "Confirm"}
        </CustomButton>
      </View>
      <View style={styles.ButtonContainer}>
        <IconButton
          name={"trash"}
          size={40}
          color={"#4A90E2"}
          onPress={DeleteExpenseHandler}
        />
      </View>
    </View>
  );
};
export default ManageExpenses;

const styles = StyleSheet.create({
  main: {},
  button: {
    backgroundColor: "red",
  },
  ButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderColor: "#4A90E2",
  },
});
