import { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomButton from "../Components/UI/CustomButton";

const ManageExpenses = ({ route, navigation }) => {
  const EditedExpenseId = route.params?.expenseId;

  const isEditing = !!EditedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  return (
    <View style={styles.main}>
      <View>
        <CustomButton >Confirm</CustomButton>

      </View>
      <View></View>
    </View>
  );
};
export default ManageExpenses;

const styles = StyleSheet.create({
  main: {},
});
