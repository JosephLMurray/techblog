// eslint-disable-next-line func-style
const commentFormHandler = async function (event) {
  event.preventDefault();

  const postId = document.querySelector('#post-id').dataset.value;
  const content = document.querySelector('#comment-content').value;
  // Create the functionality to help create the buttons for your website.
  await fetch('/api/comment', {
    method: 'POST',
    body: JSON.stringify({ postId, content }),
    headers: { 'Content-Type': 'application/json' }
  });

  location.reload();
};

document
  .querySelector('#new-comment-form')
  .addEventListener('submit', commentFormHandler);
