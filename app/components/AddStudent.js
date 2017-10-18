import React, {Component} from 'react';
import store from '../store';
import {postStudent, fetchStudents} from '../reducers/students';


export default class AddStudent extends Component {
    constructor(props)   {
        super(props);
        this.submitHandler = this.submitHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        
    }

    submitHandler (event)  {
        event.preventDefault();
        const state = this.state;
        if (state.fName && state.lName && state.campusId)    {
            const student = {  name: state.fName + ' ' + state.lName,
            email: state.fName + state.lName + '@GrandCampusSchools.edu',
            campusId: state.campusId
            }
            store.dispatch(postStudent(student))
            store.dispatch(fetchStudents());
            // .then(() => this.setState(store.getState()))
            // .catch(err => console.log(err))
        }
    }

    changeHandler (event)    {
        event.preventDefault();
        if (event.target.name === 'fName')  {
            return this.setState({fName: event.target.value});

        }
        else if (event.target.name === 'lName')    {
            return this.setState({lName: event.target.value})
        }
        else if (event.target.name === 'select')    {
            return this.setState({campusId: event.target.value})
        }
    }

    render ()   {
        return (
            <form id="addStudent" onSubmit={this.submitHandler}>
                    <table className="table">
                        <thead>
                            <tr>
                            <th>Add A Student</th>
                            </tr>
                        </thead>
                            <tbody>
                                <tr>
                                    <td> First Name: </td>
                                    <td> <input placeholder="Student First Name" onChange={this.changeHandler} name="fName" /></td>
                                </tr>
                                <tr>
                                    <td> Last Name: </td>
                                    <td> <input placeholder="Student Last Name" onChange={this.changeHandler} name="lName" /></td>
                                </tr>
                                <tr>
                                    <td> Campus: </td>
                                    <td>
                                        <select onChange={this.changeHandler} name="select">
                                        {
                                            this.props.campuses.map(school =>
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
