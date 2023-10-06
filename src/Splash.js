import { Lightning } from "@lightningjs/sdk";

export default class Splash extends Lightning.Component {
    static _template(){
        return {
            Logo:{
                x: 960, y: 540, mount:0.5,
                text:{text:'LOADING..', fontFace:'pixel'}
            }
        }
    }

    _init(){
        this._pulse = this.tag("Logo").animation({
            duration: 4, repeat: 0, actions:[
                {p:'alpha', v:{0:0, 0.5:0.5, 1:0}}
            ]
        });
    
        // add a finish eventlistener, so we can send a signal
        // to the parent when the animation is completed
        this._pulse.on("finish", ()=>{
            this.signal("loaded");
        })
    
        // start the animation
        this._pulse.start();
    }
    
}