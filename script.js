let hero = document.getElementById("names");
let image = document.getElementById("image");
let work = document.getElementById("work");
let btn = document.getElementById("btn");

let superHero = () => {
  let HERO = "https://akabab.github.io/superhero-api/api/all.json";
  return fetch(HERO)
    .then((response) => response.json())
    .then((json) => {
      let heroStats = json.map((newJson) => {
        let id = newJson.id;
        let names = newJson.name;
        let images = newJson.images.md;
        let job = newJson.work.occupation;
        let newObj = {
          id,
          names,
          images,
          job,
        };
        return newObj;
      });
      return heroStats;
    });
};

let showHero = (heroData) => {
  if (heroData && heroData.length > 0) {
    let handleRandom = heroData[Math.floor(Math.random() * heroData.length)];
    console.log("this is random", handleRandom.images);
    hero.innerText = `${handleRandom.names}`;
    image.innerHTML = `<img src="${handleRandom.images}" alt="${handleRandom.names}"/>`;
    if (handleRandom.job === "-") {
      work.innerText = ``;
    } else {
      work.innerText = `${handleRandom.job}`;
    }
    return handleRandom;
  } else {
    let err = alert("Sorry some data for this hero seems to be missing");
    return err;
  }
};

btn.onclick = () => {
  superHero()
    .then((heroStats) => {
      return heroStats;
    })
    .then((heroStats) => {
      return showHero(heroStats);
    })
    .then((heroDetail) => {
      return heroDetail;
    })
    .catch(() => {
      return err;
    });
};
