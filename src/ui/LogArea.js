import React, {PureComponent, Component } from 'react';
import withContext from '../ecs/withContext';

class LogArea extends Component {
    render() {
        return <div>
            {this.props.log.map(msg => <div>{msg}</div>)}
        </div>
    }
}

export default withContext(LogArea);