const url = "http://localhost:3000/users";

const usersTable = document.querySelector("#users tbody");
getUsers(url)
    .then((data) => {
        usersTable.innerHTML = ""
        data.forEach(user => {
            let userRow = `
        <td class="id">${user.id}</td>
        <td>${user.name}</td>
        <td>${user.login}</td>
        <td>${user.password}</td>
        <td>
            <button class="btn btn-success editUser">редактировать</button>
            <button class="btn btn-danger deleteUser">удалить</button>
        </td>`;
            usersTable.innerHTML += `<tr>${userRow}</tr>`;
        });
    }
    )
    .then(() => {
        // весь код пришлось поместить сюда, из-за того, что кнопки создавались только после гет запроса
        let delBtns = document.querySelectorAll(".deleteUser")
        delBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                let id = btn.parentElement.parentElement.querySelector(".id").innerText
                let urlDelete = url + "/" + id
                deleteUser(urlDelete)
                    .then(() => location.reload())
            })
        })

        let editBtns = document.querySelectorAll(".editUser")
        editBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                let id = btn.parentElement.parentElement.querySelector(".id").innerText
                let urlUpdate = url + "/" + id
                let name = document.querySelector("#userName").value
                let login = document.querySelector("#userLogin").value
                let password=document.querySelector("#userPassword").value
                updateUser(urlUpdate, { name: name, login: login,password:password })
                    .then(() => location.reload())
            })
        })
    })

const addButton = document.querySelector(".addUser")
addButton.addEventListener("click", (evt) => {
    evt.preventDefault();
    const form=document.querySelector(".personalData")
    const name = form.querySelector("#Name").value
    const login = form.querySelector("#Login").value
    const pass=form.querySelector("#Password").value

    addUser(url, { name: name, login: login,password:pass, }).then(() => location.reload());

})

async function deleteUser(url) {
    const response = await fetch(url, {
        method: "DELETE"
    })
    return response.json()
}

async function addUser(url, body) {
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
        },

        method: "POST",
        body: JSON.stringify(body), // body data type must match "Content-Type" header
    });

    return response.json()
}

async function getUsers(url) {
    const response = await fetch(url);
    const json = await response.json();

    return json;
}

async function updateUser(url, body) {
    let response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        }
    })

    return response.json()
}