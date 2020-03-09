import React, { Component } from 'react';
import withContext from '../../ecs/withContext';
import DrawArea from '../DrawArea';
import * as MapCreator from '../../game/mapgen/MapCreator';
import * as Components from '../../game/itemdefs/Components';
import * as Wall from '../../game/itemdefs/Wall';

//the goal here is to visualize how the digger
//is going to behave as it goes about his business
class DiggerTest extends Component {
    constructor(props) {
        super(props);
        this.state = {toggle:true};
        this.keyPress = this.handleKeyPress.bind(this);
        this.ecsUpdated = this.updateScreen.bind(this);  
        this.spaces = new Map();
        this.digger = {};
    }

    componentDidMount() {
        const {gm} = this.props;
        gm.registerForUpdates("diggertest", this.ecsUpdated);
        window.addEventListener("keyup", this.keyPress);

        MapCreator.initMap(80, 40, Wall.create, gm);
        MapCreator.makeDigger(10, 10, "n", 1, gm).add(MapCreator.nokill());
        this.updateScreen();
    }

    componentWillUnmount() {
        const {gm} = this.props;
        gm.unregisterForUpdates("diggertest");
        window.removeEventListener("keyup", this.keyPress);
    }

    render() {
        const toDraw = this.props.gm.toDraw();

         return <div>
            <DrawArea toDraw={toDraw} showAlt={this.props.gm.showAlt} cameraOrigin={this.props.gm.cameraOrigin}/>
        </div>
    }

    updateScreen(evt) {
        this.setState({toggle:!this.state.toggle});
    }

    handleKeyPress(evt) {
        evt.preventDefault();

        const {gm} = this.props;
        const digger = gm.entity("digger_1");

        switch(evt.key) {
            case "ArrowUp":
                MapCreator.goStraight(digger, this.spaces, gm);
                break;

            case "ArrowLeft":
                MapCreator.turn("l", digger, this.spaces, gm);
                break;

            case "ArrowRight":
                MapCreator.turn("r", digger, this.spaces, gm);
                break;

            case "r":
                MapCreator.digRoom(digger, this.spaces, gm);
                break;
        }
    }
}


export default withContext(DiggerTest); 