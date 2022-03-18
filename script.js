//DOM selcector
const menu = document.querySelector("#menu-toggle");
const setting = document.querySelector("#setting-toggle");
const backgroundIcon = document.querySelector("#background-toggle");
let check = 0;

//Menu Toggle
menu.addEventListener("click", () => {
  document.querySelector("#nav-menu").classList.toggle("nav-active");
});

//Setting Toggle
setting.addEventListener("click", () => {
  document.querySelector(".setting-box").classList.toggle("setting-box-active");
});

let images = Array.from(document.querySelectorAll(".setting-box img"));

images.map((image) => {
  image.addEventListener("click", () => {
    images.forEach((img) => {
      img.style.opacity = "1";
    });
    document.querySelector(".landing-image").src = image.src;
    image.style.opacity = "0.5";
  });
});

// //Background Toggle
// backgroundIcon.addEventListener("click", (e) => {
//   if (check === 0) {
//     backgroundIcon.classList = "bx bx-moon";
//     localStorage.currentTheme = document.querySelector(
//       "header"
//     ).style.backgroundColor = "black";
//     check = 1;
//     console.log(check);
//   } else {
//     localStorage.currentTheme = document.querySelector(
//       "header"
//     ).style.backgroundColor = "#ffd900";
//     backgroundIcon.classList = "bx bx-sun";
//     check = 0;
//   }
// });

//scroll top
window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    document.querySelector("header").style.backgroundColor = "#f4f4f4";
    document.querySelector(".scroll-top").style.bottom = "20px";
  } else {
    document.querySelector("header").style.backgroundColor = "#ffd900";
    document.querySelector(".scroll-top").style.bottom = "-100px";
  }
});

document.querySelector(".scroll-top").addEventListener("click", () => {
  window.scroll({
    top: 100,
    left: 100,
    behavior: "smooth",
  });
});

//Fetch Movie
const url = {
  apiKey: "api_key=409d4a15dd30f415748fe8d721c34372",
  baseUrl: "https://api.themoviedb.org/3/discover/movie?",
};

const imgUrl = "https://image.tmdb.org/t/p/w500/";

const popular =
  url.baseUrl + url.apiKey + "&language=en-US&sort_by=popularity.desc";

const searchUrl = "https://api.themoviedb.org/3/search/movie?" + url.apiKey;

fetchMovie(popular);
console.log(popular);

function fetchMovie(path) {
  fetch(path)
    .then((res) => res.json())
    .then((data) => showMovie(data));
}

function showMovie(data) {
  res = data.results;

  res.forEach((movies) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
    <div class="img-box">
        <img src="${imgUrl + movies.poster_path}"  alt="">
    </div>
    <div class="details">
        <h3>${movies.original_title}</h3>
        <span>${movies.vote_average.toFixed(1)}</span>
    </div>
    <div class="overview">
        <h5>Overview</h5>
        <p>
          ${movies.overview}    
        </p>
        <p>
            Released at <strong>${movies.release_date}</strong>
        </p>
    </div>`;

    document.querySelector(".movie-container").appendChild(div);
  });
}

// Search Movie

document.querySelector("#search").addEventListener("keypress", (e) => {
  if (e.keyCode === 13) {
    let val = e.target.value;

    if (val) {
      fetchMovie(searchUrl + "&query=" + val);
    } else {
      fetchMovie(popularUrl);
    }
  }
});

// Loading

window.addEventListener("load", () => {
  document.querySelector(".loader").style.display = "none";
});
