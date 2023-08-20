document.addEventListener("DOMContentLoaded", function () {

    const incrementButton = document.getElementById("plus");
    const decrementButton = document.getElementById("minus");
    const order_sum = document.getElementById("total_count");
    const ordered_bottles_count_output = document.getElementById("ordered_bottles_count");
    const order_nextButton = document.getElementById("order_next");
    const shippingPageLink = document.getElementById("shipping-page");
    const warningMessage = document.getElementById("warning");


    let count = parseInt(localStorage.getItem("count")) || 0;
    let bottles_count = count / 8;

    order_sum.innerHTML = `total price : ${count}$`;
    ordered_bottles_count_output.innerHTML = `for ${bottles_count} bottle`;

    incrementButton.addEventListener("click", () => {
        count += 8;
        bottles_count = count / 8;
        updateCountsAndStates();
    });

    decrementButton.addEventListener("click", () => {
        count -= 8;
        if (count < 0) {
            count = 0;
        }
        bottles_count = count / 8;
        updateCountsAndStates();
    });

    function updateCountsAndStates() {
        order_sum.innerHTML = `total price : ${count}$`;
        ordered_bottles_count_output.innerHTML = `for ${bottles_count} bottle`;
        saveCountsToLocalStorage();
        updateLinkStates();
    }

    function saveCountsToLocalStorage() {
        localStorage.setItem("count", count);
        localStorage.setItem("bottles_count", bottles_count);
    }

    function updateLinkStates() {
        if (count === 0) {
            order_nextButton.disabled = true;
            shippingPageLink.classList.add("disabled");
        } else {
            order_nextButton.disabled = false;
            shippingPageLink.classList.remove("disabled");
        }
    }

    updateLinkStates();

    order_nextButton.addEventListener("click", function () {
        if (count > 0) {
            warningMessage.style.display = "none";
            order_nextButton.disabled = false;
            shippingPageLink.classList.remove("disabled");
            window.location.href = shippingPageLink.href;
        } else if (count === 0) {
            warningMessage.style.display = "block";
            order_nextButton.disabled = true;
            shippingPageLink.classList.add("disabled");
        }
    });
});


