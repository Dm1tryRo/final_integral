/**
 * Created by Dmitry on 05.06.2016.
 */
var f;
var a, b;
var eps;

function func(x)
{
    return eval(f);
}

function findRoot(fnc, inf, sup, epsilon) //основной метод, его вызываем с формы
{
    f = fnc;
    f = bringStr(f);
    if(func(inf)*func(sup)>0)
        return "uncorrected interval";
    var tmp = 1/epsilon;
    return (Math.round(find(inf, sup, epsilon)/epsilon)/tmp);
}
function find(inf, sup, epsilon) { //то что считает)
    while(Math.abs(sup - inf) > epsilon)
    {
        inf = sup - ((sup - inf) * func(sup)) / (func(sup) - func(inf));
        sup = inf + ((inf - sup) * func(inf)) / (func(inf) - func(sup))
    }

    return sup;
}
