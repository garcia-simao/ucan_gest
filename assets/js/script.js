document.addEventListener('DOMContentLoaded', () => {
    carregarCategorias();
    carregarAreas();

    carregarDadosItem();
    carregarDadosFuncionario();

    carregarTotalFuncionarios();
    carregarTotalItens();
    carregarTotalAreas();
});



let isfunMenuOpen = false, isItemMenuOpen = false;
const funButton = document.querySelectorAll('.funButton');

function editarFuncionario(itemId) {

    if (isfunMenuOpen) {
        document.getElementById('funMenu').classList.add("hidden");
    } else document.getElementById('funMenu').classList.remove("hidden");
    isfunMenuOpen = !isfunMenuOpen;
    console.log(`Editar item com ID:`, itemId);

    //carregar os dados nas fieldes para actualizar
    fetch(`http://localhost:8000/funcionario/${itemId}/`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar dados do funcionário');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('nome').value = data.nome;
            document.getElementById('dataNascimento').value = data.data_nascimento;
            document.getElementById('endereco').value = data.endereco;
            document.getElementById('email').value = data.email;
            document.getElementById('senha').value = data.senha;
            document.getElementById('funcao').value = data.funcao;
            document.getElementById('bilhete').value = data.numero_bilhete;
        })
        .catch(error => {
            console.error('Erro:', error);
        });

    function clicarActualizarFuncionario() {
        const nome = document.getElementById('nome').value;
        const dataNascimento = document.getElementById('dataNascimento').value;
        const endereco = document.getElementById('endereco').value;
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        const funcao = document.getElementById('funcao').value;
        const bilhete = document.getElementById('bilhete').value;

        console.log('id:${itemId}')
        const dadosAtualizados = {
            nome: nome,
            data_nascimento: dataNascimento,
            endereco: endereco,
            email: email,
            senha: senha,
            funcao: funcao,
            numero_bilhete: bilhete
        };

        fetch(`http://localhost:8000/funcionario/${itemId}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosAtualizados)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao atualizar o funcionário');
                }
                return response.json();
            })
            .then(data => {
                console.log('Funcionário atualizado com sucesso:', data);
                document.getElementById('funMenu').classList.add("hidden");
            })
            .then(() => {
                swal({
                    title: "Atualizado!",
                    text: "O funcionario foi atualizado com sucesso.",
                    type: "success"
                }, function () {
                    // Recarregar a página após a exclusão bem-sucedida
                    location.reload();
                });
            })
            .catch(error => {
                //console.error('Erro:', error);
            });
    }
    window.funcaoInternaAtualizarFuncionario = clicarActualizarFuncionario;

}


function editarItem(itemId) {

    if (isfunMenuOpen) {
        document.getElementById('itemMenu').classList.add("hidden");
    } else document.getElementById('itemMenu').classList.remove("hidden");
    isfunMenuOpen = !isfunMenuOpen;
    console.log(`Editar item com ID:`, itemId);

    //carregar os dados nas fields para actualizar
    fetch(`http://localhost:8000/itens/${itemId}/`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar dados do item');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('nome').value = data.nome;
            document.getElementById('data').value = data.data_compra;
            document.getElementById('categoria').value = data.categoria;
            document.getElementById('area').value = data.area;
            document.getElementById('estado').value = data.estado;
            document.getElementById('tempo-vida').value = data.tempo_de_vida;
            document.getElementById('imagem').files[0] = data.imagem;

        })
        .catch(error => {
            // console.error('Erro:', error);
        });

    function clicarActualizarItem() {
        const nome = document.getElementById('nome').value;
        const data = document.getElementById('data').value;
        const categoria = document.getElementById('categoria').value;
        const area = document.getElementById('area').value;
        const estado = document.getElementById('estado').value;
        const tempoVida = document.getElementById('tempo-vida').value;
        const imagem = document.getElementById('imagem').files[0];


        console.log('id:${itemId}')
        const dadosAtualizados = new FormData();
        dadosAtualizados.append('nome', nome);
        dadosAtualizados.append('data_compra', data);
        dadosAtualizados.append('categoria', categoria);
        dadosAtualizados.append('area', area);
        dadosAtualizados.append('estado', estado);
        dadosAtualizados.append('tempo_de_vida', tempoVida);
        if (imagem) {
            dadosAtualizados.append('imagem', imagem);
        }

        fetch(`http://localhost:8000/itens/${itemId}/`, {
            method: 'PUT',

            body: dadosAtualizados
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao atualizar o item');
                }
                return response.json();
            })
            .then(data => {
                console.log('item atualizado com sucesso:', data);
                document.getElementById('itemMenu').classList.add("hidden");
            })
            .then(() => {
                swal({
                    title: "Atualizado!",
                    text: "O item foi atualizado com sucesso.",
                    type: "success"
                }, function () {
                    // Recarregar a página após a exclusão bem-sucedida
                    location.reload();
                });
            })
            .catch(error => {
                //console.error('Erro:', error);
            });
    }
    window.funcaoInternaAtualizarItem = clicarActualizarItem;

}

