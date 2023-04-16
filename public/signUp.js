const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    console.log(username, email, password); // add this line
  
    if (username && email && password) {
      const response = await fetch('/api/user/signup', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      //  document.location.replace('/dashboard');
        alert('sign up successful');
      } else {
        alert(response.statusText);
      }
    }
  };

  let signupSubmit = document.querySelector("#signup-form");
signupSubmit.addEventListener("submit", signupFormHandler);
