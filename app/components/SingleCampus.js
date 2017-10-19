import React, {Component} from 'react';
import {fetchStudents, fetchStudent, destroyStudent} from '../reducers/students';
import {fetchCampus} from '../reducers/campuses';
import store from '../store';
import { NavLink } from 'react-router-dom';


export default class SingleCampus extends Component {
    constructor (props) {
        super(props);
        this.state = store.getState();
    }
    componentWillMount ()   {
        const campusid = this.props.match.params.id;         
        store.dispatch(fetchCampus(campusid));
        store.dispatch(fetchStudents());
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }
    clickHandler(evt)   {
            const studentId = this.state.campuses[evt.target.value];
            store.dispatch(fetchStudent(studentId));
    }
    clickHandler(evt)   {
        const studentId = this.state.campuses[evt.target.value];
        store.dispatch(destroyStudent(studentId));
    }


    render ()   {
        const campus = this.state.campuses.campus;
        let attendies = [];
        attendies = this.state.students.list.filter(stud => stud.campusId === campus.id);
        return (
            <div>
                    <div className="profile">
                        <img id="profileImg"src={campus.image} />
                        <h1 id="profileName">{campus.name}</h1>
                    </div>
                <table>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Student</th>
                    <th>Info</th>
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
                                    value={stud.id}
                                    onClick = {this.studentClickHandler}>?
                                </button>
                                <button
                                    value={stud.id}
                                    onClick = {this.studentDelHandler}>X
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
