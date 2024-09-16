const users = [
    { username: 'breno-oliveira98' },
    { username: 'tiagolimar' },
    { username: 'edmaralbneto' },
    { username: 'angelolustosa' },
    { username: 'Gustavo1701' },
    { username: 'miguelalves10' },
    { username: 'antoniowgaldino' },
    { username: 'rafaeoTW4' },
    { username: 'JoaoRoberto1' },
    { username: 'Breno-arauj' }
]

const tbody = document.getElementById('tbody')

function limparLista() {
    tbody.innerHTML = ''
}

function deletarItem(button) {
    const isConfirmed = confirm('Tem certeza que deseja excluir?')

    if (isConfirmed) {
        const row = button.closest('tr');
        row.remove()
        alert('Item deletado')
    } else {
        alert('Ação cancelada')
    }
}

function fetchGitHub() {


    users.forEach(user => {
        fetch(`https://api.github.com/users/${user.username}`, { headers: { 'Authorization': `token API_TOKEN` } })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                tbody.innerHTML +=
                    `
            <tr>
                <td><img src="${data.avatar_url}" style="width: 60px; height: 60px; border-radius: 50px;"></td>
                <td>${data.name}</td>
                <td>${data.login}</td>
                <td>${data.public_repos}</td>
                <td><a href="${data.html_url}" target="_blank">GitHub</a></td>     
                <td><button class="btn btn-danger" type="button" onclick="deletarItem(this)">Deletar</button></td>
            </tr>
            `
            })
    })
}








