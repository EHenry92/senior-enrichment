import React, {Component} from 'react';
import AddStudent from './AddStudent';

export default class Students extends Component {
    constructor (props)  {
        super(props);
    }
    render ()   {
        return (
        <div>
            <button id='add'>Add Student</button>
            <AddStudent />
            <div className='row'>
            <span id='idField'>Student Id</span>
            <span id='nameField'>Student Name</span>
            <span id='campusField'>Campus</span>
            </div>
            <div>
            {
                people.map(student =>
                  <div className='row'>
                    <span id='idField'>{student.id}</span>
                    <span id='nameField'>{student.name}</span>
                    <span id='campusField'>{student.campus}</span>
                    <span><button id='delete'>X</button></span>
                    </div>
                )
            }
            </div>
         </div>
        )
    }
}
