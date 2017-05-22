let module = (()=>{
    class Circle{
        constructor(radius, centerX, centerY, color, canvas){
            this.radius = radius;
            this.centerX = centerX;
            this.centerY = centerY;
            this.color = color;
            this.canvas = canvas;
            this.context = this.canvas.getContext();
        }
        draw(){

            this.context.beginPath();
            this.context.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI, false);
            this.context.fillStyle = this.color;
            this.context.fill();
            this.context.closePath();

        };

        getCenter(){
            return {
                x: this.centerX,
                y: this.centerY,
            }
        };

    };

    class  littleCircle extends Circle{
        constructor(radius, centerX, centerY, color, canvas, border){
            super(radius, centerX, centerY, color, canvas);
            this.border = border;
        };

        move(centerX = 0, centerY = 0){
            this.centerX += centerX;
            this.centerY += centerY;
        };
    };

    class Canvas{
        constructor(id){
            this.canvas = document.getElementById(id);
            this.context = this.canvas.getContext('2d');
        }

        clear(){
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        };
        getContext(){
            return this.context;
        };
        getElement(){
            return this.canvas;
        };
        getWidth(){
            return this.canvas.width;
        };
        getHeight(){
            return this.canvas.height;
        };
    };

    class MouseMoveListener{
        constructor(bigCircle, littleCircle, canvas){
            this.bigCircle = bigCircle;
            this.littleCircle = littleCircle;
            this.canvas = canvas;
        }

        handle(event){
            let rect = this.canvas.getElement().getBoundingClientRect(),

                //The cursor position relative to the center of the inner circle
                relPosX = (event.clientX - rect.left) - this.littleCircle.getCenter().x,
                relPosY = (event.clientY - rect.top) - this.littleCircle.getCenter().y,

                //Square hypotenuse displacement
                delta_2 = (this.littleCircle.radius + this.littleCircle.border)**2 - (relPosX**2 + relPosY**2);


            // No need to move the inner circle
            if(delta_2 <= 0) return;

            let diffX = -Math.sqrt(delta_2)*Math.sign(relPosX)*Math.cos(Math.atan(Math.abs(relPosY/relPosX))),
                diffY = -Math.sqrt(delta_2)*Math.sign(relPosY)*Math.cos(Math.atan(Math.abs(relPosX/relPosY))),
                littleCircleInBigCircle = (this.littleCircle.getCenter().x + diffX - this.bigCircle.getCenter().x)**2 + (this.littleCircle.getCenter().y + diffY - this.bigCircle.getCenter().y)**2 <= (this.bigCircle.radius- this.littleCircle.radius)**2;

            if(!littleCircleInBigCircle) return;

            canvas.clear();
            bigCircle.draw();
            ltlCircle.move(diffX, diffY);
            ltlCircle.draw();
        }
    }

    let border = 10,
        radiusBig = 200,
        radiusSmall = 20,
        canvas = new Canvas('myCanvas'),
        centerX = canvas.getWidth() / 2,
        centerY = canvas.getHeight() / 2,
        bigCircle = new Circle(radiusBig, centerX, centerY, 'red', canvas),
        ltlCircle = new littleCircle(radiusSmall, centerX + 50, centerY + 50, 'black', canvas, border),
        mouseMoveListener = new MouseMoveListener(bigCircle, ltlCircle, canvas);

    canvas.clear();
    bigCircle.draw();
    ltlCircle.draw();

    canvas.getElement().addEventListener('mousemove', (evt)=> {
        mouseMoveListener.handle(evt);
    }, false);

    return {
        canvas: canvas,
        ltlCircle: ltlCircle,
        bigCircle: bigCircle,
        centerX: centerX,
        centerY: centerY,
        mouseMoveListener: mouseMoveListener,
    }
})();

