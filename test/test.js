describe("Tests", function() {

  describe("находит приближенное значение корня:", function () {

    function makeTest(y, a, b, exp, x) {

      var tmp = 1/exp;
      var expected = x;
      it("y =" + y + "\nИнтервал: [" + a + "," + b + "]" + "\nОжидаемый результат:" + expected, function () {
        assert.equal(findRoot(y, a, b, exp), expected);
      });
    }
    makeTest("x^2 -1", -1.5, -0.5, 0.01, -1);
    makeTest("sin(x)", -0.5, 0.4, 0.001, 0);
    makeTest("cos(x)", 3, 6, 0.01, 4.73);
    makeTest("x^3 - x^2 + 3", -2, -1, 0.01, -1.17);
  });

  describe("\n\nнаходит приближенное значение интеграла", function () {

    function makeTest(y, a, b, exp, x) {

      var tmp = 1/exp;
      var expected = x;
      it("y =" + y + "\nИнтервал: [" + a + "," + b + "]" + "\nОжидаемый результат:" + expected, function () {
        assert.equal(findDefiniteIntegral(y, a, b, exp), expected);
      });
    }
    makeTest("x^2", 1, 4, 0.01, 21.01);
    makeTest("sin(x)", 1, 4, 0.01, 1.19);
    makeTest("(x+x^2)^2", 0, 3, 0.01, 98.24);
    makeTest("(sin(x^2))^2 + 2*(x+7)", 0, 3, 0.001, 52.307);

  });

  describe("\n\nпарсер строки", function () {

    function makeTest(y, exptd) {

      var expected = exptd;
      it( "Вводимая функция: y = " + y + "\nОжидаемый результат: " + exptd, function () {
        assert.equal(bringStr(y), exptd);
      });
    }
    makeTest("sin(x)", "sin_(x)");
    makeTest("x^2", "Math.pow(x, 2)");
    makeTest("(x^3 + 3*x^2)^4", "Math.pow((Math.pow(x, 3) + 3*Math.pow(x, 2)), 4)");
    makeTest("(x+1)^2", "Math.pow((x+1), 2)");
  });

  describe("\n\nпостроение сплайнов", function () {

    var a = [-2,-1,0,1,2];
    var b = [4,1,0,1,4];

    function makeTest(x, y) {

      it( "Значение х: " + x + "\nОжидаемый результат y: " + y, function () {
        assert.equal(Interpolate(x, a, b), y);
      });
    }
    makeTest(1.5, 2.34);
    makeTest(-1.5, 2.34);
    makeTest(1.9, 3.66);
    makeTest(1.99, 3.97);
  });

});
