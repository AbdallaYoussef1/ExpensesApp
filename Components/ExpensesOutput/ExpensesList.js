import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

function ExpenseItem({ item }) {
  const navigation = useNavigation();

  function ExpensePressHandler() {
    navigation.navigate("ManageExpenses", { expenseId: item.id });
  }

  return (
    <Pressable
      onPress={ExpensePressHandler}
      android_ripple={{ color: "#DDDDDD", borderless: false }}
      style={({ pressed }) => [styles.itemContainer, pressed && styles.pressed]}
    >
      <View style={styles.textContainer}>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.date}>
          {item.date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </Text>
      </View>
      <View>
        <Text style={styles.amount}>${item.amount.toFixed(2)}</Text>
      </View>
    </Pressable>
  );
}

const ExpensesList = ({ expenses }) => {
  if (expenses.length === 0) {
    return (
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataText}>No expenses found!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={expenses}
      renderItem={({ item }) => <ExpenseItem item={item} />}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default ExpensesList;

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
    backgroundColor: "#F8F8FB",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  pressed: {
    opacity: 0.75,
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  description: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  date: {
    fontSize: 14,
    color: "#A0A0A0",
    marginTop: 4,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#666",
  },
});
