document.addEventListener("DOMContentLoaded", function () {
    const confirmation_paragraph = document.getElementById('confirmation_paragraph');
    const paymentPageLink = document.getElementById('payment-page');
    const connfirmation_prev = document.getElementById('confimation_prev');


    let count = parseInt(localStorage.getItem("count")) || 0;
    let bottles_count = count / 8;

    if (bottles_count === 1) {
        confirmation_paragraph.innerHTML = `You ordered ${bottles_count} bottle`
    } else {
        confirmation_paragraph.innerHTML = `You ordered ${bottles_count} bottles`
    }




    connfirmation_prev.addEventListener('click', function () {
        window.location.href = paymentPageLink.href;
    })
});
