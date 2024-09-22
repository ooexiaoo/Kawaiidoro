themeButtons.forEach((color, index) => {
  color.addEventListener("click", () => {
    let dataColor = color.getAttribute("data-color");
    if (index !== 20) {
      document
        .querySelector(":root")
        .style.setProperty("--pomodoro", dataColor);
    }

    // Add a case statement to change the "--Red" color based on the selected wallpaper
    switch (index) {
      case 0:
        document.querySelector(":root").style.setProperty("--Red", "#b80dfe");
        break;
      case 1:
        document.querySelector(":root").style.setProperty("--Red", "#596a45");
        break;
      case 2:
        document.querySelector(":root").style.setProperty("--Red", "#B80DFE ");
        break;
      case 3:
        document.querySelector(":root").style.setProperty("--Red", "#33194c");
        break;
      case 4:
        document.querySelector(":root").style.setProperty("--Red", "#d7c3f1");
        break;
      case 5:
        document.querySelector(":root").style.setProperty("--Red", "var(--base)");
        break;
      case 6:
        document.querySelector(":root").style.setProperty("--Red", "#529a79");
        break;
      case 7:
        document.querySelector(":root").style.setProperty("--Red", "#0a0c0c");
        break;
      case 8:
        document.querySelector(":root").style.setProperty("--Red", "#252032");
        break;
      case 9:
        document.querySelector(":root").style.setProperty("--Red", "#729379");
        break;
      case 10:
        document.querySelector(":root").style.setProperty("--Red", "#2a3f31");
        break;
      case 11:
        document.querySelector(":root").style.setProperty("--Red", "#171a22");
        break;
      case 12:
        document.querySelector(":root").style.setProperty("--Red", "#ab8c90");
        break;
      case 13:
        document.querySelector(":root").style.setProperty("--Red", "#ad5ba5");
        break;
      case 14:
        document.querySelector(":root").style.setProperty("--Red", "#161614");
        break;
      case 15:
        document.querySelector(":root").style.setProperty("--Red", "#471e34");
        break;
      case 16:
        document.querySelector(":root").style.setProperty("--Red", "#010506");
        break;
      case 17:
        document.querySelector(":root").style.setProperty("--Red", "#300e09");
        break;
      case 18:
        document.querySelector(":root").style.setProperty("--Red", "#27291d");
        break;
      case 19:
        document.querySelector(":root").style.setProperty("--Red", "#384a4e");
        break;
      case 20:
        document.querySelector(":root").style.setProperty("--Red", "#25396e");
        break;
      case 21:
        document.querySelector(":root").style.setProperty("--Red", "#2f3438");
        break;
      case 22:
        document.querySelector(":root").style.setProperty("--Red", "#192a35");
        break;
      case 23:
        document.querySelector(":root").style.setProperty("--Red", "#8eb358");
        break;
      default:
        document
          .querySelector(":root")
          .style.setProperty("--Red", "default_color");
    }
  });
});
