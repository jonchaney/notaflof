import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const { userId, accessToken } = require("./keys");
const fetch = require("node-fetch");

async function getEvents(url, callBack) {
  try {
    const response = await fetch(
      `https://graph.facebook.com/v3.1/${userId}?fields=events.limit(50)&access_token=${accessToken}`
    );
    const res = await response.json();
    if (!res) return console.log("nothing found");
    callBack(res);
  } catch (err) {
    callBack(err);
  }
}

const printEvents = res => console.log(res.events);
const url = `https://graph.facebook.com/v3.1/${userId}?fields=events&access_token=${accessToken}&limit=30`;

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<App />, document.getElementById("root"));
  registerServiceWorker();
  getEvents(url, printEvents);
});
