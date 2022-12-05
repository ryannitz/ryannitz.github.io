// GET REFERENCES
// Header
// --------------
// pandemic intro (done)
// --------------
// pre-covid sleep (done)
// --------------
// covid sleep (downfall) (done)
// --------------
// covid sleep graph, add some bullets describing how napping is terrible (done)
// --------------
// graph with sleep-start and sleep-end covid sleep (done)
// --------------
// change goals and methods to complete this (done)
// --------------
// graph with naps during the behavior change (done)
// --------------
// graph with sleep-start and sleep-end during behavior change. (Done)
// --------------
// Describe the results etc (done)
// --------------
// Conclusions (done)
// --------------
// References
// --------------
// Footer Help with: FontAwesome, Bootstrap, Vue.js (done)
// --------------

const COL_DATE = 0
const COL_BEDTIME = 1
const COL_ASLEEPTIME = 2
const COL_WAKEUPTIME = 3
const COL_AWAKETIME = 4
const COL_NAPTIME = 5
const COL_TOTALSLEEPTIME = 6

const before = [
    ['2021-06-28', '00:00:00', '02:26:00', '08:18:00', '00:11:00', '00:00:00', '05:41:00'],
    ['2021-06-29', '00:00:00', '02:54:00', '09:48:00', '00:40:00', '01:25:00', '07:39:00'],
    ['2021-06-30', '00:00:00', '01:51:00', '10:00:00', '00:46:00', '01:06:00', '08:29:00'],
    ['2021-07-01', '00:00:00', '01:42:00', '11:30:00', '00:36:00', '00:00:00', '09:12:00'],
    ['2021-07-02', '00:00:00', '03:04:00', '09:58:00', '00:54:00', '01:29:00', '07:29:00'],
    ['2021-07-03', '00:00:00', '02:25:00', '06:15:00', '00:14:00', '02:36:00', '06:12:00'],
    ['2021-07-04', '00:00:00', '02:27:00', '11:54:00', '00:41:00', '00:00:00', '08:46:00'],
    ['2021-07-05', '00:00:00', '00:00:00', '06:35:00', '00:48:00', '01:25:00', '07:27:00'],
    ['2021-07-06', '00:00:00', '02:08:00', '09:01:00', '00:38:00', '01:07:00', '07:22:00'],
    ['2021-07-07', '00:00:00', '01:41:00', '08:57:00', '00:35:00', '00:00:00', '06:41:00'],
    ['2021-07-08', '00:00:00', '01:37:00', '09:08:00', '00:36:00', '01:00:00', '07:55:00'],
    ['2021-07-09', '00:00:00', '03:07:00', '09:09:00', '00:31:00', '00:00:00', '05:31:00'],
    ['2021-07-10', '00:00:00', '04:55:00', '13:02:00', '00:35:00', '00:00:00', '07:32:00'],
    ['2021-07-11', '00:00:00', '02:06:00', '06:11:00', '00:30:00', '02:18:00', '05:53:00'],
]

