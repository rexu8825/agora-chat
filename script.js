// Javascript
// Note that to avoid browser-compatibility issues, this sample uses the import command to import the SDK and the vite to package the JS file.
import AC from 'agora-chat'
// Replaces <Your app key> with your app key.
const appKey = "611209624#1398488";
// Initializes the Web client.
const conn = new AC.connection({
	appKey: appKey,
});

// Function to initialize connection
function initializeConnection(userId, token) {
    conn.open({
        user: userId,
        agoraToken: token,
    });
}

conn.addEventHandler('connection&message', {
    
    // Occurs when the app is disconnected from Agora Chat.
    onDisconnected: () => {
        document
            .getElementById("log")
            .appendChild(document.createElement("div"))
            .append("Logout success!");
    },

	// Occurs when a text message is received.
	onTextMessage: (message) => {
		console.log(message);
		document
			.getElementById("log")
			.appendChild(document.createElement("div"))
			.append("Message from: " + message.from + " Message: " + message.msg);
	},
})

window.onload = function () {
    const storedUserID = sessionStorage.getItem('userID');
    const storedToken = sessionStorage.getItem('token');

    if (storedUserID && storedToken) {
        // Initialize connection with stored credentials
        initializeConnection(storedUserID, storedToken);
    } else {
        // Redirect to login if no stored credentials
        window.location.replace('./index.html');
    }

	// Logs out.
	document.getElementById("logout").onclick = function () {
		conn.close();
		document
			.getElementById("log")
			.appendChild(document.createElement("div"))
			.append("logout");
        window.location.replace('./index.html')
	};

    document.getElementById('send_peer_message').onclick = () => {
        // Sends a peer-to-peer message.
        const peerID = document.getElementById('peerId').value.toString();
        const peerMsg = document.getElementById('peerMessage').value.toString();
        let options = {
            chatType: "singleChat", // Sets the chat type as single chat.
            type: "txt", // Sets the message type.
            to: peerID, // Sets the recipient of the message with user ID.
            msg: peerMsg, // Sets the message content.
        };
        const msg = AC.message.create(options);
        conn.send(msg).then((res) => {
            console.log("Private Message Sent!!!");
				document.getElementById('log').appendChild(document.createElement('p')).append("Message sent to: " + peerID + " Message: " + peerMsg)
        })
        .catch((error) => {
            console.log("send private text fail: ", error);
            document
			.getElementById("log")
			.appendChild(document.createElement("div"))
			.append("send private text fail: ", error.message);
        });
    }
}