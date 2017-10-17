import React, {Component} from 'react';

export default class Campuses extends Component {
    
    render ()   {
        return (
            <div id = 'campuses'>
                {
                    schools.map(school =>
                        <button
                            style = {{backgroundImage: `url(${school.image})`}}
                            class='singleCampus'>
                            {school.name}
                            </button>
                    )
                }
                </div>
    
        )
    }
}
