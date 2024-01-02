document.addEventListener('DOMContentLoaded', function () {
  const nameForm = document.getElementById('name-form');
  const inputContainer = document.querySelector('.input-container');
  const usernameDisplay = document.createElement('div');
  usernameDisplay.classList.add('username-display');

  nameForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const usernameInput = document.getElementById('username').value.trim();
    if (usernameInput !== '') {
      // Display entered name and hide the input container
      usernameDisplay.textContent = `Hello, ${usernameInput}!`;
      usernameDisplay.classList.remove('hide'); // Display the username
      inputContainer.classList.add('hide'); // Hide the input container
      document.body.appendChild(usernameDisplay);
      setTimeout(() => {
        inputContainer.style.display = 'none'; // Hide the input container after a delay (optional)
      }, 1000); // Change the delay time (in milliseconds) as needed
    }
  });
});

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

  // Save timer object into localStorage when stopped
  localStorage.setItem('timerData', JSON.stringify(timer));
  
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
  // Check if timer data exists in localStorage
  const storedTimerData = localStorage.getItem('timerData');
  
  if (storedTimerData) {
    // If timer data exists, load it and update the timer
    timer = JSON.parse(storedTimerData);
    updateClock(); // Update the clock with the retrieved timer data
  }
    if ('Notification' in window) {
      if (
        Notification.permission !== 'granted' &&
        Notification.permission !== 'denied'
      ) {
        Notification.requestPermission().then(function(permission) {
          if (permission === 'granted') {
            new Notification(
              'Awesome! You will be notified at the start of each session'
            );
          }
        });
      }
    }
  
    switchMode('pomodoro');
    if (storedTimerData) {
      timer = JSON.parse(storedTimerData);
      updateClock(); // Update the clock with the retrieved timer data
    }
    
    if ('Notification' in window) {
      // Notification permissions logic...
    }
    
    switchMode('pomodoro');
    
    if (storedTimerData) {
      timer = JSON.parse(storedTimerData);
      updateClock(); // Update the clock with the retrieved timer data
    }
  });
  document.querySelector('.switcher-btn').onclick = () =>{
    document.querySelector('.color-switcher').classList.toggle('active');
  }
  let themeButtons = document.querySelectorAll('.theme-buttons');
  themeButtons.forEach(color =>{
    color.addEventListener('click', () =>{
      let dataColor = color.getAttribute('data-color');
      document.querySelector(':root').style.setProperty('--pomodoro', dataColor);
    });
  });

    // Toggle Spotify container
    document.querySelector('.spotify-btn').onclick = () => {
      document.querySelector('.spotify').classList.toggle('active');
    };

  // music js //
  // and assign them to a variable
  let now_playing = document.querySelector(".now-playing");
  let track_art = document.querySelector(".track-art");
  let track_name = document.querySelector(".track-name");
  let track_artist = document.querySelector(".track-artist");
  
  let playpause_btn = document.querySelector(".playpause-track");
  let next_btn = document.querySelector(".next-track");
  let prev_btn = document.querySelector(".prev-track");
  
  let seek_slider = document.querySelector(".seek_slider");
  let volume_slider = document.querySelector(".volume_slider");
  let curr_time = document.querySelector(".current-time");
  let total_duration = document.querySelector(".total-duration");
  
  // Specify globally used values
  let track_index = 0;
  let isPlaying = false;
  let updateTimer;
  
  // Create the audio element for the player
  let curr_track = document.createElement("audio");
  
  // Define the list of tracks that have to be played
  let track_list = [
    {
      name: "On My Own",
      artist: "David Renda",
      image:
        "/1.gif",
      path:
        "/On_My_Own_-_www.FesliyanStudios.com_-_David_Renda.mp3"
    },
    {
      name: "Done With Work",
      artist: "David Renda",
      image:
        "/1.gif",
      path:
        "/Done_With_Work_-_www.FesliyanStudios.com_-_David_Renda.mp3"
    },
        {
      name: "Vibes",
      artist: "David Renda",
      image:
        "/1.gif",
      path:
        "/Vibes_-_www.FesliyanStudios.com_-_David_Renda.mp3"
    },
    {
      name: "Looking Up",
      artist: "David Renda",
      image:
        "/1.gif",
      path:
        "/Looking_Up_-_www.FesliyanStudios.com_David_Renda.mp3"
    },
    {
      name: "Mellow Thoughts",
      artist: "David Renda",
      image:
        "/1.gif",
      path:
        "/Mellow_Thoughts_-_www.FesliyanStudios.com_David_Renda.mp3"
    },
    {
      name: "Tropical Keys",
      artist: "David Renda",
      image:
        "/1.gif",
      path:
        "/Tropical_Keys_-_www.FesliyanStudios.com_David_Renda.mp3"
    },
    {
      name: "Down Days",
      artist: "David Renda",
      image:
        "/1.gif",
      path:
        "/Down_Days_-_www.FesliyanStudios.com_David_Renda.mp3"
    },
    {
      name: "Time Alone",
      artist: "David Renda",
      image:
        "/1.gif",
      path:
        "/Time_Alone_-_www.FesliyanStudios.com_David_Renda.mp3"
    },
    {
      name: "Steady Enjoyment",
      artist: "David Renda",
      image:
        "/1.gif",
      path:
        "/Steady_Enjoyment_-_www.FesliyanStudios.com_David_Renda.mp3"
    },
    {
      name: "Tokyo Lo-Fi",
      artist: "Steve Oxen",
      image:
        "/1.gif",
      path:
        "/Tokyo_Lo-Fi_-_www.FesliyanStudios.com_Steve_Oxen.mp3"
    },
    {
      name: "Homework",
      artist: "David Fesliyan",
      image:
        "/1.gif",
      path:
        "/Homework_-_David_Fesliyan.mp3"
    },
    {
      name: "Chill Gaming",
      artist: "David Fesliyan",
      image:
        "/1.gif",
      path:
        "/Chill_Gaming_-_David_Fesliyan.mp3"
    },
  ];
  
  function loadTrack(track_index) {
    // Clear the previous seek timer
    clearInterval(updateTimer);
    resetValues();
  
    // Load a new track
    curr_track.src = track_list[track_index].path;
    curr_track.load();
  
    // Update details of the track
    track_art.style.backgroundImage =
      "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent =
      "PLAYING " + (track_index + 1) + " OF " + track_list.length;
  
    // Set an interval of 1000 milliseconds
    // for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);
  
    // Move to the next track if the current finishes playing
    // using the 'ended' event
    curr_track.addEventListener("ended", nextTrack);
  }
  // Functiom to reset all values to their default
  function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
  }
  
  function playpauseTrack() {
    // Switch between playing and pausing
    // depending on the current state
    if (!isPlaying) playTrack();
    else pauseTrack();
  }
  
  function playTrack() {
    // Play the loaded track
    curr_track.play();
    isPlaying = true;
  
    // Replace icon with the pause icon
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
  }
  
  function pauseTrack() {
    // Pause the loaded track
    curr_track.pause();
    isPlaying = false;
  
    // Replace icon with the play icon
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
  }
  
  function nextTrack() {
    // Go back to the first track if the
    // current one is the last in the track list
    if (track_index < track_list.length - 1) track_index += 1;
    else track_index = 0;
  
    // Load and play the new track
    loadTrack(track_index);
    playTrack();
  }
  
  function prevTrack() {
    // Go back to the last track if the
    // current one is the first in the track list
    if (track_index > 0) track_index -= 1;
    else track_index = track_list.length;
  
    // Load and play the new track
    loadTrack(track_index);
    playTrack();
  }
  
  function seekTo() {
    // Calculate the seek position by the
    // percentage of the seek slider
    // and get the relative duration to the track
    seekto = curr_track.duration * (seek_slider.value / 100);
  
    // Set the current track position to the calculated seek position
    curr_track.currentTime = seekto;
  }
  
  function setVolume() {
    // Set the volume according to the
    // percentage of the volume slider set
    curr_track.volume = volume_slider.value / 100;
  }
  
  function seekUpdate() {
    let seekPosition = 0;
  
    // Check if the current track duration is a legible number
    if (!isNaN(curr_track.duration)) {
      seekPosition = curr_track.currentTime * (100 / curr_track.duration);
      seek_slider.value = seekPosition;
  
      // Calculate the time left and the total duration
      let currentMinutes = Math.floor(curr_track.currentTime / 60);
      let currentSeconds = Math.floor(
        curr_track.currentTime - currentMinutes * 60
      );
      let durationMinutes = Math.floor(curr_track.duration / 60);
      let durationSeconds = Math.floor(
        curr_track.duration - durationMinutes * 60
      );
  
      // Add a zero to the single digit time values
      if (currentSeconds < 10) {
        currentSeconds = "0" + currentSeconds;
      }
      if (durationSeconds < 10) {
        durationSeconds = "0" + durationSeconds;
      }
      if (currentMinutes < 10) {
        currentMinutes = "0" + currentMinutes;
      }
      if (durationMinutes < 10) {
        durationMinutes = "0" + durationMinutes;
      }
  
      // Display the updated duration
      curr_time.textContent = currentMinutes + ":" + currentSeconds;
      total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
  }
  loadTrack(track_index);
   document.querySelector('.music-btn').onclick = () =>{
    document.querySelector('.player').classList.toggle('active');
  }