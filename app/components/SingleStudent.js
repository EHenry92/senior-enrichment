import React, {Component} from 'react';
import {fetchStudent} from '../reducers/students';
import {fetchCampuses} from '../reducers/campuses';
import Chance from 'chance';
import { NavLink } from 'react-router-dom';
import store from '../store';
import EditStudent from './EditStudent';


var chance = new Chance();


export default class Students extends Component {
    constructor (props) {
        super(props);
        this.state = store.getState();
        this.campusName = '';
        this.click = false;
        this.clickHandler = this.clickHandler.bind(this);
    }
    componentWillMount ()   {
        const studentId = this.props.match.params.id;
        store.dispatch(fetchStudent(studentId));
        store.dispatch(fetchCampuses());
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }
    componentWillUnmount()  {
        this.unsubscribe();
    }
    clickHandler(event)   {
        event.preventDefault();
        this.click = !this.click;
        this.setState({});
    }
    render ()   {
        const cur = this.state.students.student;
        const rand = chance.floating({min: 1, max: 4, fixed: 2})
        let form;
        if (this.click)
        {form = <EditStudent />}
        return (
            <div>
                <div id="add">
                    {form}
                </div>
                <table className="table profile-box">
                <thead>
                    <tr>
                    <th className="profile-photo">
                        <div>
                            <img src = {'./book.png'} />
                    </div>
                    </th>
                    <th className="profile-name">{cur.name}
                    </th>
                    <th>
                    <button onClick={this.clickHandler} className='profile-edit'>Edit</button>
                        </th>
                    </tr>
                </thead>
                    <tbody>
                        <tr className="profile-row">
                            <td> Id: </td>
                            <td>{cur.id}</td>
                        </tr>
                        <tr className="profile-row">
                            <td> Email: </td>
                            <td>{cur.email}</td>
                        </tr>
                        <tr className="profile-row">
                            <td> Campus: </td>
                            <td>
                                <NavLink to={`/campus/${cur.campusId}`}>campus Name</NavLink>
                            </td>
                        </tr>
                        <tr className="profile-row">
                            <td> GPA: </td>
                            <td>{rand}</td>
                        </tr>
                </tbody>
            </table>
            </div>
        )
    }
}

