// Calculate the percentage of time passed for day, week, month, and year
function calculateTimePercentage() {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now);
/*     startOfWeek.setDate(now.getDate() - now.getDay());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1); */
  
    const millisecondsInDay = 24 * 60 * 60 * 1000;
/*     const millisecondsInWeek = 7 * millisecondsInDay;
    const millisecondsInMonth = 30 * millisecondsInDay; // Approximation
    const millisecondsInYear = 365 * millisecondsInDay; // Approximation */
  
    const dayPercentage = ((now - startOfDay) / millisecondsInDay) * 100;
    /* const weekPercentage = ((now - startOfWeek) / millisecondsInWeek) * 100;
    const monthPercentage = ((now - startOfMonth) / millisecondsInMonth) * 100;
    const yearPercentage = ((now - startOfYear) / millisecondsInYear) * 100; */
  
    return {
      dayPercentage,
 /*      weekPercentage,
      monthPercentage,
      yearPercentage, */
    };
  }
  
// Update the progress bars and percentages
function updateBars() {
  const percentages = calculateTimePercentage();

  document.getElementById('dayBar').style.width = percentages.dayPercentage + '%';
  document.getElementById('dayPercentage').textContent = formatPercentage(percentages.dayPercentage);

 /*  document.getElementById('weekBar').style.width = percentages.weekPercentage + '%';
  document.getElementById('weekPercentage').textContent = formatPercentage(percentages.weekPercentage);

  document.getElementById('monthBar').style.width = percentages.monthPercentage + '%';
  document.getElementById('monthPercentage').textContent = formatPercentage(percentages.monthPercentage);

  document.getElementById('yearBar').style.width = percentages.yearPercentage + '%';
  document.getElementById('yearPercentage').textContent = formatPercentage(percentages.yearPercentage); */
}

// Function to format percentage with leading zero if necessary
function formatPercentage(percentage) {
  return percentage.toFixed(2).padStart(5, '0') + '%';
}

// Update bars on page load
updateBars();

// Update bars every second to reflect the progress
setInterval(updateBars, 1000);
