










//==========================================================>
document.addEventListener("DOMContentLoaded", function () {



    const shippingPageLink = document.getElementById('shipping-page');
    const confirmationPageLink = document.getElementById('confirmation-page');
    const paymentPageLink = document.getElementById('payment-page');
    const payment_prev = document.getElementById('payment_prev');
    const payment_next = document.getElementById('payment_next')
    let count = localStorage.getItem('count');
    payment_next.innerHTML = `PAY $${count}.00`;
    //errors
    const validationNameWarning = document.getElementById('validationNameWarning');
    const validationCardNumberWarning = document.getElementById('validationCardNumberWarning');
    const validationIsValidToWarning = document.getElementById('validationIsValidToWarning');
    const validationCVVWarning = document.getElementById('validationCVVWarning');
    const payUnderline1 = document.getElementById('payUnderline1');
    const payUnderline2 = document.getElementById('payUnderline2');
    const payUnderline3 = document.getElementById('payUnderline3');
    const payUnderline4 = document.getElementById('payUnderline4');



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
        updateLinkStates();
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
        if (cardNumberInputValue.length > 16) {
            cardNumberInputValue = cardNumberInputValue.slice(0, 16);
        }
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
        updateLinkStates();
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
        updateLinkStates();
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
        updateLinkStates();
    })



    function updateLinkStates() {
        const name = nameOnCardInput.value;
        const cardNumber = cardNumberInput.value;
        const cardValidation = dateIsValidInput.value;
        const cvvValidation = cvvInput.value;

        if (
            name === '' ||
            cardNumber === '' ||
            cardNumber.length !== 19 ||
            cardValidation === '' ||
            cardValidation.length !== 7 ||
            cvvValidation === '' ||
            cvvValidation.length !== 3
        ) {
            confirmationPageLink.classList.add('disabled');
        } else if (
            name !== '' &&
            cardNumber !== '' &&
            cardNumber.length === 19 &&
            cardValidation !== '' &&
            cardValidation.length === 7 &&
            cvvValidation !== '' &&
            cvvValidation.length === 3) {
            confirmationPageLink.classList.remove('disabled');
        }
    }
    updateLinkStates();

    function validadePaymentInputs() {
        const name = nameOnCardInput.value;
        const cardNumber = cardNumberInput.value;
        const cardValidation = dateIsValidInput.value;
        const cvvValidation = cvvInput.value;



        if (name === '') {
            payment_next.disabled = true;
            validationNameWarning.style.display = "block";
            payUnderline1.style.backgroundColor = "red";
            console.log(name)
        } else if (cardNumber === '' || cardNumber.length !== 19) {
            payment_next.disabled = true;
            validationCardNumberWarning.style.display = "block";
            payUnderline2.style.backgroundColor = "red";
            console.log(cardNumber, cardNumber.length)
        } else if (cardValidation === '' || cardValidation.length !== 7) {
            payment_next.disabled = true;
            validationIsValidToWarning.style.display = "block";
            payUnderline3.style.backgroundColor = "red";
            console.log(cardValidation, cardValidation.length)
        } else if (cvvValidation === '' || cvvValidation.length !== 3) {
            payment_next.disabled = true;
            validationCVVWarning.style.display = "block";
            payUnderline4.style.backgroundColor = "red";
            console.log(cvvValidation, cvvValidation.length)
        } else if (name !== '') {
            payment_next.disabled = false;
            console.log(name)
        } else if (cardNumber !== '' && cardNumber.length === 19) {
            payment_next.disabled = false;
            console.log(cardNumber, cardNumber.length)

        } else if (cardValidation !== '' && cardValidation.length === 7) {
            payment_next.disabled = false;
            console.log(cardValidation, cardValidation.length)

        } else if (cvvValidation !== '' && cvvValidation.length === 3) {
            payment_next.disabled = false;
            console.log(cvvValidation, cvvValidation.length)
        }
    }


    payment_next.addEventListener('click', function () {


        validadePaymentInputs();
        if (!payment_next.disabled) {
            window.location.href = confirmationPageLink.href;
        } //else {
        // //     window.location.href = paymentPageLink.href;
        // // }
        console.log('click');

    })


    payment_prev.addEventListener('click', function () {
        window.location.href = shippingPageLink.href;
    })
    validadePaymentInputs();
});

























































