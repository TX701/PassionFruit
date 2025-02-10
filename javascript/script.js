// home window menu operations
let menuPv = "home";

const menuSetUp = (name) => {
  let homeText =
    "<p>Hello, This is a start up screen.</p><p>Please click the icons on the desktop to explore around.</p><p>You can click on the menu to the left to learn more .</p>";
  let iconText = "<p>Click on each icon opens a different Window.</p>";
  let windowText =
    "<p>Windows work how you would expect.</p><p>Open, close, and move them as you would like</p>";
  let startText =
    "You can click on the start menu at the bottom for a couple customization options";

  document.getElementById(`${name}-menu`).addEventListener("click", () => {
    document.getElementById(`${menuPv}-menu`).innerHTML = `${menuPv
      .charAt(0)
      .toUpperCase()}${menuPv.substring(1)}`;
    document.getElementById(`${name}-menu`).innerHTML = `>> ${name
      .charAt(0)
      .toUpperCase()}${name.substring(1)}`;

    menuPv = name;

    switch (name) {
      case "home":
        document.getElementById("menu-text").innerHTML = homeText;
        break;
      case "icons":
        document.getElementById("menu-text").innerHTML = iconText;
        break;
      case "window":
        document.getElementById("menu-text").innerHTML = windowText;
        break;
      case "start":
        document.getElementById("menu-text").innerHTML = startText;
        break;
      default:
        break;
    }
  });

  // close out of menu
  document.getElementById("menu-close").addEventListener("click", () => {
    document.getElementById("home").style.display = "none";

    document
      .getElementById("window-tabs")
      .removeChild(document.getElementById(`hometab`));
  });
};

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

const startUp = () => {
  windowSetUp("home");
  windowSetUp("gallery");
  windowSetUp("about");
  windowSetUp("contact");

  menuSetUp("home");
  menuSetUp("icons");
  menuSetUp("window");
  menuSetUp("start");
}

startUp();