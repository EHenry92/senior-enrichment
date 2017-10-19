import React, {Component} from 'react';
import {fetchStudents, fetchStudent, destroyStudent} from '../reducers/students';
import {fetchCampus} from '../reducers/campuses';
import store from '../store';
import { NavLink } from 'react-router-dom';
import EditCampus from './EditCampus';

export default class SingleCampus extends Component {
    constructor (props) {
        super(props);
        this.state = store.getState();
        this.click = false;
        this.deleteHandler = this.deleteHandler.bind(this);
        this.editClickHandler = this.editClickHandler.bind(this);
    }
    componentWillMount ()   {
        const campusid = this.props.match.params.id;         
        store.dispatch(fetchCampus(campusid));
        store.dispatch(fetchStudents());
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }
    componentWillUnmount()  {
        this.unsubscribe();
    }
    clickHandler(evt)   {
            const studentId = this.state.campuses[evt.target.value];
            store.dispatch(fetchStudent(studentId));
    }
    deleteHandler(evt)   {
        evt.preventDefault();
        store.dispatch(destroyStudent(evt.target.value));
    }
    editClickHandler(event)   {
        event.preventDefault();
        this.click = !this.click;
        this.setState({});
    }


    render ()   {
        const campus = this.state.campuses.campus;
        let attendies = [];
            attendies = this.state.students.list.filter(stud => stud.campusId === campus.id);
        let form;
        if (this.click)
            {form = <EditCampus />}
        return (
            <div>
                 <div id="add">
                    {form}
                </div>

            <table id="campuses">
                <thead>
                    <tr>
                        <th><img className="profile-photo"src={campus.image} /></th>
                        <th><h1 className="profile-name">{campus.name} Campus</h1></th>
                        <th><button onClick={this.editClickHandler} className='profile-edit'>Edit</button></th>


                    </tr>
                    <tr>
                    <th>#</th>
                    <th>Student</th>
                    <th>X</th>
                    </tr>
                </thead>
                <tbody>
                {
                    attendies.map((stud, idx) => (
                        <tr key={'student' + stud.id}>
                            <td key={stud.idx + stud.name} className="idField">{idx}</td>
                            <td
                                key="name"
                                className="nameField">
                                <NavLink to={`/student/${stud.id}`}>{stud.name}</NavLink>                         

                            </td>
                            <td>
                                <button
                                    className="profile-delete"
                                    value={stud.id}
                                    onClick = {this.deleteHandler}>X
                                </button>
                            </td>
                        
                        </tr>
                       
                    ))
                    }
                </tbody>
                </table>
            </div>
        )
    
    }
    }
