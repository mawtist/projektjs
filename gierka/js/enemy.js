import bullet from './bullet.js';

export default class Enemy {
    constructor() {
        this.r = 35;
        this.speed = 80;


        this.hp = 1;
        this.alive = true;

        
        this.directionChangeTimer = 0;
        this.directionChangeInterval = 2000; 


        this.targetDir = { x: 0, y: 0 };
        this.turnSmoothing = 0.2; 

       
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
        this.dir.x = this.targetDir.x;
        this.dir.y = this.targetDir.y;
    }

    takeDamage() {

        this.hp--;
        if(this.hp <= 0) {
            this.alive = false;
        }

    }

    changeDirection() {
   
        const angle = Math.random() * Math.PI * 2;
        this.targetDir.x = Math.cos(angle);
        this.targetDir.y = Math.sin(angle);
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
        
        this.dir.x = this.targetDir.x;
        this.dir.y = this.targetDir.y;

        const speed = this.speed * (window.DELAY / 1000);
        
        let x = this.dir.x;
        let y = this.dir.y;
        
        if(x != 0 || y != 0) {

            const desired = Math.atan2(y, x);
            let delta = desired - this.bodyAngle;

            if(delta > Math.PI) delta -= 2 * Math.PI;
            else if(delta < -Math.PI) delta += 2 * Math.PI;
            this.bodyAngle += delta * this.turnSmoothing;
        }
        
        this.pos.x += x * speed;
        this.pos.y += y * speed;
        
     
        if(window.GAME && window.GAME.map && window.GAME.map.checkCollision(this.pos, this.r)) {
            this.pos.x -= x * speed;
            this.pos.y -= y * speed;

            this.changeDirection();
            this.dir.x = this.targetDir.x;
            this.dir.y = this.targetDir.y;
        }
        
        
        if ( this.pos.x - this.r < 0 ) {
            this.pos.x = this.r;

            this.targetDir.x = Math.abs(this.targetDir.x) || 0.1;
            this.dir.x = this.targetDir.x;
        }
        else if( this.pos.x + this.r > window.CANVAS.width) {
            this.pos.x = window.CANVAS.width - this.r;

            this.targetDir.x = -Math.abs(this.targetDir.x) || -0.1;
            this.dir.x = this.targetDir.x;
        }

        if ( this.pos.y - this.r < 0 ) {
            this.pos.y = this.r;

            this.targetDir.y = Math.abs(this.targetDir.y) || 0.1;
            this.dir.y = this.targetDir.y;
        }
        else if( this.pos.y + this.r > window.CANVAS.height) {
            this.pos.y = window.CANVAS.height - this.r;

            this.targetDir.y = -Math.abs(this.targetDir.y) || -0.1;
            this.dir.y = this.targetDir.y;
        }
        
       
        const aimX = window.GAME.Player.pos.x - this.pos.x;
        const aimY = window.GAME.Player.pos.y - this.pos.y;
        this.turretAngle = Math.atan2(aimY, aimX);

       
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