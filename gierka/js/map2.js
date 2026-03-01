export default class Map2 {

    constructor() {
        this.obstacles = [];
        this.createObstacles();
    }

    createObstacles() {

        this.obstacles.push(
            { x: 0, y: 0, width: window.innerWidth, height: 20 },
            { x: 0, y: window.innerHeight - 20, width: window.innerWidth, height: 20 },
            { x: 0, y: 0, width: 20, height: window.innerHeight },
            { x: window.innerWidth - 20, y: 0, width: 20, height: window.innerHeight }
        );

        const cx = Math.floor(window.innerWidth / 2);
        const cy = Math.floor(window.innerHeight / 2);


        this.obstacles.push(
            { x: cx - 350, y: cy - 25, width: 700, height: 50 },
            { x: cx - 25, y: cy - 350, width: 50, height: 700 }
        );


        const pillarSize = { w: 80, h: 80 };
        this.obstacles.push(
            { x: cx - 300 - pillarSize.w/2, y: cy - 200 - pillarSize.h/2, width: pillarSize.w, height: pillarSize.h },
            { x: cx + 300 - pillarSize.w/2, y: cy - 200 - pillarSize.h/2, width: pillarSize.w, height: pillarSize.h },
            { x: cx - 300 - pillarSize.w/2, y: cy + 200 - pillarSize.h/2, width: pillarSize.w, height: pillarSize.h },
            { x: cx + 300 - pillarSize.w/2, y: cy + 200 - pillarSize.h/2, width: pillarSize.w, height: pillarSize.h }
        );


        this.obstacles.push(
            { x: 40, y: 80, width: 220, height: 40 },
            { x: 40, y: 80, width: 40, height: 220 },

            { x: window.innerWidth - 260, y: 80, width: 220, height: 40 },
            { x: window.innerWidth - 80, y: 80, width: 40, height: 220 },

            { x: 40, y: window.innerHeight - 300, width: 220, height: 40 },
            { x: 40, y: window.innerHeight - 300, width: 40, height: 220 },

            { x: window.innerWidth - 260, y: window.innerHeight - 300, width: 220, height: 40 },
            { x: window.innerWidth - 80, y: window.innerHeight - 300, width: 40, height: 220 }
        );
    }

    checkCollision(pos, radius) {
        for (let obstacle of this.obstacles) {
            let closestX = Math.max(obstacle.x, Math.min(pos.x, obstacle.x + obstacle.width));
            let closestY = Math.max(obstacle.y, Math.min(pos.y, obstacle.y + obstacle.height));

            let distanceX = pos.x - closestX;
            let distanceY = pos.y - closestY;
            let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

            if (distance < radius) {
                return true;
            }
        }
        return false;
    }

    findSafeSpawnPoint(radius) {
        let maxAttempts = 100;
        let attempts = 0;
        let pos = { x: 0, y: 0 };
        let buffer = radius + 50;

        while(attempts < maxAttempts) {
            pos.x = buffer + Math.random() * (window.innerWidth - buffer * 2);
            pos.y = buffer + Math.random() * (window.innerHeight - buffer * 2);

            if(!this.checkCollision(pos, radius + 10)) {
                return pos;
            }
            attempts++;
        }

        return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    }

    render() {
        let ctx = window.CANVAS.ctx;
        this.obstacles.forEach(obstacle => {
            ctx.fillStyle = 'rgba(80, 120, 160, 0.8)';
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
            ctx.strokeStyle = 'rgba(40, 60, 80, 1)';
            ctx.lineWidth = 2;
            ctx.strokeRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        });
    }
}
