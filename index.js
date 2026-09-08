// ===========================
// PAYMENT COPY TO CLIPBOARD
// ===========================

function copyNumber(elementId) {
    const element = document.getElementById(elementId);
    const text = element.textContent;

    navigator.clipboard.writeText(text).then(() => {
        // Show feedback
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = "✓ Copied!";
        button.style.backgroundColor = "#28a745";

        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = "";
        }, 2000);
    }).catch(err => {
        console.error("Failed to copy: ", err);
        alert("Failed to copy. Please try again.");
    });
}

const stars = document.querySelectorAll(".star");

const submitBtn = document.getElementById("submitBtn");

const reviewBox = document.getElementById("review");

const reviewsContainer = document.getElementById("reviewsContainer");

let rating = 0;

stars.forEach(star=>{

    star.addEventListener("click",()=>{

        rating = star.dataset.value;

        stars.forEach(s=>{

            s.classList.remove("active");

        });

        for(let i=0;i<rating;i++){

            stars[i].classList.add("active");

        }

    });

});

submitBtn.addEventListener("click",()=>{

    if(rating==0){

        alert("Please select a rating.");

        return;

    }

    if(reviewBox.value===""){

        alert("Please write a review.");

        return;

    }

    const review=document.createElement("div");

    review.classList.add("review");

    review.innerHTML=`

        <div class="review-stars">

            ${"★".repeat(rating)}

        </div>

        <p>${reviewBox.value}</p>

    `;

    reviewsContainer.prepend(review);

    reviewBox.value="";

    rating=0;

    stars.forEach(star=>{

        star.classList.remove("active");

    });

});

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {

        item.classList.toggle("active");

    });

});

// ===========================
// PRICING TOGGLE
// ===========================

document.addEventListener("DOMContentLoaded", function() {
    const toggleBtn = document.getElementById("togglePricingBtn");
    const pricingTables = document.getElementById("pricingTables");

    if (toggleBtn && pricingTables) {
        toggleBtn.addEventListener("click", function() {
            const isVisible = pricingTables.style.display !== "none";

            if (isVisible) {
                pricingTables.style.display = "none";
                toggleBtn.innerHTML = '<i class="fas fa-chevron-down"></i>View full pricing';
            } else {
                pricingTables.style.display = "grid";
                toggleBtn.innerHTML = '<i class="fas fa-chevron-up"></i>Hide pricing';
            }
        });

        // Initially hide pricing tables
        pricingTables.style.display = "none";
    }

    // ===========================
    // USE CURRENT LOCATION
    // ===========================

    const locationBtn = document.getElementById("locationBtn");
    if (locationBtn) {
        locationBtn.addEventListener("click", function(e) {
            e.preventDefault();

            if ("geolocation" in navigator) {
                locationBtn.disabled = true;
                locationBtn.textContent = "Getting location...";

                navigator.geolocation.getCurrentPosition(
                    function(position) {
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;

                        // Get address from coordinates using reverse geocoding
                        getAddressFromCoordinates(latitude, longitude);
                        locationBtn.disabled = false;
                        locationBtn.textContent = "Use My Current Location";
                    },
                    function(error) {
                        console.error("Geolocation error: ", error);
                        alert("Unable to access your location. Please enable location services and try again.");
                        locationBtn.disabled = false;
                        locationBtn.textContent = "Use My Current Location";
                    }
                );
            } else {
                alert("Geolocation is not supported by your browser.");
            }
        });
    }

    // ===========================
    // REVERSE GEOCODING (GET ADDRESS FROM COORDINATES)
    // ===========================

    function getAddressFromCoordinates(lat, lon) {
        // Using OpenStreetMap's Nominatim API (free, no key needed)
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const address = data.address.road || data.address.suburb || data.address.city || "Current Location";
                const locationInput = document.querySelector('input[name="location"]');
                if (locationInput) {
                    locationInput.value = address;
                }
            })
            .catch(error => {
                console.error("Reverse geocoding error: ", error);
                const locationInput = document.querySelector('input[name="location"]');
                if (locationInput) {
                    locationInput.value = `${lat}, ${lon}`;
                }
            });
    }

    // ===========================
    // BOOKING FORM SUBMISSION
    // ===========================

const bookingForm = document.querySelector(".booking-form");

