import Canvas from './Canvas.js';
import Events from './Events.js';
import Menu from './menu.js';

window.DELAY = 0;
window.CANVAS = new Canvas();
window.EVENTS = new Events();
window.MENU = new Menu();


function gameLoop() {
    
    if(window.MENU.active) {
        window.CANVAS.clean();
        window.MENU.render();
    } 
    
    else if(window.GAME) {

        if (typeof window.GAME.tick === 'function') {
            window.GAME.tick();
        } else {
            window.GAME.loop();
        }
    }
    
    requestAnimationFrame(gameLoop);
}

gameLoop();
