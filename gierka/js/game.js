import Player from "./player.js";
import viewfinder from "./viewfinder.js";
import bullet from "./bullet.js";
import Enemy from "./enemy.js";
import Map from "./map.js";

export default class Game {

    constructor() {
        
       
        window.GAME = this;
        
        this.map = new Map;  
        this.viewfinder = new viewfinder;
        this.Player = new Player;  
        this.enemy = new Enemy();
        this.bullets = [];

        this.lastTime = new Date().getTime();
        

        this.gameOver = false;
        this.enemyRespawnTimer = 0;
        this.enemyRespawnDelay = 3000; 
        
     
        this.score = 0;
        this.loadScores();
        
    
        this.maxBullets = 50; 
        

        this.heartImg = new Image();
        this.heartImg.src = './img/heart.png';

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


        if(!this.enemy.alive) {
            this.enemyRespawnTimer += window.DELAY;
            if(this.enemyRespawnTimer >= this.enemyRespawnDelay) {
                this.addScore(100); 
                this.enemy = new Enemy();
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
        if(this.enemy.alive) {
            this.enemy.update();
        }
        

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
                

                if(bullet.alive && bullet.shooter === 'player' && this.enemy.alive) {
                    const dx = bullet.pos.x - this.enemy.pos.x;
                    const dy = bullet.pos.y - this.enemy.pos.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if(distance < bullet.r + this.enemy.r) {
                        this.enemy.takeDamage();
                        bullet.alive = false;
                    }
                }
            });
        this.bullets = this.bullets.filter(b => b.alive && !b.killedByMap);
    }

    render() {
        window.CANVAS.clean();
        this.map.render();
        this.Player.render();
        if(this.enemy.alive) {
            this.enemy.render();
        }
        this.viewfinder.render();
        this.bullets.forEach( bullet => bullet.render() );
        
        
        this.renderUI();
    }

    renderUI() {
        const ctx = window.CANVAS.ctx;
        
       

        const heartSize = 32;
        const heartPadding = 8;
        for (let i = 0; i < this.Player.hp; i++) {
            ctx.drawImage(
                this.heartImg,
                20 + i * (heartSize + heartPadding),
                10,
                heartSize,
                heartSize
            );
        }
        
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
        
 
        if(!this.enemy.alive) {
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
