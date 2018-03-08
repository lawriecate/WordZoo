
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
                        data: graphData.data,
                        
                    }]
                },
                options: {
                    
                }
            });
        });

        
    }
});