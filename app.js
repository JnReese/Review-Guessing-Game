import runescape from "./GameTexts/runescape.json" assert { type: "json" };
import ark from "./GameTexts/ark.json" assert { type: "json" };
import borderlands from "./GameTexts/Borderlands.json" assert { type: "json" };
import GTA from "./GameTexts/GTA.json" assert { type: "json" };
import monsterTrain from "./GameTexts/monsterTrain.json" assert { type: "json" };
import dungeonDefenders from "./GameTexts/dungeonDefenders.json" assert { type: "json" };
import riskOfRain from "./GameTexts/riskOfRain.json" assert { type: "json" };
import skyrim from "./GameTexts/Skyrim.json" assert { type: "json" };
import bindingOfIsaac from "./GameTexts/theBindingOfIsaac.json" assert { type: "json" };
import terraria from "./GameTexts/Terraria.json" assert { type: "json" };

document.addEventListener("DOMContentLoaded", function () {
  const reviewMap = {
    runescape: runescape,
    ark: ark,
    borderlands: borderlands,
    GTA: GTA,
    monsterTrain: monsterTrain,
    dungeonDefenders: dungeonDefenders,
    riskOfRain: riskOfRain,
    skyrim: skyrim,
    bindingOfIsaac: bindingOfIsaac,
    terraria: terraria,
  };

  const solvedGames = [];

  const shuffleArray = (arr) => {
    return arr
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };
  const getRandom = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  const getRandomItemsFromArray = (arr, amount) => {
    return arr.sort(() => Math.random() - Math.random()).slice(0, amount);
  };

  const grabThreeGameTitles = (correctTitle) => {
    const titlesWithoutAnswer = Object.keys(reviewMap).filter((title) => title !== correctTitle);
    return shuffleArray([correctTitle, ...getRandomItemsFromArray(titlesWithoutAnswer, 2)]);
  };

  const onAnswerButtonClick = (correctAnswer) => {
    console.log("hi");
    const answerButtons = document.querySelectorAll(".answer-button");
    //set button color
    for (let i = 0; i < answerButtons.length; i++) {
      if (answerButtons[i].innerText === correctAnswer) {
        answerButtons[i].style.backgroundColor = "green";
      } else {
        answerButtons[i].style.backgroundColor = "red";
      }
    }
    // adds correct acswer to solved games array
  };

  const nextButtonClicked = (currentAnswer) => {
    const nextButton = document.querySelector(".next__button");
    delete reviewMap[currentAnswer];

    nextButton.style.display = "flex";
    nextButton.addEventListener("click", () => {
      newGame(reviewMap), (nextButton.style.display = "none");
    });
  };

  const createButtons = (allAnswers, currentAnswer) => {
    const answerButtonsContainer = document.querySelector("#buttons__container");
    allAnswers.forEach((answer) => {
      const answerButton = document.createElement("button");
      answerButton.addEventListener("click", () => {
        onAnswerButtonClick(currentAnswer), nextButtonClicked(currentAnswer);
      });
      answerButton.classList.add("answer-button");

      answerButton.innerText = answer;
      answerButtonsContainer.appendChild(answerButton);
    });
  };

  const newGame = (gamesObject) => {
    if (Object.keys(reviewMap).length > 3) {
      let firstReview = document.querySelector(".cardOne");
      let secondReview = document.querySelector(".cardTwo");
      let thirdReview = document.querySelector(".cardThree");
      let grabbedGame = getRandom(Object.keys(gamesObject));
      let currentAnswer = grabbedGame;

      firstReview.textContent = reviewMap[grabbedGame][0].replace(/(^|\s)\S/g, (l) => l.toUpperCase());
      secondReview.textContent = reviewMap[grabbedGame][1].replace(/(^|\s)\S/g, (l) => l.toUpperCase());
      thirdReview.textContent = reviewMap[grabbedGame][2].replace(/(^|\s)\S/g, (l) => l.toUpperCase());
      const answerButtonsContainer = document.querySelector("#buttons__container");
      answerButtonsContainer.innerText = "";
      const answerOptions = grabThreeGameTitles(grabbedGame);
      createButtons(answerOptions, currentAnswer);
      solvedGames.push(currentAnswer);
    } else {
      console.log("Out Of Reviews");
    }

    delete reviewMap[solvedGames.map((el) => el)];
  };

  newGame(reviewMap);
});
