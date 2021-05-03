import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Navbar from "./components/navbar.component";
import ExpensesList from "./components/expenses-list.component";
import EditExpense from "./components/edit-expense.component";
import CreateExpense from "./components/create-expense.component";
import CreateUser from "./components/create-user.component"; 

function App() {
  return (
    <div>
      <Router> 
          <Navbar />
          <br/>
          <Route path="/" exact component={ExpensesList} /> 
          <Route path="/edit/:id" component={EditExpense} />
          <Route path="/create" component={CreateExpense} />
          <Route path="/User" component={CreateUser} />
      </Router>
    </div>
  );
}

export default App;
