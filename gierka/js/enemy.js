import bullet from './bullet.js';

export default class Enemy {
    constructor() {
        this.r = 35;
        this.speed = 80;


        this.hp = 1;
        this.alive = true;

        
        this.directionChangeTimer = 0;
        this.directionChangeInterval = 2000; 

       
        this.lastShotTime = 0;
        this.shootCooldown = 1500; 
        this.shootAccuracy = 15; 

        this.imgBody = new Image();
        this.imgBody.src = './img/Tank/TankEnemy.png';
        this.imgTurret = new Image();
        this.imgTurret.src = './img/Tank/GunTurretEnemy.png';
        
        this.bodyAngle = 0;
        this.turretAngle = 0;

        this.dir = { x: 0, y: 0 };
        
        if(window.GAME && window.GAME.map) {
            this.pos = window.GAME.map.findSafeSpawnPoint(this.r);
        } else {
            this.pos = {
                x : Math.floor(Math.random() * window.innerWidth),
                y : Math.floor(Math.random() * window.innerHeight)
            };
        }
        

        this.changeDirection();
    }

    takeDamage() {

        this.hp--;
        if(this.hp <= 0) {
            this.alive = false;
        }

    }

    changeDirection() {
   
        const angle = Math.random() * Math.PI * 2;
        this.dir.x = Math.cos(angle);
        this.dir.y = Math.sin(angle);
        this.directionChangeTimer = 0;

    }

    canShoot() {
        const now = new Date().getTime();
        if (now - this.lastShotTime >= this.shootCooldown) {
            this.lastShotTime = now;
            return true;
        }
        return false;
    }
    
    update() {
        
        this.directionChangeTimer += window.DELAY;
        
        
        if(this.directionChangeTimer >= this.directionChangeInterval) {
            this.changeDirection();
        }
        
        const speed = this.speed * (window.DELAY / 1000);
        
        let x = this.dir.x;
        let y = this.dir.y;
        
        
        if(x != 0 || y != 0) {
            this.bodyAngle = Math.atan2(y, x);
        }
        
        this.pos.x += x * speed;
        this.pos.y += y * speed;
        
     
        if(window.GAME && window.GAME.map && window.GAME.map.checkCollision(this.pos, this.r)) {
            this.pos.x -= x * speed;
            this.pos.y -= y * speed;
            this.changeDirection(); 
        }
        
        
        if ( this.pos.x - this.r < 0 ) {
            this.pos.x = this.r;
            this.dir.x *= -1;
        }
        else if( this.pos.x + this.r > window.CANVAS.width) {
            this.pos.x = window.CANVAS.width - this.r;
            this.dir.x *= -1;
        }

        if ( this.pos.y - this.r < 0 ) {
            this.pos.y = this.r;
            this.dir.y *= -1;
        }
        else if( this.pos.y + this.r > window.CANVAS.height) {
            this.pos.y = window.CANVAS.height - this.r;
            this.dir.y *= -1;
        }
        
       
        const dx = window.GAME.Player.pos.x - this.pos.x;
        const dy = window.GAME.Player.pos.y - this.pos.y;
        this.turretAngle = Math.atan2(dy, dx);

       
        if(this.canShoot()) {
            const offsetX = (Math.random() - 0.5) * this.shootAccuracy * 2;
            const offsetY = (Math.random() - 0.5) * this.shootAccuracy * 2;
            
           
            if(window.GAME.bullets.length < window.GAME.maxBullets) {
                window.GAME.bullets.push( new bullet(
                    this.pos.x,
                    this.pos.y,
                    window.GAME.Player.pos.x + offsetX,
                    window.GAME.Player.pos.y + offsetY,
                    'enemy' 
                ));
            }
        }
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