import React, {PureComponent, Component } from 'react';
import {tileSize, arenaHeight, arenaWidth, getGlyph, getColor, getSpriteName} from '../game/Constants';

const styles = {
    drawarea: {
        position:"relative",
        width: `${arenaWidth * tileSize}px`, 
        height:`${arenaHeight * tileSize}px`
    }
}

class DrawArea extends Component{
    render() {
        return <div className="drawarea" style={styles.drawarea}>
            {this.props.toDraw.map(e => <DrawComponent 
                key={e.id} 
                glyph={getGlyph(e.sprite.glyph)}
                //spriteName={getSpriteName(e, e.sprite.name, this.props.showAlt)} 
                x={e.sprite.draw.x} 
                y={e.sprite.draw.y}
                fcolor={e.sprite.fcolor}
                bcolor={e.sprite.bcolor}
                border={e.sprite.border}
                z={e.sprite.z}
                show={e.sprite.show}
                //spin={e.sprite.spin}
                />
            )}
        </div>
    }
}

class DrawComponent extends PureComponent {
    render() {
        const {x, y, glyph, bcolor, fcolor, border, z} = this.props;

        // if(!show) {
        //     return <div style={{display:"none"}}></div>;
        // }

        let divStyle = {
            position:"absolute", 
            top:(y*tileSize)+"px", 
            left:(x*tileSize)+"px",
            height:tileSize+"px",
            width:tileSize+"px",
            backgroundColor: bcolor,
            color:fcolor,
            textAlign:"center",
            fontWeight:"bold",
            border: border ? "1px solid " + border : "",
            zIndex: z
            //WebkitAnimationDuration: spin,
        };

        //const spinName = spin ? " spin" : "";
        let clsName = "sprite";
        return <div className={clsName} style={divStyle}>
            <div style={{paddingTop:"3px"}}>{glyph}</div>
        </div>
    
    }
}

export default DrawArea;