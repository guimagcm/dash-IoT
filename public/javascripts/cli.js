//JS MQTT
// Create a client instance
client = new Paho.MQTT.Client("broker.mqttdashboard.com", Number(8000), "guima10");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({onSuccess:onConnect});


// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");

  // Recursive function for subscribing to 6 channels
  function subscribeRecursion(i) {
    if (i==7) return i;
    client.subscribe('dash/canal'+String(i));
    subscribeRecursion(i+1)
  }
  subscribeRecursion(1)

  //message = new Paho.MQTT.Message("0.55");
  //message.destinationName = "dash/canal1";
  //client.send(message);
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
  
  // Input channels Choice 
  var reading;
  switch(message.destinationName) {
	case "dash/canal1":
		reading = message.payloadString;
		document.getElementById('canal1').value = reading;
		document.getElementById('Medida1').innerText = reading;
    break;
	case "dash/canal2":
		reading = message.payloadString;
		document.getElementById('canal2').value = reading;
		document.getElementById('Medida2').innerText = reading;
    break;
	case "dash/canal3":
		reading = message.payloadString;
		document.getElementById('canal3').value = reading;
		document.getElementById('Medida3').innerText = reading;
    break;
	default:
		// code block
	}
}

// Output Channels
function ch4() {
  // Get the checkbox
  var checkBox = document.getElementById("canal4");
  // If the checkbox is checked, display the output text
  if (checkBox.checked == false){
		message = new Paho.MQTT.Message("0");
		message.destinationName = "dash/canal4";
		client.send(message);
  } else {
	  	message = new Paho.MQTT.Message("1");
		message.destinationName = "dash/canal4";
		client.send(message);
  }
}

function ch5() {
  // Get the checkbox
  var checkBox = document.getElementById("canal5");
  // If the checkbox is checked, display the output text
  if (checkBox.checked == false){
		message = new Paho.MQTT.Message("0");
		message.destinationName = "dash/canal5";
		client.send(message);
  } else {
	  	message = new Paho.MQTT.Message("1");
		message.destinationName = "dash/canal5";
		client.send(message);
    
  }
}

function ch6() {
  // Get the checkbox
  var checkBox = document.getElementById("canal6");
  // If the checkbox is checked, display the output text
  if (checkBox.checked == false){
		message = new Paho.MQTT.Message("0");
		message.destinationName = "dash/canal6";
		client.send(message);
  } else {
	  	message = new Paho.MQTT.Message("1");
		message.destinationName = "dash/canal6";
		client.send(message);
    
  }
}

