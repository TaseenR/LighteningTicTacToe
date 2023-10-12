import { Lightning } from "@lightningjs/sdk";
import Utils from "./GameUtils";

export default class Game extends Lightning.Component {

    static _template() {
        return {
        Game:{
            PlayerPosition:{
                rect: true, w: 250, h: 250, color: 0x40ffffff,
                x: 550, y: 250,
                mount: 0.5,
                pivot: 0.5,
                
            },
            Field:{
                x: 400, y: 100,
                children:[
                    {rect: true, w:1, h:5, y:300},
                    {rect: true, w:1, h:5, y:600},
                    {rect: true, h:1, w:5, x:300, y:0},
                    {rect: true, h:1, w:5, x:600, y:0}
                ]
            },
            Markers:{
                x: 400, y: 100
            },
            ScoreBoard:{ x: 100, y: 170,
                Player:{
                    text:{text:'Player 0', fontSize:29, fontFace:'Pixel'}
                },
                Ai:{ y: 40,
                    text:{text:'Computer 0', fontSize:29, fontFace:'Pixel'}
                },
                Back:{
                    y: 80,
                    text:{text: "Click backspace \nto leave", fontFace:"Pixel",fontSize:29}
                }
            }
        },
        Notification:{
            x: 100, y:170, text:{fontSize:70, fontFace:'Pixel'}, alpha: 0
        }
    }
}

    _construct(){
        this._index = 0;
        this._aiScore = 0;
        this._playerScore = 0;
    }

    _active(){
        this._reset();

        this.tag("Field").children.forEach((el,idx)=>{
            el.setSmooth(idx<2?"w":"h",900,{duration:0.7, delay:idx*0.15})
            
        })
    }

    _reset(){
        this._tiles = [
            'e','e','e','e','e','e','e','e','e'
        ];

        this.render(this._tiles);
        this._setState("");
    }

    render(tiles){
        this.tag("Markers").children = tiles.map((el,idx) => {
            return {
                x: idx%3*300 +110,
                y: ~~(idx/3)*300 +90,
                text:{text:el === "e"?'':`${el}`,fontFace: 'Pixel',fontSize:100}
            }
        }) 
    }

    _handleUp(){
        let idx = this._index;
        if(idx-3 >= 0){
            this._setIndex(idx-3);
        }
    }

    _handleDown(){
        let idx = this._index;
        if(idx+3 <= this._tiles.length - 1){
            this._setIndex(idx+3);
        }
    }

    _handleLeft(){
        let idx = this._index;
        if(idx%3){
            this._setIndex(idx - 1);
        }
    }

    _handleRight(){
        const newIndex = this._index + 1;
        if(newIndex%3){
            this._setIndex(newIndex);
        }
    }

    _setIndex(idx){
        this.tag("PlayerPosition").patch({
            smooth:{
                x: idx%3*300 + 550,
                y: ~~(idx/3)*300 + 250,
            }
        });
        this._index = idx;
    }

    _handleEnter(){
        if(this._tiles[this._index] === "e"){
            if(this.place(this._index, "X")){
                this._setState("Computer");
            }
        }
    }


    _setup(){
        this._fonts = ['pixel', 'pixelify', 'teko'];
    }

    changeFont() {

        this.tag('Text').patch({ text: { fontFace: this._fonts[localStorage.getItem('fontval')] } })
    
      }

    _handleBack(){
        this.signal('back');
    }

    _init(){
        const pulsePlayer = this.tag("PlayerPosition").animation({
            duration: 1,
            repeat: -1,
            actions: [
                { p: 'w', v: { 0: 220, 0.25: 240, 0.5: 250, 0.75: 240, 1: 220 } },
                { p: 'h', v: { 0: 220, 0.25: 240, 0.5: 250, 0.75: 240, 1: 220 } },
            ]
        })

        const entergrid = this.tag("Field").animation({
            duration: 1,
            repeat: 0,
            actions: [
                {p: 'y',v: {0: 0, 0.2: 20, 0.4:40,0.6:60,0.8:80,0.9:90,1:100}} //100
            ]
        })

        pulsePlayer.start();
        entergrid.start();

    }

    place(index, marker){
        this._tiles[index] = marker;
        this.render(this._tiles);
    
        const winner = Utils.getWinner(this._tiles);
        if(winner){
            this._setState("End.Winner",[{winner}]);
            return false;
        }
    
        return true;
    }

    static _states(){
        return [
            class Computer extends this {
                $enter(){
                    const position = Utils.AI(this._tiles);
                    if(position === -1){
                        this._setState("End.Tie");
                        return false;
                    }
    
                    setTimeout(()=>{
                        if(this.place(position,"0")){
                            this._setState("");
                        }
                    }, ~~(Math.random()*1200)+200);
    
                    this.tag("PlayerPosition").setSmooth("alpha",0);
                }
    
                // make sure we don't handle
                // any keypresses when the computer is playing
                _captureKey({keyCode}){ }
    
                $exit(){
                    this.tag("PlayerPosition").setSmooth("alpha",1);
                }
            },
            class End extends this{
                _handleEnter(){
                    this._reset();
                }
                $exit(){
                    this.patch({
                        Game:{
                            smooth:{alpha:1}
                        },
                        Notification: {
                            text:{text:''},
                            smooth:{alpha:0}
                        }
                    });
                }
                static _states(){
                    return [
                        class Winner extends this {
                            $enter(args,{winner}){
                                if(winner === 'X'){
                                    this._playerScore += 1;   
                              }else {
                                this._aiScore += 1;
                              }
                              this.patch({
                                Game: {
                                    smooth: {alpha:0},
                                    ScoreBoard:{
                                        Player:{text:{text:`Player ${this._playerScore}`}},
                                        Ai:{text:{text:`Computer ${this._aiScore}`}},
                                    }
                                },
                                Notification: {
                                    text:{text:`${winner==='X'?`Player`:`Computer`} wins (press enter to continue)`},
                                    smooth:{alpha:1}
                                }
                            });
                            }
                        },
                        class Tie extends this {
                            $enter(){
                                this.patch({
                                    Game: {
                                        smooth: {alpha: 0}
                                    },
                                    Notification: {
                                        text:{text:`Tie :( (press enter to try again)`},
                                        smooth:{alpha:1}
                                    }
                                });
                            }
                        }
                    ]
                }
            }
        ]
    }

    
}