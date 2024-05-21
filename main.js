/* User timer */

/* User input for timer */

document.addEventListener('DOMContentLoaded', () => {
  try {
    const storedTimerData = localStorage.getItem('timerData');

    // Notification permissions logic
    if ('Notification' in window) {
      if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
        Notification.requestPermission().then(function (permission) {
          if (permission === 'granted') {
            new Notification(
              'Awesome! You will be notified at the start of each session 🤩'
            );
          }
        });
      }
    }

    switchMode('pomodoro');

    // Additional logic related to Notification permissions or other setup
    loadTimerSettings();

    /* switchMode('pomodoro'); // Not sure if this line is intended to be here twice */
  } catch (error) {
    console.error('Error while loading timer data:', error);
  }

    // Add event listener for space bar to start/pause timer
    document.addEventListener('keydown', (event) => {
      if (event.code === 'Space') {
        event.preventDefault(); // Prevent the default behavior of the space key
        toggleTimer(); // Call the function to start or pause the timer
      }
    });

});

/* New code */
// Function to start or pause the timer
function toggleTimer() {
  const { action } = mainButton.dataset;
  if (action === 'start') {
    startTimer();
  } else {
    stopTimer();
  }
}

function loadTimerSettings() {
  // Load timer settings from localStorage or use default values
  const pomodoroInput = document.getElementById('pomodoro-input');
  const shortBreakInput = document.getElementById('short-break-input');
  const longBreakInput = document.getElementById('long-break-input');

  if (localStorage.getItem('timerSettings')) {
    const timerSettings = JSON.parse(localStorage.getItem('timerSettings'));

    pomodoroInput.value = timerSettings.pomodoro;
    shortBreakInput.value = timerSettings.shortBreak;
    longBreakInput.value = timerSettings.longBreak;
  }

  // Add event listeners to update timer settings on user input
  pomodoroInput.addEventListener('change', updateTimerSettings);
  shortBreakInput.addEventListener('change', updateTimerSettings);
  longBreakInput.addEventListener('change', updateTimerSettings);
}

function updateTimerSettings() {
  // Update timer settings in localStorage when the user changes them
  const pomodoroInput = document.getElementById('pomodoro-input');
  const shortBreakInput = document.getElementById('short-break-input');
  const longBreakInput = document.getElementById('long-break-input');

  const timerSettings = {
    pomodoro: parseInt(pomodoroInput.value),
    shortBreak: parseInt(shortBreakInput.value),
    longBreak: parseInt(longBreakInput.value),
  };

  localStorage.setItem('timerSettings', JSON.stringify(timerSettings));

  // You can also update the timer object directly if needed
  timer.pomodoro = timerSettings.pomodoro;
  timer.shortBreak = timerSettings.shortBreak;
  timer.longBreak = timerSettings.longBreak;

  // Update the current timer mode with the new settings
  switchMode(timer.mode);
}

/* User timer end */

