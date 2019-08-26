
var color = [];
var fps = 3;
var now;
var then = Date.now();
var interval = 1000 / fps;
var delta;
var real = [];
function newgame() {
    $(".grid-cell").remove();

    var x = Math.floor(Math.random() * 25);
    var have = [];
    for (var i = 0; i < 24; i++) {
        color[i] = [];
        have[i] = 0;
        for (var j = 0; j < 24; j++) {
            color[i][j] = 0;
            $("#grid-container").append('<div class = "grid-cell" id = "grid-cell-' + i + '-' + j + '"></div>');
            var thecell = $('#grid-cell-' + i + '-' + j);
            thecell.css('top', 10 + i * 22);
            thecell.css('left', 10 + j * 22);
        }
    }
    have[x] = 1;
    $('#grid-cell' + 23 + '-' + x).css('background', 'green');
    var cnt = 0;
    while (cnt < 12) {
        x = Math.floor(Math.random() * 25);
        if (!have[x]) {
            cnt++;
            have[x] = 1;
            color[23][x] = 1;
            $('#grid-cell-' + 23 + '-' + x).css('background', 'green');
        }
    }
    var rule = $('#inp').val();
    console.log(rule);
    excute(rule);
}
function excute(rule) {
    real[0] = rule % 2;
    rule = Math.floor(rule / 2);
    real[1] = rule % 2;
    rule = Math.floor(rule / 2);
    real[10] = rule % 2;
    rule = Math.floor(rule / 2);
    real[11] = rule % 2;
    rule = Math.floor(rule / 2);
    real[100] = rule % 2;
    rule = Math.floor(rule / 2);
    real[101] = rule % 2;
    rule = Math.floor(rule / 2);
    real[110] = rule % 2;
    rule = Math.floor(rule / 2);
    real[111] = rule % 2;
    console.log(real[0], real[1], real[10], real[11], real[100], real[101], real[110], real[111]);
    calc();

}
function calc() {

    requestAnimationFrame(calc);
    now = Date.now();
    delta = now - then;

    if (delta > interval) {
        then = now - (delta % interval);
        for (var i = 0; i < 23; i++) {
            for (var j = 0; j < 24; j++) {
                if (color[i + 1][j]) {
                    $('#grid-cell-' + i + '-' + j).css('background', 'green');
                    color[i][j] = 1;
                } else {
                    $('#grid-cell-' + i + '-' + j).css('background', '#ccc0b3');
                    color[i][j] = 0;
                }
            }
        }


        for (var i = 0; i < 24; i++) {
            var tmp = color[22][i] * 10;
            if (i) tmp += color[22][i - 1] * 100;
            if (i < 23) tmp += color[22][i + 1];
            // console.log(i + " " + tmp + " " + real[tmp]);
            if (real[tmp]) {
                $('#grid-cell-' + 23 + '-' + i).css('background', 'green');
                color[23][i] = 1;
            } else {
                $('#grid-cell-' + 23 + '-' + i).css('background', '#ccc0b3');
                color[23][i] = 0;
            }
        }
    }
}