// //==========================================================>
// document.addEventListener("DOMContentLoaded", function () {



//     const shippingPageLink = document.getElementById('shipping-page');
//     const confirmationPageLink = document.getElementById('confirmation-page');
//     //const paymentPageLink = document.getElementById('payment-page');
//     const payment_prev = document.getElementById('payment_prev');
//     const payment_next = document.getElementById('payment_next')
//     let count = localStorage.getItem('count');
//     payment_next.innerHTML = `PAY $${count}.00`;
//     //errors
//     const validationNameWarning = document.getElementById('validationNameWarning');
//     const validationCardNumberWarning = document.getElementById('validationCardNumberWarning');
//     const validationIsValidToWarning = document.getElementById('validationIsValidToWarning');
//     const validationCVVWarning = document.getElementById('validationCVVWarning');
//     const payUnderline1 = document.getElementById('payUnderline1');
//     const payUnderline2 = document.getElementById('payUnderline2');
//     const payUnderline3 = document.getElementById('payUnderline3');
//     const payUnderline4 = document.getElementById('payUnderline4');



//     //User Name 
//     const nameOnCardInput = document.getElementById('user_name_input')
//     const nameOnCardOutput = document.getElementById('user_name_output');

//     const savedUserNameInputValue = localStorage.getItem('userNameValue');
//     if (savedUserNameInputValue) {
//         nameOnCardInput.value = savedUserNameInputValue;
//         nameOnCardOutput.textContent = savedUserNameInputValue
//     }

//     nameOnCardInput.addEventListener('input', function () {
//         let nameOnCardInputValue = nameOnCardInput.value.replace(/\s+/g, ' ');
//         nameOnCardInputValue = nameOnCardInputValue.replace(/\b\w/g, (match) => match.toUpperCase());

//         if (nameOnCardInputValue.length > 20) {
//             nameOnCardInput.value = nameOnCardInputValue.slice(0, 20)
//         }
//         localStorage.setItem('userNameValue', nameOnCardInputValue)
//         nameOnCardOutput.textContent = nameOnCardInputValue;
//         updateLinkStates();
//     })

//     //Card Number
//     const cardNumberInput = document.getElementById('card_number_input');
//     const cardNumberOutput = document.getElementById('card_number_output');
//     const bankLabel = document.getElementById('bank_label');
//     const visaLogo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Visa_2021.svg/2880px-Visa_2021.svg.png';
//     const mastercardLogo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/1920px-Mastercard_2019_logo.svg.png';
//     const defaultLogo = 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Coin_of_Maximian.jpg';

//     const savedCardNumberInputValue = localStorage.getItem('cardNumberValue');
//     const savedCardType = localStorage.getItem('cardType');

//     if (savedCardNumberInputValue) {
//         cardNumberInput.value = savedCardNumberInputValue;
//         cardNumberOutput.textContent = formatCardNumber(savedCardNumberInputValue);
//         if (savedCardType === 'visa') {
//             bankLabel.src = visaLogo;
//         } else if (savedCardType === 'mastercard') {
//             bankLabel.src = mastercardLogo;
//         } else {
//             bankLabel.src = defaultLogo;
//         }
//     }

//     cardNumberInput.addEventListener('input', function () {
//         let cardNumberInputValue = cardNumberInput.value;

//         cardNumberInputValue = cardNumberInputValue.replace(/\D/g, '');
//         if (cardNumberInputValue.length > 16) {
//             cardNumberInputValue = cardNumberInputValue.slice(0, 16);
//         }
//         cardNumberInputValue = formatCardNumber(cardNumberInputValue);

//         localStorage.setItem('cardNumberValue', cardNumberInputValue);
//         cardNumberOutput.textContent = cardNumberInputValue;

