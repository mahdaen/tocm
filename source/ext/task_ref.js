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
    // Time Based: every: 2m, every 2h, every 2d, every 2w
    // Group based: daily at 06:00, daily between 06:00 and 18:00, weekly on sun at 06:00, weekly on sun between 06:00 and 18:00, monthly/yearly ondate [def]
    trigger: 'daily between 06:00 and 18:00',
    
    // Action on trigger.
    actions: []
};

// Event Handler.
TocmTask.OnFail = function () {};
TocmTask.onCall = function () {};
TocmTask.onLoad = function () {};

// Task Method.
TocmTask.run();
TocmTask.stop();

// Scheduling Task.
TocmTask.schedule('daily at 06:00')
// Adding action to task.
.addAction('Sync Tweet', function () {})
// Removing action from task.
.remAction('Sync Tweet');