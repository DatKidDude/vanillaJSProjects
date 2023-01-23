const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const colors = ["#205820", "#2c9c2c", "#c6d316", "#dba81b", "#b32020"];
const calendar = document.querySelector("#calendar");
const moods = document.querySelectorAll(".mood");
const clearBtn = document.querySelector(".clear");
const randomizeBtn = document.querySelector(".randomize");
let defaultColor = "#888";
let activeColor = "";

moods.forEach((mood) => {
  mood.addEventListener("click", () => {
    if (mood.classList.contains("selected")) {
      mood.classList.remove("selected");
      activeColor = defaultColor;
    } else {
      // remove selected class from all moods and only set selected on the currently clicked mood
      moods.forEach((mood) => {
        mood.classList.remove("selected");
      });
      mood.classList.add("selected");
      activeColor = getComputedStyle(mood).getPropertyValue("color");
    }
  });
});

// Get the number of days of each month
function getDaysInMonth(month, year) {
  month = month + 1;
  return new Date(year, month, 0).getDate();
}

// Create each calendar container
function createCalendar() {
  let monthContainer = "";
  months.forEach((month, idx) => {
    monthContainer += `
    <div class="month month${idx}">
      <h3>${month}</h3>
      <div class="weekdays_container">
        ${weekdays
          .map((day) => {
            return `<p class="weekdays">${day}</p>`;
          })
          .join("")}
      </div>
      <div class="dates_container"></div>
    </div>`;
  });
  calendar.innerHTML = monthContainer;
  getDates();
}

// Output the dates into each container
const getDates = () => {
  // Iterate through each month
  for (let i = 0; i < months.length; i++) {
    let firstDayOfMonth = new Date(2023, i).getDay();
    const dates = getDaysInMonth(i, 2023);
    const datesContainer = document.querySelector(
      `.month${i} .dates_container`
    );
    // While j is less than the number of days of the current month. Also count is used to create spaces in the days that the current date does not start on
    let count = 0;
    for (let j = 0; j < dates; j++) {
      if (count !== firstDayOfMonth) {
        datesContainer.innerHTML += `
          <div class="dates">
            ${""}
          </div>
        `;
        count++;
        j--;
      } else {
        datesContainer.innerHTML += `
        <div class="dates">
          <span class="circle">${j + 1}</span>
        </div>
      `;
      }
    }
    count = 0;
  }
};

// Generate a random color
const getRandomColor = function () {
  return colors[Math.floor(Math.random() * 5)];
};

createCalendar();

const circles = document.querySelectorAll(".circle");

// Set the circle to the current active color
circles.forEach((circle) => {
  circle.addEventListener("click", () => {
    circle.style.backgroundColor = activeColor;
  });
});

// Reset all circles to the default color #888
clearBtn.addEventListener("click", () => {
  circles.forEach((circle) => {
    circle.style.backgroundColor = defaultColor;
  });
});

// Randomize all circles
randomizeBtn.addEventListener("click", () => {
  circles.forEach((circle) => {
    circle.style.backgroundColor = getRandomColor();
  });
});
