document
        .getElementById("loginForm")
        .addEventListener("submit", function (event) {
          event.preventDefault();

          var email = document.getElementById("email").value;

          var password = document.getElementById("password").value;

          var registeredEmail = "tanjb@email.com";
          var registeredPassword = "123";

          if (email === registeredEmail && password === registeredPassword) {
            window.location.href = "home.html";
          } else {
            alert("Invalid Password or Email");
          }
        });