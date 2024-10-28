import { StyleSheet, Text, View } from "react-native";
import ExpensesOutput from "../Components/ExpensesOutput/ExpensesOutput";

const AllExpenses = () => {
  return (
    <View style={styles.main}>
      <ExpensesOutput expensePeriod="Total" />
    </View>
  );
};
export default AllExpenses;

const styles = StyleSheet.create({
    main:{

    },
});