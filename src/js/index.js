import bar from "./bar.js";
import "../css/myCss.css";
import "../scss/myScss.scss";

import smallImgUrl from "../img/smallImg.png";
import bigImgUrl from "../img/bigImg.jpg";

bar();

let smallImg = document.querySelector("#smallImg");
smallImg.src = smallImgUrl;

let bigImg = document.querySelector("#bigImg");
bigImg.src = bigImgUrl;

const downloadTag = document.querySelector("#downloadButton");
downloadTag.addEventListener(
  "click",
  function () {
    console.log("cloick");
    let filepath = "./assets/a.pdf";
    let filename = "a.pdf";
    let link = document.createElement("a");
    link.setAttribute("download", filename);
    link.href = filepath;
    document.body.appendChild(link);
    link.click();
    link.remove();
  },
  false
);

$("#myJQuery")[0].innerHTML = "edit by jquery";

import axios from "axios";

axios
  .get("https://v2.jokeapi.dev/joke/Any")
  .then(function (response) {
    console.log(response.data);
    let joke = response.data.joke ? response.data.joke : response.data.setup;
    $("#myJoke")[0].innerHTML = joke;
  })
  .catch(function (error) {
    console.log(error);
  });

import("lodash").then((lodash) => {
  let res = lodash.default.add(3, 4);
  $("#myLodash")[0].innerHTML = res;
});
