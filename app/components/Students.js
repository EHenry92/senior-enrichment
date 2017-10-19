import React, {Component} from 'react';
import {fetchStudents, destroyStudent, fetchStudent} from '../reducers/students'
import store from '../store';
import {fetchCampuses} from '../reducers/campuses'
import AddStudent from './AddStudent';
import { NavLink } from 'react-router-dom';



export default class Students extends Component {
    constructor (props)  {
        super(props);
        this.state = store.getState();
        this.click = false;
        this.clickHandler = this.clickHandler.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
        this.studentClickHandler = this.studentClickHandler.bind(this);

    }

    componentWillMount ()   {
        store.dispatch(fetchStudents());
        store.dispatch(fetchCampuses());
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }
    clickHandler(event)   {
        event.preventDefault();
        this.click = !this.click;
        this.setState({});
    }
    studentClickHandler(event)  {
        event.preventDefault();
        this.studentClick = !this.studentClick;
        store.dispatch(fetchStudent(event.target.value));
    }
    deleteHandler(evt)   {
        evt.preventDefault();
        store.dispatch(destroyStudent(evt.target.value));
    }
    componentWillUnmount () {
        this.unsubscribe();
      }

    render ()   {
        let form;
        if (this.click)
        {form = <AddStudent campuses={this.state.campuses} />}
        return (
            <div>
                <div id="add">
                    <button onClick={this.clickHandler}>Add Student</button>
                    {form}
                </div>
               
                    <div>
                        <table className="table">
                        <thead>
                            <tr>
                            <th className="idField">Student Id</th>
                            <th key="name" className="nameField">Student Name</th>
                            <th className="campusField">Campus Name</th>
                            <th className="deleteField">.</th>

                            </tr>
                        </thead>
                            <tbody>
                            {
                                this.state.students.list.map(student => (
                                <tr key={'student' + student.id}>
                                    <td key="id" className="idField">{student.id}</td>
                                    <td key="name" className="nameField">
                                        <NavLink to={`/student/${student.id}`}>{student.name}</NavLink>

                                    </td>
                                    <td key="campus" className="campusField">.</td>
                                    <td key="delete" className="deleteField">
                                        <button
                                        value={student.id}
                                        onClick={this.deleteHandler}
                                        className="delete-button">X</button>
                                    </td>
                                </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
        )
    }
}
