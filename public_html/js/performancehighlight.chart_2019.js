/* =========================== 
 概要：業績ハイライト用チャートの作成
 ：
 ：利用plugin  chart.js チャート作成
 ：http://www.chartjs.org/
 ：
 ：利用plugin  jquery.inview 表示領域でイベント作成
 ：https://github.com/protonet/jquery.inview
 ：
 =========================== */
$(document).ready(function () {

    var years = ["27年度", "28年度", "29年度", "30年度"];

    /* チャート描画用 汎用 オプション */
    var option_general = {
        responsive: true,
        scales: {
            yAxes: [{
                    id: "y-axis-1", // Y軸のID
                    type: "linear", // linear固定 
                    position: "left", // どちら側に表示される軸か？
                    ticks: {
                        max: 20000,
                        min: 0,
                        stepSize: 5000,
                        fontSize: 14,
                        callback: function (label, index, labels) {
                            return label.toLocaleString();
                        }
                    }
                }],
            xAxes: [{
                    id: "x-axis-1", // X軸のID
                    ticks: {
                        fontSize: 14
                    }
                }]
        }
    };

    /* 営業利益チャート */

    var target01 = "#chart01";

    var data01 = {
        labels: years,
        datasets: [
            {
                backgroundColor: 'rgba(252, 220, 93, 0.5)',
                borderWidth: 0,
                label: "営業利益",
                data: [3105, 8724, 3511, 4826]
            }
        ]
    };

    var option01 = option_general;

    //表示領域に入った場合チャートを作成する

    var chart01 = null;

    $(target01).on('inview', function (event, isInView) {
        if (isInView) {
            if (!(chart01)) {
                chart01 = new Chart($(target01), {type: 'bar', data: data01, options: option01});
            }
        }
    });

    /* 経常利益チャート */
    var target02 = "#chart02";

    var data02 = {
        labels: years,
        datasets: [
            {
                backgroundColor: 'rgba(100, 189, 212, 0.5)',
                borderWidth: 0,
                label: "経常利益",
                data: [6737, 9429, 4580, 6456]
            }
        ]
    };

    var option02 = option_general;

    //表示領域に入った場合チャートを作成する

    var chart02 = null;

    $(target02).on('inview', function (event, isInView) {
        if (isInView) {
            if (!(chart02)) {
                chart02 = new Chart($(target02), {type: 'bar', data: data02, options: option02});
            }
        }
    });


    /* 売上高チャート */

    var target04 = "#chart04";

    var data04 = {
        labels: years,
        datasets: [
            {
                backgroundColor: 'rgba(19, 51, 166, 0.5)',
                borderWidth: 0,
                label: "売上高",
                data: [1073931, 1168940, 1180075,1088262]
            }
        ]
    };

    var buff = {
        scales: {
            yAxes: [{
                    ticks: {
                        max: 1200000,
                        min: 0,
                        stepSize: 300000,
                        fontSize: 14,
                        callback: function (label, index, labels) {
                            return label.toLocaleString();
                        }

                    }
                }],
            xAxes: [{
                    id: "x-axis-1", // X軸のID
                    ticks: {
                        fontSize: 14
                    }
                }]
        }
    };

    var option04 = $.extend({}, option_general, buff);

    var chart04 = null;

    $(target04).on('inview', function (event, isInView) {
        if (isInView) {
            if (!(chart04)) {
                chart04 = new Chart($(target04), {type: 'bar', data: data04, options: option04});
            }
        }
    });


});
