"use strict";
class tarefa {
    titulo;
    descricao;
    date;
    status;
    constructor(titulo, descricao) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.date = new Date();
        this.status = false;
    }
    ;
}
;
const inputTitulo = document.getElementById("input-titulo");
const inputDescricao = document.getElementById("input-descricao");
const inputBotaoAdicionar = document.getElementById("btn-adicionar");
let listaTarefas = [];
const listaElemento = document.getElementById("lista-tarefas");
inputBotaoAdicionar.addEventListener("click", () => {
    const tituloTexto = inputTitulo.value.trim(); //estou usando o trim para remover espaços em branco no início e no final do título
    const descricaoTexto = inputDescricao.value.trim();
    if (tituloTexto === "") {
        alert("Digite um titulo para a tarefa");
        return;
    }
    const novaTarefa = new tarefa(tituloTexto, descricaoTexto);
    listaTarefas.push(novaTarefa);
    renderizar();
    inputTitulo.value = "";
    inputDescricao.value = "";
    console.log(listaTarefas);
});
function renderizar() {
    listaElemento.innerHTML = "";
    for (let i = 0; i < listaTarefas.length; i++) {
        const tarefaAtual = listaTarefas[i];
        listaElemento.innerHTML += `
    <li>
        <h3>${tarefaAtual.titulo}</h3>
        <p>${tarefaAtual.descricao}</p>
    </li>
`;
    }
}
;
