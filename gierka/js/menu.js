import Game from './game.js';

export default class Menu {
    constructor() {
        this.active = true;
        this.startButtonRect = {
            x: window.innerWidth / 2 - 100,
            y: window.innerHeight / 2 + 50,
            width: 200,
            height: 60
        };
        this.wyniki();
        this.sluchaczklik();
    }

    wyniki() {
        const scoresJSON = localStorage.getItem('tankGameScores');
        this.scores = scoresJSON ? JSON.parse(scoresJSON) : [];
    }

    sluchaczklik() {
        document.addEventListener('click', (e) => {
            if(this.active) {
                const rect = this.startButtonRect;
                if(e.clientX >= rect.x && e.clientX <= rect.x + rect.width &&
                   e.clientY >= rect.y && e.clientY <= rect.y + rect.height) {
                    this.startGame();
                }
            }
        });
    }

    startGame() {
        this.active = false;
        window.CANVAS.hideCursor();
        window.GAME = new Game();
    }

    render() {
        if(!this.active) return;
        const ctx = window.CANVAS.ctx;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(0, 0, window.CANVAS.width, window.CANVAS.height);

        ctx.fillStyle = '#00FF00';
        ctx.font = 'bold 80px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('GRA CZOŁK', window.CANVAS.width / 2, 150);

        ctx.fillStyle = '#FFFF00';
        ctx.font = '24px Arial';
        ctx.fillText('Sterowanie: WSAD', window.CANVAS.width / 2, 250);
        ctx.fillText('Strzelanie: LEWA MYSZ', window.CANVAS.width / 2, 300);

        ctx.fillStyle = '#00FF00';
        ctx.font = '18px Arial';
        ctx.fillText('Zielony celownik = możesz strzelić', window.CANVAS.width / 2, 360);

        ctx.fillStyle = '#FF0000';
        ctx.fillText('Czerwony celownik = nie możesz strzelić', window.CANVAS.width / 2, 390);

        const rect = this.startButtonRect;
        ctx.fillStyle = '#00FF00';
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);

        ctx.fillStyle = '#000000';
        ctx.font = 'bold 32px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('START', window.CANVAS.width / 2, rect.y + 45);

        ctx.fillStyle = '#FFFFFF';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('dostaniesz 3 razy to umierasz, 3 sekundy po zestrzeleniu przeciwnika zjawia się kolejny', window.CANVAS.width / 2, window.CANVAS.height - 100);
        this.renderScoresTable(ctx);
    }

    renderScoresTable(ctx) {
        const tableX = window.CANVAS.width - 240;
        const tableY = 30;
        const tableWidth = 220;
        const rowHeight = 30;
        const headerHeight = 35;

        ctx.fillStyle = 'rgba(0, 255, 0, 0.1)';
        ctx.fillRect(tableX, tableY, tableWidth, headerHeight + (5 * rowHeight));
        ctx.strokeStyle = '#00FF00';
        ctx.lineWidth = 2;
        ctx.strokeRect(tableX, tableY, tableWidth, headerHeight + (5 * rowHeight));
        ctx.fillStyle = '#00FF00';
        ctx.font = 'bold 18px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('TOP 5', tableX + tableWidth / 2, tableY + 25);
        ctx.font = 'bold 14px Arial';

        for (let i = 0; i < 5; i++) {
            const yPos = tableY + headerHeight + (i * rowHeight) + 20;
            if (i < this.scores.length) {
                ctx.fillStyle = '#FFFF00';
                ctx.textAlign = 'left';
                ctx.fillText(`${i + 1}.`, tableX + 15, yPos);
                ctx.fillStyle = '#00FF00';
                ctx.textAlign = 'right';
                ctx.fillText(this.scores[i], tableX + tableWidth - 15, yPos);
            } else {
                ctx.fillStyle = '#666666';
                ctx.textAlign = 'center';
                ctx.fillText('-', tableX + tableWidth / 2, yPos);
            }
        }
    }
}
