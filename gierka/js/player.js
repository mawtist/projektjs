export default class Player {

    constructor() {
        this.pos = {
            x : Math.floor(Math.random() * window.innerWidth),
            y : Math.floor(Math.random() * window.innerHeight)
        };
        this.dir = {
            x : 0,
            y : 0
        };
        this.r = 10;
        this.speed = 100;  
        
        this.bodyAngle = 0;
        this.turretAngle = 0; 
    
        this.imgBody = new Image();
        this.imgBody.src = './img/Tank/Tank.png';
        this.imgTurret = new Image();
        this.imgTurret.src = './img/Tank/GunTurret.png';

    }


    update() {
        const keys = window.EVENTS.mapKeys;

        if( keys.LEFT.down ) this.dir.x = -1 ; 
        else if( keys.RIGHT.down ) this.dir.x = 1; 
        else this.dir.x = 0;

        if( keys.UP.down ) this.dir.y = -1 ; 
        else if( keys.DOWN.down ) this.dir.y = 1; 
        else this.dir.y = 0;

        //console.log(this.dir);

        const speed = this.speed * (window.DELAY / 1000);

        let x = this.dir.x; 
        let y = this.dir.y; 

        if( x != 0 || y != 0 ) {
            const a = Math.atan2( this.dir.y, this.dir.x );
            //console.log( a );
            x = Math.cos( a );
            y = Math.sin( a );
            this.bodyAngle = Math.atan2(y, x );
        }

        this.pos.x += x * speed;
        this.pos.y += y * speed;

        if ( this.pos.x - this.r < 0 ) this.pos.x = this.r;
        else if( this.pos.x + this.r > window.CANVAS.width) this.pos.x = window.CANVAS.width - this.r;

        if ( this.pos.y - this.r < 0 ) this.pos.y = this.r;
        else if( this.pos.y + this.r > window.CANVAS.height) this.pos.y = window.CANVAS.height - this.r;
    
        const dx = window.EVENTS.mapMouse.x - this.pos.x;
        const dy = window.EVENTS.mapMouse.y - this.pos.y;
        this.turretAngle = Math.atan2(dy, dx);

    }


    render() {
        let ctx = window.CANVAS.ctx;
        
        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(this.bodyAngle);
        ctx.drawImage(
            this.imgBody,
            -this.imgBody.width /2,
            -this.imgBody.height /2
        );

        ctx.restore();

        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(this.turretAngle);

        ctx.drawImage(
            this.imgTurret,
            -this.imgTurret.width /2,
            -this.imgTurret.height /2
        );

        ctx.restore();


    }


}
