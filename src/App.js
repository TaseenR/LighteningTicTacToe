import { Lightning, Utils } from '@lightningjs/sdk'
import Splash from "./Splash.js";
import Main from './Main.js';

export default class App extends Lightning.Component {


  _setup(){
    this._setState("Splash");
  }


 static getFonts() {
    return [
        {family: 'pixel', url: Utils.asset('fonts/Roboto-Regular.ttf'), descriptor: {}}
    ];
  }


  static _template(){
    return {
        rect: true, color: 0xff808080, w: 1920, h: 1080,
        Logo:{
          x: 100, y:100, text:{text:'TicTacToe', fontFace:'pixel'}
        },
        Splash: {
          type: Splash,signals: {loaded: true}, alpha: 0
        },
        Main:{
          type: Main,signals: {}, alpha:0
        }
    };
}

static _states() {
  return [
    class Splash extends this {
      $enter() {
        this.tag("Splash").setSmooth("alpha", 1);
      }
      $exit() {
        this.tag("Splash").setSmooth("alpha",0);
      }
      loaded(){
        this._setState("Main");
      }
    },
    class Main extends this {
      $enter(){
        this.tag("Main").patch({
        smooth:{alpha:1, y:0}
      });}
      $exit(){
        this.tag("Main").patch({
        smooth:{alpha:0, y:100}
     });}
      _getFocused() {
        return this.tag("Main");
      }
    }
  ]
}
}
