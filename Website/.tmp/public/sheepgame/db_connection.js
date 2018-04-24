// *** Not currently included in Game ***
//<script type="text/javascript" src="db_connection.js"></script>

var database = 
{
    // Post data
    save: function(_gameName, _score, _duration, _screenPresses, _wordResults)
    {
        $.post("././server.asp",
        {
          	gameName: _gameName,
          	score: _score,
          	duration: _duration,
          	screenPresses: _screenPresses,
          	wordResults: _wordResults
        },
        function(data,status)
        {
            alert("Return: " + data + "Status: " + status);
        });
    }


    // Get data
    // *** Stuff ***
}