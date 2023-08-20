document.addEventListener("DOMContentLoaded", function () {

    const cityInput = document.getElementById('cityInput');
    const addressInput = document.getElementById('addressInput');
    const phoneInput = document.getElementById('phoneInput');
    const orderPageLink = document.getElementById("order-page");
    const paymentPageLink = document.getElementById('payment-page');
    const shipping_next = document.getElementById('shipping_next');
    const shipping_prev = document.getElementById('shipping_prev');
    //errors warnings
    const validationCityWarning = document.getElementById('validationCityWarning');
    const validationAddressWarning = document.getElementById('validationAddressWarning');
    const validationPhoneWarning = document.getElementById('validationPhoneWarning');
    const citySpanUnderline = document.getElementById('underline1');
    const addressSpanUnderline = document.getElementById('underline2');
    const phoneSpanUnderline = document.getElementById('underline3');

    const savedCityInputValue = localStorage.getItem('cityInputValue');
    if (savedCityInputValue) {
        cityInput.value = savedCityInputValue;
    }
    const savedAddressInputValue = localStorage.getItem('addressInputValue');
    if (savedAddressInputValue) {
        addressInput.value = savedAddressInputValue;
    }
    const savedPhoneInputValue = localStorage.getItem('phoneInputValue');
    if (savedPhoneInputValue) {
        phoneInput.value = savedPhoneInputValue;
    }
    const autocompleteList = document.getElementById("autocompleteList");
    const ukraineCities = [
        "Kyiv", "Kharkiv", "Lviv", "Odesa", "Dnipro", "Zaporizhia", "Vinnytsia",
        "Kherson", "Chernivtsi", "Poltava", "Rivne", "Mykolaiv", "Sumy", "Lutsk",
        "Zhytomyr", "Ivano-Frankivsk", "Kropyvnytskyi", "Cherkasy", "Kramatorsk", "Mariupol"
    ];

    cityInput.addEventListener("input", function () {
        let inputText = cityInput.value;
        autocompleteList.innerHTML = '';

        if (inputText.length === 0) {
            return;
        }

        const filteredCities = ukraineCities.filter(city =>
            city.toLowerCase().startsWith(inputText.toLowerCase())
        );

        filteredCities.forEach(city => {
            const suggestion = document.createElement("div");
            suggestion.textContent = city;
            suggestion.addEventListener("click", function () {
                cityInput.value = city;
                autocompleteList.innerHTML = '';
                localStorage.setItem("cityInputValue", city);
            });
            autocompleteList.appendChild(suggestion);
        });

        localStorage.setItem("cityInputValue", inputText)

        if (e.target !== cityInput && e.target !== autocompleteList) {
            autocompleteList.innerHTML = '';
        }
        updateLinkStates();
    });

    addressInput.addEventListener("input", function () {
        let inputText = addressInput.value;
        localStorage.setItem('addressInputValue', inputText);
        updateLinkStates();
    });

    phoneInput.addEventListener("input", function () {
        let inputText = phoneInput.value;
        localStorage.setItem("phoneInputValue", inputText);
        updateLinkStates();
    })

    function updateLinkStates() {
        const cityInputValue = cityInput.value;
        const addressInputValue = addressInput.value;
        const phoneInputValue = phoneInput.value;

        if (
            cityInputValue === '' ||
            addressInputValue === '' ||
            phoneInputValue === '' ||
            phoneInputValue.length !== 13
        ) {
            paymentPageLink.classList.add("disabled");
        } else if (
            cityInputValue !== '' &&
            addressInputValue !== '' &&
            phoneInputValue !== '' &&
            phoneInputValue.length === 13
        ) {
            paymentPageLink.classList.remove("disabled");
        }
    };
    updateLinkStates();

    shipping_next.addEventListener('click', function () {
        const cityInputValue = cityInput.value;
        const addressInputValue = addressInput.value;
        const phoneInputValue = phoneInput.value;

        if (cityInputValue === '') {
            shipping_next.disabled = true;
            validationCityWarning.style.display = "block";
            citySpanUnderline.style.backgroundColor = "red";
        } else if (addressInputValue === '') {
            shipping_next.disabled = true;
            validationAddressWarning.style.display = "block";
            addressSpanUnderline.style.backgroundColor = "red";
        } else if (phoneInputValue === '' || phoneInputValue.length !== 13) {
            shipping_next.disabled = true;
            validationPhoneWarning.style.display = "block";
            phoneSpanUnderline.style.backgroundColor = "red";
        } else if (cityInputValue !== '') {
            shipping_next.disabled = false;
            window.location.href = paymentPageLink.href;
        } else if (addressInputValue !== '') {
            shipping_next.disabled = false;
            window.location.href = paymentPageLink.href;
        } else if (phoneInputValue !== '' && phoneInputValue.length === 13) {
            shipping_next.disabled = false;
            window.location.href = paymentPageLink.href;
        }
    });

    shipping_prev.addEventListener('click', function () {
        window.location.href = orderPageLink.href;
    })
});