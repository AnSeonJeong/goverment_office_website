// main banner
const slider = document.querySelector(".main_banner .banner_wrap");
const slideList = document.querySelectorAll(".main_banner .banner_wrap li");
const sliderPrev = document.querySelector(".main_banner .ctrl .prev");
const sliderPlay = document.querySelector(".main_banner .ctrl .pause");
const sliderNext = document.querySelector(".main_banner .ctrl .next");
const pageNum = document.querySelector(".main_banner .ctrl span");

const PAUSED = "paused";
const HIDDEN = "hidden";
const SELECTED = "selected";
const CLICKED = "clicked";
let duration = 1000;

let p = 1;
function handlePageNum(num) {
  pageNum.innerText = `${num} / 3`;
  p = num;
  p %= 3;
}

let paused = false;
let slide = false;
function doSlide() {
  if (slide) return;

  slide = true;
  slider.style.transition = "0.5s";
  slider.style.left = "-100%";
  handlePageNum(p + 1);
  setTimeout(() => {
    slider.appendChild(slider.firstElementChild);
    slider.removeAttribute("style");
    slide = false;
  }, duration);
}

let slideTimer = setInterval(doSlide, duration);

sliderPrev.addEventListener("click", () => {
  clearInterval(slideTimer);
  slider.style.transition = "0.5s";
  slider.style.left = "100%";
  setTimeout(() => {
    slider.prepend(slider.lastElementChild);
    slider.removeAttribute("style");
    slide = false;
  }, duration);
  handlePageNum(p - 1);
  if (p === 0) {
    p = 3;
    pageNum.innerText = `3 / 3`;
  }
});

sliderPlay.addEventListener("click", () => {
  if (!paused) {
    sliderPlay.classList.add(PAUSED);
    paused = true;
    clearInterval(slideTimer);
  } else {
    sliderPlay.classList.remove(PAUSED);
    paused = false;
    slideTimer = setInterval(doSlide, duration);
  }
});

sliderNext.addEventListener("click", () => {
  clearInterval(slideTimer);
  doSlide();
});

// sliderPrev.addEventListener("mouseleave", (e) => {
//   if (!paused) {
//     slideTimer = setInterval(doSlide, duration);
//   }
// });
// sliderNext.addEventListener("mouseleave", () => {
//   if (!paused) {
//     slideTimer = setInterval(doSlide, duration);
//   }
// });

// notice
const latestList = document.querySelectorAll(".latest_tab li ul");
const latestTitle = document.querySelectorAll(".latest_tab li h3");

function setClass(name1, name2, name3, name4) {
  name1.classList.add(HIDDEN);
  name2.classList.add(HIDDEN);
  name3.classList.add(HIDDEN);
  name4.classList.remove(HIDDEN);
}

function handleTab(e) {
  switch (e.target.innerText) {
    case "보도자료":
      setClass(latestList[1], latestList[2], latestList[3], latestList[0]);
      break;
    case "공지사항":
      setClass(latestList[0], latestList[2], latestList[3], latestList[1]);
      break;
    case "시험정보":
      setClass(latestList[1], latestList[0], latestList[3], latestList[2]);
      break;
    case "고시공고":
      setClass(latestList[1], latestList[2], latestList[0], latestList[3]);
      break;
  }
}
latestTitle.forEach((t) => {
  t.addEventListener("click", handleTab);
});

// popular menu
const popularMenu = document.querySelector(".popular_menu");
const popularPrev = document.querySelector("#main_section3 .prev");
const popularNext = document.querySelector("#main_section3 .next");

const width = 108;
const margin = 19;
const conWidth = width + margin;

let i = 0;
function handleMenu(num1, num2) {
  popularMenu.style.transform = `translateX(${num1 * num2 * conWidth}px)`;
  popularMenu.style.transition = "0.5s";
  i = num1;
}
popularPrev.addEventListener("click", () => {
  handleMenu(i + 1, 1);
  if (i >= 0) {
    i = 0;
    popularMenu.style.transform = `translateX(0px)`;
  }
});

popularNext.addEventListener("click", () => {
  handleMenu(i - 1, 1);
  if (i <= -4) {
    i = -4;
    popularMenu.style.transform = `translateX(-508px)`;
  }
});

// information
const infoBtn = document.querySelectorAll(".info_btn button");
const infoTitle = document.querySelectorAll(".info_box h3");
const info = document.querySelectorAll(".info_box .info");
const infoCon = document.querySelectorAll(".info ul");

function setClass2(name1, name2, name3) {
  name1.classList.add(SELECTED);
  name2.classList.remove(SELECTED);
  name3.classList.remove(SELECTED);
}

function setClass3(name1, name2, name3) {
  name1.classList.add(HIDDEN);
  name2.classList.add(HIDDEN);
  name3.classList.remove(HIDDEN);
}

function handleBtn(e) {
  switch (e.target.innerText) {
    case "시민":
      setClass2(infoBtn[0], infoBtn[1], infoBtn[2]);
      setClass3(infoCon[1], infoCon[2], infoCon[0]);
      break;
    case "기업":
      setClass2(infoBtn[1], infoBtn[0], infoBtn[2]);
      setClass3(infoCon[0], infoCon[2], infoCon[1]);
      break;
    case "관광":
      setClass2(infoBtn[2], infoBtn[1], infoBtn[0]);
      setClass3(infoCon[1], infoCon[0], infoCon[2]);
      break;
  }
}

function handleInfo(e) {
  switch (e.target.innerText) {
    case "사용자별 정보":
      infoTitle[0].classList.add(SELECTED);
      infoTitle[1].classList.remove(SELECTED);
      info[1].classList.add(HIDDEN);
      info[0].classList.remove(HIDDEN);
      break;
    case "분야별 정보":
      infoTitle[1].classList.add(SELECTED);
      infoTitle[0].classList.remove(SELECTED);
      info[0].classList.add(HIDDEN);
      info[1].classList.remove(HIDDEN);
      break;
  }
}

infoBtn.forEach((b) => {
  b.addEventListener("click", handleBtn);
});

infoTitle.forEach((i) => {
  i.addEventListener("click", handleInfo);
});

// footer
const totalBannerPrev = document.querySelector(".total_banner .btn_box .prev");
const totalBannerPlay = document.querySelector(".total_banner .btn_box .play");
const totalBannerNext = document.querySelector(".total_banner .btn_box .next");
const totalBannerCon = document.querySelector(".total_banner_con ul");
const linkWrap = document.querySelectorAll(".bottom_link .link_wrap");
const linkBtn = document.querySelectorAll(".bottom_link .link_wrap button");
const linkList = document.querySelectorAll(
  ".bottom_link .link_wrap .link_list"
);

let rolling = false;
function doRolling() {
  if (rolling) return;

  rolling = true;
  totalBannerCon.style.transition = "0.7s";
  totalBannerCon.style.top = "-100%";

  setTimeout(() => {
    totalBannerCon.appendChild(totalBannerCon.firstElementChild);
    totalBannerCon.removeAttribute("style");
    rolling = false;
  }, 2000);
}

setInterval(doRolling, 2000);

linkWrap.forEach((w) => {
  w.addEventListener("click", (e) => {
    console.dir(e.target.children[2]);
    e.target.children[1].classList.toggle(CLICKED);
    e.target.children[2].classList.toggle(CLICKED);
  });
});
