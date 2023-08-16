document.addEventListener("DOMContentLoaded", function () {
    let count = localStorage.getItem('count');
    const paymentPageLink = document.getElementById('payment-page');
    const show_orderBtn = document.getElementById("show_order");
    const connfirmation_prev = document.getElementById('confimation_prev');

    show_orderBtn.addEventListener('click', function () {
        alert(`Congrats!!! You odrered ${count / 8} bottles of best weeskey!`)
    })
    connfirmation_prev.addEventListener('click', function () {
        window.location.href = paymentPageLink.href;
    })
});