const timer = {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    longBreakInterval: 4,
    sessions: 0,

    remainingTime: {
      total: 0,
      minutes: 0,
      seconds: 0
    },
  };
  
  let interval;
  
  const buttonSound = new Audio('button-sound.mp3');
  const mainButton = document.getElementById('js-btn');
  mainButton.addEventListener('click', () => {
    buttonSound.play();
    const { action } = mainButton.dataset;
    if (action === 'start') {
      startTimer();
    } else {
      stopTimer();
    }
  });
  
  const modeButtons = document.querySelector('#js-mode-buttons');
  modeButtons.addEventListener('click', handleMode);
  
  function getRemainingTime(endTime) {
    const currentTime = Date.parse(new Date());
    const difference = endTime - currentTime;
  
    const total = Number.parseInt(difference / 1000, 10);
    const minutes = Number.parseInt((total / 60) % 60, 10);
    const seconds = Number.parseInt(total % 60, 10);
  
    return {
      total,
      minutes,
      seconds,
    };
  }
  
  function startTimer() {
    let total = 0; // Default value or value assignment based on your logic
  
    if (timer.remainingTime && typeof timer.remainingTime === 'object') {
      ({ total } = timer.remainingTime);
    } else {
      console.error('timer.remainingTime is not properly set.');
    }
  
    const endTime = Date.parse(new Date()) + total * 1000;
  
    if (timer.mode === 'pomodoro') timer.sessions++;
  
    mainButton.dataset.action = 'stop';
    mainButton.textContent = 'stop';
    mainButton.classList.add('active');
  
    interval = setInterval(function() {
      const currentTime = Date.parse(new Date());
      let remainingTime = endTime - currentTime;
  
      if (remainingTime < 0) {
        clearInterval(interval);
  
        switch (timer.mode) {
          case 'pomodoro':
            if (timer.sessions % timer.longBreakInterval === 0) {
              switchMode('longBreak');
            } else {
              switchMode('shortBreak');
            }
            break;
          default:
            switchMode('pomodoro');
        }
  
        if (Notification.permission === 'granted') {
          const text =
            timer.mode === 'pomodoro' ? 'Get back to work!' : 'Take a break!';
          new Notification(text);
        }
  
        document.querySelector(`[data-sound="${timer.mode}"]`).play();
  
        startTimer();
      } else {
        timer.remainingTime = getRemainingTime(endTime);
        updateClock();
      }
    }, 1000);
  }
  
  function stopTimer() {
    clearInterval(interval);
  
    try {
      // Save remaining time and timer object into localStorage when stopped
      const currentTime = Date.parse(new Date());
      const endTime = currentTime + timer.remainingTime.total * 1000;
      const remainingTime = endTime - currentTime;
  
      timer.remainingTime = getRemainingTime(endTime);
  
      localStorage.setItem('pausedTime', remainingTime.toString()); // Save the paused time
      localStorage.setItem('timerData', JSON.stringify(timer)); // Save the timer data
    } catch (error) {
      // Handle errors while saving data to localStorage
      console.error('Error saving timer data to localStorage:', error);
    }
  
    mainButton.dataset.action = 'start';
    mainButton.textContent = 'start';
    mainButton.classList.remove('active');
  }
  
  function updateClock() {
    const { remainingTime } = timer;
    const minutes = `${remainingTime.minutes}`.padStart(2, '0');
    const seconds = `${remainingTime.seconds}`.padStart(2, '0');
  
    const min = document.getElementById('js-minutes');
    const sec = document.getElementById('js-seconds');
    min.textContent = minutes;
    sec.textContent = seconds;
  
    const text =
      timer.mode === 'pomodoro' ? 'Get back to work!' : 'Take a break!';
    document.title = `${minutes}:${seconds} — ${text}`;
  
    const progress = document.getElementById('js-progress');
    progress.value = timer[timer.mode] * 60 - timer.remainingTime.total;
  }
  
  function switchMode(mode) {
    timer.mode = mode;
    timer.remainingTime = {
      total: timer[mode] * 60,
      minutes: timer[mode],
      seconds: 0,
    };
  
    document
      .querySelectorAll('button[data-mode]')
      .forEach(e => e.classList.remove('active'));
    document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
    document.body.style.backgroundImage = `var(--${mode})`;
    document
      .getElementById('js-progress')
      .setAttribute('max', timer.remainingTime.total);
  
    updateClock();
  }
  
  function handleMode(event) {
    const { mode } = event.target.dataset;
  
    if (!mode) return;
  
    switchMode(mode);
    stopTimer();
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    try {
      const storedTimerData = localStorage.getItem('timerData');

      // Notification permissions logic
      if ('Notification' in window) {
        if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
          Notification.requestPermission().then(function (permission) {
            if (permission === 'granted') {
              new Notification(
                'Awesome! You will be notified at the start of each session'
              );
            }
          });
        }
      }
  
      switchMode('pomodoro');
  
      // Additional logic related to Notification permissions or other setup
  
      /* switchMode('pomodoro'); // Not sure if this line is intended to be here twice */
    } catch (error) {
      console.error('Error while loading timer data:', error);
    }    
  });
  
  document.querySelector('.switcher-btn').onclick = () => {
    document.querySelector('.color-switcher').classList.toggle('active');
  };
  
  let themeButtons = document.querySelectorAll('.theme-buttons');
  themeButtons.forEach(color => {
    color.addEventListener('click', () => {
      let dataColor = color.getAttribute('data-color');
      document.querySelector(':root').style.setProperty('--pomodoro', dataColor);
    });
  });

    // Toggle Spotify container
    document.querySelector('.spotify-btn').onclick = () => {
      document.querySelector('.spotify').classList.toggle('active');
    };

// Get necessary elements
const thumbnailsContainer = document.querySelector('.options');
const spotifyPlayers = document.querySelectorAll('#spotifyPlayersContainer iframe');
const thumbnails = document.querySelectorAll('.thumbnail');

// Show the default selected playlist (1st thumbnail) and hide others
spotifyPlayers.forEach((player, index) => {
  if (index !== 0) {
    player.style.display = 'none';
  }
});