function cancelar(i) {
    isfunMenuOpen = false;
    isItemMenuOpen = false;
    if (i) document.getElementById('funMenu').classList.add('hidden');
    else document.getElementById('itemMenu').classList.add('hidden');

}

function limparCamposItem() {
    document.getElementById('nome').value = '';
    document.getElementById('data').value = '';
    document.getElementById('categoria').value = '';
    document.getElementById('area').value = '';
    document.getElementById('imagem').value = '';
}

function limparCamposGerarRelatorio() {
    document.getElementById('dataRelatorio').value = '';
}

function limparCamposFuncionario() {
    document.getElementById('nome').value = '';
    document.getElementById('bilhete').value = '';
    document.getElementById('funcao').value = '';
    document.getElementById('dataNascimento').value = '';
    document.getElementById('endereco').value = '';
    document.getElementById('email').value = '';
    document.getElementById('senha').value = '';
}

function excluirFuncionario(itemId) {
    console.log("id do funcionario a eliminar:", itemId)
    swal({
        title: "Tem certeza?",
        text: "Esse item não poderá ser recuperado após a exclusão.",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#e02424",
        hoverColor: "#000000",
        confirmButtonText: "Sim, exclua agora!",
        closeOnConfirm: false,
        showLoaderOnConfirm: true
    }, function () {
        fetch(`http://localhost:8000/funcionario/${itemId}/`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao excluir o item');
                }
                return response.text();
            })
            .then(() => {
                swal({
                    title: "Excluído!",
                    text: "O item foi excluído com sucesso.",
                    type: "success"
                }, function () {
                    // Recarregar a página após a exclusão bem-sucedida
                    location.reload();
                });
            })
            .catch(error => {
                //swal("Erro", "Ocorreu um erro ao excluir o item: " + error, "error");
            });
    });
}

function excluirItem(itemId) {
    console.log("id do funcionario a eliminar:", itemId)
    swal({
        title: "Tem certeza?",
        text: "Esse item não poderá ser recuperado após a exclusão.",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#e02424",
        hoverColor: "#000000",
        confirmButtonText: "Sim, exclua agora!",
        closeOnConfirm: false,
        showLoaderOnConfirm: true
    }, function () {
        fetch(`http://localhost:8000/itens/${itemId}/`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao excluir o item');
                }
                return response.text();
            })
            .then(() => {
                swal({
                    title: "Excluído!",
                    text: "O item foi excluído com sucesso.",
                    type: "success"
                }, function () {
                    // Recarregar a página após a exclusão bem-sucedida
                    location.reload();
                });
            })
            .catch(error => {
                //swal("Erro", "Ocorreu um erro ao excluir o item: " + error, "error");
            });
    });
}

async function carregarCategorias() {
    try {
        const response = await fetch('http://localhost:8000/categoria-itens/');
        if (!response.ok) {
            throw new Error('Erro na requisição');
        }

        const categorias = await response.json();
        const select = document.getElementById('categoria');
        console.log(categorias)

        categorias.forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria.id;
            option.textContent = categoria.nome;
            select.appendChild(option);
        });
    } catch (error) {
        // console.error('Erro:', error);
        // Trate o erro conforme necessário
    }
}

async function carregarTotalFuncionarios() {
    try {
        const response = await fetch('http://localhost:8000/total-funcionario/');
        if (!response.ok) {
            throw new Error('Erro ao carregar dados da API');
        }
        const data = await response.json();
        const totalFuncionariosElement = document.getElementById('total-funcionarios');
        totalFuncionariosElement.textContent = `${data.total_funcionario}`;
    } catch (error) {
        // console.error('Erro:', error);
        // Tratamento de erro, se necessário
    }

}

