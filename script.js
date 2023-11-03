let hero = document.getElementById("names");
let image = document.getElementById("image");
let work = document.getElementById("work");
let btn = document.getElementById("btn");
let searchbtn = document.getElementById("search-btn");

let heroStats;
let superHero = () => {
  let HERO = "https://akabab.github.io/superhero-api/api/all.json";
  return fetch(HERO)
    .then((response) => response.json())
    .then((json) => {
      heroStats = json.map((newJson) => {
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

search.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    // Check if the pressed key is Enter
    superHero().then(() => {
      findHero();
    });
  }
});
searchbtn.onclick = () => {
  superHero().then(() => {
    findHero();
  });
};

let findHero = () => {
  let value = search.value;
  let newVal = value.toLowerCase();
  let pureVal = newVal.replace(/[^a-zA-Z]/g, "");
  let filteredHeroes;
  if (!isNaN(value)) {
    // If input value is a number, search by id
    filteredHeroes = heroStats.filter((val) => val.id === parseInt(value));
  } else {
    // If input value is not a number, search by name
    filteredHeroes = heroStats.filter((val) =>
      val.names
        .replace(/[^a-zA-Z]/g, "")
        .toLowerCase()
        .includes(pureVal)
    );
  }

  if (filteredHeroes.length > 0) {
    let final = filteredHeroes[0];
    hero.innerText = `${final.names}`;
    image.innerHTML = `<img src="${final.images}" alt="${final.names}"/>`;
    if (final.job === "-") {
      work.innerText = ``;
    } else {
      work.innerText = `${final.job}`;
    }
  } else {
    alert("Sorry the entered character is not available. ");
    location.reload();
  }
};

btn.onclick = () => {
  superHero()
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
