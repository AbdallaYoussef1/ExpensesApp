import { StyleSheet, View } from "react-native";
import ExpensesOutput from "../Components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/Expenses-Context";

const AllExpenses = () => {

  const ExpensesCtx = useContext(ExpensesContext);
  return (
    <View style={styles.main}>
      <ExpensesOutput expenses={ExpensesCtx.expenses} expensePeriod="Total" />
    </View>
  );
};
export default AllExpenses;

const styles = StyleSheet.create({
    main:{

    },
});