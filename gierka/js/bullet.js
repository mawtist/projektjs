export default class bullet { 

    constructor( sx, sy, dx, dy, shooter = null ) {

        this.pos = {
            x : sx, 
            y : sy
        };
        this.dir = { x : 0, y : 0 }
        this.r = 5;
        this.speed = 500; 
        this.alive = true;
        this.shooter = shooter;
        this.killedByMap = false;


        if (!bullet.sharedImg) {
            const img = new Image();
            img.src = './img/Tank/Bullet.png';
            bullet.sharedImg = img;
        }
        this.imgbullet = bullet.sharedImg;

        this.calc(dx, dy);
    }

    calc(dx, dy) {

        let x = dx - this.pos.x;
        let y = dy - this.pos.y;


        if( x!= 0 || y != 0 ) {
            const a = Math.atan2( y, x );

            this.dir.x = Math.cos( a );
            this.dir.y = Math.sin( a );
        }
    }

    update() {
        const speed = this.speed * (window.DELAY / 1000);

        this.pos.x += this.dir.x * speed;
        this.pos.y += this.dir.y * speed;
        

        if(window.GAME && window.GAME.map && window.GAME.map.checkCollision(this.pos, this.r)) {
            this.killedByMap = true;
        }

        if (this.pos.x + this.r < 0 ||
            this.pos.x - this.r > window.CANVAS.width ||
            this.pos.y + this.r < 0 ||
            this.pos.y - this.r > window.CANVAS.height) {
            this.killedByMap = true;
        }
    }

    render() {
    
        let ctx = window.CANVAS.ctx;
        ctx.save();

        ctx.translate( this.pos.x, this.pos.y );

        const angle = Math.atan2( this.dir.y, this.dir.x ) + Math.PI/2;
        ctx.rotate( angle );

        ctx.drawImage( this.imgbullet, -this.r, -this.r, this.r *2, this.r *2 );
        
        ctx.restore();

    }

}
