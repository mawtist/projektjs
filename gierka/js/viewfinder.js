export default class viewfinder {


    render() {

        const ctx = window.CANVAS.ctx;
        let canShoot = true;
        if(window.GAME && window.GAME.Player) {
            const teraz = new Date().getTime();
            canShoot = (teraz - window.GAME.Player.ostatnistrzal) >= window.GAME.Player.strzelcooldown;
        }
        ctx.strokeStyle = canShoot ? `#00FF00` : `#FF0000`;
        ctx.save();

            ctx.translate( window.EVENTS.mapMouse.x, window.EVENTS.mapMouse.y );

            ctx.beginPath();
            ctx.arc( 0, 0, 3, 0, Math.PI * 2 );
            ctx.closePath();
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(0, -5);
            ctx.lineTo( 0, -15);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(0, 5);
            ctx.lineTo( 0, 15);
            ctx.stroke();


            ctx.beginPath();
            ctx.moveTo( 5, 0);
            ctx.lineTo( 15, 0);
            ctx.stroke();


            ctx.beginPath();
            ctx.moveTo( -5, 0);
            ctx.lineTo( -15, 0);
            ctx.stroke();
        
        ctx.restore();

    }
}