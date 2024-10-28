import { StyleSheet, Text, View } from "react-native";

const ExpensesSummary = ({ Period, expenses }) => {
  const ExpensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  return (
    <View style={styles.summaryContainer}>
      <Text style={styles.period}>{Period}</Text>
      <Text style={styles.amount}>${ExpensesSum.toFixed(2)}</Text>
    </View>
  );
};
export default ExpensesSummary;

const styles = StyleSheet.create({
  summaryContainer: {
    backgroundColor: "#4A90E2",
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  period: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  amount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
