import React, {Component } from 'react';
import withContext from '../ecs/withContext';
import {states} from '../game/GameShell';

const styles = {
    container: {        
        display:"flow",
        flowDirection: "column",
    },
    title: {
        fontSize: "x-large"
    },
    intro: {
        margin:"auto",
        padding: "5px",
        textAlign: "center",
        border: "2px solid white",
        width: "40%",
        height: "100px",
        marginTop: "200px"
    },
    whitespace: {
        width: "10px",
        height: "10px"
    },
    button: {
        width: "200px"
    }
}

class Intro extends Component {
    render() {
        return <div style={styles.container}>
            <div style={styles.intro}>
                <div style={styles.title}>Game Shell</div>
                <div style={styles.whitespace}/>
                <div>This is just the shell of a game</div>
                <div>using our js component system</div>
                <div>and the Anime library for animations (maybe)</div>

                <div style={styles.whitespace}/>
                <div>
                    <button style={styles.button} onClick={this.playfield.bind(this)}>Playfield Test</button>
                </div>

                <div style={styles.whitespace}/>
                <div>
                    <button style={styles.button} onClick={this.animation.bind(this)}>Animation Test</button>
                </div>

            </div>

        </div>
    }

    playfield() {
        this.props.gm.updateGameState(states.INIT);
    }

    animation() {
        this.props.gm.updateGameState(states.ANIMATIONTEST);
    }
}

export default withContext(Intro);