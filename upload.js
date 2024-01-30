// Function to apply the custom background
function applyCustomBackground() {
    const customBackgroundInput = document.getElementById('custom-background-input');
    const file = customBackgroundInput.files[0];
  
    // Check if a new file is selected
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const customBackgroundUrl = e.target.result;
  
        // Delete the old custom background from local storage (if exists)
        deleteCustomBackgroundFromLocalStorage();
  
        // Save the new custom background to local storage
        saveCustomBackgroundToLocalStorage(customBackgroundUrl);
  
        // Apply the new custom background
        document.querySelector(':root').style.setProperty('--pomodoro', `url(${customBackgroundUrl})`);
  
        // Clear the file input value after processing the file
        customBackgroundInput.value = '';
      };
  
      reader.readAsDataURL(file);
    }
  }
  
  // Function to delete the old custom background from local storage
  function deleteCustomBackgroundFromLocalStorage() {
    try {
      localStorage.removeItem('customBackground');
    } catch (error) {
      console.error('Error deleting custom background from localStorage:', error);
    }
  }
  
  // Function to save the custom background to local storage
  function saveCustomBackgroundToLocalStorage(customBackgroundUrl) {
    try {
      localStorage.setItem('customBackground', customBackgroundUrl);
    } catch (error) {
      console.error('Error saving custom background to localStorage:', error);
    }
  }
  
  // Add event listener for the "Apply" button
  const applyBackgroundBtn = document.getElementById('apply-background-btn');
  applyBackgroundBtn.addEventListener('click', applyCustomBackground);
  
  // Check if custom background is saved in local storage and apply it
  const savedCustomBackground = localStorage.getItem('customBackground');
  if (savedCustomBackground) {
    document.querySelector(':root').style.setProperty('--pomodoro', `url(${savedCustomBackground})`);
  }
  
  // Add event listener for the file input change
const customBackgroundInput = document.getElementById('custom-background-input');
const fileNameDisplay = document.getElementById('file-name-display');

customBackgroundInput.addEventListener('change', function () {
  const file = this.files[0];
  if (file) {
    fileNameDisplay.textContent = file.name;
  } else {
    fileNameDisplay.textContent = '';
  }
});
