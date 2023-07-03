// ring timer and time display
const circle = document.querySelector("circle");
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;
let TIME_LIMIT = 300;
let resetTimers = false;
let resetShort = false;
let resetLong = false;
const start__pause = document.querySelector(".start__pause");
let paused = false;
const break__selectors = document.querySelectorAll(".break__mode--btn");
const change__settings = document.querySelector(".menu__options--btn");
const close__menu = document.querySelector(".close__menu");
const modal = document.querySelector(".modal__settings");
const pomodoroBtn = document.querySelector(".pomodoro--btn"); // to set focus on this button on load
const timer__controller = document.querySelector(".time__settings");
const input__control__time = document.querySelector(".time__control__pomodoro"); //pomodoro control
const time__control__short = document.querySelector(".time__control__short"); //short break control
const long_time = document.querySelector(".long_time"); // long break control
let pomodoro__count = Number(input__control__time.value);
let short__count = Number(time__control__short.value);
let long__count = Number(long_time.value);
TIME_LIMIT = pomodoro__count * 60;
const main__settings = document.querySelector(".main__ctrl__panel");

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = `${circumference}`;

function setProgress(percent) {
  const offset = circumference - (percent / TIME_LIMIT) * circumference;
  circle.style.strokeDashoffset = offset;
}

function timer(seconds) {
  const temp = seconds;
  const progressChecker = setInterval(function () {
    const displayTime = document.querySelector("time");
    const mins = Math.floor(seconds / 60);
    const displayMin = mins < 10 ? `0${mins}` : mins;
    const secs = seconds % 60;
    const displaySec = secs < 10 ? `0${secs}` : secs;
    seconds--;
    displayTime.innerText = `${displayMin}:${displaySec}`;

    //reset timers when changes has been implemented in the
    //form and form has been submitted.
    if (resetTimers) {
      clearInterval(progressChecker);
      resetTimers = false;
    }
    if (resetShort) {
      clearInterval(progressChecker);
      resetShort = false;
    }
    if (resetLong) {
      clearInterval(progressChecker);
      resetLong = false;
    }

    if (seconds === 0) {
      displayTime.innerHTML = "00:00";
      start__pause.innerHTML = "Start";
      clearInterval(progressChecker);
    }

    if (!paused) {
      clearInterval(progressChecker);
    }

    setProgress(temp - seconds);
  }, 1000);
}

timer(TIME_LIMIT);
/* make a selection among pomodoro, short and long breaks*/

window.onload = () => {
  break__selectors[0].checked == true;
};

const timeselectors = () =>
  break__selectors.forEach((selector) => {
    selector.onchange = () => {
      resetTimeSelectors = true;
      if (selector.checked) {
        if (selector.id == "short") {
          shortBreakMode();
        } else if (selector.id == "long") {
          longBreakMode();
        } else {
          setPomodoro();
        }
      }
    };
  });
timeselectors();
/* modal setting */
change__settings.addEventListener("click", () => {
  modal.classList.toggle("modal__settings__hide");
});
close__menu.addEventListener("click", () => {
  modal.classList.toggle("modal__settings__hide");
  // resetTimers = false;
  // resetLong = false;
  // resetShort = false;
  // resetTimeSelectors = true;
});

timer__controller.addEventListener("click", (evt) => {
  const target = evt.target;
  console.log(target);
  //get parent div of target
  const parent__div = target.closest("div");
  // get parent div of input element
  const parent__input = parent__div.previousElementSibling;
  // get input element
  const target__input = parent__input.firstElementChild;
  console.log(target__input);
  if (target__input == null || parent__input == null) {
    return;
  }
  if (target__input.classList.contains("time__control__pomodoro")) {
    if (target.classList.contains("btn--up")) {
      countUp(90, short__count, target__input, 5);
    } else if (target.classList.contains("btn--down")) {
      countDown(5, pomodoro__count, target__input, 90);
    }
  } else if (target__input.classList.contains("time__control__short")) {
    if (target.classList.contains("btn--up")) {
      countUp(10, short__count, target__input, 1);
    } else if (target.classList.contains("btn--down")) {
      countDown(1, short__count, target__input, 10);
    }
  } else if (target__input.classList.contains("long_time")) {
    if (target.classList.contains("btn--up")) {
      countUp(20, long__count, target__input, 11);
    } else if (target.classList.contains("btn--down")) {
      countDown(11, long__count, target__input, 20);
    }
  }
});

const countUp = (maxvalue, counter, targetInput, checkmin) => {
  if (Number(targetInput.value < checkmin)) {
    //alert(`Minimum value should not be below ${checkmin}`)
    targetInput.value = checkmin;
  }

  if (Number(targetInput.value > maxvalue)) {
    //alert(`Maximum value should not exceed ${maxvalue}`)
    targetInput.value = maxvalue;
  }
  counter = Number(targetInput.value);
  if (counter < maxvalue) {
    counter = counter + 1;
    targetInput.value = counter;
    console.log(counter);
    console.log(maxvalue);
    console.log(targetInput.value);
  }
};

