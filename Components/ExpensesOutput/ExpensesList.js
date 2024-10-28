import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

function ExpenseItem({ item }) {
  return (
    <Pressable>
      <View style={styles.itemContainer}>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.amount}>${item.amount.toFixed(2)}</Text>
        <Text style={styles.date}>
          {item.date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </Text>
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
      renderItem={ExpenseItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default ExpensesList;

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
    backgroundColor: "#F4F4F9",
  },
  itemContainer: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  description: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  amount: {
    fontSize: 16,
    color: "#4CAF50",
    marginTop: 4,
  },
  date: {
    fontSize: 14,
    color: "#888",
    marginTop: 2,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataText: {
    fontSize: 18,
    color: "#777",
  },
});
