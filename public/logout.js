const logoutHandler = async () => {
  const response = await fetch("api/user/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.replace("/");
    alert("Logged out");
  } else "logged out failed";
};

logoutSubmit = document.querySelector("#logout").addEventListener("click", logoutHandler);
