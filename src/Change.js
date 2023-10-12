import { Lightning } from "@lightningjs/sdk";


export default class Change extends Lightning.Component {
   static _template() {
    return {
        Text: {
            x: 960, y: 440, mount: 0.5,
            text: { text: 'This is where you can set game preferences ', fontFace: 'pixel' }
        },
        OptionMenu: {
            alpha: 1,
            x: 400, y: 580,
            w:990, h:300,
            mountX:0.5,
            color: 0xffffffff, 
            children: [
                //box one
                {rect: true, w:5,h:300,y:0,x:500},
                {rect: true, w:300,h:5,y:0,x:500}, // ends at x point 880
                {rect: true, w:300,h:5,y:300,x:500},
                {rect: true, w:5,h:305,y:0,x:800},
                {text:{text:"FONT ONE", fontFace: "pixel", fontSize: 29}, x:500,y:580},

                //box t900
                {rect: true, w:5,h:300,y:0,x:900},
                {rect: true, w:300,h:5,y:0,x:900}, // ends at x point 880
                {rect: true, w:300,h:5,y:300,x:900},
                {rect: true, w:5,h:305,y:0,x:1200},

                //box three 
                {rect: true, w:5,h:300,y:0,x:1300},
                {rect: true, w:300,h:5,y:0,x:1300}, // ends at x point 880
                {rect: true, w:300,h:5,y:300,x:1300},
                {rect: true, w:5,h:305,y:0,x:1600},
            ]
        },
        FontOne: {
            x: 560, y: 730, mount: 0.5,
            text: { text: 'Font One ', fontFace: 'pixel' }
        },
        FontTwo: {
            x: 960, y: 730, mount: 0.5,
            text: { text: 'Font Two ', fontFace: 'pixelify' }
        },
        FontThree: {
            x: 1360, y: 730, mount: 0.5,
            text: { text: 'Font Three ', fontFace: 'teko' }
        },
        OptionPosition:{
            rect: true, w: 305, h: 305, color: 0x40ffffff,
                x: 560, y: 730,
                mount: 0.5,
                pivot: 0.5,
        }
    }
   }

   _handleEnter(){
        console.log('Enter pressed: Index = ' ,this._index);
        localStorage.setItem('fontval', this._index);
        this.signal('fontChange');
        //this.signal(this._index);
   }

   _construct(){
    this._index = 0;
    this._positions = [500,900,1300];
   }

   static _states(){
    return []
   }

   _handleBack(){
    this.signal('back');
    }

    _handleRight(){
        const newIndex = this._index +1;
        if(newIndex<3&&newIndex>0){
            this._setIndex(newIndex)
        }
    }

    _handleLeft(){
        let idx = this._index;
        if(idx<4&&idx>0){
            const newIndex = idx-1;
            this._setIndex(newIndex);
        }
    }
    
    _setIndex(idx){
        this.tag("OptionPosition").patch({
            smooth:{
                x: this._positions[idx] + 55,
                y: 730
            }
        })
        this._index = idx;
        console.log("Updated "+this._index);
    }
}