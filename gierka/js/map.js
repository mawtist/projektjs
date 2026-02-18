export default class Map {

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

        this.obstacles.push(
            { x: 200, y: 200, width: 150, height: 40 },
            { x: window.innerWidth - 350, y: 250, width: 150, height: 40 },
            { x: window.innerWidth / 2 - 100, y: window.innerHeight / 2 - 50, width: 200, height: 100 },
            { x: 150, y: window.innerHeight - 300, width: 100, height: 150 },
            { x: window.innerWidth - 250, y: window.innerHeight - 300, width: 100, height: 150 }
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

    getCollidingObstacle(pos, radius) {
        for (let i = 0; i < this.obstacles.length; i++) {
            let obstacle = this.obstacles[i];
            let closestX = Math.max(obstacle.x, Math.min(pos.x, obstacle.x + obstacle.width));
            let closestY = Math.max(obstacle.y, Math.min(pos.y, obstacle.y + obstacle.height));

            let distanceX = pos.x - closestX;
            let distanceY = pos.y - closestY;
            let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

            if (distance < radius) {
                return obstacle;
            }
        }
        return null;
    }

    render() {
        let ctx = window.CANVAS.ctx;
        this.obstacles.forEach(obstacle => {
            ctx.fillStyle = 'rgba(100, 100, 100, 0.7)';
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
            ctx.strokeStyle = 'rgba(50, 50, 50, 1)';
            ctx.lineWidth = 2;
            ctx.strokeRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        });
    }
}
