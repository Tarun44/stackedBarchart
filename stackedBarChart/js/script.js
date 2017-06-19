$(document).ready(function () {
//    load data

    var data = sessionStorage.getItem('f10');

    function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
var widthfrmUrl = getParameterByName("width");
var heightfrmUrl = parseInt(getParameterByName("height"));
if(heightfrmUrl){
height = heightfrmUrl- 80;
}
    // http://localhost/BlackSwanChartLib_new/BlackSwan/BlackSwanChartLib/assets/sank/index.html?width=200&height=400

    var height = data;


    var barData = [];
    var options = {
        header: "STACKED BAR",
        uri: "data/data.json", //"proxy/api/cases/6eb696d9ccbd41b98c8f7eb12e2b9242/graph/1000";
        //"proxy/api/cases/6eb696d9ccbd41b98c8f7eb12e2b9242/risk"; 
        container: "#example13",
        height: height

    }
    loadStackedbarData(options);

});


function loadStackedbarData(options) {

    //responsivenss
    $(window).on("resize", function () {

        if ($(options.container).find("svg").length != 0) {
            $(options.container).empty();
            new loadStackedbarData(options);
        }
    });
    var barData = [];
    d3.json(options.uri, function (error, data) {

        barData = handleColumnData(data, "model", "", "bar");
        options.data = barData;
        var exampleChart = new stackedBarChart(options);
    });
    //--------------------------------------------------------------------------------------------------------------
    /**
     *Function to handle data
     */
    function handleColumnData(data, x, y, type) {
        var str = JSON.stringify(data);
        str = str.replace(/country/g, 'y');
        object = JSON.parse(str);

        return object;
    }

}

