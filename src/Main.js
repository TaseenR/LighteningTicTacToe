import { Lightning } from "@lightningjs/sdk";
import Menu from "./menu/Menu";
import Item from "./menu/Item";

export default class Main extends Lightning.Component {
    static _template(){
        return {
            Menu:{
                x: 600, y:400,
                type: Menu, items:[
                    {label:'START NEW GAME',action:'start'},
                    {label:'CONTINUE',action:'continue'},
                    {label:'ABOUT',action:'about'},
                    {label: 'CHANGE', action: 'change'},
                    {label:'EXIT', action:'exit'}
                ]
            }
        }
    }
    _getFocused(){
        return this.tag("Menu");
    }

    _handleEnter(){
        this.signal("select", {item: this.tag("Menu").activeItem});
    }

    changeFont() {

        this.tag('Menu').changeFont();
    
      }

}