const during = [
    ['2021-07-12', '02:30:00', '03:02:00', '09:13:00', '00:38:00', '02:22:00', '07:55:00'],
    ['2021-07-13', '02:00:00', '02:25:00', '09:13:00', '00:40:00', '00:00:00', '06:08:00'],
    ['2021-07-14', '01:00:00', '01:30:00', '09:13:00', '00:40:00', '00:00:00', '07:03:00'],
    ['2021-07-15', '12:45:00', '02:10:00', '08:00:00', '00:33:00', '00:00:00', '05:17:00'],
    ['2021-07-16', '12:30:00', '02:21:00', '08:00:00', '00:32:00', '00:00:00', '05:07:00'],
    ['2021-07-17', '02:30:00', '02:49:00', '12:26:00', '00:43:00', '00:00:00', '08:54:00'],
    ['2021-07-18', '01:30:00', '02:04:00', '11:00:00', '00:58:00', '00:00:00', '07:58:00'],
    ['2021-07-19', '23:00:00', '00:03:00', '06:29:00', '00:54:00', '01:31:00', '07:32:00'],
    ['2021-07-20', '01:30:00', '02:10:00', '09:04:00', '00:43:00', '00:00:00', '06:11:00'],
    ['2021-07-21', '02:00:00', '02:51:00', '09:50:00', '00:58:00', '00:00:00', '06:01:00'],
    ['2021-07-22', '02:00:00', '02:34:00', '09:01:00', '00:26:00', '00:00:00', '06:01:00'],
    ['2021-07-23', '03:00:00', '03:26:00', '09:00:00', '00:34:00', '00:00:00', '05:58:00'],
    ['2021-07-24', '00:00:00', '04:19:00', '11:35:00', '00:25:00', '00:00:00', '06:51:00'],
    ['2021-07-25', '00:00:00', '03:32:00', '11:17:00', '00:43:00', '00:00:00', '07:01:00']
]

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();

    $(window).scroll(function(){
        if(window.scrollY > ($('#header-mast').offset().top + $('#header-mast').height())){
            $('#layout-nav').slideDown()
        }else{
            $('#layout-nav').slideUp()
        }
    });

    $('.section-nav-btn').click(function(){ 
        var index = $(this).index()
        $('html').animate(
            {
              scrollTop: $('.section:nth-child('+(index+1)+')').offset().top
            },
            400 //speed
          );
    });



    Highcharts.chart('totalSleepHoursBefore', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Hours slept before behavior change'
        },
        xAxis: {
            categories: getDateLabels(before),
            plotBands: [// visualize the weekend
                {
                    from: 4.5,
                    to: 6.5,
                    color: 'rgba(255, 0, 0, .2)'
                },
                {
                    from: 11.5,
                    to: 13.5,
                    color: 'rgba(255, 0, 0, .2)'
                },
            ]
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total hours slept'
            },
            stackLabels: {
               enabled: true,
            }
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true
                }
            }
        },
        series: [
            {
                name: 'Nap',
                data: getNapTimesInHours(before)
            },
            {
                name: 'Sleep',
                data: getTotalSleepTimeWithoutNap(before)
            }
        ]
    });

    Highcharts.chart('totalSleepHoursDuring', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Hours slept during behavior change'
        },
        xAxis: {
            categories: getDateLabels(before),
            plotBands: [// visualize the weekend
                {
                    from: 4.5,
                    to: 6.5,
                    color: 'rgba(255, 0, 0, .2)'
                },
                {
                    from: 11.5,
                    to: 13.5,
                    color: 'rgba(255, 0, 0, .2)'
                },
            ]
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total hours slept'
            },
            stackLabels: {
               enabled: true,
            }
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true
                }
            }
        },
        series: [
            
            {
                name: 'Nap',
                data: getNapTimesInHours(before),
                stack: 'Before',
                opacity: 0.5,
            },
            {
                name: 'Sleep',
                data: getTotalSleepTimeWithoutNap(before),
                stack: 'Before',
                opacity: 0.5,
            },
            {
                name: 'Nap',
                data: getNapTimesInHours(during),
                stack: 'During',
                color: '#7cb5ec'
            },
            {
                name: 'Sleep',
                data: getTotalSleepTimeWithoutNap(during),
                stack: 'During',
                color: '#434348'
            }
        ]
    });

    Highcharts.chart('sleepAndWakeTimeBefore', {
        chart: {
            type: 'xrange'
        },
        title: {
            text: 'Sleep range before behavior change'
        },
        accessibility: {
            point: {
                descriptionFormatter: function (point) {
                    var ix = point.index + 1,
                        category = point.yCategory,
                        from = new Date(point.x),
                        to = new Date(point.x2);
                    return ix + '. ' + category + ', ' + from.toDateString() +
                        ' to ' + to.toDateString() + '.';
                }
            }
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats:{
                day: {
                    main: '%H:%M',
                    range: false
                },
                hour: {
                    main: '%H:%M',
                    range: true
                }
            },
            plotBands: [// visualize the weekend
                {
                    from: 1.0,
                    to: 6.5,
                    color: 'rgba(255, 0, 0, .2)'
                },
            ]
        },
        yAxis: {
            title: {
                text: ''
            },
            categories: getDateLabels(before),
            reversed: true,
        },
        tooltip:{
            backgroundColor: '#fff',
            borderColor: 'black',
            borderRadius: 8,
            borderWidth: 0,
            zIndex: 11,
            xDateFormat: '%H:%M',
            formatter: function() {
              let start = Highcharts.dateFormat('%H:%M', this.x),
                end = Highcharts.dateFormat('%H:%M', this.x2),
                range =  (this.x2 - this.x)/(60*60*1000) ;
              return `${start} - ${end}<br>${range.toFixed(2)}hrs`
            }
        },
        plotOptions: {
            series:{
                pointStart: Date.UTC(2021,7,10,0,1),
                colors: ['#434348']
            }
        },
        series: [
            {
                pointStart: Date.UTC(2021,7,10,0,1),
                name: 'Before behavior',
                borderColor: 'gray',
                pointWidth: 20,
                data: getSleepRangeData(before),
                dataLabels: [
                    {
                        enabled: true,
                        align: 'left',
                        formatter: function() {
                            return Highcharts.dateFormat('%H:%M', this.x);
                        }
                    },
                    {
                        enabled: true,
                        align: 'right',
                        formatter: function() {
                            return Highcharts.dateFormat('%H:%M', this.x2);
                        }
                    }
                ]
            }
        ]
    });

    Highcharts.chart('sleepAndWakeTimeDuring', {
        chart: {
            type: 'xrange'
        },
        title: {
            text: 'Sleep range during behavior change'
        },
        accessibility: {
            point: {
                descriptionFormatter: function (point) {
                    var ix = point.index + 1,
                        category = point.yCategory,
                        from = new Date(point.x),
                        to = new Date(point.x2);
                    return ix + '. ' + category + ', ' + from.toDateString() +
                        ' to ' + to.toDateString() + '.';
                }
            }
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats:{
                day: {
                    main: '%H:%M',
                    range: false
                },
                hour: {
                    main: '%H:%M',
                    range: true
                }
            },
            plotBands: [// visualize the weekend
                {
                    from: 1.0,
                    to: 6.5,
                    color: 'rgba(255, 0, 0, .2)'
                },
            ]
        },
        yAxis: {
            title: {
                text: ''
            },
            categories: getDateLabels(before),
            reversed: true,
        },
        tooltip:{
            backgroundColor: '#fff',
            borderColor: 'black',
            borderRadius: 8,
            borderWidth: 0,
            zIndex: 11,
            xDateFormat: '%H:%M',
            formatter: function() {
              let start = Highcharts.dateFormat('%H:%M', this.x),
                end = Highcharts.dateFormat('%H:%M', this.x2),
                range =  (this.x2 - this.x)/(60*60*1000) ;
              return `${start} - ${end}<br>${range.toFixed(2)}hrs`
            }
        },
        plotOptions: {
            series:{
                pointStart: Date.UTC(2021,7,10,0,1),
                colors: ['#434348']
            }
        },
        series: [
            {
                pointStart: Date.UTC(2021,7,10,0,1),
                name: 'Before behavior',
                borderColor: 'gray',
                pointWidth: 20,
                data: getSleepRangeData(before),
                opacity: 0.5,
                dataLabels: [
                    {
                        enabled: true,
                        align: 'left',
                        formatter: function() {
                            return Highcharts.dateFormat('%H:%M', this.x);
                        }
                    },
                    {
                        enabled: true,
                        align: 'right',
                        formatter: function() {
                            return Highcharts.dateFormat('%H:%M', this.x2);
                        }
                    }
                ]
            },
            {
                pointStart: Date.UTC(2021,7,10,0,1),
                name: 'During change',
                borderColor: 'gray',
                pointWidth: 20,
                data: getSleepRangeData(during),
                dataLabels: [
                    {
                        enabled: true,
                        align: 'left',
                        formatter: function() {
                            return Highcharts.dateFormat('%H:%M', this.x);
                        }
                    },
                    {
                        enabled: true,
                        align: 'right',
                        formatter: function() {
                            return Highcharts.dateFormat('%H:%M', this.x2);
                        }
                    }
                ]
            }
        ]
    });