// Handle click on thumbnails to display associated player
thumbnails.forEach(thumbnail => {
  thumbnail.addEventListener('click', () => {
    const selectedIndex = thumbnail.getAttribute('data-index');

    // Hide all players
    spotifyPlayers.forEach(player => {
      player.style.display = 'none';
    });

    // Show selected player based on the clicked thumbnail's index
    spotifyPlayers[selectedIndex].style.display = 'block';

    // Toggle 'selected' class for thumbnails
    thumbnails.forEach(thumb => thumb.classList.remove('selected'));
    thumbnail.classList.add('selected');
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const nameForm = document.getElementById('name-form');
  const inputContainer = document.querySelector('.input-container');
  const usernameDisplay = document.createElement('div');
  usernameDisplay.classList.add('username-display');

  try {
    // Check if name exists in local storage
    const savedName = localStorage.getItem('username');

    if (savedName) {
      // If name exists, display it and hide the input container
      usernameDisplay.textContent = `Hello, ${savedName}!`;
      // usernameDisplay.classList.remove('hide');
      // inputContainer.classList.add('hide'); 
      document.body.appendChild(usernameDisplay);
    } else {
      // If name doesn't exist, show the input container
      inputContainer.classList.remove('hide');
    }

    const usernameInput = document.getElementById('username');

    usernameInput.addEventListener('input', function () {
      // Limit input to 15 characters
      if (usernameInput.value.length > 8) {
        usernameInput.value = usernameInput.value.slice(0, 8);
      }
    });

    nameForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const usernameInput = document.getElementById('username').value.trim();
      if (usernameInput !== '') {
        try {
          // Save name to local storage
          localStorage.setItem('username', usernameInput);
          // Display entered name and hide the input container
          usernameDisplay.textContent = `Hello, ${usernameInput}!`;
          usernameDisplay.classList.remove('hide');
          inputContainer.classList.remove('hide');
          document.body.appendChild(usernameDisplay);
        } catch (error) {
          // Handle error while saving to local storage
          console.error('Error saving username to localStorage:', error);
        }
      }

      try {
        // Check if timer data and paused time exist in localStorage
        const storedTimerData = localStorage.getItem('timerData');
        const pausedTime = localStorage.getItem('pausedTime');

        if (storedTimerData) {
          // If timer data exists, load it and update the timer
          var timer = JSON.parse(storedTimerData);

          if (pausedTime) {
            // If there is paused time, resume the timer from where it was stopped
            timer.remainingTime.total = Number.parseInt(pausedTime, 10);
            startTimer(); // Resume the timer
          } else {
            updateClock(); // Update the clock with the retrieved timer data
          }
        }
      } catch (error) {
        // Handle error while accessing localStorage data
        console.error('Error accessing timer data from localStorage:', error);
      }
    });
  } catch (error) {
    // Handle any other localStorage related errors
    console.error('Error interacting with localStorage:', error);
  }
});

/* let colorIndicator = document.querySelector('.color-indicator');
const colorPicker = new iro.colorPicker("#color-picker", {
  width:150, color: "#fff"
})
colorPicker.on('color:change', function(color) {
  colorIndicator.style.backgroundColor = color.hexString
  document.querySelector(':root').style.setProperty('--pomodoro', color.hexString);
}) */

// Create a color picker instance
const colorPicker = new iro.ColorPicker("#color-picker", {
  // Set the size of the color picker
  width: 100,
  // Set the initial color to pure red
  color: "#f00"
});

// Add an event listener to the color picker to apply the selected color to --pomodoro
colorPicker.on('color:change', function(color) {
  // Check if the selected color is 'none'
  if (color.hexString === 'none') {
    // Set --pomodoro to 'none' if the selected color is 'none'
    document.querySelector(':root').style.setProperty('--pomodoro', 'none');
  } else {
    // Apply the selected color to --pomodoro
    document.querySelector(':root').style.setProperty('--pomodoro', color.hexString);
    
    try {
      // Access the localStorage data
      const customBackgroundUrl = localStorage.getItem('customBackground');
      
      // Check if customBackgroundUrl is not null
      if (customBackgroundUrl) {
        // Apply the custom background URL from localStorage
        document.querySelector(':root').style.setProperty('--pomodoro', `url(${customBackgroundUrl})`);
      }
    } catch (error) {
      // Handle error while accessing localStorage data
      console.error('Error accessing customBackgroundUrl from localStorage:', error);
    }
  }
});
