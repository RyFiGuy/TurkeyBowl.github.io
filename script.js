// Turkey Bowl Countdown Timer
// Calculates time until next Thanksgiving (4th Thursday of November)

function getNextThanksgiving() {
    const now = new Date();
    const currentYear = now.getFullYear();

    // Check current year's Thanksgiving first
    let thanksgiving = getThanksgivingDate(currentYear);

    // If this year's Thanksgiving has passed, get next year's
    if (now > thanksgiving) {
        thanksgiving = getThanksgivingDate(currentYear + 1);
    }

    return thanksgiving;
}

function getThanksgivingDate(year) {
    // Thanksgiving is the 4th Thursday of November
    const november = new Date(year, 10, 1); // Month is 0-indexed, so 10 = November

    // Find the first Thursday
    let day = 1;
    while (new Date(year, 10, day).getDay() !== 4) {
        day++;
    }

    // Add 3 weeks to get to the 4th Thursday
    const thanksgiving = new Date(year, 10, day + 21);

    // Set time to 10:00 AM (typical game time)
    thanksgiving.setHours(10, 0, 0, 0);

    return thanksgiving;
}

function updateCountdown() {
    const now = new Date();
    const thanksgiving = getNextThanksgiving();
    const difference = thanksgiving - now;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

        // Update the game date display
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        document.querySelector('.game-date').textContent = thanksgiving.toLocaleDateString('en-US', options);
    } else {
        // Game is happening now!
        document.getElementById('countdown').innerHTML = '<h2 class="game-live">THE TURKEY BOWL IS TODAY!</h2>';
    }
}

// Update countdown every second
updateCountdown();
setInterval(updateCountdown, 1000);

// Smooth scrolling for any anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});
