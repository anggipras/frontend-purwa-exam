import React, { Component } from 'react';
import './notfound.css'
import {Link} from 'react-router-dom'

class NotFound extends Component {
    state = {  }
    render() { 
        return ( 
            <div className='error'>
                <div id="clouds">
                    <div className="cloud x1" />
                    <div className="cloud x1_5" />
                    <div className="cloud x2" />
                    <div className="cloud x3" />
                    <div className="cloud x4" />
                    <div className="cloud x5" />
                </div>
                <div className="c">
                    <div className="_404">404</div>
                    <hr />
                    <div className="_1">THE PAGE</div>
                    <div className="_2">WAS NOT FOUND</div>
                    <Link to='/'>
                        <div className="btnbro">BACK TO HOME</div>
                    </Link>
                </div>
            </div>
         );
    }
}
 
export default NotFound;