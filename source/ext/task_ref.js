var TocmTask = {
    name: 'Some Name',
    tsid: 330510,
    
    // Task Status:
    // ready, running, paused, failed.
    status: 'ready',
    
    // Task Runtime:
    // realtime, scheduled, immediate, delayed.
    runtime: 'scheduled',
    nextRun: '05/12/2013 06:01',
    lastRun: '04/12/2013 06:00',
    
    // Trigger rule.
    // Time Based: every 2min, every 2hr, every 2d, every 2w
    // Group based: daily at 06:00, daily between 06:00 and 18:00, weekly on sun at 06:00, weekly on sun between 06:00 and 18:00
    trigger: 'daily between 06:00 and 18:00',
    
    // Action on trigger.
    actions: [],
    
    // Action on event.
    events: {
        onReady: function () {},
        onFail: function () {},
        onCall: function () {},
        onLoad: function () {},
    }
};

// Event Handler.
TocmTask.onReady = function () {};
TocmTask.OnFail = function () {};
TocmTask.onCall = function () {};
TocmTask.onLoad = function () {};

