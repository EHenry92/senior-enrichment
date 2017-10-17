import React, {Component} from 'react';

var schools = [
    {id: 1, name: 'Asylum' , image: 'http://cdn.bloody-disgusting.com/wp-content/uploads/2016/01/BD16_Asylum_9.jpg'},
    {id: 2, name: 'Grammer School' , image: 'http://upload.wikimedia.org/wikipedia/commons/8/87/Loughboroughgrammarschooltowerblock.jpg'},
    {id: 3,name: 'Stalker School' , image: 'http://weburbanist.com/wp-content/uploads/2010/05/stalkerschool.jpg'}
]

export default class AddStudent extends Component {
    
    render ()   {
        return (
            <form>
                Name:
                <input
                    placeholder='Student Name'>
                </input>
                Campus:
                <select>
                    {
                        schools.map(school =>
                            <option>{school.name}</option>
                        )
                    }
                </select>
                <button>Submit</button>
                </form>
        )
    }
}
