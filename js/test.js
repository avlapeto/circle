((module)=>{
    mocha.setup('bdd');
    let assert = chai.assert;


    describe("canvas", function() {

        describe("Width of element", function() {

            it("Return type int", function() {
                assert(Number.isInteger(module.canvas.getWidth()), "Не int");
            });

            it("Width grater then null", function() {
                assert.strictEqual(module.canvas.getWidth() > 0, true, 'Negative width');
            });

            it("Width grater then 5px", function() {
                assert.isAbove(module.canvas.getWidth(), 5, 'Width lover then 5px');
            });

            it("Width grater then 1000px", function() {
                assert.isAbove(module.canvas.getWidth(), 1000, 'Width lover then 1000px');
            });

        });

        describe("Context", function() {

            it("Есть контекст", function() {
                assert.isOk(module.canvas.getContext(), 'Empty object');
            });

            it("Checking class", function() {
                assert.instanceOf(module.canvas.getContext(), CanvasRenderingContext2D, 'Not instance of CanvasRenderingContext2D');
            });



        });

    });

    describe("Circle", function() {

        describe("Center of circle", function() {

            it("Presence of a coordinate X", function() {
                assert.property(module.ltlCircle.getCenter(), 'x', 'Missing coordinate X');
            });

            it(`Initial coordinate X = ${module.centerX + 50}px`, function() {
                assert.propertyVal(module.ltlCircle.getCenter(), 'x', module.centerX + 50, 'Not equal to initial value');
            });

        });

        describe("Moving of inner circle", function() {

            it("Moving to a distance x = 20", function() {
                let dX = 20,
                    initial = module.ltlCircle.getCenter().x;

                module.canvas.clear();
                module.bigCircle.draw();
                module.ltlCircle.move(dX);
                module.ltlCircle.draw();

                assert.propertyVal(module.ltlCircle.getCenter(), 'x', initial + dX, 'Wrong moving');
            });


        });

    });

    mocha.run();
})(module);

