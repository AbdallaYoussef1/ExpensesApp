import { StyleSheet, Text, View, Alert } from "react-native";
import Input from "../UI/Input";
import { useState } from "react";
import CustomButton from "../UI/CustomButton";

const ExpenseForm = ({ onCancel, isEditing, onSubmit, DefaultValues }) => {
  const [inputValue, setInputValue] = useState({
    description: DefaultValues ? DefaultValues.description : "",
    amount: DefaultValues ? DefaultValues.amount.toString() : "",
    date: DefaultValues ? DefaultValues.date.toISOString().slice(0, 10) : "",
  });
  const [errors, setErrors] = useState({
    description: false,
    amount: false,
    date: false,
  });

  function validateInputs() {
    const descriptionIsValid = inputValue.description.trim().length > 0;
    const amountIsValid = !isNaN(inputValue.amount) && +inputValue.amount > 0;
    const dateIsValid = /^\d{4}-\d{2}-\d{2}$/.test(inputValue.date) && !isNaN(new Date(inputValue.date).getTime());

    setErrors({
      description: !descriptionIsValid,
      amount: !amountIsValid,
      date: !dateIsValid,
    });

    return descriptionIsValid && amountIsValid && dateIsValid;
  }

  function inputChangeHandler(valueIdentifier, enteredValue) {
    setInputValue((currentInput) => ({
      ...currentInput,
      [valueIdentifier]: enteredValue,
    }));
  }

  function onSubmitHandler() {
    if (!validateInputs()) {
      Alert.alert("Invalid input", "Please check your entries.");
      return;
    }

    const ExpenseData = {
      amount: +inputValue.amount,
      date: new Date(inputValue.date),
      description: inputValue.description,
    };
    onSubmit(ExpenseData);
  }

  const { description, amount, date } = inputValue;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>{isEditing ? "Edit Expense" : "New Expense"}</Text>
      <Input
        Label="Description"
        InputConfig={{
          multiline: true,
          placeholder: "Enter expense description",
          style: [styles.descriptionInput, errors.description && styles.errorInput],
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: description,
        }}
      />
      {errors.description && <Text style={styles.errorText}>Description is required.</Text>}
      
      <Input
        Label="Amount"
        InputConfig={{
          keyboardType: "decimal-pad",
          onChangeText: inputChangeHandler.bind(this, "amount"),
          value: amount,
          placeholder: "0.00",
          style: errors.amount && styles.errorInput,
        }}
      />
      {errors.amount && <Text style={styles.errorText}>Amount must be a positive number.</Text>}

      <Input
        Label="Date"
        InputConfig={{
          placeholder: "YYYY-MM-DD",
          maxLength: 10,
          onChangeText: inputChangeHandler.bind(this, "date"),
          value: date,
          style: errors.date && styles.errorInput,
        }}
      />
      {errors.date && <Text style={styles.errorText}>Date must be in YYYY-MM-DD format.</Text>}

      <View style={styles.buttonContainer}>
        <CustomButton mode="secondary" style={styles.cancelButton} onPress={onCancel}>
          Cancel
        </CustomButton>
        <CustomButton style={styles.confirmButton} onPress={onSubmitHandler}>
          {isEditing ? "Update" : "Confirm"}
        </CustomButton>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    padding: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    margin: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  descriptionInput: {
    minHeight: 60,
    textAlignVertical: "top",
  },
  errorInput: {
    borderColor: "#d9534f",
    borderWidth: 1,
  },
  errorText: {
    color: "#d9534f",
    fontSize: 12,
    marginVertical: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  cancelButton: {
    backgroundColor: "#d9534f",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  confirmButton: {
    backgroundColor: "#5cb85c",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});
