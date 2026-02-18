import Player from "./player.js";
import viewfinder from "./viewfinder.js";
import bullet from "./bullet.js";
import Enemy1 from "./enemy.js";
import Map from "./map.js";

export default class Game {

    constructor() {
        
       
        window.GAME = this;
        
        this.map = new Map;  
        this.viewfinder = new viewfinder;
        this.Player = new Player;  
        this.Enemy1 = new Enemy1;
        this.bullets = [];

        this.lastTime = new Date().getTime();
        

        this.gameOver = false;
        this.enemyRespawnTimer = 0;
        this.enemyRespawnDelay = 3000; 
        
     
        this.score = 0;
        this.loadScores();
        
    
        this.maxBullets = 50; 
        

    }

    loadScores() {
        const scoresJSON = localStorage.getItem('tankGameScores');
        this.scores = scoresJSON ? JSON.parse(scoresJSON) : [];
    }

    saveScore() {
        this.scores.push(this.score);
        this.scores.sort((a, b) => b - a); 
        this.scores = this.scores.slice(0, 5); 
        localStorage.setItem('tankGameScores', JSON.stringify(this.scores));
    }

    loop(){
e.
        this.tick();
        requestAnimationFrame(() => this.loop());
    }


    tick() {
        let now = new Date().getTime();
        window.DELAY = now - this.lastTime;
        this.lastTime = now;

        this.update();
        this.render();
    }

    addScore(points) {
        this.score += points;
    }

    update(){

        if(this.gameOver) return; 


        if(!this.Enemy1.alive) {
            this.enemyRespawnTimer += window.DELAY;
            if(this.enemyRespawnTimer >= this.enemyRespawnDelay) {
                this.addScore(100); 
                this.Enemy1 = new Enemy1;
                this.enemyRespawnTimer = 0;
            }
        }

        if( window.EVENTS.mapMouse.over && window.EVENTS.mapMouse.down ) {
            if( this.Player.canshoot()) {
                if(this.bullets.length < this.maxBullets) {
                    this.bullets.push( new bullet( 
                        this.Player.pos.x,
                        this.Player.pos.y,
                        window.EVENTS.mapMouse.x,
                        window.EVENTS.mapMouse.y,
                        'player' 
                    ))
                }
            }
        }
        this.Player.update();
        if(this.Enemy1.alive) {
            this.Enemy1.update();
        }
        

        if(this.bullets.length) {
            this.bullets.forEach( bullet => {
                bullet.update();
                
 
                if(bullet.alive && bullet.shooter === 'enemy') {
                    const dx = bullet.pos.x - this.Player.pos.x;
                    const dy = bullet.pos.y - this.Player.pos.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if(distance < bullet.r + this.Player.r) {
                        this.Player.takeDamage();
                        bullet.alive = false;
                    }
                }
                

                if(bullet.alive && bullet.shooter === 'player' && this.Enemy1.alive) {
                    const dx = bullet.pos.x - this.Enemy1.pos.x;
                    const dy = bullet.pos.y - this.Enemy1.pos.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if(distance < bullet.r + this.Enemy1.r) {
                        this.Enemy1.takeDamage();
                        bullet.alive = false;
                    }
                }
            });
        }
        this.bullets = this.bullets.filter(b => b.alive && !b.killedByMap);
    }

    render() {
        window.CANVAS.clean();
        this.map.render();
        this.Player.render();
        if(this.Enemy1.alive) {
            this.Enemy1.render();
        }
        this.viewfinder.render();
        if(this.bullets.length) {
            this.bullets.forEach( bullet => bullet.render() );
        }
        
        
        this.renderUI();
    }

    renderUI() {
        const ctx = window.CANVAS.ctx;
        
       
        ctx.fillStyle = '#00FF00';
        ctx.font = '20px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`HP: ${this.Player.hp}`, 20, 30);
        
        
        const scoreBoxX = window.CANVAS.width - 220;
        const scoreBoxY = 10;
        
   
        ctx.fillStyle = 'rgba(0, 255, 0, 0.1)';
        ctx.fillRect(scoreBoxX, scoreBoxY, 210, 60);
        
   
        ctx.strokeStyle = '#00FF00';
        ctx.lineWidth = 2;
        ctx.strokeRect(scoreBoxX, scoreBoxY, 210, 60);
        
     
        ctx.fillStyle = '#00FF00';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('WYNIK', window.CANVAS.width - 115, 30);
        
        ctx.fillStyle = '#FFFF00';
        ctx.font = 'bold 28px Arial';
        ctx.fillText(this.score, window.CANVAS.width - 115, 60);
        
 
        if(!this.Enemy1.alive) {
            const respawnSeconds = Math.ceil((this.enemyRespawnDelay - this.enemyRespawnTimer) / 1000);
            ctx.fillStyle = '#FFFF00';
            ctx.font = '16px Arial';
            ctx.textAlign = 'left';
            ctx.fillText(`kolejny przeciwnik w: ${respawnSeconds}s`, 20, 60);
        }
        
 
        if(this.gameOver) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(0, 0, window.CANVAS.width, window.CANVAS.height);
            
            ctx.fillStyle = '#FF0000';
            ctx.font = 'bold 60px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('PRZEGRAŁEŚ', window.CANVAS.width / 2, window.CANVAS.height / 2 - 60);
            
            ctx.fillStyle = '#FFFF00';
            ctx.font = 'bold 32px Arial';
            ctx.fillText(`WYNIK: ${this.score}`, window.CANVAS.width / 2, window.CANVAS.height / 2 + 20);
            
            ctx.fillStyle = '#FFFFFF';
            ctx.font = '24px Arial';
            ctx.fillText('przeładuj stronę jak chcesz zagrać znowu', window.CANVAS.width / 2, window.CANVAS.height / 2 + 80);
        }
    }

}
