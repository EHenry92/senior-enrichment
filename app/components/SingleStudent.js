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
        this.getCampusName = this.getCampusName.bind(this);
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
                            <img src = {'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJp7R4i8PUdXRr4Ey4R4_XgiBsfGn57vn67Y48o5dHACAXDLOm'} />
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
                                <NavLink to={`/campus/${cur.campusId}`}>{this.getCampusName(cur.campusId)}</NavLink>
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
    getCampusName(id)   {
        const camps = this.state.campuses.list;
        console.log(camps);
        for (let i = 0; i < camps.length;i++)    {
            if (camps[i].id == id) {return (camps[i].name)}
        }
    }
}

