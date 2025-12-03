// Get the current month and year
const date = new Date();
const month = date.getMonth();
const year = date.getFullYear();

// Create the Calendar
function createCalendar() {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    const calendarContainer = document.getElementById('calendar-container');
    calendarContainer.innerHTML = ''; // Clear previous content

    // Create empty slots for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('day');
        calendarContainer.appendChild(emptyDay);
    }

    // Populate the calendar with days
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        dayDiv.textContent = day;

        // Mark certain days as available.
        if ([1, 5, 15, 20].includes(day)) { 
            dayDiv.classList.add('available');
        }

        calendarContainer.appendChild(dayDiv);
    }
}

// Initialize the calendar on page load
window.onload = createCalendar;