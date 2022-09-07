$(document).ready(function() {
    $("#emojionearea1").emojioneArea({
        pickerPosition: "bottom",
        tonesStyle: "bullet"
    });
})

async function editFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value.trim();
    const artist = document.querySelector('input[name="artist"]').value.trim();
    const post_content = document.querySelector('input[name="post-content"]').value.trim();
    console.log(title);
    console.log(artist);
    console.log(post_content);

    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
      
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          post_id: id,
          artist,
          title,
          post_content
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.replace('/dashboard/');
      } else {
        alert(response.statusText);
      }

}

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);