const socket = io();

const keyBindings = {
  "ArrowUp": "accelerate",
  "ArrowDown": "reverse",
  "ArrowLeft": "turnLeft",
  "ArrowRight": "turnRight"
};

const actionToElement = {
  accelerate: document.getElementById("up"),
  reverse: document.getElementById("down"),
  turnLeft: document.getElementById("left"),
  turnRight: document.getElementById("right")
};

const driveLabel = document.getElementById("driveState");
const turnLabel = document.getElementById("turnState");

window.onload = () => {
  window.addEventListener("keydown", (event) => {
	if (event.repeat) return;
	const action = keyBindings[event.key];
	if (action) {
	  socket.emit("keyDownEvent", action);
	  actionToElement[action].classList.add("active");
	  updateStatus(action, true);
	}
  });

  window.addEventListener("keyup", (event) => {
	if (event.repeat) return;
	const action = keyBindings[event.key];
	if (action) {
	  socket.emit("keyUpEvent", action);
	  actionToElement[action].classList.remove("active");
	  updateStatus(action, false);
	}
  });
};

function updateStatus(action, active) {
  if (action === "accelerate" || action === "reverse") {
	driveLabel.textContent = `Drive: ${active ? action.toUpperCase() : "IDLE"}`;
  } else if (action === "turnLeft" || action === "turnRight") {
	turnLabel.textContent = `Turn: ${active ? action.replace("turn", "").toUpperCase() : "STRAIGHT"}`;
  }
}