import React, {Component} from 'react';
import {fetchStudents, destroyStudent} from '../reducers/students'
import store from '../store';
import {fetchCampuses} from '../reducers/campuses'
import AddStudent from './AddStudent';


export default class Students extends Component {
    constructor (props)  {
        super(props);
        this.state = store.getState();
        this.click = false;
        this.clickHandler = this.clickHandler.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);

    }
     componentWillMount ()   {
        this.setState(store.getState())
    }
    componentDidMount ()   {
        store.dispatch(fetchStudents());
        store.dispatch(fetchCampuses());
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }
    clickHandler()   {
        this.click = !this.click;
        this.setState({});
    }
    deleteHandler(evt)   {
        evt.preventDefault();
        store.dispatch(destroyStudent(evt.target.value));
        this.setState(store.getState());
    }
    componentWillUnmount () {
        this.unsubscribe();
      }
    componentWillUpdate(nextProps, nextState)   {
        if (nextState.open == true && this.state.open == false){
            this.props.onWillOpen();
        }
    }

    render ()   {
        let form;
        if (this.click)
        // {form = this.renderAddStudent()}
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
                                this.state.students.map(student => (
                                <tr key={'student' + student.id}>
                                    <td key="id" className="idField">{student.id}</td>
                                    <td key="name" className="nameField">{student.name}</td>
                                    <td key="campus" className="campusField">{student.campus.name}</td>
                                    <td key="delete" className="deleteField">
                                        <button
                                        value={student.id}
                                        onClick={this.deleteHandler}
                                        className="deleteField">X</button>
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

    