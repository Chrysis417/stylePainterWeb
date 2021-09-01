var canvas, ctx, code, point, style, drag = null,
    dPoint;

var easeInOutCubic = [0.65, 0.05, 0.36, 1];

var easingCurve = easeInOutCubic.slice(0);
var easingCurveArray = easeInOutCubic.slice(0);
var easingCurveCode = "cubic-bezier(" + easingCurve[0] + "," + easingCurve[1] + "," + easingCurve[2] + "," + easingCurve[3] + ");";

var transitionFlag = 0;

var duration = 640;
var offset = 0;

var currentDemo = 0;

var demo2Counter = 0;

function playDemo2() {

    console.log('Demo 2');

    var demoImage0 = document.getElementById('demo-2-image-0');
    var demoImage1 = document.getElementById('demo-2-image-1');
    var demoImage2 = document.getElementById('demo-2-image-2');
    var demoImage3 = document.getElementById('demo-2-image-3');

    var demoCaption0 = document.getElementById('demo-2-caption-0');
    var demoCaption1 = document.getElementById('demo-2-caption-1');
    var demoCaption2 = document.getElementById('demo-2-caption-2');
    var demoCaption3 = document.getElementById('demo-2-caption-3');

    var totalImages = 4;

    var start = demo2Counter * 100;
    var distance = (demo2Counter + 1) * 100;

    //console.log('Start'+ start);
    //console.log("Distance: "+distance)

    for (i = 0; i < totalImages; i++) {

        if (i == totalImages - 1) {

            demoImage = eval('demoImage' + i);
            demoCaption = eval('demoCaption' + i);

            Velocity(demoCaption,

                { translateY: ["-" + distance + "%", "-" + start + "%"] }, { duration: duration, delay: i * offset, easing: easingCurve }

            );

            Velocity(demoImage,

                { translateY: ["-" + distance + "%", "-" + start + "%"] }, {
                    duration: duration,
                    delay: i * offset,
                    easing: easingCurve,
                    complete: function(elements, activeCall) {

                        console.log('Last Complete');

                        transitionFlag = 0;

                        if (demo2Counter < 2) {
                            demo2Counter++;
                        } else {
                            console.log('Reset Everything');

                            demoImage0.style.transform = "translateY(0px)";
                            demoImage1.style.transform = "translateY(0px)";
                            demoImage2.style.transform = "translateY(0px)";
                            demoImage3.style.transform = "translateY(0px)";

                            demoCaption0.style.transform = "translateY(0px)";
                            demoCaption1.style.transform = "translateY(0px)";
                            demoCaption2.style.transform = "translateY(0px)";
                            demoCaption3.style.transform = "translateY(0px)";

                            demo2Counter = 0;
                        }

                    }

                });

        } else {

            demoImage = eval('demoImage' + i);
            demoCaption = eval('demoCaption' + i);

            Velocity(demoCaption,

                { translateY: ["-" + distance + "%", "-" + start + "%"] }, { duration: duration, delay: i * offset, easing: easingCurve }

            );

            Velocity(demoImage,

                { translateY: ["-" + distance + "%", "-" + start + "%"] }, { duration: duration, delay: i * offset, easing: easingCurve }

            );

        }

    }

}

window.onload = function() {
    setInterval(
        playDemo2, 1500);
}