import React, {Component} from 'react';
import {fetchStudent} from '../reducers/students';
import {fetchCampuses} from '../reducers/campuses';
import Chance from 'chance';
import { NavLink } from 'react-router-dom';
import store from '../store';



var chance = new Chance();


export default class Students extends Component {
    constructor (props) {
        super(props);
        this.state = store.getState();
        this.campusName = '';
    }
    componentWillMount ()   {
        const studentId = this.props.match.params.id;
        store.dispatch(fetchStudent(studentId));
        store.dispatch(fetchCampuses());
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }
    render ()   {
        const cur = this.state.students.student;
        console.log(cur.campus)
        const rand = chance.floating({min: 1, max: 4, fixed: 2})
        return (
            <div>
                <table className="table">
                <thead>
                    <tr>
                    <th>{cur.name}</th>
                    </tr>
                </thead>
                    <tbody>
                        <tr>
                            <td> Id: </td>
                            <td>{cur.id}</td>
                        </tr>
                        <tr>
                            <td> Email: </td>
                            <td>{cur.email}</td>
                        </tr>
                        <tr>
                            <td> Campus: </td>
                            <td>
                                <NavLink to={`/campus/${cur.campusId}`}>GrandSchoolCampus</NavLink>                         
                            </td>
                        </tr>
                        <tr>
                            <td> GPA: </td>
                            <td>{rand}</td>
                        </tr>
                </tbody>
            </table>
            </div>
        )
    }
}


