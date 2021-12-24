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

        for (var i = 0; i < filteredResult.length; i ++) {
            d3.select("tbody").insert("tr").html(
                "<td>" + filteredResult [i] ['Player'] + "</td>" +
                "<td>" + filteredResult [i] ['Age'] + "</td>" +
                "<td>" + filteredResult [i] ['Team'] + "</td>"+
                "<td>" + filteredResult [i] ['Position'] + "</td>")
        }
    };
});