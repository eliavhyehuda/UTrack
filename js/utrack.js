'use strict';

/*
Put any interaction code here
 */

window.addEventListener('load', function() {
    /*
    // You should wire up all of your event handling code here, as well as any
    // code that initiates calls to manipulate the DOM (as opposed to responding
    // to events)
    console.log("Hello world!");

    // Canvas Demo Code. Can be removed, later
    var canvasButton = document.getElementById('run_canvas_demo_button');
    canvasButton.addEventListener('click', function() {
        runCanvasDemo();
    });
    */
    var classes = createModule();
    var activityStoreModel = new ActivityStoreModel();
    var graphModel = new GraphModel();
    var makeUIButton = document.getElementById('make_ui_button');
    var firstStart = document.getElementById('first_display');
    makeUIButton.addEventListener('click', function(){
        makeUI(classes, activityStoreModel, graphModel);
        firstStart.setAttribute('style', 'display: none');
    });
});


function makeUI(classes, activityStoreModel, graphModel) {
    var appDiv = document.getElementById('index_app');
    var switchButtons = new classes.SwitchButtons(appDiv, graphModel);
    var inputView = new classes.InputView(appDiv, activityStoreModel);
    var analysisView = new classes.AnalysisView(appDiv, activityStoreModel, graphModel);
    document.getElementById('analysis_template_view').style.display = 'none';

    runCanvas(activityStoreModel, graphModel);
}

function runCanvas(activityStoreModel, graphModel) {

    var canvas = document.getElementById('canvas_demo');
    var context = canvas.getContext('2d');

    var width = canvas.width;
    var height = canvas.height;

    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.strokeStyle = "black";
    context.lineWidth = 10;
    context.strokeRect(0, 0, width, height);



    graphModel.addListener(function(eventType, eventTime, eventData){

        if (eventData == "health"){

            context.fillStyle = "white";
            context.fillRect(0, 0, width, height);

            context.strokeStyle = "black";
            context.lineWidth = 10;
            context.strokeRect(0, 0, width, height);




            var dataArray = activityStoreModel.getActivityDataPoints();

            if (dataArray.length == 0){
                context.fillStyle = "black";
                context.font = "50px Helvetica";
                context.fillText('Please Input Data Points', 100, 250);
            }
            else{

                context.fillStyle = "blue";
                context.fillRect(100, 500, 30, 30);

                context.fillStyle = "yellow";
                context.fillRect(300, 500, 30, 30);

                context.fillStyle = "green";
                context.fillRect(500, 500, 30, 30);

                context.fillStyle = "black";
                context.font = "20px Helvetica";

                context.fillText('Energy', 135, 525);
                context.fillText('Stress', 335, 525);
                context.fillText('Happiness', 535, 525);


                context.lineWidth = 5;
                context.moveTo(100, 100);
                context.lineTo(100, 450);
                context.lineTo(815, 450);
                context.stroke();

                context.fillStyle = "black";
                context.font = "20px Helvetica";
                for (var i = 0; i < 10; i++){
                    context.fillText(i+1, 65, 425 - (i * 30));
                    context.moveTo(90, 420 - (i * 30));
                    context.lineTo(110, 420 - (i * 30));
                    context.stroke();
                }

                var xShift = 0;


                for (var i = 0; i < dataArray.length; i++){
                    var activityName = dataArray[i].activityType;
                    var energyLevel = dataArray[i].activityDataDict["energyLevel"];
                    var stressLevel = dataArray[i].activityDataDict["stressLevel"];
                    var happinessLevel = dataArray[i].activityDataDict["happinessLevel"];

                    context.font = "10px Helvetica";

                    context.fillStyle = "black";
                    context.fillText(activityName, 125 + xShift, 475);

                    context.fillStyle = "blue";
                    context.fillRect(135 + xShift, 447 - (energyLevel * 30) , 15, energyLevel * 30);

                    context.fillStyle = "yellow";
                    context.fillRect(150 + xShift, 447 - (stressLevel * 30) , 15, stressLevel * 30);

                    context.fillStyle = "green";
                    context.fillRect(165 + xShift, 447 - (happinessLevel * 30) , 15, happinessLevel * 30);



                    xShift += 105;
                    
                }
            }

            
        }
        else if (eventData == 'time'){
            

            context.fillStyle = "white";
            context.fillRect(0, 0, width, height);

            context.strokeStyle = "black";
            context.lineWidth = 10;
            context.strokeRect(0, 0, width, height);

            var dataArray = activityStoreModel.getActivityDataPoints();
            var xShift = 0;

            context.fillStyle = "black";
            context.font = "50px Helvetica";
            context.fillText('Time Graph Not Built Yet!!', 100, 250);

            //Need to develop time graph!!
        }
        else if (eventData == 'none'){
            context.fillStyle = "white";
            context.fillRect(0, 0, width, height);

            context.strokeStyle = "black";
            context.lineWidth = 10;
            context.strokeRect(0, 0, width, height);


            context.fillStyle = "black";
            context.font = "50px Helvetica";
            context.fillText('Select Data Graph!', 100, 250);
        }


    });
}