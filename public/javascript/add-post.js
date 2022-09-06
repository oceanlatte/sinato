async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value.trim();
  const artist = document.querySelector('input[name="artist-name"]').value.trim();
  const post_content = document.querySelector('textarea[id="post-content"]').value.trim();

  const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
          title,
          artist,
          post_content

      }),
      headers: {
          'Content-Type': 'application/json'
      }
  });
  console.log(response);
  if (response.ok) {
      document.location.replace('/dashboard');
  } else {
      alert(response.statusText);
  }
}


document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);