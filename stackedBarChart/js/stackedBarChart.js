function stackedBarChart(barOptions) {
    if (barOptions.container) {
        $(barOptions.container).empty();
    }
    //--------------------------Initialize Values-----------------------------
    if (barOptions) {
        this.container = barOptions.container ? barOptions.container : "body"
        this.barColor = barOptions.barColor ? barOptions.barColor : "blue"
        this.readFromFile = (barOptions.readFromFile !== undefined) ? barOptions.readFromFile : false
        this.dataFileLocation = (barOptions.readFromFile !== undefined || barOptions.readFromFile) ? barOptions.dataFileLocation : undefined;
        this.data = (barOptions.data) ? barOptions.data : []
        this.showTicks = barOptions.showTicks ? barOptions.showTicks : true;
        this.ticks = barOptions.ticks ? barOptions.ticks : 'all';
        this.showLegends = (barOptions.showLegends !== undefined) ? barOptions.showLegends : false;
        this.xLabelRotation = barOptions.xLabelRotation ? barOptions.xLabelRotation : 0;
        this.yLabelRotation = barOptions.yLabelRotation ? barOptions.yLabelRotation : 0;
        this.margin = barOptions.margin ? {
            top: barOptions.margin.top ? barOptions.margin.top : 20,
            right: barOptions.margin.right ? barOptions.margin.right : 20,
            bottom: barOptions.margin.bottom ? barOptions.margin.bottom : 30,
            left: barOptions.margin.left ? barOptions.margin.left : 40
        } : {top: 20, right: 20, bottom: 50, left: 50};
        this.height = barOptions.height ? barOptions.height : 600;
        this.width = barOptions.width ? barOptions.width : $(this.container).width() - 50;
        this.showAxisX = (barOptions.showAxisX !== undefined) ? barOptions.showAxisX : true;
        this.showAxisY = (barOptions.showAxisY !== undefined) ? barOptions.showAxisY : true;
        this.showXaxisTicks = barOptions.showXaxisTicks !== undefined ? barOptions.showXaxisTicks : true;
        this.showYaxisTicks = barOptions.showYaxisTicks !== undefined ? barOptions.showYaxisTicks : true;
        this.randomIdString = Math.floor(Math.random() * 10000000000);
        this.header = barOptions.header ? barOptions.header : "STACKED BAR"

        this.headerOptions = barOptions.headerOptions == false ? barOptions.headerOptions : true;


    } else {
        console.error('Bar Chart Initialization Error : Bar Chart Params Not Defined');
        return false;
    }

    var randomSubstring = this.randomIdString;
    var data = this.data;
    var actualOptions = jQuery.extend(true, {}, barOptions);
    var header = this.header;
    var containerid = this.container;
    var randomSubstring = this.randomIdString;
    var l = this.height
    var h = parseInt(l) + 80;

    var _this = this;
    var modalwidth = $(window).width() - 200;
    var modal = ' <div id="modal_' + randomSubstring + '"class="modal fade " tabindex="-1" role="dialog"> <div class="modal-dialog modal-lg" style="width:' + modalwidth + 'px"> <form ><div class="modal-content"><div class="modal-body"  style="padding:0;background-color:#334d59" id="modal_chart_container' + randomSubstring + '"></div></div></form></div></div>';

    var chartContainerdiv = '<div class="chartContainer"  align="center" style="width: 100%; margin: auto; margin-top: 0px; margin-bottom: 0px; font-size: 14px;font-style: inherit;"> <div class="graphBox" style="height:' + h + 'px;max-height: ' + h + 'px;min-height: ' + h + 'px;margin: auto; background-color: black; width: 100%;left: 0px;top: 0px;overflow: hidden;position: relative;"> <div class="headerDiv" style="font-weight:bold;background-color: #425661;text-align: left;color: #239185; border-bottom: 1px solid rgba(192, 192, 192, 0.47);width: 100%; line-height: 2.5;font-size: 16px ;padding-left: 5px;">' + header + '</div><div id="stacked_bar__chart_div' + randomSubstring + '" class="chartContentDiv" style="width: 100%;"></div> </div></div>'
    $(this.container).html(chartContainerdiv);
    $(this.container).append(modal);
    var chart_container;
    var chart_container = "#stacked_bar__chart_div" + randomSubstring;
    this.width = barOptions.width ? barOptions.width : $(chart_container).width() - 10;

  
    if (!this.headerOptions) {
        var closebtn = '<button type="button" class="cancel" style="float: right;padding:0 8px;border:0;opacity: 1;background-color: transparent;float:right" data-dismiss="modal" aria-label="Close"> <span class="fa fa-remove"></span></button>'
        $(chart_container).siblings(".headerDiv").append(closebtn);
    }

    if ($(chart_container).siblings(".headerDiv").find(".bstheme_menu_button").length == 0)
        var header_options = '<div style="float: right; padding: 0 10px; cursor: pointer;" class="bstheme_menu_button bstheme_menu_button_' + randomSubstring + '" data-toggle="collapse" data-target="#opt_' + randomSubstring + '"><i class="fa fa-ellipsis-v" aria-hidden="true"></i><div class="bstheme_options" style="position:absolute;right:10px;z-index:2000"> <div style="display:none; min-width: 120px; margin-top: 2px; background: rgb(27, 39, 53) none repeat scroll 0% 0%; border: 1px solid rgb(51, 51, 51); border-radius: 4px;" id="opt_' + randomSubstring + '" class="collapse"><span style="display: inline-block;float: left;text-align: center;width: 33.33%; border-right: 1px solid #000;" class="header_fullscreen_chart' + randomSubstring + '"><i class="fa fa-expand" aria-hidden="true"></i></span><span style="display: inline-block;float: left;text-align: center;width: 33.33%; border-right: 1px solid #000;" class="header_refresh_' + randomSubstring + '"><i class="fa fa-refresh" aria-hidden="true"></i></span> <span style="display: inline-block;float: left;text-align: center;width: 33.33%;" class="header_table_' + randomSubstring + '"> <i class="fa fa-table" aria-hidden="true"></i></span> <span style="display: none;float: left;text-align: center;width: 33.33%;" class="header_chart_' + randomSubstring + '" ><i class="fa fa-bar-chart" aria-hidden="true"></i></span></div></div> </div>';
    $(chart_container).siblings(".headerDiv").append(header_options);

    if (!this.headerOptions) {
        $(chart_container).siblings(".headerDiv").find(".bstheme_options").css("right", "28px");
        $('.header_fullscreen_chart' + randomSubstring).css("display", "none");
    } else {
        $(chart_container).siblings(".headerDiv").find(".bstheme_options").css("right", "0");
    }

    var margin = this.margin,
            width = this.width - margin.left - margin.right,
            height = this.height - margin.top - margin.bottom,
            barColor = this.barColor;
// //APPEND legend header
    $(chart_container).append("<div id='legendContainer-" + (randomSubstring) + "'></div>")
    //define svg
    var colorScale = d3.scaleOrdinal(d3.schemeCategory20);
    var svg = d3.select(chart_container)
            .append("svg")
            .attr('height', this.height)
            .attr('width', this.width)
            .attr('id', 'mainSvg-' + randomSubstring);
    var labelsArray = [];
    $.each(this.data, function (i, d) {
        labelsArray.push(d.y);
    })
    margin.left = GetMarginLeft(labelsArray);
    var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .attr('id', 'mainGroup-' + randomSubstring);





    //define tool tip
    $(".stacked_bar_tooltip").remove();
    var tool_tip = $('body').append('<div class="stacked_bar_tooltip" style="position: absolute; opacity: 1; pointer-events: none; visibility: hidden;"><span style=" font-size: 12px; position: absolute; white-space: nowrap;  margin-left: 0px; margin-top: 0px; left: 8px; top: 8px;"><span style="font-size:10px" class="tool_tip_x_val"></span><table><tbody><tr><td style="padding:0"> </td><td style="padding:0"><b>216.4 mm</b></td></tr><tr><td style="color:#434348;padding:0">New York: </td><td style="padding:0"><b>91.2 mm</b></td></tr><tr><td style="color:#90ed7d;padding:0">London: </td><td style="padding:0"><b>52.4 mm</b></td></tr><tr><td style="color:#f7a35c;padding:0">Berlin: </td><td style="padding:0"><b>47.6 mm</b></td></tr></tbody></table></span></div>');

    //define  scales
    var x = d3.scaleLinear().rangeRound([0, width]),
            y = d3.scaleBand().rangeRound([height, 0]).paddingInner(0.7)



// get bar data and check for existance
    var barData = this.data;
    if (barData) {
        if (barData.length)
            drawBars(barData, this.barColor);
    } else {
        console.error("Data Handling Error : No data To plot the graph");
    }

    //--------------------------------------------------------------------------
    /**
     * 
     * @param {array} data
     * @returns {undefined}Function to plot bars
     */
    function drawBars(data) {
//        define clip
        var clip = g.append("defs").append("svg:clipPath")
                .attr("id", "clip")
                .append("svg:rect")
                .attr("id", "clip-rect")
                .attr("x", "0")
                .attr("y", "0")
                .attr("width", width)
                .attr("height", height)
//        
//        .transition().duration(750).ease(d3.easeLinear)
//                .attr("x", function (d) {
//                    return x(d.stackKey);
//                });
        //get keys from object
        var stackKey = d3.keys(data[0]).slice(1);
//defines domains
        // x0.domain([0, d3.max(data, function (d) {
        //         return d3.max(keys, function (key) {
        //             return d[key]
        // });


        var stack = d3.stack()
                .keys(stackKey)
                /*.order(d3.stackOrder)*/
                .offset(d3.stackOffsetNone);

        var layers = stack(data);
        data.sort(function (a, b) {
            return b.total - a.total;
        });
        y.domain(data.map(function (d) {
            return d.y;
        }));

        x.domain([0, d3.max(layers[layers.length - 1], function (d) {

                return d[0] > d[1] ? d[0] : d[1];
            })]).nice();

        var x_g = g.append("g")
                .attr("class", "axis axis--x axis-stack-bar-x")
                .attr("transform", "translate(0," + height + ")")
                .attr('id', 'xAxis-' + randomSubstring)
                .call(d3.axisBottom(x))

        x_g.selectAll("path").style("stroke", "#6c7e88")
                .style("shape-rendering", "crispEdges")
                .style("fill", "none");
        x_g.selectAll("line").style("stroke", "#6c7e88")
                .style("shape-rendering", "crispEdges")
                .style("fill", "none");
        x_g.selectAll("text").style("fill", "#6c7e88")
                .style("font-size", "10px")
                .style("stroke", "none");


        var y_g = g.append("g")
                .attr("class", "axis axis--y axis-stack-bar-y")
                .attr('id', 'yAxis-' + randomSubstring)
                .call(d3.axisLeft(y).ticks(8, "s"))
        y_g.selectAll("text").style("fill", "#6c7e88")
                .style("font-size", "10px")
                .style("stroke", "none");
        y_g.selectAll("path").style("stroke", "#6c7e88")
                .style("shape-rendering", "crispEdges")
                .style("fill", "none");
        y_g.selectAll("line").style("stroke", "#6c7e88")
                .style("shape-rendering", "crispEdges")
                .style("fill", "none");
//                .append("text")
//                .attr("transform", "rotate(-90)")
//                .attr("y", -margin.left)
//                .attr("dy", "1.1em")
//                .attr("dx", -height / 3)
//                .style("text-anchor", "end")
//                .style("fill", "white")
//                .text("Country").style("font-size", "14px");
// // gridlines in x axis function
        function make_x_gridlines() {
            return d3.axisBottom(x)

        }
        // add the X gridlines
        var x_g = g.append("g")
                .attr("class", "grid")
                .attr("transform", "translate(0," + height + ")")
                .call(make_x_gridlines()
                        .tickSize(-height)
                        .tickFormat("")
                        )
        x_g.selectAll("path").style("stroke", "#6c7e88")
                .style("shape-rendering", "crispEdges")
                .style("fill", "none");
        x_g.selectAll("line").style("stroke", "#6c7e88")
                .style("shape-rendering", "crispEdges")
                .style("fill", "none");
        x_g.selectAll("text").style("fill", "#6c7e88")
                .style("font-size", "10px")
                .style("stroke", "none");
        var layer = g.append('g').attr("class", "layerg").selectAll(".layer")
                .data(layers)
                .enter().append("g")
                .attr("class", function (d) {
                    return "layer layer_" + randomSubstring + "_" + d.key;
                })
                .style("fill", function (d, i) {

                    return colorScale(i);
                });
        layer.selectAll("rect")
                .data(function (d) {
                    return d;
                })
                .enter().append("rect")
                .on("mouseover", function (d) {

                    var d = d.data;
                    $(".stacked_bar_tooltip").empty();
                    var keys = d3.keys(d).slice(1);

                    var text = '<span>' +capitalizeFirstLetter(d.y) + '</span><table>';
                    for (var i in keys) {
                        text += '<tr><td style="color:#000;">' + (keys[i].charAt(0).toUpperCase() + keys[i].substr(1)) + '</td><td>' + d[keys[i]] + '</td></tr>';
                    }
                    text += '</table>';
                    // var text = '<table><tr><td></td><td></td></tr></table>'
                    $(".stacked_bar_tooltip").html(text);
                    return $(".stacked_bar_tooltip").css("visibility", "visible");

                })
                .on("mousemove", function () {
                    $(".stacked_bar_tooltip").css("top", (d3.event.pageY - 10) + "px")
                    return  $(".stacked_bar_tooltip").css("left", (d3.event.pageX + 10) + "px");

                })
                .on("mouseout", function () {
                    //hide tool-tip
                    $(this).find(".background_rect").css("fill", "transparent");
                    return $(".stacked_bar_tooltip").css("visibility", "hidden");
                })

                .attr("y", function (d) {
                    return y((d.data.y));
                })
                .attr("x", function (d) {
                    return x(d[0]);
                })
//                        .attr("rx",y.bandwidth()/8)
//                        .attr("ry",y.bandwidth()/8)
                .attr("height", y.bandwidth())
                .attr("width", function (d) {
                    return x(d[1]) - x(d[0])
                })










        //call function to ender legends
        renderLegend(stackKey, randomSubstring);
    }

//     //------------------------------------------------------------------------
    function renderLegend(labelObject) {
        var numberOfLegends = labelObject.length;
//create legends div
        var legenddiv = d3.select('#legendContainer-' + randomSubstring)
                .attr('class', 'legend-container')
                .style('margin-top', '10px')
                .style("float", "left");


//holder for each legend
        var legendHolder = legenddiv.selectAll('.legend-holder')
                .data(labelObject)
                .enter()
                .append('div')
                .attr('class', function (d) {
                    return 'legend-holder legend_holder_div_' + randomSubstring + '_' + d;
                })
                .style('display', 'inline-block')
                .style('width', '100px')
                .on("click", function () {
                    var current_div_class = $(this).attr("class");

                    var layerClass = "layer_" + current_div_class.split(" ")[1].split("legend_holder_div_")[1];

                    // Get  current div opacity
                    var current_opacity = ($(this).css("opacity"));

                    newOpacity = current_opacity == 1 ? 0.5 : 1;
                    $(this).css("opacity", newOpacity);
                    $("." + layerClass).css("opacity", newOpacity);

                });
//append legend circles
        legendHolder
                .append('div')
                .style('background-color', function (d, i) {
                    return colorScale(i)

                }).attr("class", "bar_legend_circles")
                .style("height", "10px")
                .style("border-radius", "6px")
                .style("width", "10px")
                .style("display", "inline-block");

//append legend text
        legendHolder.append("p").text(function (d, i) {
            return d.charAt(0).toUpperCase() + d.substr(1);
        }).style('color', function (d, i) {
            return colorScale(i)

        }).style('display', 'inline-block').style('margin-left', '5px');

    }
    //--------------------------------------------------------------------------------------------
    /**
     *Function to get mergin left based on string size
     */



    function GetMarginLeft(data) {
        var longestString = '';
        var strlen = 0;
        $.each(data, function (i, d) {
            if (d.length > strlen) {
                strlen = d.length;
                longestString = d;
            }

        })
        var hidden = $('<span id="hidden" style="display:none;"></span>');
        $('body').append(hidden);
        hidden.text(longestString);
        var width1 = hidden.width();
        $("#hidden").remove();
        return width1;
    }










    //------------------------------------------------------------------------------
    /**
     * Fuction to handle show hide of header options
     */
    $("body").on("click", ".bstheme_menu_button_" + randomSubstring, function () {
       
        var id = ($(this).attr("data-target"));
        if ($(id).css("display") == "none") {
            $(id).css("display", "inline-block");
        } else {
            $(id).css("display", "none");
        }
    });
//------------------------------------------------------------------------------
    /**
     * Fuction to handle show hide of header options
     */
    $("body").on("click", ".header_refresh_" + randomSubstring, function () {
        var chartId = $(this).parent().parent().parent().parent().siblings("div").attr("id");
        if ("#" + chartId == chart_container) {
            $(containerid).empty();
            loadStackedbarData(actualOptions);
        }
    });
//------------------------------------------------------------------------------
    /**
     * Fuction to handle show hide of header options
     */
    $("body").on("click", ".header_table_" + randomSubstring, function () {
        var a = parseInt(h / 55);
        $(chart_container).empty();
        $(chart_container).css("overflow", "auto");
        $(this).css("display", "none");
        $(".header_chart_" + randomSubstring).css("display", "inline-block");
        var tbl = "<div id ='stacked_bar_table_" + randomSubstring + "'  style='padding:5px;background-color: black ;height:" + (_this.height) + "px'><table id ='stacked_bar_table1_" + randomSubstring + "' class='table-striped ' style='width:100%;background-color:#283C45;padding:5px;color:#5A676E;' ><thead>";

       
        var keys = d3.keys(data[0]);
        $.each(keys, function (j, d) { 
            d = (d == "y" ? "Country" : d);
            tbl = tbl + "<th>" + d.charAt(0).toUpperCase() + d.substr(1);
            +"</th>";
        });
        tbl = tbl + "</tr></thead><tbody>"
        $.each(data, function (i, v) {
            tbl = tbl + "<tr>"
            $.each(keys, function (i1, v1) {
                tbl = tbl + "<td>" + v[v1] + "</td>"

            });
            tbl = tbl + "</tr>"
        })
        tbl = tbl + "</thead></table></div>";

        $(chart_container).append(tbl);
        $("#stacked_bar_table1_" + randomSubstring).DataTable({"bLengthChange": false, "paging": false, "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                if (iDisplayIndex % 2 == 1) {
                    //even color
                    $('td', nRow).css('background-color', '#32464F');
                } else {
                    $('td', nRow).css('background-color', '#283C45');
                }
            }});

        $("#stacked_bar_table_" + randomSubstring).mCustomScrollbar({
            axis: "y"
        });

        $("#stacked_bar_table_" + randomSubstring + " tr:even").css("background-color", "#32464F");
        $("#stacked_bar_table_" + randomSubstring + " tr:odd").css("background-color", "#283C45");
        $("#stacked_bar_table_" + randomSubstring + " tr:first").css("background-color", "#0CB29A");

        var id1 = $("#stacked_bar_table_" + randomSubstring).children('div').find('div').eq(0);
        var id2 = $("#stacked_bar_table_" + randomSubstring).children('div').find('div').eq(1);
        var id3 = $("#stacked_bar_table_" + randomSubstring).children('div').find('div').eq(2);
        var id1attr = id1.attr("id");
        var id2attr = id2.attr("id");
        var id3attr = id3.attr("id");



        $("#" + id1attr + " " + "label").css("color", "#666666")
        $("#" + id2attr + " " + "label").css("color", "#666666")
        $("#" + id3attr).css("color", "#666666")

        $(" .dataTables_filter input").css({"margin-left": "0.5em", "position": "relative", "border": "0", "min-width": "240px",
            "background": "transparent",
            "border-bottom": "1px solid #666666",
            " border-radius": " 0",
            "padding": " 5px 25px",
            "color": "#ccc",
            "height": " 30px",
            "-webkit-box-shadow": " none",
            "box-shadow": " none"
        })
        $(".dataTables_wrapper").css("background-color", "#374C59");



    });






//------------------------------------------------------------------------------
    /**
     * Fuction to handle show hide of header options
     */
    $("body").on("click", ".header_chart_" + randomSubstring, function () {
        $(chart_container).css("overflow", "hidden");
        var chartId = $(this).parent().parent().parent().parent().siblings("div").attr("id");
        if ("#" + chartId == chart_container) {
            $(this).css("display", "none");
            $(".header_table_" + randomSubstring).css("display", "inline-block");
            $(containerid).empty();
            new loadStackedbarData(actualOptions);
        }
    });


//------------------------------------------------------------------------------------------------

    $("body").on("click", ".header_fullscreen_chart" + randomSubstring, function () {
//       $("#modal_"+randomSubstring).modal("show");
        $("#modal_" + randomSubstring).modal('show');
        var options = jQuery.extend(true, {}, actualOptions);
        setTimeout(function () {
            $("#modal_chart_container" + randomSubstring).css("width", "100%")
            options.container = "#modal_chart_container" + randomSubstring;
            options.headerOptions = false;
            options.height = 450;
            new loadStackedbarData(options);
        }, 500)

        //"modal_chart_container"+randomSubstring
    })
     function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + (string.slice(1)).toLowerCase();
    }

}

