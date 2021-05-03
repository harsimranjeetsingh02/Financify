import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Expense = props => (
    <tr>
      <td>{props.expense.username}</td>
      <td>{props.expense.description}</td>
      <td>{props.expense.location}</td>
      <td>{props.expense.amount}</td>
      <td>{props.expense.date.substring(0,10)}</td>
      <td>
        <Link to={"/edit/"+props.expense._id}>Edit Expense</Link> | <a href="#" onClick={() => { props.deleteExpense(props.expense._id) }}>Delete Expense</a>
      </td>
    </tr>
  )

export default class ExpensesList extends Component{
    constructor(props){
        super(props);

        this.deleteExpense = this.deleteExpense.bind(this);

        this.state = {expenses: []};

    }
    componentDidMount() {
        axios.get('http://localhost:5000/expenses/')
        .then(response =>{
            this.setState({expenses: response.data})
        })
        .catch((error)=> {
            console.log(error);
        })
    }
    deleteExpense(id) {
        axios.delete('http://localhost:5000/expenses/' + id)
        .then(res => console.log(res.data));
        this.setState({
            expenses: this.state.expenses.filter(el => el._id !== id )
        })
    }
    expenseList() {
        return this.state.expenses.map(currentexpense => {
            return <Expense expense= {currentexpense} deleteExpense={this.deleteExpense} key= {currentexpense._id}/>;
        })
    }
    render(){
        return(
            <div>
            <h3>Logged Expenses</h3>
            <table className="table">
                <thead className="thead-dark">
                <tr>
                    <th class="text-center">Username</th>
                    <th class="text-center">Description (What Did You Buy?)</th>
                    <th class="text-center">Location (Where Did You Buy It?)</th>
                    <th class="text-center">Money Spent (CAD)</th>
                    <th class="text-center">Date</th>
                    <th class="text-center">Actions</th>
                </tr>
                </thead>
                <tbody>
                { this.expenseList() }
                </tbody>
            </table>
            </div>
        )
    }
} 