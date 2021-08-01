
//todo: Graph showing the bedtime pre-behavior change 
//todo: Graph showing the total amount of sleep for the week pre-behavior change (without naps)

//todo: Graph showing the bedtime and real bedtime post-behavior change
//todo: Graph showing the total amount of sleep for the wee post-behavior change
//todo: Grapgh showing how long it took to fall asleep

//todo: Grapgh 


var app = new Vue({
    el: "#app",

  //------- data --------
    data: {

        sections : [
            {
                title: "The Pandemic",
                content: "The covid-19 pandemic has changed lives around the globe. People have been forced to change their day-to-day behaviors and ingrained habits. Some behaviors have improved given the extra time during quaratine, other -less desireable- behaviors were able to grab hold with lessened routine and structure. My not-so-desirable behavior that got worse was sleep. This website will be a quick overview with graphs and logs documenting my what my sleep has deteriorated to, and where I'm trying to get it back to."
            },
            {
                title: "Pre-Covid Sleep",
                content: "Being in University there were obviously times I would stay up until 3am for assignments and studying. I would always stay up past 12 anyway no matter the circumstance. Occasionally I would pull all nighters or stay up extremely late while working on passionate computer science projects (sort of like this one). One thing that was always consistent though was the time I had to wake up (7:30am). My wake up time would keep me on schedule and make me tired enough to fix my sleep schedule the very same day. This obviously isn't the case with pandemic and remote work."
            },
            {
                title: "Covid Sleep Downfall",
                content: "Once the pandemic hit, suddenly there was no reason to wake up a few hours early to get ready for the day and make the required comute to school and work. The fact that I no longer needed to get up so early meant I could stay up later the night beforehand. Of course this bed time got later and later as my sleep schedule would adjust and the extra time to sleep turned into the minimal amount of sleep just like the pre-pandemic. It didn't stop there though... With school and work being remote, the gaps in my schedule and immediate amenties of my house meant that I could nap in my free time to make up for the sleep loss. With the extra napping, the problems continued to compound up to the point I began sleeping at inapropriate times. Eventually my entire schedule collapsed. Showering, eating, sleeping, all completely random now."
            },
            {
                title: "Behavior Change Goals and Methods",
                content: "When coming up with my behavior change goals, I needed to reflect on my life during covid and pre-covid. This would allow me to identify major life changes brought on by the pandemic which I could work towards fixing. The biggest change that stood out to me was my sleep schedule, so I decided to make a plan towards fixing it."
            }
        ],

        week_enum: [
            "MON",
            "TUE",
            "WED",
            "THU",
            "FRI"
        ],

        w1: [
            {
                log: "Last night was the first day of my behavior change experiment. Due to this being the first night, I wasn't worried about when I went to bed, but when I wake up to kick of my tiredness schedule. Unfortunately I crumbled and had a midday nap.",
                date : "2021-07-12",
            },
            {
                log: "Last night I fell asleep late again but did not nap during the day. I was up late catching up on lectures from the class I had to miss Monday. Coffee kept me awake for the first hours of the day, hopefully I can fall asleep at a good time tonight.",
                date: "2021-07-13",
            },
            {
                log: "Last night I couldn't fall asleep when I wanted because of the heat. I forced myself to wake up at my goal time though.",
                date: "2021-07-14",
            },
            {
                log: "Last night was probably the closest I've gotten to my goal. Very happy, not much to say. Felt great all day.",
                date: "2021-07-15",
            },
            {
                log: "Last night I tried to get to bed early but the heat kept my tossing and turning. :( This is becoming a challenge with no A/C in my room.",
                date: "2021-07-16",
            }
       ],
        w2: [
            {
                log: "Today I ended up napping a few times because I was very hungover from the weekend. I showered really early in the morning after being dropped off from my camp.",
                date: "2021-07-19",
            },
            {
                log: "This notes the first day of me staying up consistantly late to watch netflix with someone in Alberta. Even though this new trend took hold, I refused to nap or take showers at random times of the day.",
                date: "2021-07-20",
            },
            {
                log: "Late night again watching netflix. Keeping consistant throughout the day still.",
                date: "2021-07-21",
            },
            {
                log: "Today Alberta girl and myself were busy for the rest of the week so I did not stay up as late, but couldn't fall asleep until later anyway.",
                date: "2021-07-22",
            },
            {
                log: "My last day of the behavior change. I felt more productive at work throughout the two weeks. I'm a little more tired than usual, on the same levels of taking in-person classes, so not too concerning.",
                date: "2021-07-23",
            }
        ]
    },

  //------- methods --------
    methods: {
        
    },

    computed: {
        // filteredUsers() {
        //     return this.users.filter(user => {
        //         return user.userName.toLowerCase().indexOf(this.searchUser.toLowerCase()) > -1
        //     })
        // }
    },

    mounted: function(){
        
    }

});

function createAlert(type, text, millis){
    var id = Math.floor((Math.random() * 1000) + 1);
    var alerthtml = '<div id="alert-'+id+'" class="alert alert-'+type+' alert-dismissible text-center fixed-bottom w-75 mx-auto mb-5">' +
                    '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                    '<strong><i class="fas fa-info-circle"></i></strong> '+
                    text+
                '</div>'
    $("body").append(alerthtml);
    setTimeout(function(){
        $('#alert-'+id).fadeOut(500, function(){
            $('#alert-'+id).remove();
        });
    }, millis)
  }
