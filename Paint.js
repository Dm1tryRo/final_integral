/**
 * Created by User1 on 07.06.2016.
 */
var centerX = 200;
var centerY = 200;
function draw_axis(scale, centerX, centerY){
    var axis_canvas = document.getElementById("graph");
    var axis_context = axis_canvas.getContext("2d");
    axis_context.beginPath();

    axis_context.moveTo(centerX, 0);
    axis_context.lineTo(centerX, 500);
    axis_context.moveTo(0, centerY);
    axis_context.lineTo(500, centerY);

    axis_context.strokeStyle = "#ff0";
    axis_context.stroke();
    axis_context.closePath();
    axis_context.font = "12px sans-serif";
    axis_context.fillStyle = "#f0f";
    axis_context.fillText("1", centerX+scale, centerY+15);
    axis_context.fillText("1", centerX-10, centerY -scale);
}
function draw_grid(scale, centerX, centerY) {
    var grid_canvas = document.getElementById("graph");
    var grid_context = grid_canvas.getContext("2d");
    grid_context.clearRect(0, 0, 500, 500);
    grid_context.beginPath();
    for (var x = centerX; x <= 500; x += scale) {
        grid_context.moveTo(x, 0);
        grid_context.lineTo(x, 500);
    }
    for (var x = centerX; x >= 0; x -= scale) {
        grid_context.moveTo(x, 0);
        grid_context.lineTo(x, 500);
    }
    for (var y = centerY; y <= 500; y += scale) {
        grid_context.moveTo(0, y);
        grid_context.lineTo(500, y);
    }
    for (var y = centerY; y >= 0; y -= scale) {
        grid_context.moveTo(0, y);
        grid_context.lineTo(500, y);
    }
    grid_context.moveTo(0, 499.5);
    grid_context.lineTo(500, 499.5);
    grid_context.moveTo(499.5, 0);
    grid_context.lineTo(499.5, 500);
    grid_context.strokeStyle = "#eee";
    grid_context.stroke();
    draw_axis(scale, centerX, centerY);
}
function draw_graph(f, a, b, scale, centerX, centerY) {
    var graph_canvas = document.getElementById("graph");
    var graph_context = graph_canvas.getContext("2d");
    graph_context.clearRect(0, 0, 500, 500);
    draw_grid(scale, centerX, centerY);

    graph_context.beginPath();
    for (var i = -centerX; i < 500-centerX; i++) {
        var x = i / scale;
        graph_context.moveTo(i + centerX, -eval(f) * scale + centerY);
        //alert(-eval(f)+250);
        i++;
        x = i / scale;
        graph_context.lineTo(i + centerX, -eval(f) * scale + centerY);
        i--;
    }
    graph_context.strokeStyle = "#f0f";
    graph_context.stroke();
    graph_context.closePath();

    if (a != "" || b != "") {
        for (var i = a*scale; i < b*scale; i++) {
            graph_context.fillStyle = "#A3FF3A";
            var x = i / scale;
            var p1 = i + centerX;
            var p2 = -eval(f) * scale + centerY;
            graph_context.fillRect(p1, p2, 1, eval(f) * scale);

        }
        graph_context.strokeStyle = "#f0f";
        graph_context.stroke();
        graph_context.closePath();
        graph_context.fillStyle = "#f0f";
        graph_context.fillText(a, centerX+a*scale, centerY+15);
        graph_context.fillText(b, centerX+b*scale, centerY+15);
    }
}
function draw_graphFR(f, a, b, scale, centerX, centerY){
    var graph_canvas = document.getElementById("graph");
    var graph_context = graph_canvas.getContext("2d");
    graph_context.clearRect(0, 0, 500, 500);
    draw_grid(scale, centerX, centerY);

    graph_context.beginPath();
    for (var i = -centerX; i < 500 - centerX; i++) {
        var x = i / scale;
        graph_context.moveTo(i + centerX, -eval(f) * scale + centerY);
        //alert(-eval(f)+250);
        i++;
        x = i / scale;
        graph_context.lineTo(i + centerX, -eval(f) * scale + centerY);
        i--;
    }
    graph_context.strokeStyle = "#f0f";
    graph_context.stroke();
    graph_context.closePath();

    if (a != "" || b != "") {
        graph_context.fillStyle = "#A3FF3A";
        x = a;
        graph_context.fillRect(centerX+a*scale, centerY, 1, -eval(f) * scale);
        x = b;
        graph_context.fillRect(centerX+b*scale, centerY, 1, -eval(f) * scale);
        graph_context.fillStyle = "#f0f";
        graph_context.fillText(a, centerX+a*scale, centerY+15);
        graph_context.fillText(b, centerX+b*scale, centerY+15);
    }
}
function draw_graphInterpolate(xArr, yArr, scale, centerX, centerY){
    var graph_canvas = document.getElementById("graph");
    var graph_context = graph_canvas.getContext("2d");
    graph_context.clearRect(0, 0, 500, 500);
    draw_grid(scale, centerX, centerY);
    draw_lines(scale, xArr, yArr, centerX, centerY);

    graph_context.beginPath();
    for (var i = xArr[0]*scale; i < xArr[xArr.length-1]*scale; i++) {
        var x = i / scale;
        graph_context.moveTo(i + centerX, - Interpolate(x, xArr, yArr) * scale + centerY);
        //alert(-eval(f)+250);
        i++;
        x = i / scale;
        graph_context.lineTo(i + centerX, -Interpolate(x, xArr, yArr) * scale + centerY);
        i--;
    }
    graph_context.strokeStyle = "#f0f";
    graph_context.stroke();
    graph_context.closePath();
    graph_context.fillStyle = "#A3FF3A";
    for(var i = 0; i< xArr.length; i++){
        graph_context.fillRect(xArr[i] * scale + centerX - 5, - yArr[i] * scale + centerY - 5, 10, 10);
    }

/*    if (a != "" || b != "") {
        graph_context.fillStyle = "#A3FF3A";
        x = a;
        graph_context.fillRect(250+a*25, 250, 1, -eval(f) * 25);
        x = b;
        graph_context.fillRect(250+b*25, 250, 1, -eval(f) * 25);
        graph_context.fillStyle = "#f0f";
        graph_context.fillText(a, 250+a*25, 250+15);
        graph_context.fillText(b, 250+b*25, 250+15);
    }*/
}
function draw_lines(scale, xArr, yArr, centerX, centerY){
    var graph_lines_canvas = document.getElementById("graph");
    var graph_lines_context = graph_lines_canvas.getContext("2d");
    //graph_lines_context.clearRect(0, 0, 500, 500);
    for(var i = 0; i < xArr.length - 1; i++){
        graph_lines_context.moveTo(xArr[i]* scale + centerX, - yArr[i]* scale + centerY);
        graph_lines_context.lineTo(xArr[i+1]* scale + centerX, - yArr[i+1]* scale + centerY);
    }
    graph_lines_context.strokeStyle = "#A3FF3A";
    graph_lines_context.stroke();
    graph_lines_context.closePath();
}