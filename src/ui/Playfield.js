import React, { Component } from 'react';
import withContext from '../ecs/withContext';
import DrawArea from './DrawArea';
import LogArea from './LogArea';
import {arenaWidth, tileSize} from '../game/Constants';
import {doLos} from '../game/systems/Shadowcast';

const styles = {
    whitespace: {
        height: "10px",
        width: "10px"
    }
}

class Playfield extends Component {
    constructor(props){
        super(props);
        //this.keyDown = this.handleKeyDown.bind(this);
        this.keyPress = this.handleKeyPress.bind(this);
        this.ecsUpdated = this.updateScreen.bind(this);
        this.state = {toggle:true};
    }

    render() {
        const toDraw = this.props.gm.lineOfSight();

        const log = this.props.gm.log;

        return <div>
            <DrawArea 
                toDraw={toDraw} 
                showAlt={this.props.gm.showAlt}
                cameraOrigin={this.props.gm.cameraOrigin}
            />
            <LogArea log={log}/>
        </div>
    }

    componentDidMount() {
        this.props.gm.registerForUpdates("playfield", this.ecsUpdated);
        //document.addEventListener("keydown", this.keyDown);
        window.addEventListener("keyup", this.keyPress);
    }

    componentWillUnmount() {
        this.props.gm.unregisterForUpdates("playfield");
        //document.removeEventListener("keydown", this.keyDown);
        window.removeEventListener("keyup",this.keyPress);
    }

    handleKeyPress(evt) {
        if(!this.props.events) return;

        evt.preventDefault();

        const {gm} = this.props;
        //if(gm.gameState === states.WAITING_FOR_INPUT) {
        gm.playerInput(evt.key);
        //}
    }

    // handleKeyDown(evt) {
    //     if(!this.props.events) return;
    //     if(evt.key === "Alt") evt.preventDefault();
    //     this.props.gm.playerKeyDown(evt.key);
    // }

    updateScreen(evt) {
        this.setState({toggle:!this.state.toggle});
    }
}

export default withContext(Playfield);