if (bookingForm) {
    bookingForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const formData = new FormData(this);

        const data = {
            fullname: formData.get("fullname"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            service: formData.get("service"),
            schedule: formData.get("schedule"),
            date: formData.get("date"),
            location: formData.get("location"),
            instructions: formData.get("instructions")
        };

        // Validate required fields
        if (
            !data.fullname ||
            !data.email ||
            !data.phone ||
            !data.service ||
            !data.schedule ||
            !data.date ||
            !data.location
        ) {
            alert("Please fill in all required fields.");
            return;
        }

        try {
            // Send booking to Formspree
            const response = await fetch(this.action, {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Form submission failed.");
            }

            // Create WhatsApp message
            const message = `
Hello! I would like to book a cleaning service.

📋 *Booking Details:*
• Name: ${data.fullname}
• Email: ${data.email}
• Phone: ${data.phone}
• Service: ${data.service}
• Schedule: ${data.schedule}
• Preferred Date: ${data.date}
• Location: ${data.location}
${data.instructions ? `• Instructions: ${data.instructions}` : ""}

Please confirm the booking.
            `.trim();

            // Open WhatsApp
            const whatsappURL = `https://wa.me/263718895342?text=${encodeURIComponent(message)}`;
            window.open(whatsappURL, "_blank");

            alert("✅ Booking submitted successfully! A copy has been sent to our email, and WhatsApp has been opened.");

            this.reset();

        } catch (error) {
            console.error(error);
            alert("❌ Failed to submit your booking. Please try again.");
        }
    });
}
    // ===========================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ===========================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // ===========================
    // DYNAMIC SERVICE LINKS
    // ===========================

    const serviceLinks = document.querySelectorAll(".service-link");
    serviceLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const serviceTitle = this.closest(".service-card").querySelector(".service-title").textContent;

            // Populate booking form with selected service
            const serviceSelect = document.querySelector('select[name="service"]');
            if (serviceSelect) {
                // Find and select the matching option
                for (let option of serviceSelect.options) {
                    if (option.textContent === serviceTitle) {
                        serviceSelect.value = serviceTitle;
                        break;
                    }
                }

                // Scroll to booking section
                document.querySelector(".booking-section").scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    function sendWhatsAppLocation() {


    if (!navigator.geolocation) {

        alert("Your browser does not support location services.");

        return;

    }


    navigator.geolocation.getCurrentPosition(


        function(position) {


            const latitude = position.coords.latitude;

            const longitude = position.coords.longitude;


            const locationLink = 
            `https://www.google.com/maps?q=${latitude},${longitude}`;


            const message =
            `Hello, I would like to share my current location:\n\n${locationLink}`;


            // Replace with your WhatsApp number
            // Example Zimbabwe: 263771234567
            const phoneNumber = "263XXXXXXXXX";


            const whatsappLink =
            `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;


            window.open(whatsappLink, "_blank");


        },


        function(error) {


            switch(error.code) {


                case error.PERMISSION_DENIED:

                    alert("Please allow location permission to continue.");

                    break;


                case error.POSITION_UNAVAILABLE:

                    alert("Location could not be found.");

                    break;


                case error.TIMEOUT:

                    alert("Location request timed out.");

                    break;


                default:

                    alert("Unable to get your location.");

            }


        },


        {

            enableHighAccuracy: true,

            timeout: 10000,

            maximumAge: 0

        }

    );


}

    // ===========================
    // MOBILE MENU TOGGLE (if you add a hamburger menu)
    // ===========================

    // Example: uncomment if you add a mobile menu button
    // const menuBtn = document.querySelector(".menu-btn");
    // const navbar = document.querySelector(".navbar");
    //
    // if (menuBtn) {
    //     menuBtn.addEventListener("click", function() {
    //         navbar.classList.toggle("active");
    //     });
    // }

    const menuToggle = document.getElementById("menuToggle");

const navbar = document.getElementById("navbar");


menuToggle.addEventListener("click", function(){


    navbar.classList.toggle("active");


    if(navbar.classList.contains("active")){

        menuToggle.innerHTML = "✖";

    }

    else{

        menuToggle.innerHTML = "☰";

    }


});


// Close menu after clicking a link

document.querySelectorAll(".navbar a").forEach(link => {


    link.addEventListener("click", () => {


        navbar.classList.remove("active");

        menuToggle.innerHTML = "☰";


    });


});

    // ===========================
    // FORM INPUT VALIDATION
    // ===========================

    const emailInput = document.querySelector('input[name="email"]');
    if (emailInput) {
        emailInput.addEventListener("blur", function() {
            if (this.value && !isValidEmail(this.value)) {
                this.style.borderColor = "red";
                alert("Please enter a valid email address.");
            } else {
                this.style.borderColor = "";
            }
        });
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // ===========================
    // PHONE NUMBER FORMATTING
    // ===========================

    const phoneInput = document.querySelector('input[name="phone"]');
    if (phoneInput) {
        phoneInput.addEventListener("input", function() {
            // Remove non-numeric characters
            this.value = this.value.replace(/[^0-9\+]/g, "");
        });
    }

    // ===========================
    // DATE PICKER - SET MINIMUM DATE TO TODAY
    // ===========================

    const dateInput = document.querySelector('input[name="date"]');
    if (dateInput) {
        const today = new Date().toISOString().split("T")[0];
        dateInput.min = today;
    }
});

