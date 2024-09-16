const users = [

]


const tbody = document.getElementById('tbody')
 
function adicionarUsuario() {
    const inputAddUser = document.getElementById('addUser').value.trim()
    if(inputAddUser !== '') {
    users.push({username: inputAddUser})
    fetchGitHub()
    document.getElementById('addUser').value = ''
    console.log(users)

    } else {
        alert("Adicione um nome válido")
    }
}

function limparLista() {
    tbody.innerHTML = ''
}

function deletarItem(button) {
    const isConfirmed = confirm('Tem certeza que deseja excluir?')

    if (isConfirmed) {
        const row = button.closest('tr');
        const username = row.cells[2].textContent;
        removerUsuario(username)
        row.remove()
        alert('Item deletado')
    } else {
        alert('Ação cancelada')
    }
}

function removerUsuario(username) {
    const index = users.findIndex(user => user.username === username)

    if (index !== -1) {
        users.splice(index, 1)
    } else {
        console.log('Ação cancelada')
    }
}

async function fetchGitHub() {
    try {
        
        const userData = await Promise.all(users.map(async (user) => {
            const response = await fetch(`https://api.github.com/users/${user.username}`,
                {
                    headers: { 'Authorization': `token TOKEN_API` }
                });
            if (!response.ok) throw new Error(`Falha ao tentar buscar ${user.username}`);
            return response.json();
        }));

        
        userData.sort((a, b) => b.public_repos - a.public_repos);

        
        limparLista();

        
        userData.forEach(data => {
            tbody.innerHTML +=
                `
            <tr class="align-middle">
                <td><img src="${data.avatar_url}" style="width: 60px; height: 60px; border-radius: 50px;"></td>
                <td>${data.name}</td>
                <td>${data.login}</td>
                <td>${data.public_repos}</td>
                <td><a href="${data.html_url}" target="_blank">GitHub</a></td>     
                <td><button class="btn btn-danger" type="button" onclick="deletarItem(this)">Deletar</button></td>
            </tr>
            `;
        });
    } catch (error) {
        console.error('Error fetching GitHub data:', error);
    }
}

