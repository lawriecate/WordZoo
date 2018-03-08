
$(function() {
    if($("#dashGraph").length) {

        $.get('/admin/getDashData',function(graphData) {
            var ctx = document.getElementById("dashGraph").getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: graphData.labels,
                    datasets: [{
                        label: '# of Games Played',
                        data: graphData.graphData,
                        backgroundColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235,1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255,1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(240,230,140,1)'
                        ],
                    }]
                },
                options: {
                    legend: {
                        labels: {
                            // This more specific font property overrides the global property
                            fontColor: 'white'
                        }
                    }
                }
            });
        });

        
    }
});