function getColumnData(data, colIndex){
    var dataset = [];
    data.forEach(function(item, index){
        dataset.push(item[colIndex]);
    });
    return dataset;
}

function getDateCol(data){
    return getColumnData(data, COL_DATE)
}

function getBedTimeCol(data){
    return getColumnData(data, COL_BEDTIME)
}

function getAsleepTimeCol(data){
    return getColumnData(data, COL_ASLEEPTIME)
}

function getWakeupTimeCol(data){
    return getColumnData(data, COL_WAKEUPTIME)
}

function getAwakeTimeCol(data){
    return getColumnData(data, COL_AWAKETIME)
}

function getNapTimeCol(data){
    return getColumnData(data, COL_NAPTIME)
}

function getTotalSleepTimeCol(data){
    return getColumnData(data, COL_TOTALSLEEPTIME)
}

function convertToUTC(data){

}

//add name to day ex: mon,tue...
function formatDate(value) {
    let date = new Date(value);
    date.setDate(date.getDate()+1)
    const day = date.toLocaleString('default', { day: '2-digit' });
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.toLocaleString('default', { year: 'numeric' });
    return day + '-' + month;
}


function getDateLabels(data){
    var dates = getDateCol(data);
    var dateLabels = []
    dates.forEach(function(item, index){
        dateLabels.push(formatDate(item));
    });
    return dateLabels;
}

