mocha.setup('bdd');
let assert = chai.assert;


describe("canvas", function() {

    describe("Ширина элемента", function() {

        it("Возвращает значение типа int", function() {
            assert(Number.isInteger(canvas.getWidth()), "Не int");
        });

        it("Ширина больше нуля", function() {
            // strictEqual исключительно в качестве примера
            assert.strictEqual(canvas.getWidth() > 0, true, 'Ширина меньше нуля');
        });

        it("Ширина больше 5px", function() {
            assert.isAbove(canvas.getWidth(), 5, 'Ширина меньше 5px');
        });

        it("Ширина больше 1000px", function() {
            assert.isAbove(canvas.getWidth(), 1000, 'Ширина меньше 1000px');
        });

    });

    describe("Context", function() {

        it("Есть контекст", function() {
            assert.isOk(canvas.getContext(), 'Пустой объект');
        });

        it("Проверка класса", function() {
            assert.instanceOf(canvas.getContext(), CanvasRenderingContext2D, 'Не является экземпляром CanvasRenderingContext2D');
        });



    });

});

describe("Circle", function() {

    describe("Центр окружности", function() {

        it("Наличие координаты X", function() {
            assert.property(ltlCircle.getCenter(), 'x', 'Отсутствует коордната X');
        });

        it(`Начальная координата X = ${centerX + 50}px`, function() {
            assert.propertyVal(ltlCircle.getCenter(), 'x', centerX + 50, 'Не соответствует начальным условиям');
        });

    });

    describe("Движение внутренней окружности", function() {

        it("Передвижение на расстояние x = 20", function() {
            let dX = 20,
                initial = ltlCircle.getCenter().x;

            canvas.clear();
            bigCircle.draw();
            ltlCircle.move(dX);
            ltlCircle.draw();

            assert.propertyVal(ltlCircle.getCenter(), 'x', initial + dX, 'Неверное перемещение');
        });


    });

});

mocha.run();