//         const isVisa = /^4/.test(cardNumberInputValue);
//         const isMasterCard = /^5/.test(cardNumberInputValue);

//         if (isVisa) {
//             bankLabel.src = visaLogo;
//             localStorage.setItem('cardType', 'visa');
//         } else if (isMasterCard) {
//             bankLabel.src = mastercardLogo;
//             localStorage.setItem('cardType', 'mastercard');
//         } else {
//             bankLabel.src = defaultLogo;
//             localStorage.removeItem('cardType');
//         }
//         updateLinkStates();
//     });

//     function formatCardNumber(cardNumber) {
//         return cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ');
//     }

//     //Valid through
//     const dateIsValidInput = document.getElementById('date_is_valid_input');
//     const dateIsValidOutput = document.getElementById('is_valid_output');

//     const savedIsValidInputValue = localStorage.getItem('cardValidityValue');
//     if (savedIsValidInputValue) {
//         dateIsValidInput.value = savedIsValidInputValue;
//         dateIsValidOutput.textContent = formatInputDate(savedIsValidInputValue);
//     }

//     dateIsValidInput.addEventListener('input', function () {
//         const inputValue = dateIsValidInput.value;
//         const formattedValue = formatInputDate(inputValue);
//         dateIsValidInput.value = formattedValue;

//         dateIsValidOutput.textContent = formattedValue;
//         if (isValidDate(formattedValue)) {
//             localStorage.setItem('cardValidityValue', formattedValue);
//         }
//         updateLinkStates();
//     });

//     function formatInputDate(input) {
//         const numericValue = input.replace(/\D/g, '');
//         let formattedValue = numericValue.slice(0, 4);

//         if (formattedValue.length > 2) {
//             const month = formattedValue.substring(0, 2);
//             const year = formattedValue.substring(2, 4);

//             if (parseInt(month) >= 1 && parseInt(month) <= 12 && parseInt(year) >= 23 && parseInt(year) <= 50) {
//                 formattedValue = ('0' + parseInt(month)).slice(-2) + ' / ' + ('0' + parseInt(year)).slice(-2);
//             }
//         }
//         return formattedValue;
//     }
//     function isValidDate(input) {
//         const regex = /^(0[1-9]|1[0-2]) \/ (2[3-9]|3[0-9]|4[0-9]|50)$/;
//         return regex.test(input);
//     }


//     // CVV
//     const cvvInput = document.getElementById('cvv_is_valid_input');
//     const savedCvvInputValue = localStorage.getItem('cvvValue');
//     if (savedCvvInputValue) {
//         cvvInput.value = savedCvvInputValue;
//     }
//     cvvInput.addEventListener('input', function () {
//         let cvvInputValue = cvvInput.value.replace(/\D/g, '');
//         if (cvvInputValue.length > 3) {
//             cvvInputValue = cvvInputValue.slice(0, 3);
//         }
//         localStorage.setItem('cvvValue', cvvInputValue)
//         cvvInput.value = cvvInputValue;
//         updateLinkStates();
//     })



//     function updateLinkStates() {
//         const name = nameOnCardInput.value;
//         const cardNumber = cardNumberInput.value;
//         const cardValidation = dateIsValidInput.value;
//         const cvvValidation = cvvInput.value;

//         if (
//             name === '' ||
//             cardNumber === '' ||
//             cardNumber.length !== 19 ||
//             cardValidation === '' ||
//             cardValidation.length !== 7 ||
//             cvvValidation === '' ||
//             cvvValidation.length !== 3
//         ) {
//             confirmationPageLink.classList.add('disabled');
//         } else if (
//             name !== '' &&
//             cardNumber !== '' &&
//             cardNumber.length === 19 &&
//             cardValidation !== '' &&
//             cardValidation.length === 7 &&
//             cvvValidation !== '' &&
//             cvvValidation.length === 3) {
//             confirmationPageLink.classList.remove('disabled');
//         }
//     }
//     updateLinkStates();


//     payment_next.addEventListener('click', function () {

