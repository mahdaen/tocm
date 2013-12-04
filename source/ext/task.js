/*jshint strict:true*/
/*jshint boss:true*/
/*jshint undef:false*/

// CREATING TOCM TASK LIBRARY.
(function (window) {
    'use strict';
    window.TocmRegistry = {
        EventLibrary: {
            DOMEvent: {},
            IOEvent: {}
        },
        TaskLibrary: {
            Task: {
                length: 0,
                splice: function () {}
            },
            Listener: {
                length: 0,
                splice: function() {}
            }
        }
    };
})(window);

// CREATING TASK CONSTRUCTOR.
(function (window) {
    'use strict';
    // CREATING TASK LISTENER.
    var listenTask = function (tsid, time) {
        if (typeOf(tsid) === 'number') {
            var listener = TocmRegistry.TaskLibrary.Listener,
                tasklist = TocmRegistry.TaskLibrary.Task,
                task = tasklist[tsid];
            
            if (typeOf(time) === 'number') {
                listener[tsid] = setTimeout(function () {
                    task.call();
                }, time);
                
                listener.length++;
            } else if (typeOf(task.nextRun === 'number') && task.nextRun > 0) {
                listener[tsid] = setTimeout(function () {
                    task.call();
                }, task.nextRun);
                
                listener.length++;
            } else if (typeOf(task.nextRun) === 'string') {
                var nexd = new Date(task.nextRun).getTime();
                var curd = new Date().getTime();
                var tdur = nexd - curd;
                
                if (tdur > 0) {
                    listener[tsid] = setTimeout(function () {
                        task.call();
                    }, tdur);
                    
                    listener.length++;
                } else {
                    task.status = 'stopped';
                }
            }
        }
    };
    var unlistenTask = function (tsid) {
        var listener = TocmRegistry.TaskLibrary.Listener;
        
        if (listener[tsid]) {
            clearTimeout(listener[tsid]);
            delete listener[tsid];
            listener.length--;
        }
    };
    
    // CREATING TASK BUILDER.
    var TocmTask = function (name) {
        var task = TocmRegistry.TaskLibrary.Task;
        if (typeOf(name) === 'string') {
            new TocmLogger('TocmTask', 'Creating new task "' + name + '".');
            // Handle if task already exist.
            for (var i = 0; i < task.length; ++i) {
                if (task[i].name === name) {
                    new TocmLogger('TocmTask', 'Task "' + name + '" is already exist. Now return it.', 'orange');
                    return task[i];
                }
            }
            // Increasing task length.
            task.length++;
            // Configuring new task.
            this.name = name;
            this.tsid = (task.length - 1);
            this.status = 'init';
            this.runtime = '';
            this.nextRun = this.lastRun = this.trigger = '';
            
            this.actions = [];
            
            task[this.tsid] = this;
            new TocmLogger('TocmTask', 'Task "' + name + '" has been created.', 'green');
        }
        return this;
    };
    
    // CREATING TASK HANDLER.
    // ------------------------------------------------------
    // Handling actions.
    var actionHandler = function (task) {
        new TocmLogger('TocmTask', 'Running task "' + task.name + '".', 'orange');
        task.status = 'running';
        // Handling task onCall event.
        if (typeOf(task.onCall) === 'function') task.onCall(task);
        
        // Getting the actions.
        var action = task.actions;
        // Enumerating actions.
        try {
            // Trying to trigger actions.
            for (var i = 0; i < action.length; ++i) {
                new TocmLogger('TocmTask', 'Triggering action "' + action[i].name + '".');
                action[i](task);
                new TocmLogger('TocmTask', 'Action "' + action[i].name + '" has been triggered.', 'green');
            }
        } catch(e) {
            // If error occurs while triggering actions, then call the onFail handler and stop the task.
            task.status = 'failed';
            if (typeOf(task.onFail) === 'function') task.onFail(task);
            
            new TocmLogger('TocmTask', e.message, 'red', true);
        } finally {
            if (task.status !== 'failed') {
                task.status = 'ready';
                task.lastRun = new Date().format('dn mn %D, %Y %h:%m:%s');
                
                if (typeOf(task.onLoad) === 'function') task.onLoad(task);
                
                new TocmLogger('TocmTask', 'Task "' + task.name + '" finished running. Now it\'s ready for next run.', 'green');
                task.init();
                listenTask(task.tsid);
            }
        }
    };
    // Handling realtime task.
    var realtimeHandler = function (task) {
        // Set up the next run time.
        task.nextRun = 5;
        // Change task status.
        task.status = 'ready';

        return task;
    };
    // Handling immediate task.
    var immediateHandler = function (task) {
        // Turn off task.
        task.nextRun = 0;
        // Change task status.
        task.status= 'ready';

        return task;
    };
    // Handling delayed task.
    var delayedHandler = function (task) {
        // Getting current date in milliseconds.
        var curnMil = new Date().getTime();
        var nextMil;
        
        // Getting trigger.
        var trigger = task.trigger;
        var trigarr = trigger.split(' ');
        // Parsing trigger.
        if (trigarr.length > 1 && trigarr[0] === 'every') {
            var pat = trigarr[1].split(/([\d\.]+)/);
            pat[1] = Number(pat[1]);
            switch(pat[2]) {
                case 's':
                    nextMil = (pat[1] * 1000);
                    break;
                case 'm':
                    nextMil = (pat[1] * 60 * 1000);
                    break;
                case 'h':
                    nextMil = (pat[1] * 60 * 60 * 1000);
                    break;
                case 'd':
                    nextMil = (pat[1] * 60 * 60 * 24 * 1000);
                    break;
                case 'w':
                    nextMil = (pat[1] * 60 * 60 * 24 * 7 * 1000);
                    break;
                default:
                    nextMil = 0;
                    break;
            }
        }

        task.nextRun = new Date(curnMil + nextMil).format('dn mn %D, %Y %h:%m:%s');
        // Change task status.
        task.status = 'ready';
        
        return task;
    };
    // Handling scheduled task.
    var scheduledHandler = function (task) {
        var nextRun, lowTime, higTime;
        var nextDay = Number(new Date().toJulian().toDate('D')) + 1;
        var curTime = new Date().getTime();
        
        var trigger = task.trigger;
        var trigarr = trigger.split(/\s/);
        if (trigarr.length > 1) {
            switch(trigarr[0]) {
                case 'daily':
                    if (trigarr[1] === 'at') {
                        // Handling invalid time format.
                        if (!trigarr[2].match(/[\d]+\:[\d]+$/)) {
                            task.nextRun = 0;
                            task.status = 'failed';
                            new TocmLogger('TocmTask', 'Invalid time format "' + trigarr[2] + '" on "' + trigger + '". Task "' + task.name + '" terminated.', 'red', true);
                            break;
                        }
                        
                        // Trying schedule time for today.
                        nextRun = new Date(new Date().format('%M-%D-%Y ' + trigarr[2]));
                        // If time now is higher than scheduled time, then reschedule time for next day.
                        if (nextRun.getTime() <= curTime) {
                            nextRun = new Date(new Date().format('%M-' + nextDay + '-%Y ' + trigarr[2]));
                        }
                        
                        task.nextRun = nextRun.format('dn mn %D, %Y %h:%m:%s');
                        task.status = 'ready';
                    } else if (trigarr[1] === 'between') {
                        // Handling invalid time format.
                        if (!trigarr[2].match(/^[\d]{2}\:[\d]{2}$/) || trigarr[3] !== 'and' || !trigarr[4].match(/^[\d]{2}\:[\d]{2}$/)) {
                            task.nextRun = 0;
                            task.status = 'failed';
                            new TocmLogger('TocmTask', 'Invalid time format on "' + trigger + '". Task "' + task.name + '" terminated.', 'red', true);
                            break;
                        }
                        
                        lowTime = new Date(new Date().format('%M-%D-%Y ' + trigarr[2]));
                        higTime = new Date(new Date().format('%M-%D-%Y ' + trigarr[4]));
                        
                        if (curTime > higTime.getTime()) {
                            // Schedule time to next day if current time is higher than max range time.
                            nextRun = new Date(new Date().format('%M-' + nextDay + '-%Y ' + trigarr[2]));
                        } else if (curTime < lowTime.getTime()) {
                            // Schedule time to today if current time is lower than min range time.
                            nextRun = new Date(new Date().format('%M-%D-%Y ' + trigarr[2]));
                        } else if (curTime >= lowTime.getTime() && curTime <= higTime.getTime()) {
                            // Convert it to realtime task if current time is in time range.
                            nextRun = 15;
                        }

                        if (typeOf(nextRun) === 'date') {
                            task.nextRun = nextRun.format('dn mn %D, %Y %h:%m:%s');
                        } else if (typeOf(nextRun) === 'number') {
                            task.nextRun = nextRun;
                        }

                        task.status = 'ready';
                    } else {
                        new TocmLogger('TocmTask', 'Invalid time format on "' + trigger + '". Task "' + task.name + '" terminated.', 'red', true);
                    }
                    break;
                case 'weekly':
                    // Creating the day of week.
                    var weekDay;
                    var week = new Date().toJulian().toDate('w');
                    if (trigarr[1] === 'on') {
                        weekDay = trigarr[2];
                    } else {
                        weekDay = 'Sun';
                    }
                    // Getting date on week by the day.
                    var tgTime = new Date().dateOfWeek(week, weekDay);
                    // Forward for next week if current date has left the target date.
                    if (new Date(curTime).getDate() > tgTime.getDate()) {
                        tgTime = new Date().dateOfWeek((week + 1), weekDay);
                    }
                    
                    if (trigarr[3] === 'at') {
                        // Handling invalid time format.
                        if (!trigarr[4].match(/[\d]+\:[\d]+$/)) {
                            task.nextRun = 0;
                            task.status = 'failed';
                            new TocmLogger('TocmTask', 'Invalid time format "' + trigarr[4] + '" on "' + trigger + '". Task "' + task.name + '" terminated.', 'red', true);
                            break;
                        }
                        
                        // Trying schedule time for today.
                        nextRun = new Date(tgTime.format('%M-%D-%Y ' + trigarr[4]));
                        // If time now is higher than scheduled time, then reschedule time for next day.
                        if (nextRun.getTime() <= curTime) {
                            tgTime = new Date().dateOfWeek((week + 1), weekDay);
                            nextRun = new Date(tgTime.format('%M-%D-%Y ' + trigarr[4]));
                        }
                        
                        task.nextRun = nextRun.format('dn mn %D, %Y %h:%m:%s');
                        task.status = 'ready';
                    } else if (trigarr[3] === 'between') {
                        // Handling invalid time format.
                        if (!trigarr[4].match(/^[\d]{2}\:[\d]{2}$/) || trigarr[5] !== 'and' || !trigarr[6].match(/^[\d]{2}\:[\d]{2}$/)) {
                            task.nextRun = 0;
                            task.status = 'failed';
                            new TocmLogger('TocmTask', 'Invalid time format on "' + trigger + '". Task "' + task.name + '" terminated.', 'red', true);
                            break;
                        }
                        
                        lowTime = new Date(tgTime.format('%M-%D-%Y ' + trigarr[4]));
                        higTime = new Date(tgTime.format('%M-%D-%Y ' + trigarr[6]));
                        
                        if (curTime > higTime.getTime()) {
                            // Schedule time to next day if current time is higher than max range time.
                            tgTime = new Date().dateOfWeek((week + 1), weekDay);
                            nextRun = new Date(tgTime.format('%M-%D-%Y ' + trigarr[4]));
                        } else if (curTime < lowTime.getTime()) {
                            // Schedule time to today if current time is lower than min range time.
                            nextRun = new Date(tgTime.format('%M-%D-%Y ' + trigarr[4]));
                        } else if (curTime >= lowTime.getTime() && curTime <= higTime.getTime()) {
                            // Convert it to realtime task if current time is in time range.
                            nextRun = 15;
                        }

                        if (typeOf(nextRun) === 'date') {
                            task.nextRun = nextRun.format('dn mn %D, %Y %h:%m:%s');
                        } else if (typeOf(nextRun) === 'number') {
                            task.nextRun = nextRun;
                        }

                        task.status = 'ready';
                    } else {
                        new TocmLogger('TocmTask', 'Invalid time format on "' + trigger + '". Task "' + task.name + '" terminated.', 'red', true);
                    }
                    break;
                default:
                    new TocmLogger('TocmTask', 'Invalid time format on "' + trigger + '". Task "' + task.name + '" terminated.', 'red', true);
                    break;
            }
        }
        
        return task;
    };
    
    // CREATING TASK MODULES.
    TocmTask.prototype = {
        // CREATING TASK INIT.
        init: function () {
            var task;
            this.status = 'init';
            
            if (this.runtime === 'realtime') {
                task = realtimeHandler(this);
            } else if (this.runtime === 'immediate') {
                task = immediateHandler(this);
            } else if (this.runtime === 'delayed') {
                task = delayedHandler(this);
            } else if (this.runtime === 'scheduled') {
                task = scheduledHandler(this);
            } else {
                this.status = 'failed';
            }
            return this;
        },
        call: function () {
            if (this.status === 'ready') {
                unlistenTask(this.tsid);
                actionHandler(this);
            }
            return this;
        },
        // CREATING TASK STARTER.
        run: function (exec) {
            this.init();

            if (exec === true) {
                this.call();
            } else {
                listenTask(this.tsid);
            }

            return this;
        },
        // CREATING TASK STOPPER.
        stop: function () {
            new TocmLogger('TocmTask', 'Stopping task "' + this.name + '".');
            this.status = 'stopped';
            if (TocmRegistry.TaskLibrary.Listener[this.tsid]) {
                clearTimeout(TocmRegistry.TaskLibrary.Listener[this.tsid]);
            }
            new TocmLogger('TocmTask', 'Task "' + this.name + '" has been stopped.');
            return this;
        },
        // CREATING DELAY SETTER.
        repeat: function (trigger) {
            if (typeOf(trigger) === 'string') {
                new TocmLogger('TocmTask', 'Set task "' + this.name + '" as delayed task.');
                unlistenTask(this.tsid);
                this.runtime = 'delayed';
                this.trigger = trigger;
                this.init();
            }
            return this;
        },
        // CREATING REALTIME SETTER.
        realtime: function () {
            new TocmLogger('TocmTask', 'Set task "' + this.name + '" as realtime task.');
            unlistenTask(this.tsid);
            this.runtime = 'realtime';
            this.trigger = '';
            this.init();
            return this;
        },
        schedule: function (trigger) {
            if (typeOf(trigger) === 'string') {
                new TocmLogger('TocmTask', 'Set task "' + this.name + '" as scheduled task.');
                unlistenTask(this.tsid);
                this.runtime = 'scheduled';
                this.trigger = trigger;
                this.init();
            }
            return this;
        },
        immediate: function (time) {
            this.runtime = 'immediate';
            if (typeOf(time) === 'number') {
                new TocmLogger('TocmTask', 'Set task "' + this.name + '" as immediate task.');
                this.init();
                listenTask(this.tsid, time);
            } else {
                new TocmLogger('TocmTask', 'Set task "' + this.name + '" as immediate task and run it immediately since no time defined.');
                this.init();
                this.call();
            }
            return this;
        },
        addAction: function (func) {
            if (typeOf(func) === 'function') {
                new TocmLogger('TocmTask', 'Adding action "' + func.name + '" to task "' + this.name + '".');
                if (this.actions.indexOf(func) < 0) {
                    this.actions.push(func);
                } else {
                    this.actions[this.actions.indexOf(func)] = func;
                }
                new TocmLogger('TocmTask', 'Action "' + func.name + '" has been added to task "' + this.name + '".', 'green');
            }
            return this;
        }
    };
    
    window.$task = window.TocmTask = function (name, runtime) {
        return new TocmTask(name, runtime);
    };
    window.TocmTask.module = window.TocmTask.event = TocmTask.prototype;
})(window);
