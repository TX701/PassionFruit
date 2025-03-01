let order = ["home"]; // array to check zindex placement for windows

// array for gallery items
let gallery = [
  {
    file: "Blossoms",
    ext: "jpg",
    desc: "A semi up-close shot of deep pink cherry blossoms.",
  },
  {
    file: "CherryBlossoms",
    ext: "jpg",
    desc: "An up-close shot of light pink cherry blossoms.",
  },
  {
    file: "Hummingbird",
    ext: "jpg",
    desc: "An up-close shot of a hummingbird about to drink from a bright red hibiscus flower.",
  },
  {
    file: "Landscape",
    ext: "jpg",
    desc: "A wide shot of a lake, surrounded by bright green grass and purple and red flowers.",
  },
  {
    file: "PinkFlowers",
    ext: "jpg",
    desc: "An up-close shot of light pink fuzzy flowers.",
  },
];

const windowDetails = new Map(); // [windowname, {moveable: boolean, winHeight: valuepx, winWidth: valuepx}]

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
};

// when opening a new window we need to know how many of that "type" (home/gall/etc) are already open for id naming purposes
const getWindowTotal = (name) => {
  let filteredArray = order.filter((e) => e.indexOf(name) != -1);

  if (filteredArray.length == 0) {
    return ""; // there are zero so the id will just be the type
  } else {
    return filteredArray.length + 1; // there are some so the id will be one more than the current amount
  }
};