//         // const name = localStorage.getItem('userNameValue');
//         // const cardNumber = localStorage.getItem('cardNumberValue');
//         // const cardValidation = localStorage.getItem('cardValidityValue');
//         // const cvvValidation = localStorage.getItem('cvvValue');

//         const name = nameOnCardInput.value;
//         const cardNumber = cardNumberInput.value;
//         const cardValidation = dateIsValidInput.value;
//         const cvvValidation = cvvInput.value;



//         if (name === '') {
//             payment_next.disabled = true;
//             validationNameWarning.style.display = "block";
//             payUnderline1.style.backgroundColor = "red";
//         } else if (cardNumber === '' || cardNumber.length !== 19) {
//             payment_next.disabled = true;
//             validationCardNumberWarning.style.display = "block";
//             payUnderline2.style.backgroundColor = "red";
//         } else if (cardValidation === '' || cardValidation.length !== 7) {
//             payment_next.disabled = true;
//             validationIsValidToWarning.style.display = "block";
//             payUnderline3.style.backgroundColor = "red";
//         } else if (cvvValidation === '' || cvvValidation.length !== 3) {
//             payment_next.disabled = true;
//             validationCVVWarning.style.display = "block";
//             payUnderline4.style.backgroundColor = "red";
//         } else if (name !== '') {
//             payment_next.disabled = false;
//             window.location.href = confirmationPageLink.href;
//         } else if (cardNumber !== '' && cardNumber.length === 19) {
//             payment_next.disabled = false;
//             window.location.href = confirmationPageLink.href;
//         } else if (cardValidation !== '' && cardValidation.length === 7) {
//             payment_next.disabled = false;
//             window.location.href = confirmationPageLink.href;
//         } else if (cvvValidation !== '' && cvvValidation.length === 3) {
//             payment_next.disabled = false;
//             window.location.href = confirmationPageLink.href;
//         }

//     })

//     payment_prev.addEventListener('click', function () {
//         window.location.href = shippingPageLink.href;
//     })
// });
















































































































//=============================================
// document.addEventListener("DOMContentLoaded", function () {



//     const shippingPageLink = document.getElementById('shipping-page');
//     const confirmationPageLink = document.getElementById('confirmation-page');
//     const paymentPageLink = document.getElementById('payment-page');
//     const payment_prev = document.getElementById('payment_prev');
//     const payment_next = document.getElementById('payment_next')
//     let count = localStorage.getItem('count');
//     payment_next.innerHTML = `PAY $${count}.00`;
//     //errors
//     const validationNameWarning = document.getElementById('validationNameWarning');
//     const validationCardNumberWarning = document.getElementById('validationCardNumberWarning');
//     const validationIsValidToWarning = document.getElementById('validationIsValidToWarning');
//     const validationCVVWarning = document.getElementById('validationCVVWarning');
//     const payUnderline1 = document.getElementById('payUnderline1');
//     const payUnderline2 = document.getElementById('payUnderline2');
//     const payUnderline3 = document.getElementById('payUnderline3');
//     const payUnderline4 = document.getElementById('payUnderline4');



//     //User Name 
//     const nameOnCardInput = document.getElementById('user_name_input')
//     const nameOnCardOutput = document.getElementById('user_name_output');

//     const savedUserNameInputValue = localStorage.getItem('userNameValue');
//     if (savedUserNameInputValue) {
//         nameOnCardInput.value = savedUserNameInputValue;
//         nameOnCardOutput.textContent = savedUserNameInputValue
//     }

//     nameOnCardInput.addEventListener('input', function () {
//         let nameOnCardInputValue = nameOnCardInput.value.replace(/\s+/g, ' ');
//         nameOnCardInputValue = nameOnCardInputValue.replace(/\b\w/g, (match) => match.toUpperCase());

//         if (nameOnCardInputValue.length > 20) {
//             nameOnCardInput.value = nameOnCardInputValue.slice(0, 20)
//         }
//         localStorage.setItem('userNameValue', nameOnCardInputValue)
//         nameOnCardOutput.textContent = nameOnCardInputValue;
//     })

