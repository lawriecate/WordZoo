
$(function() {
    if($("#pupilPointsGraph").length) {

        $.get('graphdata',function(graphData) {
            var ctx = document.getElementById("pupilPointsGraph").getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: graphData.labels,
                    datasets: [{
                        label: 'Points Scored',
                        data: graphData.data,
                        backgroundColor: [
                            'rgba(200,200,200, 0.8)',
                            
                        ],
                    }]
                },
                options: {
                    legend: {
                        labels: {
                            // This more specific font property overrides the global property
                            fontColor: 'white'
                        }
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                fontColor: "white",
                                
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                fontColor: "white",
                                
                            }
                        }]
                    }
                }
            });
        });

        
    }
});