const draggableElement = (name) => {
  document.getElementById(name).addEventListener("mousedown", (e) => {
    let initialX = e.clientX;
    let initialY = e.clientY;

    const moveElement = (e) => {
      if (windowDetails.get(name).moveable) {
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

// add element to the task bar at the bottom of the page
const addToTaskBar = (name, type) => {
  let fileLocation = `${type}.png`;

  if (type.indexOf(".") > 0) {
    fileLocation = `gallery/${type}`;
  }

  let newTab = `<div class="tabs" id="${name}tab">
                  <img src="./assets/${fileLocation}" alt="Image Broken" />
                  <p>${type.charAt(0).toUpperCase()}${type.substring(1)}</p>
                </div>`;

  document.getElementById("window-tabs").insertAdjacentHTML("beforeend", newTab);

  document.getElementById(`${name}tab`).addEventListener("click", () => {
    bringToTop(name);

    if (document.getElementById(name).style.display == "none") {
      document.getElementById(name).style.display = "block"; // if the window is in the tray get it out of the tray
    }
  });
};

// clock in footer
const setTime = () => {
  const currentTime = document.getElementById("time");

  let date = new Date();
  let time = ("0" + (date.getHours() % 12 || 12)).slice(-2);
  let AMPM = date.getHours() < 12 ? "AM" : "PM";

  currentTime.innerHTML = `<p>${time}:${("0" + date.getMinutes()).slice(-2)} ${AMPM}</p>`;
};

const windowSetUp = (name, type) => {
  draggableElement(name); // make the window moveable

  windowDetails.set(name, {moveable: true, winHeight: document.getElementById(name).offsetHeight + "px", winWidth: document.getElementById(name).offsetWidth + "px"}); // add window to details map

  document.getElementById(name).addEventListener("mousedown", () => {
    bringToTop(name); // bring to top if the window is clicked on
  });

  addToTaskBar(name, type); // add icon to task bar

  if (type != "home") {
    // adds functionality to the maximize button
    document.getElementById(`${name}-max`).addEventListener("click", () => {
      document.getElementById(name).style.height = "100vh";
      document.getElementById(name).style.width = "100vw";
      document.getElementById(name).style.top = "0";
      document.getElementById(name).style.left = "0";
      document.getElementById(name).style.overflow = "hidden";

      document.querySelector(`#${name}-topbar`).style.top = "0";
      document.querySelector(`#${name}-topbar`).style.width = "100%";

      windowDetails.set(name, {moveable: false, winHeight: windowDetails.get(name).winHeight, winWidth: windowDetails.get(name).winWidth}); // the window cannot move in fullscreen mode

      document.getElementById(`${name}-max`).style.display = "none";
      document.getElementById(`${name}-min`).style.display = "block";
    });

    // adds functionality to the minimize button
    document.getElementById(`${name}-min`).addEventListener("click", () => {
      document.getElementById(name).style.height = windowDetails.get(name).winHeight;
      document.getElementById(name).style.width = windowDetails.get(name).winWidth;

      document.getElementById(name).style.top = "10%";
      document.getElementById(name).style.left = "25%";
      document.getElementById(name).style.overflow = "";

      document.querySelector(`#${name}-topbar`).style.top = "0.1%";
      document.querySelector(`#${name}-topbar`).style.width = "99.5%";

      windowDetails.set(name, {moveable: true, winHeight: windowDetails.get(name).winHeight, winWidth: windowDetails.get(name).winWidth});

      document.getElementById(`${name}-max`).style.display = "block";
      document.getElementById(`${name}-min`).style.display = "none";
    });

    // adds functionality to the tray button
    document.getElementById(`${name}-tray`).addEventListener("click", () => {
      document.getElementById(name).style.display = "none";
      document.getElementById(`${name}tab`).style.backgroundColor = "#bfbfbf";
    });
  }

  // adds functionality to the exit button
  document.getElementById(`${name}-exit`).addEventListener("click", () => {
    document.getElementById("windows").removeChild(document.getElementById(name));

    document.getElementById("window-tabs").removeChild(document.getElementById(`${name}tab`));

    let filteredArray = order.filter((e) => e != name); // remove window from order array
    order = filteredArray;

    windowDetails.delete(name); // remove window from movement array
  });

  bringToTop(name); // bring to top and add window to the order array
};

document.getElementById("home-icon").addEventListener("dblclick", () => {
  homeWindow(getWindowTotal("home"));
});

document.getElementById("gallery-icon").addEventListener("dblclick", () => {
  galleryWindow(getWindowTotal("gallery"));
});

document.getElementById("about-icon").addEventListener("dblclick", () => {
  aboutWindow(getWindowTotal("about"));
});

const homeWindow = (num) => {
  const HTML = `<div class="home" id="home${num}">
                  <div class="topbar" id="home${num}-topbar">
                    <div class="left">
                      <img src="./assets/home.png" alt="Broken Image" />
                      <h1>Home</h1>
                    </div>
                    <div class="right">
                      <img id="home${num}-exit" src="./assets/close-icon.png" alt="" />
                    </div>
                  </div>

                  <div class="home-content">
                    <h1>Passion Fruit</h1>
                    <div class="information">
                      <div class="menu">
                        <div class="contents"><p>Contents</p></div>
                        <div class="menu-item" id="home${num}-item"><p class="home-menu${num}">>> Home</p></div>
                        <div class="menu-item" id="home${num}-item"><p class="icons-menu${num}">Icons</p></div>
                        <div class="menu-item" id="home${num}-item"><p class="windows-menu${num}">Windows</p></div>
                      </div>
                      <div class="menu-text" id="menu${num}-text">
                        <p>Hello, This is a start up screen.</p>
                        <p>Please click the icons on the desktop to explore around.</p>
                        <p>You can click on the menu to the left to learn more about each icon.</p>
                      </div>
                    </div>
                  </div>
                </div>`;

  document.getElementById("windows").insertAdjacentHTML("beforeend", HTML);
  
  const menuFunction = () => {
    let prevMenu = "home";

    const funct = (name) => {
      document.querySelector(`#home${num} .${name}-menu${num}`).addEventListener("click", () => {
        let text;
        switch (name) {
          case "home":
            text = `<p>Hello, This is a start up screen.</p>
                    <p>Please click the icons on the desktop to explore around.</p>
                    <p>You can click on the menu to the left to learn more about each icon.</p>`;
            break;
          case "icons":
            text = `<p>Each icon will open a different window.</p>
                    <p>You will need to double click on an icon to open a new window.</p>
                    <p>You may open multiple of the same window.</p>`;
            break;
          case "windows":
            text = `<p>Windows work how you would expect.</p>
                    <p>Open, close, and move them as you would like.</p>
                    <p>Most windows will also have functions to minize to the tray or expand to be bigger, these functions will be by the close icon in the top left.</p>`;
            break;
          default:
            break;
        }

        document.querySelector(`#home${num} .${name}-menu${num}`).innerHTML = `>> ${name.charAt(0).toUpperCase()}${name.slice(1)}`; // add an indicator that the current menu item is selected
        document.querySelector(`#home${num} .${prevMenu}-menu${num}`).innerHTML = `${prevMenu.charAt(0).toUpperCase()}${prevMenu.slice(1)}`; // remove this indicator from the previously selected item
        document.querySelector(`#home${num} #menu${num}-text`).innerHTML = text; // change the text to match the currently selected item
          
        prevMenu = name;
      });
    };

    funct("home", num);
    funct("icons", num);
    funct("windows", num);
  };

  menuFunction();
  windowSetUp(`home${num}`, "home");
};

const imageWindow = (image, num) => {
  const HTML = `<div class="image-window" id="${image.file}${num}">
                  <div class="topbar" id="${image.file}${num}-topbar">
                    <div class="left">
                      <img src="./assets/gallery/${image.file}.${image.ext}" alt="Broken Image" />
                      <h1>${image.file}.${image.ext}</h1>
                    </div>
                    <div class="right">
                      <img
                        class="tray"
                        id="${image.file}${num}-tray"
                        src="./assets/tray-icon.png"
                        alt=""
                      />
                      <img
                        class="max"
                        id="${image.file}${num}-max"
                        src="./assets/max-icon.png"
                        alt=""
                      />
                      <img
                        class="min"
                        id="${image.file}${num}-min"
                        src="./assets/restoredown-icon.png"
                        alt=""
                      />
                      <img id="${image.file}${num}-exit" src="./assets/close-icon.png" alt="" />
                    </div>
                  </div>
                  <img src="./assets/gallery/${image.file}.${image.ext}" alt="Broken Image" draggable="false">
                </div>`;

  document.getElementById("windows").insertAdjacentHTML("beforeend", HTML);
  windowSetUp(`${image.file}${num}`, `${image.file}.${image.ext}`);
};

const galleryWindow = (num) => {
  const HTML = `<div class="gallery" id="gallery${num}">
                  <div class="topbar" id="gallery${num}-topbar">
                    <div class="left">
                      <img src="./assets/gallery.png" alt="Broken Image" />
                      <h1>Gallery</h1>
                    </div>
                    <div class="right">
                      <img
                        class="tray"
                        id="gallery${num}-tray"
                        src="./assets/tray-icon.png"
                        alt=""
                      />
                      <img
                        class="max"
                        id="gallery${num}-max"
                        src="./assets/max-icon.png"
                        alt=""
                      />
                      <img
                        class="min"
                        id="gallery${num}-min"
                        src="./assets/restoredown-icon.png"
                        alt=""
                      />
                      <img id="gallery${num}-exit" src="./assets/close-icon.png" alt="" />
                    </div>
                  </div>

                  <div class="options-bar">
                    <div class="options-bar-divider"></div>
                    <div class="options-bar-elements">
                      <p><span>F</span>ile</p>
                      <p><span>E</span>dit</p>
                      <p><span>V</span>iew</p>
                      <p><span>G</span>o</p>
                      <p>F<span>a</span>vorites</p>
                      <p><span>T</span>ools</p>
                      <p><span>H</span>elp</p>
                    </div>
                    <div class="options-bar-divider"></div>
                  </div>

                  <div class="img-gallery">
                    <div class="left">
                      <img src="./assets/gallery.png" alt="" />
                      <h1>Gallery</h1>
                      <div class="divider">
                          <div class="red"></div>
                          <div class="yellow"></div>
                          <div class="green"></div>
                          <div class="blue"></div>
                      </div>
                      <div class="img-text">
                        <p>Select an image to view its description</p>
                        <p>Double click to open the picture in its own window</p>
                      </div>
                    </div>
                    <div class="images"></div>
                  </div>

                  <div class="gallery-footer">
                      <div class="object-amt"></div>
                      <div class="location">
                          <img src="./assets/home.png" alt="">
                          <p>My Computer</p>
                      </div>
                  </div>
                </div>`;

  document.getElementById("windows").insertAdjacentHTML("beforeend", HTML);

  const gallerySetUp = () => {
    let prevImg = "";
    let amt = 0;

    gallery.forEach((element) => {
      let imgHTML = ` <div class="gall-icon" id="${element.file}-icon">
                        <div class="img-icon"><div class="img-filter"></div></div>
                        <p>${element.file}.${element.ext}</p>
                      </div>`;

      document.querySelector(`#gallery${num} .images`).insertAdjacentHTML("beforeend", imgHTML);

      document.querySelector(`#gallery${num} #${element.file}-icon .img-icon`).style.backgroundImage = `url(./assets/gallery/${element.file}.${element.ext})`;

      document.querySelector(`#gallery${num} #${element.file}-icon`).addEventListener("click", () => {
        document.querySelector(`#gallery${num} #${element.file}-icon p`).style.color = "#fff"; // change text to white
        document.querySelector(`#gallery${num} #${element.file}-icon p`).style.background = "rgba(0, 0, 128, 1)"; // make text background blue
        document.querySelector(`#gallery${num} #${element.file}-icon .img-icon`).style.backgroundImage = `linear-gradient(0deg, rgba(0, 0, 128, 0.5), rgba(0, 0, 128, 0.5)), url(./assets/gallery/${element.file}.${element.ext})`;

        document.querySelector(`#gallery${num} .img-text`).innerHTML = `<p>${element.file}.${element.ext}</p> <p>${element.desc}</p>`; // change the side bar text to match the selected image

        if (prevImg != "") {
          document.querySelector(`#gallery${num} #${prevImg.file}-icon p`).style.color = "#000"; // make the previously selected images text go back to normal
          document.querySelector(`#gallery${num} #${prevImg.file}-icon p`).style.background = ""; // set the previous images text background to nothing
          document.querySelector(`#gallery${num} #${prevImg.file}-icon .img-icon`).style.backgroundImage = `url(./assets/gallery/${prevImg.file}.${prevImg.ext})`; // get rid of the blue background filter
        }

        prevImg = element;
      });

      document.querySelector(`#gallery${num} #${element.file}-icon`).addEventListener("dblclick", () => {
        imageWindow(element, getWindowTotal(element.file));  
      });

      document.querySelector(`#gallery${num} .object-amt`).innerHTML = `<p>${++amt} Object(s)</p>`;
    });
  }

  gallerySetUp();
  windowSetUp(`gallery${num}`, "gallery");
};

const aboutWindow = (num) => {
  const HTML = `<div class="about" id="about${num}">
                  <div class="topbar" id="about${num}-topbar">
                    <div class="left">
                      <img src="./assets/about.png" alt="Broken Image" />
                      <h1>About</h1>
                    </div>
                    <div class="right">
                      <img
                        class="tray"
                        id="about${num}-tray"
                        src="./assets/tray-icon.png"
                        alt=""
                      />
                      <img
                        class="max"
                        id="about${num}-max"
                        src="./assets/max-icon.png"
                        alt=""
                      />
                      <img
                        class="min"
                        id="about${num}-min"
                        src="./assets/restoredown-icon.png"
                        alt=""
                      />
                      <img id="about${num}-exit" src="./assets/close-icon.png" alt="" />
                    </div>
                  </div>

                  <div class="about-container">
                    <img src="./assets/profile.jpg" alt="Broken Image" draggable="false">
                    <div class="about-wrapper">
                      <h1>Name</h1>
                      <p>This is an example of an about page. Here, the webpage owner could display information about themselves or the purpose of their website.</p>
                      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia magni commodi, soluta beatae eaque alias quasi quo omnis, provident quia molestiae distinctio. Temporibus voluptatem consequatur alias magnam delectus quaerat natus?</p>
                      <button class="contact-button">Contact</button>
                    </div>
                  </div>
                </div>`;

  document.getElementById("windows").insertAdjacentHTML("beforeend", HTML);
  windowSetUp(`about${num}`, "about");
}

const startUp = () => {
  homeWindow("");
  setInterval(setTime, 1000); // for the clock in the in footer
};

startUp();