//     //Card Number
//     const cardNumberInput = document.getElementById('card_number_input');
//     const cardNumberOutput = document.getElementById('card_number_output');
//     const bankLabel = document.getElementById('bank_label');
//     const visaLogo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Visa_2021.svg/2880px-Visa_2021.svg.png';
//     const mastercardLogo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/1920px-Mastercard_2019_logo.svg.png';
//     const defaultLogo = 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Coin_of_Maximian.jpg';

//     const savedCardNumberInputValue = localStorage.getItem('cardNumberValue');
//     const savedCardType = localStorage.getItem('cardType');

//     if (savedCardNumberInputValue) {
//         cardNumberInput.value = savedCardNumberInputValue;
//         cardNumberOutput.textContent = formatCardNumber(savedCardNumberInputValue);
//         if (savedCardType === 'visa') {
//             bankLabel.src = visaLogo;
//         } else if (savedCardType === 'mastercard') {
//             bankLabel.src = mastercardLogo;
//         } else {
//             bankLabel.src = defaultLogo;
//         }
//     }

//     cardNumberInput.addEventListener('input', function () {
//         let cardNumberInputValue = cardNumberInput.value;

//         cardNumberInputValue = cardNumberInputValue.replace(/\D/g, '');
//         if (cardNumberInputValue.length > 16) {
//             cardNumberInputValue = cardNumberInputValue.slice(0, 16);
//         }
//         cardNumberInputValue = formatCardNumber(cardNumberInputValue);

//         localStorage.setItem('cardNumberValue', cardNumberInputValue);
//         cardNumberOutput.textContent = cardNumberInputValue;

//         const isVisa = /^4/.test(cardNumberInputValue);
//         const isMasterCard = /^5/.test(cardNumberInputValue);

//         if (isVisa) {
//             bankLabel.src = visaLogo;
//             localStorage.setItem('cardType', 'visa');
//         } else if (isMasterCard) {
//             bankLabel.src = mastercardLogo;
//             localStorage.setItem('cardType', 'mastercard');
//         } else {
//             bankLabel.src = defaultLogo;
//             localStorage.removeItem('cardType');
//         }
//     });

//     function formatCardNumber(cardNumber) {
//         return cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ');
//     }

//     //Valid through
//     const dateIsValidInput = document.getElementById('date_is_valid_input');
//     const dateIsValidOutput = document.getElementById('is_valid_output');

//     const savedIsValidInputValue = localStorage.getItem('cardValidityValue');
//     if (savedIsValidInputValue) {
//         dateIsValidInput.value = savedIsValidInputValue;
//         dateIsValidOutput.textContent = formatInputDate(savedIsValidInputValue);
//     }

//     dateIsValidInput.addEventListener('input', function () {
//         const inputValue = dateIsValidInput.value;
//         const formattedValue = formatInputDate(inputValue);
//         dateIsValidInput.value = formattedValue;

//         dateIsValidOutput.textContent = formattedValue;
//         if (isValidDate(formattedValue)) {
//             localStorage.setItem('cardValidityValue', formattedValue);
//         }
//     });

//     function formatInputDate(input) {
//         const numericValue = input.replace(/\D/g, '');
//         let formattedValue = numericValue.slice(0, 4);

//         if (formattedValue.length > 2) {
//             const month = formattedValue.substring(0, 2);
//             const year = formattedValue.substring(2, 4);

//             if (parseInt(month) >= 1 && parseInt(month) <= 12 && parseInt(year) >= 23 && parseInt(year) <= 50) {
//                 formattedValue = ('0' + parseInt(month)).slice(-2) + ' / ' + ('0' + parseInt(year)).slice(-2);
//             }
//         }
//         return formattedValue;
//     }
//     function isValidDate(input) {
//         const regex = /^(0[1-9]|1[0-2]) \/ (2[3-9]|3[0-9]|4[0-9]|50)$/;
//         return regex.test(input);
//     }


