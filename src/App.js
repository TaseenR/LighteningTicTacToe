import { Lightning, Utils } from '@lightningjs/sdk'
import Splash from "./Splash.js";

export default class App extends Lightning.Component {

  _setup(){
    this._setState("Splash");
  }

  static _states() {
    return [
      class Splash extends this {
        $enter() {
          this.tag("Splash").setSmooth("alpha",1);
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


 static getFonts() {
    return [
        {family: 'pixel', url: Utils.asset('fonts/pixel.ttf'), descriptor: {}}
    ];
  }


  static _template(){
    return {
        rect: true, color: 0xff000000, w: 1920, h: 1080,
        Splash: {
          type: Splash,signals: {loaded: true}, alpha: 0
        }
    };
}

static _template(){
  return {
      rect: true, color: 0xff000000, w: 1920, h: 1080
  }
}

  _init() {
    this.tag('Background')
      .animation({
        duration: 15,
        repeat: -1,
        actions: [
          {
            t: '',
            p: 'color',
            v: { 0: { v: 0xfffbb03b }, 0.5: { v: 0xfff46730 }, 0.8: { v: 0xfffbb03b } },
          },
        ],
      })
      .start()
  }
}