async function carregarTotalAreas() {
    try {
        const response = await fetch('http://localhost:8000/total-area/');
        if (!response.ok) {
            throw new Error('Erro ao carregar dados da API');
        }
        const data = await response.json();
        const totalFuncionariosElement = document.getElementById('total-area');
        totalFuncionariosElement.textContent = `${data.total_area}`;
    } catch (error) {
        // console.error('Erro:', error);
        // Tratamento de erro, se necessário
    }

}

async function carregarTotalItens() {
    try {
        const response = await fetch('http://localhost:8000/total-itens/');
        if (!response.ok) {
            throw new Error('Erro ao carregar dados da API');
        }
        const data = await response.json();
        const totalFuncionariosElement = document.getElementById('total-item');
        totalFuncionariosElement.textContent = `${data.total_item}`;
    } catch (error) {
        // console.error('Erro:', error);
        // Tratamento de erro, se necessário
    }

}

async function carregarAreas() {
    try {
        const response = await fetch('http://localhost:8000/area-itens/');
        if (!response.ok) {
            throw new Error('Erro na requisição');
        }

        const areas = await response.json();
        const select = document.getElementById('area');
        console.log(areas)

        areas.forEach(area => {
            const option = document.createElement('option');
            option.value = area.id;
            option.textContent = area.nome;
            select.appendChild(option);
        });
    } catch (error) {
        //console.error('Erro:', error);
        // Trate o erro conforme necessário
    }
}

function enviarDadosItem() {
    const nome = document.getElementById('nome').value;
    const dataCompra = document.getElementById('data').value;
    const categoria = document.getElementById('categoria').value;
    const area = document.getElementById('area').value;
    const tempoVida = document.getElementById('tempo-vida').value;
    const estado = document.getElementById('estado').value;
    const imagem = document.getElementById('imagem').files[0];

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('data_compra', dataCompra);
    formData.append('categoria', categoria);
    formData.append('area', area);
    formData.append('imagem', imagem);
    formData.append('estado', estado);
    formData.append('tempo_de_vida', tempoVida);

    fetch('http://localhost:8000/itens/', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao enviar os dados');
        }
        return response.json();
    })
    .then(data => {
        console.log('Dados enviados com sucesso:', data);
        // Lógica adicional após o envio bem-sucedido
    })
    .catch(error => {
        console.error('Erro:', error);
        // Tratamento de erro, se necessário
    });

        limparCamposItem();
    }



