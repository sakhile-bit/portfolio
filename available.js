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

    // Define holidays (example: add your own holiday dates as needed)
    const holidays = [
        // Format: 'MM-DD'
        '01-01', // New Year's Day
        '03-08', // International Women's Day
        '05-01', // Labour Day
        '10-24', // Independence Day
        // Add more as needed
    ];

    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        dayDiv.textContent = day;

        const thisDate = new Date(year, month, day);
        const dayOfWeek = thisDate.getDay(); // 0=Sunday, 5=Friday, 6=Saturday
        const mmdd = (String(month + 1).padStart(2, '0')) + '-' + String(day).padStart(2, '0');

        // Not available on weekends, Fridays, or holidays
        if (dayOfWeek === 0 || dayOfWeek === 5 || dayOfWeek === 6 || holidays.includes(mmdd)) {
            dayDiv.classList.add('unavailable');
        } else {
            dayDiv.classList.add('available');
        }

        calendarContainer.appendChild(dayDiv);
    }
}

// Initialize the calendar on page load
window.onload = createCalendar;