//     // CVV
//     const cvvInput = document.getElementById('cvv_is_valid_input');
//     const savedCvvInputValue = localStorage.getItem('cvvValue');
//     if (savedCvvInputValue) {
//         cvvInput.value = savedCvvInputValue;
//     }
//     cvvInput.addEventListener('input', function () {
//         let cvvInputValue = cvvInput.value.replace(/\D/g, '');
//         if (cvvInputValue.length > 3) {
//             cvvInputValue = cvvInputValue.slice(0, 3);
//         }
//         localStorage.setItem('cvvValue', cvvInputValue)
//         cvvInput.value = cvvInputValue;
//         //console.log(typeof cvvInputValue);
//     })


//     payment_next.addEventListener('click', function () {

//         const name = nameOnCardInput.value;
//         const cardNumber = cardNumberInput.value;
//         const cardValidation = dateIsValidInput.value;
//         const cvvValidation = cvvInput.value;


//         if (name === '') {
//             payment_next.disabled = true;
//             //window.location.href = paymentPageLink.href;
//             confirmationPageLink.classList.add('disabled');
//             validationNameWarning.style.display = "block";
//             payUnderline1.style.backgroundColor = "red";
//         } else if (cardNumber === '' || cardNumber.length !== 19) {
//             payment_next.disabled = true;
//             //window.location.href = paymentPageLink.href;
//             confirmationPageLink.classList.add('disabled');
//             validationCardNumberWarning.style.display = "block";
//             payUnderline2.style.backgroundColor = "red";
//         } else if (cardValidation === '' || cardValidation.length !== 7) {
//             payment_next.disabled = true;
//             //window.location.href = paymentPageLink.href;
//             confirmationPageLink.classList.add('disabled');
//             validationIsValidToWarning.style.display = "block";
//             payUnderline3.style.backgroundColor = "red";
//         } else if (cvvValidation === '' || cvvValidation.length !== 3) {
//             payment_next.disabled = true;
//             //window.location.href = paymentPageLink.href;
//             confirmationPageLink.classList.add('disabled');
//             validationCVVWarning.style.display = "block";
//             payUnderline4.style.backgroundColor = "red";
//         } else if (name) {
//             payment_next.disabled = false;
//             confirmationPageLink.classList.remove('disabled');
//             window.location.href = confirmationPageLink.href;
//         } else if (cardNumber && cardNumber.length === 19) {
//             payment_next.disabled = false;
//             confirmationPageLink.classList.remove('disabled');
//             window.location.href = confirmationPageLink.href;
//         } else if (cardValidation === '' && cardValidation.length === 7) {
//             payment_next.disabled = false;
//             confirmationPageLink.classList.remove('disabled');
//             window.location.href = confirmationPageLink.href;
//         } else if (cvvValidation === '' && cvvValidation.length === 3) {
//             payment_next.disabled = false;
//             confirmationPageLink.classList.remove('disabled');
//             window.location.href = confirmationPageLink.href;
//         }








//         // if (
//         //     name === '' ||
//         //     cardNumber === '' ||
//         //     cardNumber.length !== 19 ||
//         //     cardValidation === '' ||
//         //     cardValidation.length !== 7 ||
//         //     cvvValidation === '' ||
//         //     cvvValidation.length !== 3
//         // ) {
//         //     alert("Make shure you filled in all fields before proceeding.");
//         //     payment_next.disabled = true;
//         //     // //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//         //     confirmationPageLink.classList.add('disabled');

//         // } else if (
//         //     name &&
//         //     cardNumber &&
//         //     cardNumber.length === 19 &&
//         //     cardValidation &&
//         //     cardValidation.length === 7 &&
//         //     cvvValidation &&
//         //     cvvValidation.length === 3
//         // ) {
//         //     payment_next.disabled = false;
//         //     confirmationPageLink.classList.remove("disabled");
//         //     window.location.href = confirmationPageLink.href;
//         // }
//     })

//     payment_prev.addEventListener('click', function () {
//         window.location.href = shippingPageLink.href;
//     })



// });