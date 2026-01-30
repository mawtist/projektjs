import Player from "./player.js";
import viewfinder from "./viewfinder.js";
import bullet from "./bullet.js";
import Enemy1 from "./enemy.js";

export default class Game {

    constructor() {
        
        this.viewfinder = new viewfinder;
        this.Player = new Player;
        this.Enemy1 = new Enemy1;
        this.bullets = [];

        this.lastTime = new Date().getTime();
        
        this.loop();
    }

    loop(){
        
        let now = new Date().getTime();
        window.DELAY = now - this.lastTime;
        this.lastTime = now;

        this.update();
        this.render();

        requestAnimationFrame( () => this.loop() );
    }

    update(){
        //console.log( window.DELAY );
        //console.table(window.EVENTS.mapMouse);

        if( window.EVENTS.mapMouse.over && window.EVENTS.mapMouse.down ) {
            this.bullets.push( new bullet( 
                this.Player.pos.x,
                this.Player.pos.y,
                window.EVENTS.mapMouse.x,
                window.EVENTS.mapMouse.y,
            ))
        }
        this.Player.update();
        if(this.bullets.length) {
            this.bullets.forEach( bullet => bullet.update() );
        }
        this.bullets.forEach(b => b.update());
        this.bullets = this.bullets.filter(b => b.alive);
    }

    render() {
        window.CANVAS.clean();
        this.Player.render();
        this.Enemy1.render();
        this.viewfinder.render();
        if(this.bullets.length) {
        this.bullets.forEach( bullet => bullet.render() );
        }
    }

}