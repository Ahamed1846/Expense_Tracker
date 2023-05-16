import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from "recharts";

function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [cat, setCat] = useState("");
  const [editIndex, setEditIndex] = useState(-1);

  const addExpense = () => {
    const newExpense = {
      amount,
      date,
      cat
    };

    if (editIndex === -1) {
      setExpenses([...expenses, newExpense]);
    } else {
      const updatedExpenses = [...expenses];
      updatedExpenses[editIndex] = newExpense;
      setExpenses(updatedExpenses);
      setEditIndex(-1);
    }

    setAmount("");
    setDate("");
    setCat("");
  };

  const deleteExpense = (index) => {
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);
    setExpenses(updatedExpenses);
  };

  const editExpense = (index) => {
    const expenseToEdit = expenses[index];
    setAmount(expenseToEdit.amount);
    setDate(expenseToEdit.date);
    setCat(expenseToEdit.cat);
    setEditIndex(index);
  };

  const data = expenses.map((expense, index) => ({
    id: index,
    date: expense.date,
    amount: expense.amount,
    cat: expense.cat
  }));

  return (
    <div>
      <div>
        <h2>Expense Tracker</h2>
      </div>
      <div>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="text"
          value={cat}
          onChange={(e) => setCat(e.target.value)}
        />
        <button onClick={addExpense}>
          {editIndex === -1 ? "Add Expense" : "Update Expense"}
        </button>
      </div>
      <div>
        <h3>Expenses</h3>
        <ul>
          {expenses.map((expense, index) => (
            <li key={index}>
              <span>{expense.date} =&gt; </span>
              <span>{expense.amount} for </span>
              <span>{expense.cat} </span>
              <button onClick={() => editExpense(index)}>Edit</button>
              <button onClick={() => deleteExpense(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <LineChart width={500} height={300} data={data}>
          <CartesianGrid stroke="#000000" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </div>
    </div>
  );
}

export default ExpenseTracker;
