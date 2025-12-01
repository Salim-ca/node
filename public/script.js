// public/js/script.js

// Make sure your form element has the ID 'myForm'
document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Collect data from your form inputs
    const formData = {
        name: document.getElementById('title').value, 
        id: document.getElementById('snippet').value,
        bio: document.getElementById('body').value
    };

    // Send the POST request to your Express server
    fetch('http://localhost:3000/postData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            // Handle HTTP error codes (4xx, 5xx)
            throw new Error(`Server responded with status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        alert('Data saved successfully!');
        console.log('Server response:', data);
        // You could clear the form here: event.target.reset();
    })
    .catch(error => {
        alert(`Failed to save data: ${error.message}`);
        console.error('Fetch Error:', error);
    });
});