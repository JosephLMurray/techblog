// eslint-disable-next-line func-style
const newFormHandler = async function (event) {
  event.preventDefault();

  const title = document.querySelector('#post-title').value;
  const content = document.querySelector('#post-content').value;

  await fetch(`/api/post`, {
    // Create the functionality to help create the buttons for your website.
    method: 'POST',
    body: JSON.stringify({ title, content }),
    headers: { 'Content-Type': 'application/json' }
  });

  document.location.replace('/dashboard');
};

document
  .querySelector('#new-post-form')
  .addEventListener('submit', newFormHandler);
