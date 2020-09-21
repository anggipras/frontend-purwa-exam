import React, { Component } from 'react';
import Loader from 'react-loader-spinner'

class Loading extends Component {
    render() { 
        return (
            <div style={{height:'100vh'}} className='d-flex justify-content-center align-items-center'>
                <Loader type="Bars"  color="#FF8E53 " height={80} width={80} />
            </div>
          );
    }
}
 
export default Loading;