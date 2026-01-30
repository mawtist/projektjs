export default class viewfinder {


    render() {

        const ctx = window.CANVAS.ctx;

        ctx.strokeStyle = `#00FF00`;

        ctx.save();

            ctx.translate( window.EVENTS.mapMouse.x, window.EVENTS.mapMouse.y );

            // środek celownika, kółko
            ctx.beginPath();
            ctx.arc( 0, 0, 3, 0, Math.PI * 2 );
            ctx.closePath();
            ctx.stroke();

            //kreska góra
            ctx.beginPath();
            ctx.moveTo(0, -5);
            ctx.lineTo( 0, -15);
            ctx.stroke();

            //kreska dół
            ctx.beginPath();
            ctx.moveTo(0, 5);
            ctx.lineTo( 0, 15);
            ctx.stroke();

            //kreska prawo
            ctx.beginPath();
            ctx.moveTo( 5, 0);
            ctx.lineTo( 15, 0);
            ctx.stroke();

            //kreska lewo
            ctx.beginPath();
            ctx.moveTo( -5, 0);
            ctx.lineTo( -15, 0);
            ctx.stroke();
        
        ctx.restore();

    }
}