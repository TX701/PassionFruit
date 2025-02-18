let order = ["home"]; // array to check zindex placement for windows
const moveWin = new Map();

// dynamically changes zindex of windows based off of what was clicked most recently
const bringToTop = (name) => {
  if (order.indexOf(name) != -1) {
    let filteredArray = order.filter((e) => e != name); // if its open remove it  from the order index
    order = filteredArray;
  }

  order.unshift(name); // make window the first element in order

  order.forEach((element) => {
    document.getElementById(`${element}tab`).style.backgroundColor = name == element ? "#e8e8e8" : "#bfbfbf";

    let placement = order.length - order.indexOf(element); // go through order and make the zindex of each window match its placement in reverse (ie 0 = length, 1 = length - 1)
    document.getElementById(element).style.zIndex = placement;
  });

  document.getElementById("footer").style.zIndex = order.length + 1; // give the footer the highest zindex

  console.log(order);
  console.log(moveWin);
};

// when opening a new window its best to know how many of that "type" (home/gall/etc) are already open for id naming purposes
const getWindowTotal = (name) => {
  let filteredArray = order.filter((e) => e.indexOf(name) != -1);

  console.log(filteredArray)
  if (filteredArray.length == 0) {
    return "";
  } else {
    return filteredArray.length + 1;
  }
};

const draggableWindow = (name) => {
  document.getElementById(name).addEventListener("mousedown", (e) => {
    let initialX = e.clientX;
    let initialY = e.clientY;

    const moveElement = (e) => {
      if (moveWin.get(name)) {
        let currentX = e.clientX;
        let currentY = e.clientY;
        document.getElementById(name).style.left = document.getElementById(name).offsetLeft + (currentX - initialX) + "px";
        document.getElementById(name).style.top = document.getElementById(name).offsetTop + (currentY - initialY) + "px";
        initialX = currentX;
        initialY = currentY;
      }
      
    };

    const stopElement = () => {
      document.removeEventListener("mousemove", moveElement);
      document.removeEventListener("mouseup", stopElement);
    };

    document.addEventListener("mousemove", moveElement);
    document.addEventListener("mouseup", stopElement);
  });
};

const addToTaskBar = (name, type) => {
  let newTab = `<div class="tabs" id="${name}tab">
                    <img src="./assets/${type}.png" alt="Image Broken" />
                    <p>${type.charAt(0).toUpperCase()}${type.substring(1)}</p>
                    </div>`;
  
  document.getElementById("window-tabs").insertAdjacentHTML("beforeend", newTab);

  document.getElementById(`${name}tab`).addEventListener("click", () => {
    bringToTop(name);

    if (document.getElementById(name).style.display == "none") {
      document.getElementById(name).style.display = "block";
    }
  })
};

const windowSetUp = (name, type) => {
  draggableWindow(name); // make the window moveable

  moveWin.set(name, true); // add window to movement map

  // bring to top if the window is clicked on
  document.getElementById(name).addEventListener("mousedown", () => {
    bringToTop(name);
  });

  // add icon to task bar
  addToTaskBar(name, type);

  // adds functionality to the maximize button
  document.getElementById(`${name}-max`).addEventListener("click", () => {
    document.getElementById(name).style.height = "100vh";
    document.getElementById(name).style.width = "100vw";
    document.getElementById(name).style.top = 0;
    document.getElementById(name).style.left = 0;
    document.getElementById(name).style.overflow = "hidden";
    // document.getElementById(name).style.border = "none";

    document.querySelector(`#${name}-topbar`).style.top = "0";
    document.querySelector(`#${name}-topbar`).style.width = "100%";

    moveWin.set(name, false); // the window cannot move in fullscreen mode

    document.getElementById(`${name}-max`).style.display = "none";
    document.getElementById(`${name}-min`).style.display = "block";
  });

  // adds functionality to the minimize button
  document.getElementById(`${name}-min`).addEventListener("click", () => {
    document.getElementById(name).style.height = "25rem";
    document.getElementById(name).style.width = "40rem";
    document.getElementById(name).style.top = "10%";
    document.getElementById(name).style.left = "25%";
    document.getElementById(name).style.overflow = "";

    // document.getElementById(name).style.border = "none";

    document.querySelector(`#${name}-topbar`).style.top = "0.1%";
    document.querySelector(`#${name}-topbar`).style.width = "99.5%";

    moveWin.set(name, true);

    document.getElementById(`${name}-max`).style.display = "block";
    document.getElementById(`${name}-min`).style.display = "none";
  });

  // adds functionality to the tray button
  document.getElementById(`${name}-tray`).addEventListener("click", () => {
    document.getElementById(name).style.display = "none";
    document.getElementById(`${name}tab`).style.backgroundColor = "#bfbfbf";
  });

  // adds functionality to the exit button
  document.getElementById(`${name}-exit`).addEventListener("click", () => {
    document.getElementById("windows").removeChild(document.getElementById(name));

    document.getElementById("window-tabs").removeChild(document.getElementById(`${name}tab`));

    let filteredArray = order.filter((e) => e != name); // remove window from order array
    order = filteredArray;

    moveWin.delete(name); // remove window from movement array
  });
  bringToTop(name); // bring to top and add window to the order array
};

