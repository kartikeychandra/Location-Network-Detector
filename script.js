const citySpan = document.getElementById("location");
const coordsSpan = document.getElementById("coords");
const networkSpan = document.getElementById("network");

function detectLocation() {
    if (!navigator.geolocation) {
        citySpan.textContent = "Geolocation not supported.";
        return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        coordsSpan.textContent = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;


        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
        const data = await response.json();
        console.log(data.address);

        const address = data.address;
        const city = address.city || address.town || address.village || address.county || address.state || "Unknown";
        citySpan.textContent = city;

    }, (err) => {
        citySpan.textContent = "Error: " + err.message;
    }, {
        enableHighAccuracy: true
    });
}

function detectNetwork() {
    if ("connection" in navigator) {
        const connection = navigator.connection;
        const type = connection.effectiveType;
        const downlink = connection.downlink;
        const saveData = connection.saveData;

        networkSpan.textContent = `${type.toUpperCase()} (${downlink} Mbps)${saveData ? " - Data Saver On" : ""}`;
    } else {
        networkSpan.textContent = "Network Info API not supported.";
    }
}

document.querySelector(".scroll-down-wrapper").addEventListener("click", () => {
    document.getElementById("thanksSection").scrollIntoView({
        behavior: "smooth"
    });
});


const thanksSection = document.getElementById("thanksSection");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            thanksSection.classList.add("visible");
        }
    });
});
observer.observe(thanksSection);

detectLocation();
detectNetwork();
