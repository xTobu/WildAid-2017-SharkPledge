// Create context
var canvas = document.querySelector('canvas');
var ctx = document.querySelector('canvas').getContext('2d');
canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
canvas.height = 180;

// Set waves opacities
var wavesOpacities = [0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1];

// Set parameters
var params = {
    AMPLITUDE_WAVES: 60, // canvas.height,
    AMPLITUDE_MIDDLE: 60, //canvas.height / 3,
    AMPLITUDE_SIDES: 60, //canvas.height / 2,
    OFFSET_SPEED: 120,
    SPEED: 1.4,
    OFFSET_WAVES: 35,
    NUMBER_WAVES: 3,
    COLOR: '#8fcde1',
    NUMBER_CURVES: 3,
    OFFSET_CURVE: false,
    RESET: false
};
var speedInc = 0;

// Set gradient colors

// Convert Hex to RGB for gradient
var hexToRgb = function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

var rgb = hexToRgb(params.COLOR);
if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
    var gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
} else {
    var gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', 0)');
    gradient.addColorStop(1, 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', 1)');
}



// Render

var render = function render() {
    canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    canvas.height = 180;

    // For each wave
    for (var j = params.NUMBER_WAVES - 1; j >= 0; j--) {
        // offset between waves
        var offset = speedInc + j * Math.PI * params.OFFSET_WAVES;

        // Color and increase gradually opacity
        if (j === 0) {
            ctx.fillStyle = gradient;
        } else {
            ctx.fillStyle = params.COLOR;
        }
        ctx.globalAlpha = wavesOpacities[j];

        // Oscillations
        // Define heights cubicBezier amplitudes

        // Speed amplitude variation between 0 and AMPLITUDE_SIDES ( half height window)
        // Set height amplitude of borders points (left and right of the window) -> no offset here
        var leftRange = (Math.sin(offset / params.OFFSET_SPEED + 2) + 1) / 2 * params.AMPLITUDE_SIDES + (canvas.height - params.AMPLITUDE_SIDES) / 2;
        var rightRange = (Math.sin(offset / params.OFFSET_SPEED + 2) + 1) / 2 * params.AMPLITUDE_SIDES + (canvas.height - params.AMPLITUDE_SIDES) / 2;

        // Speed amplitude variation between 0 and AMPLITUDE_WAVES ( height window)
        // Set height amplitude of the first and second points of a curve
        var leftCurveRange = (Math.sin(offset / params.OFFSET_SPEED + 2) + 1) / 2 * params.AMPLITUDE_WAVES + (canvas.height - params.AMPLITUDE_WAVES) / 2;
        var rightCurveRange = (Math.sin(offset / params.OFFSET_SPEED + 1) + 1) / 2 * params.AMPLITUDE_WAVES + (canvas.height - params.AMPLITUDE_WAVES) / 2;

        // Speed amplitude variation between 0 and AMPLITUDE_MIDDLE
        // Set height amplitude of the last point of a curve
        var endCurveRange = (Math.sin(offset / params.OFFSET_SPEED + 2) + 1) / 2 * params.AMPLITUDE_MIDDLE + (canvas.height - params.AMPLITUDE_MIDDLE) / 2;

        // Reverse amplitude of the first and second points of a curve (only needed with 3 curves or more)
        var reverseLeftCurveRange = endCurveRange - rightCurveRange + endCurveRange;
        var reverseRightCurveRange = endCurveRange - leftCurveRange + endCurveRange;

        // Neutralise curves first and second point amplitude
        if (params.OFFSET_CURVE === false) {

            leftCurveRange = rightCurveRange;
            reverseRightCurveRange = reverseLeftCurveRange;
        }

        // Draw and fill path
        ctx.beginPath();

        // Draw first point from Left
        ctx.moveTo(0, leftRange);

        // Draw bezier curves based on amplitude

        // Draw each points of the first curve
        // bezierCurveTo() see https://www.w3schools.com/TAGs/canvas_beziercurveto.asp
        ctx.bezierCurveTo(canvas.width / (params.NUMBER_CURVES * 3), leftCurveRange, canvas.width / (params.NUMBER_CURVES * 3 / 2), rightCurveRange, canvas.width / params.NUMBER_CURVES, endCurveRange);

        // Draw each points of other curves if needed
        for (var i = 1; i < params.NUMBER_CURVES; i++) {

            // Reverse waves amplitude 1 / 2 times
            var finalRightCurveRange = i % 2 !== 0 ? rightCurveRange : reverseRightCurveRange;
            var finalLeftCurveRange = i % 2 !== 0 ? leftCurveRange : reverseLeftCurveRange;

            // Set points curve
            var secondPtX = canvas.width * (i / params.NUMBER_CURVES) + canvas.width / (params.NUMBER_CURVES * 3);
            var secondPtY = endCurveRange - finalRightCurveRange + endCurveRange;
            var thirdPtX = canvas.width * (i / params.NUMBER_CURVES) + canvas.width * (2 / (params.NUMBER_CURVES * 3));
            var thirdPtY = endCurveRange - finalLeftCurveRange + endCurveRange;
            var lastPtX = canvas.width * ((i + 1) / params.NUMBER_CURVES);
            var lastPtY = i === params.NUMBER_CURVES - 1 ? rightRange : endCurveRange;

            ctx.bezierCurveTo(secondPtX, secondPtY, thirdPtX, thirdPtY, lastPtX, lastPtY);
        }

        // Draw last lines

        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.lineTo(0, rightRange);

        ctx.closePath();
        ctx.fill();
    }

    // Speed
    speedInc += params.SPEED;
};

// RAF

TweenMax.ticker.addEventListener('tick', render);

//手機時  波浪變小
if (device.mobile()) {
    params.AMPLITUDE_WAVES = 30
    params.AMPLITUDE_MIDDLE = 30
    params.AMPLITUDE_SIDES = 30

}

// GUI

//var gui = new dat.GUI();
//gui.add(params, 'AMPLITUDE_WAVES', 0, canvas.height);
//gui.add(params, 'AMPLITUDE_MIDDLE', 0, canvas.height * 0.6);
//gui.add(params, 'AMPLITUDE_SIDES', 0, canvas.height * 0.5);
//var changeColor = gui.addColor(params, 'COLOR');
//gui.add(params, 'NUMBER_WAVES', 0, 8).step(1);
//gui.add(params, 'NUMBER_CURVES', 1, 8).step(1);
//gui.add(params, 'SPEED', 0, 10);
//gui.add(params, 'OFFSET_WAVES', 0, 155);
//gui.add(params, 'OFFSET_CURVE');
//var reset = gui.add(params, 'RESET');

//changeColor.onChange(function(colorValue) {
//
//    rgb = hexToRgb(colorValue);
//    gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
//    gradient.addColorStop(0, 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', 0)');
//    gradient.addColorStop(1, 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', 1)');
//});

//reset.onChange(function(resetValue) {
//
//    params.AMPLITUDE_WAVES = canvas.height;
//    params.AMPLITUDE_MIDDLE = canvas.height / 3;
//    params.AMPLITUDE_SIDES = canvas.height / 2;
//    params.OFFSET_SPEED = 120;
//    params.SPEED = 3;
//    params.OFFSET_WAVES = 35;
//    params.NUMBER_WAVES = 3;
//    params.COLOR = '#032bac';
//    params.NUMBER_CURVES = 2;
//    params.OFFSET_CURVE = true;
//    params.RESET = false;
//
//    rgb = hexToRgb(params.COLOR);
//    gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
//    gradient.addColorStop(0, 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', 0)');
//    gradient.addColorStop(1, 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', 1)');
//});
