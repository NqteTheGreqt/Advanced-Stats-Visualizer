d3.csv("AdvancedStats.csv").then(function (data) {
    var stats = data;
    var button = d3.select("#button");
    var form = d3.select("#form");
    button.on("click", runEnter);
    form.on("submit", runEnter);

    function runEnter() {
        d3.select("tbody").html("")
        d3.event.preventDefault();
        var inputValue = d3.select("#user-input").property("value");
        var filteredResult = 
        stats.filter(stats => stats.Player == inputValue);

        if (filteredResult.length === 0) {
            document.getElementById("name").innerHTML = "No such player";
            document.getElementById("position-stat").innerHTML = "";
            document.getElementById("team-stat").innerHTML = "";
            document.getElementById("age-stat").innerHTML = "";
            document.getElementById("cf-stat").innerHTML = "";
            document.getElementById("ff-stat").innerHTML = "";
            document.getElementById("pdo-stat").innerHTML = "";
            document.getElementById("toi-stat").innerHTML = "";
            document.getElementById("e-stat").innerHTML = "";
        }
        else {
            document.getElementById("name").innerHTML = inputValue;
            document.getElementById("position-stat").innerHTML = filteredResult [0] ['Position'];
            document.getElementById("team-stat").innerHTML = filteredResult [0] ['Team'];
            document.getElementById("age-stat").innerHTML = filteredResult [0] ['Age'];
            document.getElementById("cf-stat").innerHTML = percentile(parseInt(filteredResult [0] ['CF%']), 'CF%');
            document.getElementById("ff-stat").innerHTML = percentile(parseInt(filteredResult [0] ['FF%']), 'FF%');
            document.getElementById("pdo-stat").innerHTML = percentile(parseInt(filteredResult [0] ['PDO']), 'PDO');
            document.getElementById("toi-stat").innerHTML = percentileTime(toSeconds(filteredResult [0] ['TOI/60']));
            document.getElementById("e-stat").innerHTML = percentile(parseFloat(filteredResult [0] ['E+/-']), 'E+/-');
        }

        
    };

    function percentile(value, quantity) {
        var belowValue = 0;
        var total = 0;
        for (i = 0; i < 913; i ++) {
            if (parseInt(stats [i] [quantity]) < value) {
                belowValue += 1;
                total += 1;
            }
            else if (parseInt(stats [i] [quantity]) != null) {
                total += 1;
            }
        }
        return Math.round(belowValue / total * 100);
    }

    function percentileTime(value) {
        var belowValue = 0;
        var total = 0;
        for (i = 0; i < 913; i ++) {
            if (toSeconds(stats [i] ['TOI/60']) < value) {
                belowValue += 1;
            }
            total += 1;
        }
        return Math.round(belowValue / total * 100);
    }

    function toSeconds(time) {
        var timeList = time.split(':');
        return parseInt(timeList [0]) * 60 + parseInt(timeList [1]);
    }
});