function GerarRelatorio() {
    const dataRelatorio = document.getElementById('dataRelatorio').value;

    // URL para a requisição GET
    const url = `http://localhost:8000/gerar_pdf/${dataRelatorio}/`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao gerar o relatório');
            }
            return response.blob();
        })
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `relatorio_${dataRelatorio}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            console.log('Relatório gerado com sucesso');
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}


function enviarDadosFuncionario() {
    const nome = document.getElementById('nome').value;
    const numeroBilhete = document.getElementById('bilhete').value;
    const funcao = document.getElementById('funcao').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const endereco = document.getElementById('endereco').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;



    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('numero_bilhete', numeroBilhete);
    formData.append('funcao', funcao);
    formData.append('data_nascimento', dataNascimento);
    formData.append('endereco', endereco);
    formData.append('email', email);
    formData.append('senha', senha);

    fetch('http://localhost:8000/funcionario/', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao enviar os dados');
        }
        return response.json();
    })
    .then(data => {
        console.log('Dados enviados com sucesso:', data);
        // Lógica adicional após o envio bem-sucedido
    })
    .catch(error => {
        console.error('Erro:', error);
        // Tratamento de erro, se necessário
    });

    limparCamposFuncionario();
}

function carregarDadosItem() {
    fetch('http://localhost:8000/itens/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar dados da API');
            }
            return response.json();
        })
        .then(data => {
            const corpoTabela = document.getElementById('corpo-tabela');

            // Limpa o conteúdo atual da tabela
            corpoTabela.innerHTML = '';

            // Itera sobre os dados recebidos e cria as linhas da tabela
            data.forEach(item => {
                const row = document.createElement('tr');

                // Coluna da imagem
                const avatarCell = document.createElement('td');
                avatarCell.classList.add('px-4', 'py-3');
                const avatarDiv = document.createElement('div');
                avatarDiv.classList.add('flex', 'items-center', 'text-sm');
                const avatarImage = document.createElement('img');
                avatarImage.src = item.imagem;
                avatarImage.alt = 'Avatar';
                avatarImage.classList.add('object-cover', 'w-8', 'h-8', 'rounded-full', 'mr-3');
                avatarDiv.appendChild(avatarImage);
                avatarCell.appendChild(avatarDiv);
                row.appendChild(avatarCell);

                // Coluna do nome
                const nomeCell = document.createElement('td');
                nomeCell.classList.add('px-4', 'py-3', 'text-sm', 'font-semibold');
                nomeCell.textContent = item.nome;
                row.appendChild(nomeCell);

                // Coluna da data da compra
                const dataNascimentoCell = document.createElement('td');
                dataNascimentoCell.classList.add('px-4', 'py-3', 'text-xs');
                const dataSpan = document.createElement('span');
                dataSpan.classList.add('px-4', 'py-1', 'font-semibold', 'bg-blue-100', 'text-gray-700', 'rounded-full', 'dark:text-gray-700');
                dataSpan.textContent = item.data_compra;
                dataNascimentoCell.appendChild(dataSpan);
                row.appendChild(dataNascimentoCell);

                // Coluna da categoria
                const categoriaCell = document.createElement('td');
                categoriaCell.classList.add('px-4', 'py-3', 'text-sm');
                const categoriaSpan = document.createElement('span');
                categoriaSpan.classList.add('px-2', 'py-1', 'font-semibold', 'leading-tight', 'text-green-700', 'bg-green-100', 'rounded-full', 'dark:bg-green-700', 'dark:text-green-100');
                categoriaSpan.textContent = item.categoria_nome;
                categoriaCell.appendChild(categoriaSpan);
                row.appendChild(categoriaCell);

                // Coluna da área
                const areaCell = document.createElement('td');
                areaCell.classList.add('px-4', 'py-3', 'text-sm');
                const areaSpan = document.createElement('span');
                areaSpan.classList.add('px-2', 'py-1', 'font-semibold', 'leading-tight', 'text-green-700', 'bg-green-100', 'rounded-full', 'dark:bg-green-700', 'dark:text-green-100');
                areaSpan.textContent = item.area_nome;
                areaCell.appendChild(areaSpan);
                row.appendChild(areaCell);

                // Coluna do estado
                const estadoCell = document.createElement('td');
                estadoCell.classList.add('px-4', 'py-3', 'text-sm');
                const estadoSpan = document.createElement('span');
                estadoSpan.classList.add('px-2', 'py-1', 'font-semibold', 'leading-tight', 'text-green-700', 'bg-green-100', 'rounded-full', 'dark:bg-green-700', 'dark:text-green-100');
                estadoSpan.textContent = item.estado;
                estadoCell.appendChild(estadoSpan);
                row.appendChild(estadoCell);

                // Coluna do tempo de vida
                const tempoCell = document.createElement('td');
                tempoCell.classList.add('px-4', 'py-3', 'text-sm');
                const tempoSpan = document.createElement('span');
                tempoSpan.classList.add('px-2', 'py-1', 'font-semibold', 'leading-tight', 'text-green-700', 'bg-green-100', 'rounded-full', 'dark:bg-green-700', 'dark:text-green-100');
                tempoSpan.textContent = item.tempo_de_vida;
                tempoCell.appendChild(tempoSpan);
                row.appendChild(tempoCell);

                // Coluna da data de registro
                const dataRCell = document.createElement('td');
                dataRCell.classList.add('px-4', 'py-3', 'text-sm');
                const dataRSpan = document.createElement('span');
                dataRSpan.classList.add('px-2', 'py-1', 'font-semibold', 'leading-tight', 'text-green-700', 'bg-green-100', 'rounded-full', 'dark:bg-green-700', 'dark:text-green-100');
                dataRSpan.textContent = item.data_registro;
                dataRCell.appendChild(dataRSpan);
                row.appendChild(dataRCell);

                // Coluna das ações (botões)
                const acoesCell = document.createElement('td');
                acoesCell.classList.add('px-4', 'py-3');

                const acoesDiv = document.createElement('div');
                acoesDiv.classList.add('flex', 'items-center', 'space-x-4', 'text-sm');

                // Botão de Edição
                const editButton = document.createElement('button');
                editButton.innerHTML = '<svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>';
                editButton.classList.add('flex', 'items-center', 'justify-between', 'px-2', 'py-2', 'text-sm', 'font-medium', 'leading-5', 'text-blue-600', 'rounded-lg', 'focus:outline-none', 'focus:shadow-outline-gray');
                editButton.setAttribute('aria-label', 'Editar');
                editButton.addEventListener('click', () => editarItem(item.id));


                // Botão de Exclusão
                const deleteButton = document.createElement('button');
                deleteButton.innerHTML = ' <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"clip-rule="evenodd"></path></svg>';
                deleteButton.classList.add('flex', 'items-center', 'justify-between', 'px-2', 'py-2', 'text-sm', 'font-medium', 'leading-5', 'text-red-600', 'rounded-lg', 'focus:outline-none', 'focus:shadow-outline-gray', 'ml-2');
                deleteButton.setAttribute('aria-label', 'Excluir');
                deleteButton.addEventListener('click', () => excluirItem(item.id));

                // Adiciona botões à célula de ações
                acoesDiv.appendChild(editButton);
                acoesDiv.appendChild(deleteButton);
                acoesCell.appendChild(acoesDiv);

                // Adiciona célula de ações à linha da tabela
                row.appendChild(acoesCell);

                // Adiciona a linha à tabela
                corpoTabela.appendChild(row);
            });
        })
        .catch(error => {
            //console.error('Erro:', error);
            // Tratamento de erro, se necessário
        });
}

function carregarDadosFuncionario() {
    fetch('http://localhost:8000/funcionario/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar dados da API');
            }
            return response.json();
        })
        .then(data => {
            const corpoTabela = document.getElementById('corpo-tabela1');

            // Limpa o conteúdo atual da tabela
            corpoTabela.innerHTML = '';

            // Itera sobre os dados recebidos e cria as linhas da tabela
            data.forEach(item => {
                const row = document.createElement('tr');


                // Coluna do nome
                const nomeCell = document.createElement('td');
                nomeCell.classList.add('px-4', 'py-3', 'text-sm', 'font-semibold');
                nomeCell.textContent = item.nome;
                row.appendChild(nomeCell);

                // Coluna do email
                const emailCell = document.createElement('td');
                emailCell.classList.add('px-4', 'py-3', 'text-xs');
                const emailSpan = document.createElement('span');
                emailSpan.classList.add('px-4', 'py-1', 'font-semibold', 'bg-blue-100', 'text-gray-700', 'rounded-full', 'dark:text-gray-700');
                emailSpan.textContent = item.email;
                emailCell.appendChild(emailSpan);
                row.appendChild(emailCell);

                // Coluna do numero do bilhete
                const bilheteCell = document.createElement('td');
                bilheteCell.classList.add('px-4', 'py-3', 'text-sm');
                const bilheteSpan = document.createElement('span');
                bilheteSpan.classList.add('px-2', 'py-1', 'font-semibold', 'leading-tight', 'text-green-700', 'bg-green-100', 'rounded-full', 'dark:bg-green-700', 'dark:text-green-100');
                bilheteSpan.textContent = item.numero_bilhete;
                bilheteCell.appendChild(bilheteSpan);
                row.appendChild(bilheteCell);

                // Coluna da funcao
                const funcaoCell = document.createElement('td');
                funcaoCell.classList.add('px-4', 'py-3', 'text-sm');
                const funcaoSpan = document.createElement('span');
                funcaoSpan.classList.add('px-2', 'py-1', 'font-semibold', 'leading-tight', 'text-green-700', 'bg-green-100', 'rounded-full', 'dark:bg-green-700', 'dark:text-green-100');
                funcaoSpan.textContent = item.funcao;
                funcaoCell.appendChild(funcaoSpan);
                row.appendChild(funcaoCell);

                // Coluna da data de nascimento
                const dataCell = document.createElement('td');
                dataCell.classList.add('px-4', 'py-3', 'text-sm');
                const dataSpan = document.createElement('span');
                dataSpan.classList.add('px-2', 'py-1', 'font-semibold', 'leading-tight', 'text-green-700', 'bg-green-100', 'rounded-full', 'dark:bg-green-700', 'dark:text-green-100');
                dataSpan.textContent = item.data_nascimento;
                dataCell.appendChild(dataSpan);
                row.appendChild(dataCell);

                // Coluna do endereco
                const enderecoCell = document.createElement('td');
                enderecoCell.classList.add('px-4', 'py-3', 'text-sm');
                const enderecoSpan = document.createElement('span');
                enderecoSpan.classList.add('px-2', 'py-1', 'font-semibold', 'leading-tight', 'text-green-700', 'bg-green-100', 'rounded-full', 'dark:bg-green-700', 'dark:text-green-100');
                enderecoSpan.textContent = item.endereco;
                enderecoCell.appendChild(enderecoSpan);
                row.appendChild(enderecoCell);

                // Coluna da senha
                const senhaCell = document.createElement('td');
                senhaCell.classList.add('px-4', 'py-3', 'text-sm');
                const senhaSpan = document.createElement('span');
                senhaSpan.classList.add('px-2', 'py-1', 'font-semibold', 'leading-tight', 'text-green-700', 'bg-green-100', 'rounded-full', 'dark:bg-green-700', 'dark:text-green-100');
                senhaSpan.textContent = item.senha;
                senhaCell.appendChild(senhaSpan);
                row.appendChild(senhaCell);

                // Coluna das ações (botões)
                const acoesCell = document.createElement('td');
                acoesCell.classList.add('px-4', 'py-3');

                const acoesDiv = document.createElement('div');
                acoesDiv.classList.add('flex', 'items-center', 'space-x-4', 'text-sm');

                // Botão de Edição
                const editButton = document.createElement('button');
                editButton.innerHTML = '<svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>';
                editButton.classList.add('flex', 'items-center', 'justify-between', 'px-2', 'py-2', 'text-sm', 'font-medium', 'leading-5', 'text-blue-600', 'rounded-lg', 'focus:outline-none', 'focus:shadow-outline-gray');
                editButton.setAttribute('aria-label', 'Editar');
                editButton.addEventListener('click', () => editarFuncionario(item.id));


                // Botão de Exclusão
                const deleteButton = document.createElement('button');
                deleteButton.innerHTML = ' <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"clip-rule="evenodd"></path></svg>';
                deleteButton.classList.add('flex', 'items-center', 'justify-between', 'px-2', 'py-2', 'text-sm', 'font-medium', 'leading-5', 'text-red-600', 'rounded-lg', 'focus:outline-none', 'focus:shadow-outline-gray', 'ml-2');
                deleteButton.setAttribute('aria-label', 'Excluir');
                deleteButton.addEventListener('click', () => excluirFuncionario(item.id));

                // Adiciona botões à célula de ações
                acoesDiv.appendChild(editButton);
                acoesDiv.appendChild(deleteButton);
                acoesCell.appendChild(acoesDiv);

                // Adiciona célula de ações à linha da tabela
                row.appendChild(acoesCell);

                // Adiciona a linha à tabela
                corpoTabela.appendChild(row);
            });
        })
        .catch(error => {
            //console.error('Erro:', error);
            // Tratamento de erro, se necessário
        });
}


function login(){
    document.getElementById('login').addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário
    
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
    
        fetch(`http://localhost:8000/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Credenciais inválidas');
            }
            return response.json();
        })
        .then(data => {
            console.log('Login bem-sucedido:', data);
            // Redirecionar para outra página ou mostrar uma mensagem de sucesso
            window.location.href = 'file:///home/garcia_simao/Documentos/3%20%C2%AA%20ano/2%C2%BA%20semestre/Engenharia%20de%20Software%20I/gest%C3%A3o%20de%20patrimonio/ucan_gest/index.html';
        })
        .catch(error => {
            console.error('Erro no login:', error);
            alert('Credenciais inválidas. Tente novamente.');
        });
    });
    
}


    //pesquisa pelo nome do item
    document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search');
    const tableBody = document.getElementById('corpo-tabela');

    searchInput.addEventListener('keyup', function () {
      const searchValue = searchInput.value.toLowerCase();
      const rows = tableBody.getElementsByTagName('tr');

      for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        let found = false;

        for (let j = 0; j < cells.length; j++) {
          if (cells[j].innerText.toLowerCase().includes(searchValue)) {
            found = true;
            break;
          }
        }

        if (found) {
          rows[i].style.display = '';
        } else {
          rows[i].style.display = 'none';
        }
      }
    });
  });
