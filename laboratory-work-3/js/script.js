function getRandomUser() {
  return fetch('https://randomuser.me/api').then(data => data.json());
}

function createUserDiv() {
  const user = document.createElement('div');
  user.className = 'user';
  user.width = '200px';
  user.style.border = '1px solid gray';
  user.style.padding = '10px';
  user.style.margin = '1px';
  return user;
}

function createUserBlock() {
  return getRandomUser().then(data => {
    const userData = data.results[0];
    const user = createUserDiv();

    const img = new Image(400, 400);
    img.src = userData.picture.large;

    console.log(userData)

    const nameText = document.createElement('p');
    nameText.innerText = `Name: ${ userData.name.first } ${ userData.name.last }`;

    const cityText = document.createElement('p');
    cityText.innerText = `City: ${ userData.location.city }`;

    const postcodeText = document.createElement('p');
    postcodeText.innerText = `Postcode: ${ userData.location.postcode }`;

    const phoneText = document.createElement('p');
    phoneText.innerText = `Phone: ${ userData.phone }`;

    user.appendChild(img);
    user.appendChild(nameText);
    user.appendChild(cityText);
    user.appendChild(postcodeText);
    user.appendChild(phoneText);

    return user;
  });
}

function createUsersSection() {
  const body = document.querySelector('body');

  const usersBlock = document.createElement('div');
  usersBlock.style.display = 'flex';
  usersBlock.style['flex-direction'] = 'row';
  usersBlock.style['justifyContent'] = 'center';
  usersBlock.style['flex-wrap'] = 'wrap';
  usersBlock.style['width'] = '100%';
  usersBlock.style['gap'] = '1rem';
  usersBlock.style['row-gap'] = '1rem'; 

  body.appendChild(usersBlock);

  return usersBlock;
}

window.onload = () => {
  const addButton = document.createElement('button');
  addButton.onclick = () => {
    createUserBlock().then(user => {
      usersBlock.appendChild(user);
    }).catch(err => {
      console.error(err);
    });

  };
  addButton.innerText = 'Add user';
  const body = document.querySelector('body');
  body.appendChild(addButton);

  const deleteButton = document.createElement('button');
  deleteButton.onclick = () => {
    const users = document.querySelectorAll('.user');
    const lastUser = users[users.length - 1];
    lastUser.remove();
  };
  deleteButton.innerText = 'Delete user';
  body.appendChild(deleteButton);

  const usersBlock = createUsersSection();
  for (let i = 1; i <= 10; i++) {
    createUserBlock().then(user => {
      usersBlock.appendChild(user);
    }).catch(err => {
      console.error(err);
    });
  }
};