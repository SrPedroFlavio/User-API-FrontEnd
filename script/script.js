function getUsers(){
    fetch("http://localhost:3000/users")
    .then((response) => response.json())
    .then(data => {
      for(let i = 0; i< data.length; i++){
        const userDiv = document.getElementById("usuarios")
        const newDiv = document.createElement("div")
        newDiv.innerHTML = `<p><b>Nome:</b> ${data[i].name}</p>`
        userDiv.append(newDiv)
      }
    })
}

getUsers()
    