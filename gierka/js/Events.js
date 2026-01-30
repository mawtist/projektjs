export default class Events {
    
    mapKeys = {
        LEFT : {
            code : 65,
            down: false
        },
        UP : {
            code : 87,
            down: false
        },
        RIGHT : {
            code : 68,
            down: false
        },
        DOWN : {
            code : 83,
            down: false
        }
    }
    mapMouse = {
        x : 0, 
        y : 0,
        down : false,
        over : false
    }

    constructor() {

        window.addEventListener( `keydown`, event => {
            switch( event.keyCode ) {
                case this.mapKeys.LEFT.code:
                this.mapKeys.LEFT.down = true;
                    break;
                case this.mapKeys.UP.code:
                    this.mapKeys.UP.down = true;
                    break;
                case this.mapKeys.RIGHT.code:
                    this.mapKeys.RIGHT.down = true;
                    break;
                case this.mapKeys.DOWN.code:
                    this.mapKeys.DOWN.down = true;
                    break;
            }
        });
        window.addEventListener( `keyup`, event => {
            switch( event.keyCode ) {
                case this.mapKeys.LEFT.code:
                    this.mapKeys.LEFT.down = false;
                    break;
                case this.mapKeys.UP.code:
                    this.mapKeys.UP.down = false;
                    break;
                case this.mapKeys.RIGHT.code:
                    this.mapKeys.RIGHT.down = false;
                    break;
                case this.mapKeys.DOWN.code:
                    this.mapKeys.DOWN.down = false;
                    break;
            }
        });

        window.addEventListener(`mouseover`, event => this.mapMouse.over = true );

        window.addEventListener(`mouseout`, event => this.mapMouse.over = false );

        window.addEventListener(`mousemove`, event => {
            
            const bound = window.CANVAS.element.getBoundingClientRect();
            //console.log( bound );
            this.mapMouse.x = event.clientX - bound.x;
            this.mapMouse.y = event.clientY - bound.y;
        } );

        window.addEventListener(`mousedown`, event => this.mapMouse.down = true );

        window.addEventListener(`mouseup`, event => this.mapMouse.down = false );
    }
}