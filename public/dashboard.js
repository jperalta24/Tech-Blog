// dashboard.js
document
  .getElementById("newPostForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("postTitle").value.trim();
    const content = document.getElementById("postContent").value.trim();

    if (title && content) {
      const response = await fetch("/api/post", {
        method: "POST",
        body: JSON.stringify({ title, content }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.reload();
      } else {
        alert("Failed to create post");
      }
    }
  });
