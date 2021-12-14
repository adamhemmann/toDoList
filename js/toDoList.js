// https://codepen.io/beeeees/pen/tsBwe <- used the code found here to help work out the syntax for adding content to an element
$(function () {
  $("#addTask").click(function () {
    var taskObj = {
      taskName: $("#taskName").val(),
      taskCategory: $("#taskCategory").val(),
      taskPriority: $("#taskPriority").val(),
      taskDueDate: $("#taskDueDate").val(),
    },
    validInput = validateFormData(
      taskObj.taskName,
      taskObj.taskCategory,
      taskObj.taskDueDate
    ),
    tableBody = $("table tbody"),
    taskStars = drawStars(taskObj.taskPriority);

    if (Boolean(validInput) == true) {
      tableBody.append(
        "<tr><td>" +
          taskObj.taskName +
          "</td>" +
          "<td>" +
          taskObj.taskCategory +
          "</td>" +
          "<td>" +
          taskStars +
          "</td>" +
          "<td>" +
          taskObj.taskDueDate +
          "</td>" +
          "<td><i title='Click to remove this item' class='bi bi-check-square-fill removeTask' onclick='taskComplete($(this))'></i></td></tr>"
      );
      var taskString = JSON.stringify(taskObj);
      var i = 1;
      if (localStorage.length == 0) {
        localStorage.setItem(i, taskString);
        i++;
      } else {
        localStorage.setItem(localStorage.length + 1, taskString);
      }
    }
  });
});

function validateFormData(taskName, taskCategory, taskDueDate) {
  var invalidTaskName = "Cannot add a task without a task name.\n",
    invalidTaskCategory = "Cannot add a task without a category.\n",
    invalidTaskDueDate = "Cannot add a task without a due date.\n",
    errors = "Could not add task:\n";

  if (taskName == "") {
    errors += invalidTaskName;
  }
  if (taskCategory == null) {
    errors += invalidTaskCategory;
  }
  if (taskDueDate == "") {
    errors += invalidTaskDueDate;
  }

  if (errors != "Could not add task:\n") {
    alert(errors);
  } else {
    return true;
  }
}

function drawStars(priorityInt) {
  let stars = "";
  for (let i = 0; i < priorityInt; i++) {
    stars += "<i class='bi bi-star-fill'></i>";
  }
  return stars;
}

// https://stackoverflow.com/questions/926319/jquery-remove-table-row-tr-by-clicking-a-td
function taskComplete(row) {
  row.closest("tr").remove();
}

$(function () {
  $("#loadLocalStorage").click(function () {

    var tableBody = $("table tbody");
  
    if (localStorage.length > 0) {
      var i = 1;
      while (i <= localStorage.length) {
        var task = JSON.parse(localStorage[i]);

        tableBody.append(
          "<tr><td>" +
            task.taskName +
            "</td>" +
            "<td>" +
            task.taskCategory +
            "</td>" +
            "<td>" +
            drawStars(task.taskPriority) +
            "</td>" +
            "<td>" +
            task.taskDueDate +
            "</td>" +
            "<td><i title='Click to remove this item' class='bi bi-check-square-fill removeTask' onclick='taskComplete($(this))'></i></td></tr>"
        );
        i++;
      }
    } else {
      alert("localStorage is empty. Create some tasks first!");
    }
  })
})

// https://stackoverflow.com/questions/7014385/javascript-jquery-to-change-class-onclick/7014413
$(function () {
  $("#darkMode").click(function () {
    $("#toDoTable").toggleClass("table table-striped");
    $("#toDoTable").toggleClass("table table-dark table-striped");

    $("body").toggleClass("bodyLightMode");
    $("body").toggleClass("bodyDarkMode");

    $(this).toggleClass("bi bi-brightness-high-fill");
    $(this).toggleClass("bi bi-brightness-high iconDarkMode");
  });
});

// https://stackoverflow.com/questions/15195449/html5-type-range-showing-label
$(function () {
  var rangeValues = {
    0: "0",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
  };
  // on page load, set the text of the label based the value of the range
  $("#priorityText").text(rangeValues[$("#rangeInput").val()]);

  // setup an event handler to set the text when the range value is dragged (see event for input) or changed (see event for change)
  $("#taskPriority").on("input change", function () {
    $("#priorityText").text(rangeValues[$(this).val()]);
  });
});

$(function () {
  $("#resetForm").click(function () {
    $("#priorityText").text("3");
  });
});

$(function () {
  $("#clearTable").click(function () {
    $("table tbody").html('');
  })
})

$(function () {
  $("#clearStorage").click(function () {
    localStorage.clear();
  })
})
