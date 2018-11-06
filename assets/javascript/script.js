var myConfig = config;

firebase.initializeApp(myConfig);

var database = firebase.database();

// 2. Button for adding Employees
$("#submit").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var trainTime = $("#trainTime").val().trim();
    // var trainTime = moment($("#trainTime").val().trim(), "MM/DD/YYYY").format("X");
    var frequency = $("#frequency").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var train = {
      trainName: trainName,
      destination: destination,
      trainTime: trainTime,
      frequency: frequency
    };
  
    // Uploads employee data to the database
    database.ref().push(train);
  
    // Logs everything to console
    console.log(train.trainName);
    console.log(train.destination);
    console.log(train.trainTime);
    console.log(train.frequency);
  
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#trainName").val("");
    $("#destination").val("");
    $("trainTime").val("");
    $("#frequency").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().trainName;
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().trainTime;
    var trainFrequency = childSnapshot.val().frequency;
  
    // Employee Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFrequency);
  
    // trainCalc(trainTime, trainFrequency);

    // // Prettify the employee start NEXT ARRIVAL
    // var nextArrival = moment.unix(empStart).format("MM/DD/YYYY");
  
    // // Calculate the months worked using hardcore math
    // // To calculate the months worked MINUTES AWAY
    // var minsAway = moment().diff(moment(empStart, "X"), "months");
    // console.log(minsAway);
  
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % trainFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = trainFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm A"));
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainFrequency),
      $("<td>").text(moment(nextTrain).format("hh:mm A")),
      $("<td>").text(tMinutesTillTrain)
    );
  
    //Append the new row to the table
    $("#trainTable > tbody").append(newRow);
  });

//   function trainCalc(arrivalTime, tFrequency) {
//       // First Time (pushed back 1 year to make sure it comes before current time)
//       var firstTimeConverted = moment(arrivalTime, "HH:mm").subtract(1, "years");
//       console.log(firstTimeConverted);
  
//       // Current Time
//       var currentTime = moment();
//       console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  
//       // Difference between the times
//       var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
//       console.log("DIFFERENCE IN TIME: " + diffTime);
  
//       // Time apart (remainder)
//       var tRemainder = diffTime % tFrequency;
//       console.log(tRemainder);
  
//       // Minute Until Train
//       var tMinutesTillTrain = tFrequency - tRemainder;
//       console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
  
//       // Next Train
//       var nextTrain = moment().add(tMinutesTillTrain, "minutes");
//       console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

//       return nextTrain, tMinutesTillTrain;
//   }