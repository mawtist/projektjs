export default class Canvas {
    constructor() {

        this.element = document.createElement( 'canvas' );
        this.ctx = this.element.getContext( '2d' );
        let body = document.body;

        this.backgroundimage = new Image();
        this.backgroundimage.src = './img/background.png';
        this.backgroundLoaded = false;

        this.backgroundimage.onload = () => {
            this.backgroundLoaded = true;
            this.clean();
        }

        this.resize();
        
        body.appendChild( this.element );

        body.style.margin = 0;
        body.style.padding = 0;
        body.style.height = '100vh';
        body.style.overflow = 'hidden';

        this.element.style.cursor = 'none'; 

        window.addEventListener( 'resize', () => this.resize() );

    }

    resize() {
        this.width = this.element.width = window.innerWidth;
        this.height = this.element.height =  window.innerHeight;
        this.element.style.width = window.innerWidth + 'px';
        this.element.style.height = window.innerHeight + 'px';
    }

    clean() {

        if( this.backgroundLoaded ){
            this.ctx.drawImage(
                this.backgroundimage,
                0,0,this.width, this.height
            );
        }
        else {
            this.ctx.fillStyle = '#d2d2d2';
            this.ctx.fillRect( 0, 0, this.width, this.height);
        }


    }

}