function getNapTimesInHours(data){
    var napTimes = getNapTimeCol(data);
    var napTimesInHours = [];

    napTimes.forEach(function(item, index){
        var date = new Date(('2021-07-10 ' + item));
        var num  = (date.getHours() + date.getMinutes()/60).toFixed(2);
        napTimesInHours.push(parseFloat(num));
    });
    return napTimesInHours;
}

function getTotalSleepTimeWithoutNap(data){
    var napTimesInHours = getNapTimesInHours(data);
    var totalSleep =  getTotalSleepTimeCol(data);
    var totalSleepWithoutNaps = [];

    totalSleep.forEach(function(item, index){
        var date = new Date(('2021-07-10 ' + item));
        var num  = (date.getHours() + date.getMinutes()/60 - napTimesInHours[index]).toFixed(2);
        totalSleepWithoutNaps.push(parseFloat(num));
    });
    return totalSleepWithoutNaps;
}

function getSleepRangeData(data){
    var ranges = [];
    data.forEach(function(item, index){
        var asleepDate = new Date(('2021-07-10 ' + item[COL_ASLEEPTIME]));
        var awakeDate = new Date(('2021-07-10 ' + item[COL_WAKEUPTIME]));
        // if(asleepDate.getHours() > 12){
        //     asleepDate.setDate(asleepDate.getDay()-1)
        // }
        // if(awakeDate.getHours() > 12){
        //     awakeDate.setDate(awakeDate.getDay()-1)
        // }
        var x_1 = Date.UTC(asleepDate.getFullYear(), asleepDate.getMonth(), asleepDate.getDay(), asleepDate.getHours(), asleepDate.getMinutes());
        var x_2 = Date.UTC(awakeDate.getFullYear(), awakeDate.getMonth(), awakeDate.getDay(), awakeDate.getHours(), awakeDate.getMinutes())

        range = {
            x: x_1,
            x2: x_2,
            y: index,
            //partialFill: 0.25
        }

        ranges.push(range);
    });
    asleepDate = new Date(('2021-07-10 00:00:00'))
    awakeDate = new Date(('2021-07-10 08:00:00'))
    console.log(new Date(data[0][0]).getDate())
    if(new Date(data[0][0]).getDate() == 27){
        var desiredTimeRange = {
            x: Date.UTC(asleepDate.getFullYear(), asleepDate.getMonth(), asleepDate.getDay(), asleepDate.getHours(), asleepDate.getMinutes()),
            x2: Date.UTC(awakeDate.getFullYear(), awakeDate.getMonth(), awakeDate.getDay(), awakeDate.getHours(), awakeDate.getMinutes()),
            y: ranges.length,
            color: '#f00'
        }
        ranges.push(desiredTimeRange);
    }
    return ranges;
}

});