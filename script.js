 const backToTopBtn = document.getElementById("backToTop");
    window.addEventListener("scroll", function() {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    });
    backToTopBtn.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


// Smooth scroll behavior (alternative to CSS scroll-behavior)
     document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
//newletter validation
    document.querySelector('.newsletter form').addEventListener('submit', function(e) {
            const email = this.querySelector('input[type="email"]').value;
            if (!email) {
                alert("Please enter your email to subscribe.");
                e.preventDefault();
            }
        });

 // Gallery Popup (Basic zoom effect on click)
        document.querySelectorAll('.gallery .box img').forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => {
                const modal = document.createElement('div');
                modal.style.position = 'fixed';
                modal.style.top = 0;
                modal.style.left = 0;
                modal.style.width = '100%';
                modal.style.height = '100%';
                modal.style.background = 'rgba(0,0,0,0.8)';
                modal.style.display = 'flex';
                modal.style.justifyContent = 'center';
                modal.style.alignItems = 'center';
                modal.innerHTML = `<img src="${img.src}" style="max-width:90%; max-height:90%">`;
                modal.addEventListener('click', () => document.body.removeChild(modal));
                document.body.appendChild(modal);
            });
        });
 // Contact Form Validation
        document.querySelector('.contact-form-container form').addEventListener('submit', function(e) {
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            if (!name || !email || !message) {
                alert("Please complete all contact form fields.");
                e.preventDefault();
            }
        });
// Form Validation (Search Form)
        document.querySelector('.form-container form').addEventListener('submit', function(e) {
            const location = this.querySelector('input[type="text"]').value;
            const guests = this.querySelector('input[type="number"]').value;
            const arrival = this.querySelectorAll('input[type="date"]')[0].value;
            const leaving = this.querySelectorAll('input[type="date"]')[1].value;
            if (!location || !guests || !arrival || !leaving) {
                alert("Please fill all the fields in the search form.");
                e.preventDefault();
            }
        });
// Newsletter Form Submit Event
document.querySelector('.newsletter form').addEventListener('submit', function(e) {
    e.preventDefault(); // prevent actual submission
    const email = this.querySelector('input[type="email"]').value;

    if (!email.trim()) {
        alert("Please enter your email to subscribe.");
        return;
    }

    // Show the thank-you modal
    document.getElementById('newsletterModal').style.display = 'flex';

    // Optionally clear the input
    this.querySelector('input[type="email"]').value = '';
});

// Function to close the modal
function closeModal() {
    document.getElementById('newsletterModal').style.display = 'none';
}
function validateDate(inputId) {
    const input = document.getElementById(inputId);
    const selectedDate = new Date(input.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for accurate comparison

    if (selectedDate < today) {
        alert("Please select a valid future date.");
        input.value = ""; // Clear the invalid date
    }
}

function validateArrivalAfterDeparture() {
    const arrival = document.getElementById("arrival-date").value;
    const leaving = document.getElementById("leaving-date").value;
    if (arrival && leaving) {
        const arrivalDate = new Date(arrival);
        const leavingDate = new Date(leaving);
        if (leavingDate < arrivalDate) {
            alert("Leaving date cannot be before arrival date.");
            document.getElementById("leaving-date").value = "";
        }
    }
}

document.getElementById("arrival-date").addEventListener("change", function () {
    validateDate("arrival-date");
    validateArrivalAfterDeparture();
});

document.getElementById("leaving-date").addEventListener("change", function () {
    validateDate("leaving-date");
    validateArrivalAfterDeparture();
});
//max no.of guests=10
document.querySelector("form").addEventListener("submit", function (e) {
    const guestInput = document.getElementById("guests");
    const guestCount = parseInt(guestInput.value);

    if (guestCount < 1 || guestCount > 10) {
        e.preventDefault(); // stop the form submission
        alert("Please enter a number of guests between 1 and 10.");
    }
});
//store the data in local storage
document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault(); // prevent actual form submission

    const location = document.querySelector("input[placeholder='place you want to visit']").value;
    const guests = document.querySelector("input[placeholder='number of peoples']").value;
    const arrival = document.getElementById("arrival-date").value;
    const leaving = document.getElementById("leaving-date").value;

    // Save to local storage
    localStorage.setItem("location", location);
    localStorage.setItem("guests", guests);
    localStorage.setItem("arrival", arrival);
    localStorage.setItem("leaving", leaving);

    alert("Your data has been saved!");
});
//to autofill
window.addEventListener("DOMContentLoaded", () => {
    document.querySelector("input[placeholder='place you want to visit']").value = localStorage.getItem("location") || "";
    document.querySelector("input[placeholder='number of peoples']").value = localStorage.getItem("guests") || "";
    document.getElementById("arrival-date").value = localStorage.getItem("arrival") || "";
    document.getElementById("leaving-date").value = localStorage.getItem("leaving") || "";
});

//store newspaper data
document.querySelector(".newsletter form").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = this.querySelector("input[type='email']").value;
    localStorage.setItem("subscribedEmail", email);
    alert("Subscribed email saved: " + email);
    document.getElementById("newsletterModal").style.display = "flex";
});
