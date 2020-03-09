import React, { Component } from 'react';
import withContext from '../../ecs/withContext';
import DrawArea from '../DrawArea';
import * as Vector from '../../utilities/vector';
import * as Components from '../../game/itemdefs/Components';
import * as Move from '../../game/systems/Move';

//the goal here is to test running a larger number of animations at the same time
class AnimationTest extends Component {
    constructor(props) {
        super(props);
        this.state = {toggle:true};
        this.keyPress = this.handleKeyPress.bind(this);
        this.ecsUpdated = this.updateScreen.bind(this);  
    }

    componentDidMount() {
        const {gm} = this.props;
        gm.registerForUpdates("animationtest", this.ecsUpdated);
        window.addEventListener("keyup", this.keyPress);

        for(let i = 0; i < 200; i++) {
            const x = Vector.getRandomInt(1,40);
            const y = Vector.getRandomInt(1, 40);
            rando(x, y, gm);
        }
    }

    componentWillUnmount() {
        const {gm} = this.props;
        gm.unregisterForUpdates("animationtest");
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
        const toMove = gm.toDraw();

        toMove.forEach(m => {
            const vec = Vector.randomDirection();
            Move.request(m.id, Vector.add(m.pos.vec)(vec), gm);
        });
    }
}

const rando = (x, y, cm) => {
    return cm.createEntity()
    .add(Components.sprite("R", x, y, "transparent", "white"))
    .add(Components.pos(x, y));
}

export default withContext(AnimationTest); 