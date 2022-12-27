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


const app = new Vue({
    el: '#app',
  
    // ------- data --------
    data: {
  
      sections: [
        {
          title: 'The Pandemic',
          content: "The covid-19 pandemic has changed lives around the globe. People have been forced to change their day-to-day behaviors and ingrained habits. Some behaviors have improved given the extra time during quaratine, other -less desireable- behaviors were able to grab hold. My not-so-desirable behavior that got worse was sleep and my sleep schedule. This website will be a quick overview with graphs and logs documenting my what my sleep has deteriorated to, and where I'm trying to get it back to."
        },
        {
          title: 'Pre-Covid Sleep',
          content: "Being in University there were obviously times I would stay up until 3am for assignments and studying. I would always stay up past 12 anyway no matter the circumstance. Occasionally I would pull all nighters or stay up extremely late while working on passionate computer science projects (sort of like this one). One thing that was consistent was the time I had to wake up (7:30am). My wake up time would keep me on schedule and make me tired enough to fix my sleep schedule the very same day. This obviously isn't the case with pandemic and remote work."
        },
        {
          title: 'Covid Sleep Downfall',
          content: "Once the pandemic hit, suddenly there was no reason to wake up early to get ready for the day and make the required comutes. The fact that I no longer needed to get up so early meant I could stay up later the night before. Of course my bedtime got later and later as my sleep schedule would adjust and the extra time to sleep turned into the minimal amount of sleep, just like I did in the pre-pandemic. It didn't stop there though... With school and work being remote, the gaps in my schedule and the immediate amenties of my house meant that I could nap in my free time to make up for the sleep loss. With the extra napping, the problems continued to compound up to the point I began sleeping at inapropriate times. Eventually my entire schedule collapsed. Showering, eating, sleeping, all completely random now."
        },
        {
          title: 'Total Hours Slept Pre-Behavior Change'
        },
        {
          title: 'Bed time / Wake Time Before Behavior Change '
        },
        {
          title: 'Behavior Change Goals and Methods',
          content: 'When coming up with my behavior change goals, I needed to reflect on my life during covid and pre-covid. This would allow me to identify major life changes brought on by the pandemic which I could work towards fixing. The biggest change that stood out to me was my sleep schedule, so I decided to make a plan towards fixing it.'
        },
        {
          title: 'Sleep Range During Behavior Change'
        },
        {
          title: 'Bed Time / Wake Time During Behavior Change'
        },
        {
          title: 'Daily Log'
        },
        {
          title: 'Results and Findings',
          content: 'Overall the behavior change efforts increased my own feeling of productivity and self-efficacy. I was able to improve on 2 out of 3 of my goals. Reduced napping was successful. Waking up at 9am or earlier was also improved over the weeks prior to the change. Unfortunatly I did not get to bed at better times. I beleive failing the bedtime goal was due to online netflix dates with the girl from Alberta with the time zone disparity (Noted in the daily logs).'
        },
        {
          title: 'Conclusions',
          content: 'This health behavior exercise had perfect timing with our community lifting all pandemic restrictions the week after this assignment. This gives me a taste of what going back to normal life might be like. Although the timing were not similar, the amount of sleep surely is. I also came to the realization that the first sacrifice in my life is sleep. I will easily trade sleep for school, personal indulges, other people etc. Perhaps that is why I found it difficult to go to bed earlier, I simply sacrificed my total amount of sleep in order to complete this assignment. Continue to go to bed later but wake up sooner. Seems I could always find an excuse for staying up late. Maybe this is a good indicator that the primary behavior to be changed is my bedtime alone. In retrospect, the goals should have been fewer and more precise to focus the change and get more meaningful results. All in all, this was a great assignment. Soon it will be my everyday once things are back to normal.'
        },
        {
          title: 'References',
          content: 'References in PowerPoint.'
        }
      ],
  
      week_enum: [
        'MON',
        'TUE',
        'WED',
        'THU',
        'FRI'
      ],
  
      w1: [
        {
          log: "Last night was the first day of my behavior change experiment. Due to this being the first night, I wasn't worried about when I went to bed, but when I wake up to kick of my tiredness schedule. Unfortunately I crumbled and had a midday nap.",
          date: '2021-07-12'
        },
        {
          log: 'Last night I fell asleep late again but did not nap during the day. I was up late catching up on lectures from the class I had to miss Monday. Coffee kept me awake for the first hours of the day, hopefully I can fall asleep at a good time tonight.',
          date: '2021-07-13'
        },
        {
          log: "Last night I couldn't fall asleep when I wanted because of the heat. I forced myself to wake up at my goal time though.",
          date: '2021-07-14'
        },
        {
          log: "Last night was probably the closest I've gotten to my goal. Very happy, not much to say. Felt great all day.",
          date: '2021-07-15'
        },
        {
          log: 'Last night I tried to get to bed early but the heat kept my tossing and turning. :( This is becoming a challenge with no A/C in my room.',
          date: '2021-07-16'
        }
      ],
      w2: [
        {
          log: 'Today I ended up napping a few times because I was very hungover from the weekend. I showered really early in the morning after being dropped off from my camp.',
          date: '2021-07-19'
        },
        {
          log: 'This notes the first day of me staying up consistantly late to watch netflix with someone in Alberta. Even though this new trend took hold, I refused to nap or take showers at random times of the day.',
          date: '2021-07-20'
        },
        {
          log: 'Late night again watching netflix. Keeping consistant throughout the day still.',
          date: '2021-07-21'
        },
        {
          log: "Today Alberta girl and myself were busy for the rest of the week so I did not stay up as late, but couldn't fall asleep until later anyway.",
          date: '2021-07-22'
        },
        {
          log: "My last day of the behavior change. I felt more productive at work throughout the two weeks. I'm a little more tired than usual, on the same levels of taking in-person classes, so not too concerning.",
          date: '2021-07-23'
        }
      ]
    }
  
  })

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