/*********************** Work Day Scheduler ******************** */
/* Create HTML elements for a schedule containing 9 one hour blocks 
    for each hour of the work day. The blocks should contain the time,
    a space for a form to enter the task description, and a button to 
    save the entry. The past hours should be displayed as gray, the 
    current hour displayed as red, and future hours displayed as green.

    1. When a textarea is clicked, enter new text for task data
    2. When the save button is clicked, save the text in the text area
        along with the time block id into an object
    3. When the page is refreshed, the load task function should loop 
        through each object, match the saved time with the time block id
        and fill in the text area with the saved text

*/
var tasks = [];

// save button was clicked
$(".saveBtn").click(function() {
    // determine which time slot the button was clicked in
    var taskTime = $(this).attr('id');
    // get the task description
    var taskText = $("#" + taskTime).val();

    // store the values into the tasks variable
    if (taskText) {

        tasks = JSON.parse(localStorage.getItem("tasks"));

        if (!tasks) {
            tasks = [];
        }

        tasks.push({
            text: taskText,
            time: taskTime
        });

        saveTasks();
    }

});

// load tasks function
var loadTasks = function() {
    tasks = JSON.parse(localStorage.getItem("tasks"));

    if (tasks) {
        $('textarea').each(function(index, value) {
            var time = (this.id);
            
            tasks.forEach(function(item) {
                if (item.time === time) {
                    console.log("true");
                    $("#" + time).text(item.text);
                }
                else {
                    return;
                }
            });
        });
    }

};

// function to siplay current day at top of the page
$(document).ready(function () {
    
    var currentDate = moment().format("dddd, MMM Do YYYY");
    $("#currentDay").html(currentDate);

});

// function to track hours of the day
var timeSlots = function() {
    // get the time data
    var currentTime = moment().hour();
    console.log(currentTime);
    //
    $(".description").each(function() {
        var hourSlot = parseInt($(this).attr("id"));
        console.log(hourSlot);
        // color code the hours 
        if (hourSlot < currentTime) {
            $(this).addClass("past");
            $(this).removeClass("future");
            $(this).removeClass("present");
        }
        else if (hourSlot === currentTime) {
            $(this).removeClass("past");
            $(this).addClass("present");
            $(this).removeClass("future");
        }
        else {
            $(this).removeClass("present");
            $(this).removeClass("past");
            $(this).addClass("future");
        }
    });
}

var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

loadTasks();
timeSlots();