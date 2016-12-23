
/**
 * Created by Dmitry on 07.06.2016.
 */

function BuildSpline(x, y)
{
    var splines = new Array();
    for (var j = 0; j < x.length; j++){
        splines[j] = new Array();
        for (var a = 0; a < 5; a++){
            splines[j][a] = null;
        }
    }
    var n = Math.min(x.length, y.length);
    for (var i = 0; i < n; i++) {
        splines[i][4] = x[i];
        splines[i][0] = y[i];
    }
    splines[0][2] = splines[n-1][2] = 0.0;
    var alpha = [n-1];
    var beta = [n-1];
    alpha[0] = beta[0] = 0.0;
    for (i = 1; i < n-1; i++) {
        var hi = x[i] - x[i-1];
        var hi1 = x[i+1] - x[i];
        var A = hi;
        var C = 2.0 * (hi + hi1);
        var B = hi1;
        var F = 6.0 * ((y[i+1] - y[i])/hi1 - (y[i] - y[i-1])/hi);
        var z = ( A * alpha[i-1] + C);
        alpha[i] = -B/z;
        beta[i] = (F - A * beta[i - 1])/z;
    }

    for (i = n - 2; i > 0; --i){
        splines[i][2] = alpha[i] * splines[i+1][2] + beta[i];
    }
    for (i = n-1; i > 0; --i){
        hi = x[i] - x[i-1];
        splines[i][3] = (splines[i][2] - splines[i-1][2]) / hi;
        splines[i][1] = hi * (2.0 * splines[i][2] + splines[i-1][2])/6.0 + (y[i] - y[i-1])/hi;
    }
    return splines;
}

function Interpolate(valueX, x, y) {
    var splines = new Array();
    splines = BuildSpline(x,y);
    if (splines==null) {
        return NaN;
    }
    var n = splines.length;
    var s = [];
    if (valueX <= splines[0][4]) {
        s = splines[0];
    }
    else if (valueX >= splines[n-1][4]) {
        s = splines[n-1];
    }
    else {
        var i = 0;
        var j = n-1;
        while(i + 1 < j){
            var k = ~~(i + (j-i)/2);
            if (valueX <= splines[k][4]){
                j = k;
            }
            else i = k;
        }
        s = splines[j];
    }
    var dx = valueX - s[4];
    var res = +(s[0]) + (s[1] + (s[2]/2.0 + s[3] * dx /6.0) * dx)*dx;
    return res;
}
var x = [-2,-1,0,1,2];
var y = [4,1,0,1,4];
console.log(Interpolate(1.5, x, y));    //проверка, тут захардкодена функция y = x^2, если подставить вместо х 2.5 то получим примерно
                                //нужное число ~5, иными словами -- работает)






