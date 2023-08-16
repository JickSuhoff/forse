document.addEventListener("DOMContentLoaded", function () {
    const incrementButton = document.getElementById("plus");
    const decrementButton = document.getElementById("minus");
    const order_sum = document.getElementById("total_count");
    const order_nextButton = document.getElementById("order_next");
    const shippingPageLink = document.getElementById("shipping-page");
    const navLinks = document.querySelectorAll("nav a");

    let count = parseInt(localStorage.getItem("count")) || 0;
    order_sum.innerHTML = `total price : ${count}$`;

    incrementButton.addEventListener("click", () => {
        count += 8;
        order_sum.innerHTML = `total price : ${count}$`;
        saveCountToLocalStorage();
        updateLinkStates();
    });

    decrementButton.addEventListener("click", () => {
        count -= 8;
        if (count < 0) {
            count = 0;
        }
        order_sum.innerHTML = `total price : ${count}$`;
        saveCountToLocalStorage();
        updateLinkStates();
    });

    function saveCountToLocalStorage() {
        localStorage.setItem("count", count);
    }

    function updateLinkStates() {
        if (count === 0) {
            order_nextButton.disabled = true;
            shippingPageLink.classList.add("disabled");
            navLinks.forEach(link => link.classList.add("disabled"));
        } else {
            order_nextButton.disabled = false;
            shippingPageLink.classList.remove("disabled");
        }
    }

    updateLinkStates();

    order_nextButton.addEventListener("click", function () {
        if (count > 0) {
            window.location.href = shippingPageLink.href;

        } else if (count === 0) {
            alert("Please complete all the required fields before proceeding.");
        }
    });
});