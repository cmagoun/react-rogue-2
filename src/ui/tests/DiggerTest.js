import React, { Component } from 'react';
import withContext from '../../ecs/withContext';
import DrawArea from '../DrawArea';
import * as MapCreator from '../../game/mapgen/MapCreator';
import * as Components from '../../game/Components';

//the goal here is to test running a larger number of animations at the same time
class DiggerTest extends Component {
    constructor(props) {
        super(props);
        this.state = {toggle:true};
        this.keyPress = this.handleKeyPress.bind(this);
        this.ecsUpdated = this.updateScreen.bind(this);  
         this.spaces = {walkable: new Map(), used: new Map()};
        this.digger = {};
    }

    makeDigger = (x, y, fac, index, gm) => {
        const glyph = (index, gm) => () => {
            const e = gm.entity(`digger_${index}`);
            if(e.facing.value === "n") return "^";
            if(e.facing.value === "s") return "V";
            if(e.facing.value === "e") return ">";
            return "<";
        }

        return gm.createEntity(`digger_${index}`)
            .add(Components.sprite(glyph(index,gm), x, y, "green", "white"))
            .add(Components.pos(x, y, gm))
            .add(MapCreator.facing(fac))
            .add(Components.tag("digger"));
    }

    componentDidMount() {
        const {gm} = this.props;
        gm.registerForUpdates("diggertest", this.ecsUpdated);
        window.addEventListener("keyup", this.keyPress);

        this.makeDigger(10, 10, "n", 1, gm);
    }

    componentWillUnmount() {
        const {gm} = this.props;
        gm.unregisterForUpdates("diggertest");
        window.removeEventListener("keyup", this.keyPress);
    }

    render() {
        const toDraw = this.props.gm.toDraw();

         return <div>
            <DrawArea toDraw={toDraw} showAlt={this.props.gm.showAlt}/>
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
        }
    }
}


export default withContext(DiggerTest); 