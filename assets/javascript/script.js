var config = {
  apiKey: "AIzaSyAPw4tOXUv8ckhfqzNCZvD0OOoerJtcNTM",
  authDomain: "trainschedule-14c52.firebaseapp.com",
  databaseURL: "https://trainschedule-14c52.firebaseio.com",
  projectId: "trainschedule-14c52",
  storageBucket: "trainschedule-14c52.appspot.com",
  messagingSenderId: "802493873874"
};

var myConfig = config;

firebase.initializeApp(myConfig);

var database = firebase.database();

$("#submit").on("click", function(event) {
    event.preventDefault();
  
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var trainTime = $("#trainTime").val().trim();
    var frequency = $("#frequency").val().trim();
  
  
    var train = {
      trainName: trainName,
      destination: destination,
      trainTime: trainTime,
      frequency: frequency
    };
  
    
    database.ref().push(train);
  
    console.log(train.trainName);
    console.log(train.destination);
    console.log(train.trainTime);
    console.log(train.frequency);
  
    alert("Train successfully added");
  
    $("#trainName").val("");
    $("#destination").val("");
    $("trainTime").val("");
    $("#frequency").val("");
  });
  
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    var trainName = childSnapshot.val().trainName;
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().trainTime;
    var trainFrequency = childSnapshot.val().frequency;
  
    
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFrequency);
  
    
    var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % trainFrequency;
    console.log(tRemainder);

    var tMinutesTillTrain = trainFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm A"));
  
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainFrequency),
      $("<td>").text(moment(nextTrain).format("hh:mm A")),
      $("<td>").text(tMinutesTillTrain)
    );
  
    $("#trainTable > tbody").append(newRow);
  });