document.getElementById(`home-icon`).addEventListener("dblclick", () => {
  console.log(getWindowTotal("home"));
  homeWindow(getWindowTotal("home"));
});

// clock in footer
const setTime = () => {
  let date = new Date();
  let time = ("0" + (date.getHours() % 12 || 12)).slice(-2);
  let AMPM = date.getHours() < 12 ? "AM" : "PM";

  currentTime.innerHTML = `<p>${time}:${("0" + date.getMinutes()).slice(
    -2
  )} ${AMPM}</p>`;
};

const currentTime = document.getElementById("time");
setInterval(setTime, 1000);

const menuFunction = (num) => {
  const funct = (name) => {
    document.querySelector(`#home${num} #${name.toLowerCase()}-item`).addEventListener("click", () => {
      let text;

      switch (name) {
        case "Home":
          text = `<p>Hello, This is a start up screen.</p>
                  <p>Please click the icons on the desktop to explore around.</p>
                  <p>
                    You can click on the menu to the left to learn more about each
                    icon
                  </p>`;
          break;
        case "Icons":
          text = `<p>Click on each icon opens a different Window.</p>`;
          break;
        case "Windows":
          text = `<p>Windows work how you would expect.</p>
                  <p>Open, close, and move them as you would like</p>`;
          break;
        case "Start":
          text = `<p>You can click on the start menu at the bottom for a couple customization options</p>`;
          break;
        default:
          break;
      }

      document.querySelector(`#home${num} #menu${num}-text`).innerHTML = text;
    });
  }
  
  funct("Home", num);
  funct("Icons", num);
  funct("Windows", num);
  funct("Start", num);
};

const homeWindow = (num) => {
  const HTML = `<div class="home" id="home${num}">
                  <div class="topbar" id="home${num}-topbar">
                    <div class="left">
                      <img src="./assets/home.png" alt="Broken Image" />
                      <h1>Home</h1>
                    </div>
                    <div class="right">
                      <img class="tray" id="home${num}-tray" src="./assets/tray-icon.png" alt="" />
                      <img class="max" id="home${num}-max" src="./assets/max-icon.png" alt="" />
                      <img class="min" id="home${num}-min" src="./assets/restoredown-icon.png" alt="" />
                      <img id="home${num}-exit" src="./assets/close-icon.png" alt="" />
                    </div>
                  </div>

                  <div class="home-content">
                    <h1>Logo Text</h1>
                    <div class="information">
                      <div class="menu">
                        <div class="contents"><p>Contents</p></div>
                        <div class="menu-item" id="home${num}-item"><p class="home-menu">Home</p></div>
                        <div class="menu-item" id="home${num}-item"><p class="icons-menu">Icons</p></div>
                        <div class="menu-item" id="home${num}-item"><p class="windows-menu">Windows</p></div>
                        <div class="menu-item" id="home${num}-item"><p class="start-menu">Start</p></div>
                      </div>
                      <div id="menu${num}-text">
                      </div>
                    </div>
                  </div>
                </div>`;

  document.getElementById("windows").insertAdjacentHTML("beforeend", HTML);
  
  document.getElementById(`home${num}`).style.left = "25%";
  document.getElementById(`home${num}`).style.top = "20%";

  // menuFunction(num);

  windowSetUp(`home${num}`, "home");
};

const startUp = () => {
  homeWindow("");
  // windowSetUp("gallery");
  // windowSetUp("about");
  // windowSetUp("contact");
};

startUp();
