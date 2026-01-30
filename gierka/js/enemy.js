export default class Enemy {
    constructor() {
        this.pos = {
            x : Math.floor(Math.random() * window.innerWidth),
            y : Math.floor(Math.random() * window.innerHeight)
        };
        this.dir = {
            x : 0,
            y : 0
        };
        this.r = 20;
        this.speed = 100;

        this.imgBody = new Image();
        this.imgBody.src = './img/Tank/TankEnemy.png';
        this.imgTurret = new Image();
        this.imgTurret.src = './img/Tank/GunTurretEnemy.png';
    }
    
    update() {
        
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

        //let ctx = window.CANVAS.ctx;
        //ctx.fillStyle = '#ff0000';
        //ctx.beginPath();
        //ctx.arc( this.pos.x, this.pos.y, this.r, 0, Math.PI *2 );
        //ctx.closePath();
        //ctx.fill();
    }
}