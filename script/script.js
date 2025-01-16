let userDiv = document.getElementById("usuarios")


function getUsers() {
  fetch("http://localhost:3000/users")
    .then((response) => response.json())
    .then(data => {
      userDiv.innerHTML = ""
      for (let i = 0; i < data.length; i++) {
        
        const newDiv = document.createElement("div")
        newDiv.innerHTML = `
        <p><b>Nome:</b> ${data[i].name}</p>
        <p><b>Email:</b> ${data[i].email}</p>
        <button onclick="editForm(${data[i].id},'${data[i].name}', '${data[i].email}')">Editar</button>
        <button onclick="deleteUser(${data[i].id})">Delete</button>`
        
        userDiv.append(newDiv)
      }
    })
}

document.getElementById("createForm").addEventListener('submit', function (e) {
  e.preventDefault()
  const id = document.getElementById("itemId").value
  const name = document.getElementById("name").value
  const email = document.getElementById("email").value

  const method = id ? "PUT" : "POST"
  const url = id ? `http://localhost:3000/user/${id}` : "http://localhost:3000/users"

  fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email })
  })
  .then(() => {
    name.value = ''
    email.value = ''
    getUsers()
  })
})

function deleteUser(id){
  fetch(`http://localhost:3000/user/${id}`,{
    method: 'DELETE'
  }).then(() => getUsers())
}

function editForm(id, name, email){
  document.getElementById("name").value = name
  document.getElementById("email").value = email
  document.getElementById("itemId").value = id
}

getUsers()
