import { Lightning, Utils } from '@lightningjs/sdk'
import Splash from "./Splash.js";
import Main from './Main.js';
import Game from './Game.js';
import About from './About.js';
import Change from './Change.js';

export default class App extends Lightning.Component {


  _setup(){
    this._setState("Splash");
    this._fonts = ['pixel', 'pixelify', 'teko'];

  }


 static getFonts() {
    return [
        {family: 'pixel', url: Utils.asset('fonts/Roboto-Regular.ttf'), descriptor: {}},
        {family: 'pixelify', url: Utils.asset('fonts/pixel.ttf'),descriptor:{}},
        {family: 'teko', url: Utils.asset('fonts/teko.ttf'),descriptor:{}}
    ];

  }




  static _template(){
    return {
        rect: true, color: 0xff000000, w: 1920, h: 1080,
        Logo:{
          x: 100, y:100, text:{text:'TicTacToe', fontFace:'pixel'},
          shader: { type: Lightning.shaders.Light3d, rx: Math.PI * 0.25, ambient: 0.6 },
        },
        Splash: {
          type: Splash,signals: {loaded: true}, alpha: 0
        },
        Main:{
          type: Main, signals: {select: "menuSelect"}, alpha:0
        },
        Game:{
          type: Game, signals: {back: true}, alpha: 0,
          //shader: { type: Lightning.shaders.Light3d, rx: Math.PI * 0.25, ambient: 0.6 },
        },
        About:{
          type: About, signals: {backFromAbout: true}, alpha: 0
        },
        Change:{
          type: Change, signals: {back: true, fontChange: true}, alpha: 0
        }
    };
  }

reload(){
  console.log("Changing fonts ");
  this.tag('Logo').patch({ text: {fontFace: this._fonts[localStorage.getItem('fontval')] } })
  this.tag('About').changeFont();
  //this.tag('Game').changeFont();
  this.tag('Main').changeFont();
  
}

_handleBack() {console.log("this is weirldy running")}

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
     menuSelect({item}){
      if (this._hasMethod(item.action))
      {
        return this[item.action]();
      }
     }
      start() {
      this._setState("Game")
      }
      _getFocused() {
        return this.tag("Main");
      }
      about(){
        this._setState("About");
      }
      change(){
        this._setState("Change");
      }
    },
    class Game extends this {
      $enter() {
        this.tag("Game").setSmooth("alpha",1);
      }
      $exit() {
        this.tag("Game").setSmooth("alpha",0);
      }
      _getFocused(){
        return this.tag("Game");
      }
      back() {
        this._setState("Main")
    }
    },
    class About extends this {
      $enter() {
        this.tag("About").setSmooth("alpha", 1);
    }

    $exit() {
        this.tag("About").setSmooth("alpha", 0);
    }
    _getFocused(){
      return this.tag("About");
    }
    backFromAbout(){
      this._setState("Main");
    }
    },
    class Change extends this{
      $enter() {
        this.tag("Change").setSmooth("alpha", 1);
        }

    $exit() {
        this.tag("Change").setSmooth("alpha", 0);
      }
    back() {
        this._setState("Main");
    }
    _getFocused(){
      return this.tag("Change");
    }
    fontChange(){
      this.reload();
    }
    }
  ]
}
}
