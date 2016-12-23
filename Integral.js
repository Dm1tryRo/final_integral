/**
 * Created by Yura Mustafin on 04.06.2016.
 */
function sin_(x)
{
    return eval("Math.sin(x)");
}
function cos_(x)
{
    return eval("Math.cos(x)");
}
function tan_(x)
{
    return eval("Math.tan(x)");
}
function cotan_(x)
{
    return eval("1/Math.tan(x)");
}
function findSin(str) {
    var subStrIndex = str.search(/sin\(/);
    countBrackets = 1;
    var i = subStrIndex + 4;
    while (countBrackets != 0) {
        if (str.charAt(i) == '(')
            countBrackets++;
        if (str.charAt(i) == ')')
            countBrackets--;
        i++;
    }
    var result = str.substr(subStrIndex, i - subStrIndex);
    return result;
}
function findCos(str) {
    var subStrIndex = str.search(/cos\(/);
    countBrackets = 1;
    var i = subStrIndex + 4;
    while (countBrackets != 0) {
        if (str.charAt(i) == '(')
            countBrackets++;
        if (str.charAt(i) == ')')
            countBrackets--;
        i++;
    }
    var result = str.substr(subStrIndex, i - subStrIndex);
    return result;
}

function findTan(str) {
    var subStrIndex = str.search(/tan\(/);
    countBrackets = 1;
    var i = subStrIndex + 4;
    while (countBrackets != 0) {
        if (str.charAt(i) == '(')
            countBrackets++;
        if (str.charAt(i) == ')')
            countBrackets--;
        i++;
    }
    return str.substr(subStrIndex, i - subStrIndex);
}

function findCotan(str) {
    var subStrIndex = str.search(/cotan\(/);
    countBrackets = 1;
    var i = subStrIndex + 6;
    while (countBrackets != 0) {
        if (str.charAt(i) == '(')
            countBrackets++;
        if (str.charAt(i) == ')')
            countBrackets--;
        i++;
    }
    return str.substr(subStrIndex, i - subStrIndex);
}
function findBrackets(str, pos){
    var countBrackets = 1;
    var i = pos-1;
    while (countBrackets != 0) {
        if (str.charAt(i) == ')')
            countBrackets++;
        if (str.charAt(i) == '(')
            countBrackets--;
        i--;
    }
    var result = str.substring(i+1, pos+1);
    return result;
}
function bringStr(str) {
    // if sin(...)
    var regExp = /sin\([^\)]+\)/;
    while (str.search(regExp) != -1) {
        var res = findSin(str);
        var resWithoutSin = res.substr(res.search(/\(/));
        resWithoutSin = resWithoutSin.substring(1, resWithoutSin.length-1);
        resWithoutSin = bringStr(resWithoutSin);
        str = str.replace(res, "sin_(" + resWithoutSin+")");
    }

    // if cos(...)
    var regExp = /cos\([^\)]+\)/;
    while (str.search(regExp) != -1) {
        var res = findCos(str);
        var resWithoutCos = res.substr(res.search(/\(/));
        resWithoutCos = resWithoutCos.substring(1, resWithoutCos.length-1);
        resWithoutCos = bringStr(resWithoutCos);
        str = str.replace(res, "cos_(" + resWithoutCos+")");
    }

    // if tan(...)
    var regExp = /tan\([^\)]+\)/;
    while (str.search(regExp) != -1) {
        var res = findTan(str);
        var resWithoutTan = res.substr(res.search(/\(/));
        resWithoutTan = resWithoutTan.substring(1, resWithoutTan.length-1);
        resWithoutTan = bringStr(resWithoutTan);
        str = str.replace(res, "tan_(" + resWithoutTan+")");
    }

    // if cotan(...)
    var regExp = /cotan\([^\)]+\)/;
    while (str.search(regExp) != -1) {
        var res = findCotan(str);
        var resWithoutCotan = res.substr(res.search(/\(/));
        resWithoutCotan = resWithoutCotan.substring(1, resWithoutCotan.length-1);
        resWithoutCotan = bringStr(resWithoutCotan);
        str = str.replace(res, "cotan_(" + resWithoutCotan+")");
    }

    // if x^n
    var regExp = /x\^\d+/;
    while (str.search(regExp) != -1) {
        var res = str.match(regExp);
        var int = res[0].match(/\d{1,10}/);
        str = str.replace(regExp, "Math.pow(x, " + int + ")");
    }

    // if x^(...)
    var regExp = /x\^\([^\)]+\)/;
    while (str.search(regExp) != -1) {
        var res = str.match(regExp);
        var int = res[0].match(/\([^\)]+\)/);
        str = str.replace(regExp, "Math.pow(x, " + int + ")");

    }

    //if (...)^(...)
    var regExp = /\([^\)]+\)\^\([^\)]+\)/;
    while (str.search(regExp) != -1) {
        var res = str.match(regExp);
        var int1 = res[0].match(/\([^\)]+\)/);
        res[0] = res[0].replace(/\([^\)]+\)/, "");
        var int2 = res[0].match(/\([^\)]+\)/);
        str = str.replace(regExp, "Math.pow(" + int1[0] + ", " + int2[0] + ")");
    }


    //if (...)^n
    var regExp = /\)\^\d+/;
    while (str.search(regExp) != -1) {
        var res = str.match(regExp);
        var int = res[0].match(/\d+/);
        var intoBrackets = findBrackets(str, str.search(regExp));
        //var intoBracketsGiven = bringStr(intoBrackets);
        str = str.replace(intoBrackets+"^"+int, "Math.pow("+intoBrackets+", "+int+")");
    }
    /*
    var regExp = /\([^\)]+\)\^\d+/;
    while (str.search(regExp) != -1) {
        var res = str.match(regExp);
        var int1 = res[0].match(/\([^\)]+\)/);
        res[0] = res[0].replace(/\([^\)]+\)/, "");
        var int2 = res[0].match(/\d+/);
        str = str.replace(regExp, "Math.pow(" + int1[0] + ", " + int2[0] + ")");
    }*/

    var regExp = /\d{1,10}x/;
    while (str.search(regExp) != -1) {
        var res = str.match(regExp);
        var int = res[0].match(/\d{1,10}/);
        str = str.replace(regExp, int + "*x");
    }

    //add "*" between coefficient & Math
    var regExp = /\d{1,10}Math/;
    while (str.search(regExp) != -1) {
        var res = str.match(regExp);
        var int = res[0].match(/\d{1,10}/);
        str = str.replace(regExp, int + "*Math");

    }

    //add "*" between coefficient & (Math...)
    var regExp = /\d{1,10}\(Math/;
    while (str.search(regExp) != -1) {
        var res = str.match(regExp);
        var int = res[0].match(/\d{1,10}/);
        str = str.replace(regExp, int + "*(Math");
    }
    return str;

}
function findDefiniteIntegral(f, a, b, eps) {
    a = +a;
    b = +b;

    var number_of_trapezoids;
    var countBrackets;

    f = bringStr(f);
    console.log(f);
    
    number_of_trapezoids = 30;

    function func(x) {
        return eval(f);
    }

    function areaOfTrapezoid(a, b) {
        var middle_line = (func(a) + func(b)) / 2;
        return middle_line * (b - a);
    }

    var interval = (b - a) / number_of_trapezoids;
    var currentPoint = a;
    var result = 0;
    for (var i = 0; i < number_of_trapezoids; i++) {
        result += areaOfTrapezoid(currentPoint, currentPoint + interval);
        currentPoint += interval;
    }
    var tmp = 1/eps;
    return (Math.round(result/eps)/tmp);
    
}

console.log(findDefiniteIntegral("(x+1)^(1/2)", 1, 4, 0.001));