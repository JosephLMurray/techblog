const postId = window.location.pathname.split('/').at(-1);

// eslint-disable-next-line func-style
const editFormHandler = async function (event) {
  event.preventDefault();

  const title = document.querySelector('#post-title').value;
  const content = document.querySelector('#post-content').value;

  await fetch(`/api/post/${postId}`, {
    // Create the functionality to help create the buttons for your website.
    method: 'PUT',
    body: JSON.stringify({ title, content }),
    headers: { 'Content-Type': 'application/json' }
  });

  document.location.replace('/dashboard');
};

const deleteClickHandler = async function () {
  await fetch(`/api/post/${postId}`, {
    method: 'DELETE'
  });
  // Create the functionality to help create the buttons for your website.

  document.location.replace('/dashboard');
};

document
  .querySelector('#edit-post-form')
  .addEventListener('submit', editFormHandler);
document
  .querySelector('#delete-btn')
  .addEventListener('click', deleteClickHandler);
