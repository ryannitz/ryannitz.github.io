
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
