import { Lightning } from "@lightningjs/sdk";
import Menu from "./menu/Menu";

export default class Main extends Lightning.Component {
    static _template(){
        return {
            Menu:{
                x: 600, y:400,
                type: Menu, items: [{label:'START NEW GAME',action:'start'},
                {label:'CONTINUE',action:'continue'},
                {label:'ABOUT',action:'about'},
                {label:'EXIT', action:'exit'}
            ]
            }
        }
    }

    _handleDown(){
        this._setIndex(Math.min(++this._index,this.items.length-1));
    }

    _handleUp(){
        this._setIndex(Math.max(0, --this._index));
    }
}