const countDown = (minvalue, counter, targetInput, checkmax) => {
  if (Number(targetInput.value < minvalue)) {
    //alert(`Minimum value should not be below ${minvalue}`)
    targetInput.value = minvalue;
  }

  counter = Number(targetInput.value);
  if (counter > minvalue) {
    counter = counter - 1;
    targetInput.value = counter;
    console.log(counter);
    console.log(minvalue);
    console.log(targetInput.value);
  }

  if (Number(targetInput.value > checkmax)) {
    //alert(`Maximum value should not exceed ${checkmax}`)
    targetInput.value = checkmax;
  }
};

//main settings panel form
main__settings.addEventListener("submit", (evt) => {
  console.log("form submit");
  evt.preventDefault();
  modal.classList.toggle("modal__settings__hide");
  changeColor();
  changeFont();
  setPomodoro();
  shortBreakMode();
  longBreakMode();
});

//color selector function
const changeColor = () => {
  //progress ring
  const progress = document.querySelector(".progress");
  const checkedBtns = document.querySelector(
    "input[type='radio']:checked + label.mode"
  );
  const colors = document.querySelectorAll(".each_color");
  colors.forEach((colored) => {
    if (colored.checked) {
      if (colored.id == "turquoise") {
        progress.classList.add("lime__ring");
        checkedBtns.forEach((btn) => {
          btn.classList.add("lime__btn");
          checkedBtns.style.backgroundColor = "#70F380";
        });
        checkedBtn.classList.add("lime__btn");
        checkedBtn.style.backgroundColor = "#70F380";
      } else if (colored.id == "purple") {
        progress.classList.add("purple__ring");
        checkedBtn.style.backgroundColor = "#D881F8";
      } else {
        progress.classList.remove("purple__ring");
        progress.classList.remove("lime__ring");
      }
    }
  });
};

//change font function
const changeFont = () => {
  const fonts = Array.from(document.querySelectorAll(".each_font"));
  const body = document.querySelector("body");
  console.log(fonts);
  fonts.forEach((fontSelect) => {
    if (fontSelect.checked) {
      console.log(fontSelect.id);
      if (fontSelect.id == "roboto") {
        console.log(fontSelect.id);
        body.classList.add("roboto");
        body.classList.remove("kumbh");
        body.classList.remove("mono");
      } else if (fontSelect.id == "mono") {
        body.classList.add("mono");
        body.classList.remove("roboto");
        body.classList.remove("kumbh");
      } else {
        body.classList.remove("roboto");
        body.classList.remove("mono");
        body.classList.add("kumbh");
      }
    }
  });
};

const setPomodoro = () => {
  resetTimers = true;
  //const pomodoroTimer = document.querySelector(".time__control__pomodoro")
  TIME_LIMIT = input__control__time.value * 60;
  timer(TIME_LIMIT);
  // resetTimers = false
};

const shortBreakMode = () => {
  resetShort = true;
  //resetTimers = true
  TIME_LIMIT = time__control__short.value * 60;
  timer(TIME_LIMIT);
  //resetTimers = false
};

const longBreakMode = () => {
  resetLong = true;
  // resetTimers = true
  TIME_LIMIT = long_time.value * 60;
  timer(TIME_LIMIT);
  // resetTimers = false
};

start__pause.addEventListener("click", () => {
  console.log("start and pause button");
  paused = !paused;
  console.log(paused);

  if (paused) {
    start__pause.innerHTML = "Pause";
  } else {
    start__pause.innerHTML = "Start";
    if (TIME_LIMIT <= 0) {
      return;
    } else {
      time__left();
      timer(TIME_LIMIT);
    }
  }

  if (TIME_LIMIT <= 0) {
    start__pause.innerHTML = "Start";
    break__selectors.forEach((selected) => {
      if (selected.checked) {
        if (selected.id == "short") {
          // resetShort = false
          shortBreakMode();
        } else if (selected.id == "long") {
          longBreakMode();
        } else {
          setPomodoro();
        }
      }
      // paused = !paused
      // start__pause.innerHTML = "Pause"
    });
    //start__pause.innerHTML = "Start"
    return;
  } else {
    timer(TIME_LIMIT);
  }
});

//calculate time left on clock
const time__left = () => {
  const time__left = document.querySelector("time").innerHTML;
  const splitTime = time__left.split(":");
  const minutes__left = Number(splitTime[0]);
  const seconds__left = Number(splitTime[1]);
  TIME_LIMIT = minutes__left * 60 + seconds__left;
};
