export default class bullet { 

    constructor( sx, sy, dx, dy ) {

        this.pos = {
            x : sx, 
            y : sy
        };
        this.dir = { x : 0, y : 0 }
        this.r = 5;
        this.speed = 200;
        this.alive = true;

        const bulletImg = new Image();
        bulletImg.src = './img/Tank/Bullet.png';
        this.imgbullet = bulletImg;

        this.calc(dx, dy);
    }

    calc(dx, dy) {

        let x = dx - this.pos.x;
        let y = dy - this.pos.y;

        //console.log(x, y);
        if( x!= 0 || y != 0 ) {
            const a = Math.atan2( y, x );
            //console.log( a );
            this.dir.x = Math.cos( a );
            this.dir.y = Math.sin( a );
        }
    }

    update() {


        const speed = this.speed * (window.DELAY / 1000);

        this.pos.x += this.dir.x * speed;
        this.pos.y += this.dir.y * speed;
        
         if (
        this.pos.x + this.r < 0 ||
        this.pos.x - this.r > window.CANVAS.width ||
        this.pos.y + this.r < 0 ||
        this.pos.y - this.r > window.CANVAS.height
        ) {
            this.alive = false;
        }
    }

    render() {
    
        let ctx = window.CANVAS.ctx;
        ctx.save();

        ctx.translate( this.pos.x, this.pos.y );

        const angle = Math.atan2( this.dir.y, this.dir.x );
        ctx.rotate( angle );

        ctx.drawImage( this.imgbullet, -this.r, -this.r, this.r *2, this.r *2 );
        
        ctx.restore();

        //const ctx = window.CANVAS.ctx;
        //ctx.fillStyle = `#A9A9A9`;    
        //ctx.beginPath();
        //ctx.arc( this.pos.x, this.pos.y, this.r, 0, Math.PI *2);
        //ctx.closePath();
        //ctx.fill();
    }
}