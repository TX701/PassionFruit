// if the window is being clicked on, set its zindex to 2 so its on the top
const bringToTop = (name) => {
  document.getElementById("home").style.zIndex = name != "home" ? 1 : 2;
  document.getElementById("gallery").style.zIndex = name != "gallery" ? 1 : 2;
  document.getElementById("about").style.zIndex = name != "about" ? 1 : 2;
  document.getElementById("contact").style.zIndex = name != "contact" ? 1 : 2;
};

const addToTaskBar = (name) => {
  let newTab = `<div class="tabs" id="${name}tab">
                    <img src="./assets/${name}.png" alt="Image Broken" />
                    <p>${name.charAt(0).toUpperCase()}${name.substring(1)}</p>
                    </div>`;
  document.getElementById("window-tabs").innerHTML += newTab;
};

// window moving
const draggableWindow = (window) => {
  window.addEventListener("mousedown", (e) => {
    let initialX = e.clientX;
    let initialY = e.clientY;

    const moveElement = (e) => {
      let currentX = e.clientX;
      let currentY = e.clientY;
      window.style.left = window.offsetLeft + (currentX - initialX) + "px";
      window.style.top = window.offsetTop + (currentY - initialY) + "px";
      initialX = currentX;
      initialY = currentY;
    };

    const stopElement = () => {
      document.removeEventListener("mousemove", moveElement);
      document.removeEventListener("mouseup", stopElement);
    };

    document.addEventListener("mousemove", moveElement);
    document.addEventListener("mouseup", stopElement);
  });
};

const windowSetUp = (name) => {
  const window = document.getElementById(name);

  draggableWindow(window);

  // bring to top if the window is clicked on
  document.getElementById(name).addEventListener("mousedown", () => {
    bringToTop(name);
  });

  // close out of window
  document.getElementById(`${name}-exit`).addEventListener("click", () => {
    window.style.display = "none";

    document
      .getElementById("window-tabs")
      .removeChild(document.getElementById(`${name}tab`));
  });

  // open window
  document.getElementById(`${name}-icon`).addEventListener("dblclick", () => {
    // only open a tab on the task bar if one doesnt already exist
    if (document.getElementById(`${name}tab`) == null) {
      addToTaskBar(name);
    }
    window.style.display = "block";
    bringToTop(name);
  });
};

// clock in footer
const setTime = () => {
  let date = new Date();
  let AMPM = date.getHours() < 13 ? "AM" : "PM";

  currentTime.innerHTML = `<p>${date.getHours() % 12}:${(
    "0" + date.getMinutes()
  ).slice(-2)} ${AMPM}</p>`;
};
const currentTime = document.getElementById("time");
setInterval(setTime, 1000);

windowSetUp("home");
windowSetUp("gallery");
windowSetUp("about");
windowSetUp("contact");
