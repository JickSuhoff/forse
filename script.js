
// =======================================================> Order
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

//========================================================> Shipiing 
document.addEventListener("DOMContentLoaded", function () {

    const cityInput = document.getElementById('cityInput');
    const addressInput = document.getElementById('addressInput');
    const phoneInput = document.getElementById('phoneInput');
    const orderPageLink = document.getElementById("order-page");
    const paymentPageLink = document.getElementById('payment-page');
    const shipping_next = document.getElementById('shipping_next');
    const shipping_prev = document.getElementById('shipping_prev');

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
    });

    addressInput.addEventListener("input", function () {
        let inputText = addressInput.value;
        localStorage.setItem('addressInputValue', inputText);
    });

    phoneInput.addEventListener("input", function () {
        let inputText = phoneInput.value;
        localStorage.setItem("phoneInputValue", inputText);
    })

    shipping_next.addEventListener('click', function () {

        const cityInputValue = cityInput.value;
        const addressInputValue = addressInput.value;
        const phoneInputValue = phoneInput.value;

        if (cityInputValue === '' || addressInputValue === '' || phoneInputValue === '') {
            console.log(phoneInputValue.length)
            shipping_next.disabled = true;
            paymentPageLink.classList.add("disabled");
            alert("Please fill in all fields before proceeding.");

        } else if (cityInputValue !== '' && addressInputValue !== '' && phoneInputValue !== '' && phoneInputValue.length === 13) {
            console.log(phoneInputValue.length)
            shipping_next.disabled = false;
            paymentPageLink.classList.remove("disabled");
            window.location.href = paymentPageLink.href;
        }
    });

    shipping_prev.addEventListener('click', function () {
        window.location.href = orderPageLink.href;
    })
});

