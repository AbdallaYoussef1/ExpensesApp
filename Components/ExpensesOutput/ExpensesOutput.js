import { StyleSheet, Text, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";



const ExpensesOutput = ({ expenses, expensePeriod }) => {
  return (
    <View style={styles.main}>
      <ExpensesSummary Period={expensePeriod} expenses={expenses} />
      <ExpensesList expenses={expenses} />
    </View>
  );
};
export default ExpensesOutput;

const styles = StyleSheet.create({
  main: {},
});
