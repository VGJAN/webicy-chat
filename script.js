// Initialize Firebase
var config = {
	apiKey: "AIzaSyD_Rq60pDAiRZs3TmRKFaS1noQfapFg67w",
	authDomain: "bamboo-host-324719.firebaseapp.com",
	databaseURL: "https://bamboo-host-324719-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "bamboo-host-324719",
	storageBucket: "bamboo-host-324719.appspot.com",
	messagingSenderId: "1089061856563",
	appId: "1:1089061856563:web:244662e679edbac7268a46"
};
firebase.initializeApp(config);

//Define username before comparing it
var username = ''

//Force to get username
while (username == '' || username.indexOf(' ') >= 0 || username.length < 3 || username.length > 10) {
	//Get username
	var username = prompt("Please enter an username between 3-10 characters. No spaces. Use underscore instead spaces")
};

//Get elements
var messageList = document.getElementById('message-list');
var messageForm = document.getElementById('message-form');
var messageInput = document.getElementById('message-input');
var clearChat = document.getElementById("clearChat");

//Create variables
var messagesRef = firebase.database().ref('messages');

// Listen for form submit
messageForm.addEventListener('submit', submitForm);

//Submit form
function submitForm(e) {
	e.preventDefault();

	//Get value
	var message = messageInput.value;

	//Save Message
	saveMessage(message);

	//Clear input field
	messageInput.value = '';
}

//Connect to the firebase and fetch the messages
//Listen for realtime changes
//limitToLast(20) means it can receive max of 20 children 
messagesRef.limitToLast(100).on('value', function(snapshot) {
	//Get messages object
	var messages = snapshot.val();

	messageList.innerHTML = ''

	//Loop through the messages object
	for (var key in messages) {
		var user = messages[key].user;
		var text = messages[key].message;
		var time = messages[key].time

		//Create a li element
		var messageElement = document.createElement('li');
		messageElement.innerHTML = "<i class='fa-solid fa-circle-user'></i>" + " " + "<b>" + user + "</b>" + ": " + "<font id='text'>" + text + "</font>" + "&nbsp&nbsp&nbsp" + "<font id='time'>" + time + "</font>";

		//Append li to ul
		messageList.appendChild(messageElement);
	}
	messageList.scrollTop = messageList.scrollHeight;
});

//Function to save the messages
function saveMessage(message) {
	//Create variable to store message data
	var newMessageRef = messagesRef.push();
	newMessageRef.set({
		user: username,
		message: message,
		time: new Date().toLocaleTimeString()
	});
}

//Function to delete all the chat records
clearChat.onclick = function() {
	firebase.database().ref('messages').remove();
}

//Clock function
setInterval(liveClock, 1000);

function liveClock() {
	document.getElementById("clock").innerHTML = new Date().toLocaleTimeString();
}