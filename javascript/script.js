import { homeWindow } from "./windows.js";
import { aboutWindow } from "./windows.js";
import { galleryWindow } from "./windows.js"; 

window.order = []; // array to check zindex placement for windows
window.popUp = ""; // a cookie that determines if the user sees the home screen on website launch

const getCookie = () => {
  let current = decodeURIComponent(document.cookie).split(';');
  for(let i = 0; i < current.length; i++) {
    let first = current[i];
    while (first.charAt(0) === " ") {
      first = first.substring(1);
    }
    if (first.indexOf("popup=") == 0) {
      return JSON.parse(first.substring(("popup=").length, first.length));
    }
  } 
  return "";
}

// when opening a new window we need to know how many of that "type" (home/gall/etc) are already open for id naming purposes
export const getWindowTotal = (name) => {
  let filteredArray = order.filter((e) => e.indexOf(name) != -1);

  if (filteredArray.length == 0) {
    return ""; // there are zero so the id will just be the type
  } else {
    return filteredArray.length + 1; // there are some so the id will be one more than the current amount
  }
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

// clock in footer
const setTime = () => {
  const currentTime = document.getElementById("time");

  let date = new Date();
  let time = ("0" + (date.getHours() % 12 || 12)).slice(-2);
  let AMPM = date.getHours() < 12 ? "AM" : "PM";

  currentTime.innerHTML = `<p>${time}:${("0" + date.getMinutes()).slice(-2)} ${AMPM}</p>`;
};

const startUp = () => {
  setInterval(setTime, 1000);
  popUp = getCookie();

  if (popUp === "") {
    document.cookie = `popup=true`; 
    popUp = getCookie();
  }

  if (popUp === true) {
    homeWindow("");
  }
};

startUp();