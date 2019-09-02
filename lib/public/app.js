/**
 * Send an SMS
 */
// eslint-disable-next-line no-unused-vars
function sendSMS() {
    const fetchParameters = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            targetPhone: document.querySelector('#targetPhone').value,
            message: document.querySelector('#message').value,
            accessToken: document.querySelector('#accessToken').value
        })
    };

    const resultDiv = document.querySelector('#result');
    resultDiv.innerHTML = '';

    fetch('/api/sms', fetchParameters).then((response) => {
        response.json().then((responseBody) => {
            resultDiv.innerHTML = responseBody.message;
        });
    });
}
