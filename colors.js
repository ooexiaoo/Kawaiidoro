themeButtons.forEach((color, index) => {
    color.addEventListener('click', () => {
      let dataColor = color.getAttribute('data-color');
      document.querySelector(':root').style.setProperty('--pomodoro', dataColor);
  
      // Add a case statement to change the "--Red" color based on the selected wallpaper
      switch (index) {
        case 0:
          document.querySelector(':root').style.setProperty('--Red', '#af73b4');
          break;
        case 1:
          document.querySelector(':root').style.setProperty('--Red', '#c64b24');
          break;
        case 2:
          document.querySelector(':root').style.setProperty('--Red', '#ff9ce8');
          break;
        case 3:
          document.querySelector(':root').style.setProperty('--Red', '#d1c4e0');
          break;
        case 4:
          document.querySelector(':root').style.setProperty('--Red', '#FF94FC');
          break;
        case 5:
          document.querySelector(':root').style.setProperty('--Red', '#AAC7E7');
          break;
        case 6:
          document.querySelector(':root').style.setProperty('--Red', '#FEA579');
          break;
        case 7:
          document.querySelector(':root').style.setProperty('--Red', '#F37A83');
          break;
        case 8:
          document.querySelector(':root').style.setProperty('--Red', '#9ABFAE');
          break;
        case 9:
          document.querySelector(':root').style.setProperty('--Red', '#33A381');
          break;
        case 10:
          document.querySelector(':root').style.setProperty('--Red', '#8FB3C2');
          break;
        case 11:
          document.querySelector(':root').style.setProperty('--Red', '#92B94F');
          break;
        case 12:
          document.querySelector(':root').style.setProperty('--Red', '#89BAF5');
          break;
        case 13:
          document.querySelector(':root').style.setProperty('--Red', '#D44D6E');
          break;
        case 14:
          document.querySelector(':root').style.setProperty('--Red', '#1e1e2e');
          break;
        default:
          document.querySelector(':root').style.setProperty('--Red', 'default_color');
      }
    });
  });