//========================================================> Payment
document.addEventListener("DOMContentLoaded", function () {



    const shippingPageLink = document.getElementById('shipping-page');
    const confirmationPageLink = document.getElementById('confirmation-page');
    const paymentPageLink = document.getElementById('payment-page');
    const payment_prev = document.getElementById('payment_prev');
    const payment_next = document.getElementById('payment_next')
    let count = localStorage.getItem('count');
    payment_next.innerHTML = `PAY $${count}.00`;

    //User Name 
    const nameOnCardInput = document.getElementById('user_name_input')
    const nameOnCardOutput = document.getElementById('user_name_output');

    const savedUserNameInputValue = localStorage.getItem('userNameValue');
    if (savedUserNameInputValue) {
        nameOnCardInput.value = savedUserNameInputValue;
        nameOnCardOutput.textContent = savedUserNameInputValue
    }

    nameOnCardInput.addEventListener('input', function () {
        let nameOnCardInputValue = nameOnCardInput.value.replace(/\s+/g, ' ');
        nameOnCardInputValue = nameOnCardInputValue.replace(/\b\w/g, (match) => match.toUpperCase());

        if (nameOnCardInputValue.length > 20) {
            nameOnCardInput.value = nameOnCardInputValue.slice(0, 20)
        }
        localStorage.setItem('userNameValue', nameOnCardInputValue)
        nameOnCardOutput.textContent = nameOnCardInputValue;
    })

    //Card Number
    const cardNumberInput = document.getElementById('card_number_input');
    const cardNumberOutput = document.getElementById('card_number_output');
    const bankLabel = document.getElementById('bank_label');
    const visaLogo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Visa_2021.svg/2880px-Visa_2021.svg.png';
    const mastercardLogo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/1920px-Mastercard_2019_logo.svg.png';
    const defaultLogo = 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Coin_of_Maximian.jpg';

    const savedCardNumberInputValue = localStorage.getItem('cardNumberValue');
    const savedCardType = localStorage.getItem('cardType');

    if (savedCardNumberInputValue) {
        cardNumberInput.value = savedCardNumberInputValue;
        cardNumberOutput.textContent = formatCardNumber(savedCardNumberInputValue);
        if (savedCardType === 'visa') {
            bankLabel.src = visaLogo;
        } else if (savedCardType === 'mastercard') {
            bankLabel.src = mastercardLogo;
        } else {
            bankLabel.src = defaultLogo;
        }
    }

    cardNumberInput.addEventListener('input', function () {
        let cardNumberInputValue = cardNumberInput.value;

        cardNumberInputValue = cardNumberInputValue.replace(/\D/g, '');
        cardNumberInputValue = cardNumberInputValue.slice(0, 16);
        cardNumberInputValue = formatCardNumber(cardNumberInputValue);

        localStorage.setItem('cardNumberValue', cardNumberInputValue);
        cardNumberOutput.textContent = cardNumberInputValue;

        const isVisa = /^4/.test(cardNumberInputValue);
        const isMasterCard = /^5/.test(cardNumberInputValue);

        if (isVisa) {
            bankLabel.src = visaLogo;
            localStorage.setItem('cardType', 'visa');
        } else if (isMasterCard) {
            bankLabel.src = mastercardLogo;
            localStorage.setItem('cardType', 'mastercard');
        } else {
            bankLabel.src = defaultLogo;
            localStorage.removeItem('cardType');
        }
    });

    function formatCardNumber(cardNumber) {
        return cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ');
    }

    //Valid through
    const dateIsValidInput = document.getElementById('date_is_valid_input');
    const dateIsValidOutput = document.getElementById('is_valid_output');

    const savedIsValidInputValue = localStorage.getItem('cardValidityValue');
    if (savedIsValidInputValue) {
        dateIsValidInput.value = savedIsValidInputValue;
        dateIsValidOutput.textContent = formatInputDate(savedIsValidInputValue);
    }

    dateIsValidInput.addEventListener('input', function () {
        const inputValue = dateIsValidInput.value;
        const formattedValue = formatInputDate(inputValue);
        dateIsValidInput.value = formattedValue;

        dateIsValidOutput.textContent = formattedValue;
        if (isValidDate(formattedValue)) {
            localStorage.setItem('cardValidityValue', formattedValue);
        }
    });

    function formatInputDate(input) {
        const numericValue = input.replace(/\D/g, '');
        let formattedValue = numericValue.slice(0, 4);

        if (formattedValue.length > 2) {
            const month = formattedValue.substring(0, 2);
            const year = formattedValue.substring(2, 4);

            if (parseInt(month) >= 1 && parseInt(month) <= 12 && parseInt(year) >= 23 && parseInt(year) <= 50) {
                formattedValue = ('0' + parseInt(month)).slice(-2) + ' / ' + ('0' + parseInt(year)).slice(-2);
            }
        }

        return formattedValue;
    }
    function isValidDate(input) {
        const regex = /^(0[1-9]|1[0-2]) \/ (2[3-9]|3[0-9]|4[0-9]|50)$/;
        return regex.test(input);
    }


    // CVV
    const cvvInput = document.getElementById('cvv_is_valid_input');
    const savedCvvInputValue = localStorage.getItem('cvvValue');
    if (savedCvvInputValue) {
        cvvInput.value = savedCvvInputValue;
    }
    cvvInput.addEventListener('input', function () {
        let cvvInputValue = cvvInput.value.replace(/\D/g, '');
        if (cvvInputValue.length > 3) {
            cvvInputValue = cvvInputValue.slice(0, 3);
        }
        localStorage.setItem('cvvValue', cvvInputValue)
        cvvInput.value = cvvInputValue;
    })


    payment_next.addEventListener('click', function () {

        const name = nameOnCardInput.value;
        const cardNnumber = cardNumberInput.value;
        const cardValidation = dateIsValidInput.value;
        const cvvValidation = cvvInput.value;

        if (
            name === '' ||
            cardNnumber === '' ||
            cardNnumber.length !== 19 ||
            cardValidation === '' ||
            cardValidation.length !== 7 ||
            cvvValidation === '' ||
            cvvValidation.length !== 3
        ) {
            alert("Make shure you filled in all fields before proceeding.");
            payment_next.disabled = true;
            window.location.href = paymentPageLink.href;
            confirmationPageLink.classList.add('disabled');

        } else if (
            name &&
            cardNnumber &&
            cardNnumber.length === 19 &&
            cardValidation &&
            cardValidation.length === 7 &&
            cvvValidation &&
            cvvValidation.length === 3
        ) {
            payment_next.disabled = false;
            confirmationPageLink.classList.remove("disabled");
            window.location.href = confirmationPageLink.href;
        }
    })

    payment_prev.addEventListener('click', function () {
        window.location.href = shippingPageLink.href;
    })



});

//========================================================> Confirmation
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






































































