import { StyleSheet, Text, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { DUMMY_EXPENSES } from "../../Data/DummyData";


const ExpensesOutput = ({ expenses, expensePeriod }) => {
  return (
    <View style={styles.main}>
      <ExpensesSummary Period={expensePeriod} expenses={DUMMY_EXPENSES} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
};
export default ExpensesOutput;

const styles = StyleSheet.create({
  main: {},
});
