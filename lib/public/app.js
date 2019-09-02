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
            message: document.querySelector('#message').value
        })
    };

    const resultDiv = document.querySelector('#result');
    resultDiv.innerHTML = '';

    fetch('/api/sms', fetchParameters).then((response) => {
        if(response.ok) {
            resultDiv.innerHTML = 'SMS sent';
        }
        else {
            resultDiv.innerHTML = 'Error sending SMS';
        }
    });
}