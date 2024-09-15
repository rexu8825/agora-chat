// Javascript
// Note that to avoid browser-compatibility issues, this sample uses the import command to import the SDK and the vite to package the JS file.
import AC from 'agora-chat'
// Replaces <Your app key> with your app key.
const appKey = "611209624#1398488";
// Initializes the Web client.
const conn = new AC.connection({
	appKey: appKey,
});
// Adds the event handler.
conn.addEventHandler("connection&message", {
	// Occurs when the app is connected to Agora Chat.
	onConnected: () => {
		document
			.getElementById("log")
			.appendChild(document.createElement("div"))
			.append("Logged in!");
        window.location.replace('./2nd-page.html')
	},
	// Occurs when the app is disconnected from Agora Chat.
	onDisconnected: () => {
		document
			.getElementById("log")
			.appendChild(document.createElement("div"))
			.append("Disconnected!");
	},
	// Occurs when the token is about to expire.
	onTokenWillExpire: (params) => {
		document
			.getElementById("log")
			.appendChild(document.createElement("div"))
			.append("Token is about to expire");
	},
	// Occurs when the token has expired. 
	onTokenExpired: (params) => {
		document
			.getElementById("log")
			.appendChild(document.createElement("div"))
			.append("The token has expired");
	},
	onError: (error) => {
		console.log("on error", error);
		document
			.getElementById("log")
			.appendChild(document.createElement("div"))
			.append("Error: ", error.message);
	},
});

// Defines the functions of the buttons.
window.onload = function () {
	// Logs into Agora Chat.
	document.getElementById("login").onclick = function () {
		document
			.getElementById("log")
			.appendChild(document.createElement("div"))
			.append("Logging in...");
		const userId = document.getElementById("userID").value.toString();
		const token = document.getElementById("token").value.toString();

        // Store userID and token in sessionStorage
        sessionStorage.setItem('userID', userId);
        sessionStorage.setItem('token', token);

		conn.open({
			user: userId,
			agoraToken: token,
		});
	};
};
