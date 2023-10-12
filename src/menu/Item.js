import { Lightning } from "@lightningjs/sdk";

export default class Item extends Lightning.Component{

    static _template(){
        return {
            text:{text:'', fontFace:'pixel', fontSize:50}
        }
    }

    // will be automatically called
    set label(v){
        this.text.text = v;
    }

    // will be automatically called
    set action(v){
        this._action = v;
    }

    // will be automatically called
    get action(){
        return this._action;
    }

    _setup(){
        this._fonts = ['pixel', 'pixelify', 'teko'];
    }

    changeFont() {

        this.patch({ text: { fontFace: this._fonts[localStorage.getItem('fontval')] } })
    
      }
}