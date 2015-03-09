'use strict';

// Put your view code here (e.g., the graph renderering code)

function createModule() {
    // Define our classes
    var AbstractView = function() {
    };

    // Underscore's extend will modify the first object with the properties found in the second
    // object. Used on an object's prototype, you can think of it as providing a means of inheritance.
    _.extend(AbstractView.prototype, {
        _instantiateInterface : function (templateId, attachToElement) {
            var template = document.getElementById(templateId);
            this.hostElement = document.createElement('div');
            this.hostElement.id = template.id + "_view";
            this.hostElement.innerHTML = template.innerHTML;
            attachToElement.appendChild(this.hostElement);
        }
        
    });
    
    var InputView = function(attachToElement, activityStoreModel) {
        this._instantiateInterface('input_template', attachToElement);

        var submit_button = document.getElementById("submit_button");
        submit_button.addEventListener('click', function(){
            var activityName = document.getElementById('activity_options').value;
            var energyLevel = document.getElementById('energy_options').value;
            var stressLevel = document.getElementById('stress_options').value;
            var happinessLevel = document.getElementById('happiness_options').value;
            var time = document.getElementById('time').value;

            if (time !== ''){
                var activityDataPoint = new ActivityData(
                activityName,
                {
                    energyLevel: energyLevel,
                    stressLevel: stressLevel,
                    happinessLevel: happinessLevel
                },
                time
                );
                activityStoreModel.addActivityDataPoint(activityDataPoint);
            }
        });

        activityStoreModel.addListener(function(eventType, eventTime, activityData){
            document.getElementById('date').innerHTML = eventTime;
        });
    };
    _.extend(InputView.prototype, AbstractView.prototype);

    var AnalysisView = function(attachToElement, activityStoreModel, graphModel) {
        this._instantiateInterface('analysis_template', attachToElement);

        document.getElementById('graph_summary_view').style.display = 'none';

        var tableViewButton = document.getElementById("table_view_button");
        tableViewButton.addEventListener('click', function(){
            document.getElementById('graph_summary_view').style.display = 'none';
            document.getElementById('table_summary_view').style.display = 'block';
        });

        var graphViewButton = document.getElementById("graph_view_button");
        graphViewButton.addEventListener('click', function(){
            document.getElementById('table_summary_view').style.display = 'none';
            document.getElementById('graph_summary_view').style.display = 'block';

            
            var healthGraphButton = document.getElementById("health_graph_view_button");
            healthGraphButton.addEventListener('click', function(){
                graphModel.selectGraph('health');
            })
            var timeGraphButton = document.getElementById("time_graph_view_button");
            timeGraphButton.addEventListener('click', function(){
                graphModel.selectGraph('time');
            })


            graphModel.selectGraph('none');
        });

        activityStoreModel.addListener(function(eventType, eventTime, activityData){
            if (eventType == 'ACTIVITY_DATA_ADDED_EVENT'){
                var table = document.getElementById("activity_table");
                var row = table.insertRow();
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                var cell5 = row.insertCell(4);
                cell1.innerHTML = activityData.activityType;
                //var activityDataDict = JSON.parse(activityData.activityDataDict);
                cell2.innerHTML = activityData.activityDurationInMinutes;
                cell3.innerHTML = activityData.activityDataDict["energyLevel"];
                cell4.innerHTML = activityData.activityDataDict["stressLevel"];
                cell5.innerHTML = activityData.activityDataDict["happinessLevel"];
            }
        });


    };
    _.extend(AnalysisView.prototype, AbstractView.prototype);

    var SwitchButtons = function(attachToElement, graphModel) {
        this._instantiateInterface('switch_buttons_template', attachToElement);

        var model = this;
        var inputViewButton = document.getElementById("input_view_button");
        inputViewButton.addEventListener('click', function(){
            document.getElementById('analysis_template_view').style.display = 'none';
            document.getElementById('input_template_view').style.display = 'block';
        })

        var analysisViewButton = document.getElementById("analysis_view_button");
        analysisViewButton.addEventListener('click', function(){

            document.getElementById('input_template_view').style.display = 'none';
            document.getElementById('analysis_template_view').style.display = 'block';

            graphModel.selectGraph('none');
        })
    };
    _.extend(SwitchButtons.prototype, AbstractView.prototype);




    return {
        InputView: InputView,
        AnalysisView: AnalysisView,
        SwitchButtons: SwitchButtons
    };
}
