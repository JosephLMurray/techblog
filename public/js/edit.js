const postId = document.querySelector('input[name="post-id"]').value;

// eslint-disable-next-line func-style
const editFormHandler = async function (event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const content = document.querySelector('textarea[name="post-content"]').value;

  await fetch(`/api/post/${postId}`, {
    // Create the functionality to help create the buttons for your website.
    method: 'PUT',
    body: JSON.stringify({ title, content }),
    headers: { 'Content-Type': 'application/json' }
  });

  document.location.replace('/dashboard');
};

const deleteClickHandler = async function () {
  console.log('WEEEEEEE');
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
