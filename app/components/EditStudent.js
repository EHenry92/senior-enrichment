import React, {Component} from 'react';
import store from '../store';
import {putStudent, fetchStudent} from '../reducers/students';
import {fetchCampuses} from '../reducers/campuses';



export default class EditStudent extends Component {
    constructor(props)   {
        super(props);
        this.state = store.getState();
        this.submitHandler = this.submitHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }
    componentWillMount ()   {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }
    componentWillUnmount()  {
        this.unsubscribe();
    }

    submitHandler (event)  {
        event.preventDefault();
        const state = this.state;
        let newStudent = {id: this.state.students.student.id};
        if (state.name)  {newStudent.name = state.name}
        if (state.email) {newStudent.email = state.email}
        if (state.campusId) {newStudent.campusId = state.campusId}
        console.log("subbmitting", newStudent)
        
            store.dispatch(putStudent(newStudent))
    }

    changeHandler (event)    {
        event.preventDefault();
        if (event.target.name === 'name')  {
            return this.setState({name: event.target.value});

        }
        else if (event.target.name === 'email')    {
            return this.setState({email: event.target.value})
        }
        else if (event.target.name === 'select')    {
            return this.setState({campusId: event.target.value})
        }
    }

    render ()   {
        const cur = this.state.students.student;
        return (
            <form id="addStudent" onSubmit={this.submitHandler}>
                    <table className="table">
                        <thead>
                            <tr>
                            <th>Edit {cur.name}</th>
                            </tr>
                        </thead>
                            <tbody>
                                <tr>
                                    <td> Name: </td>
                                    <td> <input placeholder="Student First Name" onChange={this.changeHandler} name="name" /></td>
                                </tr>
                                <tr>
                                    <td> Email: </td>
                                    <td> <input placeholder="Student Email" onChange={this.changeHandler} name="email" /></td>
                                </tr>
                                <tr>
                                    <td> Campus: </td>
                                    <td>
                                        <select onChange={this.changeHandler} name="select">
                                        {
                                            this.state.campuses.list.map(school =>
                                                <option value={school.id} key={school.id}>{school.name}</option>
                                            )
                                        }
                                        </select>
                                    </td>
                                </tr>
                        </tbody>
                    </table>
                    <button
                    type="submit"
                    >Submit</button>
            </form>
            );
    }
}
