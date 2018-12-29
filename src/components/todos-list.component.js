import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class TodosList extends Component {
    
    constructor (props) {
        super(props);
        this.state = { todos: [] };
    }
    
    deleteTodo(id) {
        axios.delete('http://localhost:4000/todos/' + id)
            .then(response => {
                this.getAll();
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    getAll(){
        axios.get('http://localhost:4000/todos/')
            .then(response => {
                this.setState({ todos: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    componentDidMount() {
        this.getAll();
    }
    todoList(context) {
        return this.state.todos.map(function (currentTodo, i) {
            return <tr key={i}>
                <td>{currentTodo.todo_description}</td>
                <td>{currentTodo.todo_responsible}</td>
                <td>{currentTodo.todo_priority}</td>
                <td>
                    <Link to={"/edit/" + currentTodo._id} className="btn btn-warning">Edit</Link>
                    <button onClick={() => context.deleteTodo(currentTodo._id)} className="btn btn-danger">Delete</button>
                </td>
            </tr>;
        })
    }

    render() {
        return (
            <div>
                <h3>Todos List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.todoList(this)}
                    </tbody>
                </table>
            </div>
        )
    }
}