async function thumbsClickHandler(event) {
    event.preventDefault();
  
    const id = window.location.toString().split("/")[
      window.location.toString().split('/').length - 1
    ];
    const response = await fetch("/api/posts/thumbs", {
      method: "PUT",
      body: JSON.stringify({
        post_id: id
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
  
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector(".thumbs").addEventListener("click", thumbsClickHandler);
  