class tarefa{
    titulo: string;
    descricao: string;
    date: Date;
    status: boolean;

    constructor(titulo: string, descricao: string){
        this.titulo = titulo;
        this.descricao = descricao;
        this.date = new Date();
        this.status = false;
    };
};
const inputTitulo = document.getElementById("input-titulo") as HTMLTextAreaElement;
const inputDescricao = document.getElementById("input-descricao") as HTMLTextAreaElement;
const inputBotaoAdicionar = document.getElementById("btn-adicionar") as HTMLInputElement;

let listaTarefas: tarefa[] = [];
const listaElemento = document.getElementById("lista-tarefas") as HTMLUListElement;

inputBotaoAdicionar.addEventListener("click", () =>  { //usando para verificar se o botão adicionar foi clicado
    const tituloTexto = inputTitulo.value.trim();//estou usando o trim para remover espaços em branco no início e no final do título
    const descricaoTexto = inputDescricao.value.trim();

    if(tituloTexto === ""){
        alert("Digite um titulo para a tarefa");
        return;
    }
    const novaTarefa = new tarefa(tituloTexto, descricaoTexto);
    listaTarefas.push(novaTarefa);
    renderizar();
    inputTitulo.value = "";
    inputDescricao.value = "";
    console.log(listaTarefas);

})

function renderizar(): void{
    listaElemento.innerHTML = "";
    for(let i = 0; i < listaTarefas.length; i++){
        const tarefaAtual = listaTarefas[i];
        listaElemento.innerHTML += `
    <li>
        <h3>${tarefaAtual.titulo}</h3>
        <p>${tarefaAtual.descricao}</p>
    </li>
`;
    }
};
