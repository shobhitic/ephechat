import consumer from "./consumer"

document.addEventListener("turbolinks:load", function () {
  let shouldConnect = document.getElementById("chat-msg-page");
  let roomId = document.getElementById("room-id").textContent;

  if (shouldConnect) {
    window.chat = consumer.subscriptions.create({ channel: "ChatChannel", room: roomId }, {
      connected() {
        // Called when the subscription is ready for use on the server
        console.log("connected")
      },

      disconnected() {
        // Called when the subscription has been terminated by the server
        console.log("disconnected")
      },

      received(data) {
        // Called when there's incoming data on the websocket for this channel
        console.log("received", data)
        let msg = data.msg;
        let chatContainer = document.getElementById("chat-msg-page")
        chatContainer.innerHTML += "<p>" + msg + "<br/><em>-- "+ data.user +"</em></p>"
      },

      sendMsg(msg) {
        this.perform('chat', { msg: msg, room: roomId })
      }
    });


    let msgForm = document.getElementById('msg-form');
    msgForm.addEventListener('submit', function (event) {
      event.preventDefault();
      event.stopPropagation();
      let msgInput = document.getElementById('msg-input');
      chat.sendMsg(msgInput.value);
      msgInput.value = "";
    })

  }
})
