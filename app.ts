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
    const dadosSalvos = localStorage.getItem("listaTarefas");
    if(dadosSalvos){
        listaTarefas = JSON.parse(dadosSalvos);// estou verificando se existe alguma tarefa salva no localStorage, se sim, ele vai retornar a lista de tarefas, se não, ele vai criar uma lista vazia
    }
const listaElemento = document.getElementById("lista-tarefas") as HTMLUListElement;

inputBotaoAdicionar.addEventListener("click", () =>  { //usando para verificar se o botão adicionar foi clicado
    adicionarTarefa();
})

function renderizar(): void{
    localStorage.setItem("listaTarefas", JSON.stringify(listaTarefas));  //salvando a lista de tarefas, impedindo que suma ao atualizar a página

    listaElemento.innerHTML = "";
    for(let i = 0; i < listaTarefas.length; i++){
        const tarefaAtual = listaTarefas[i];
        const EstiloRisco = tarefaAtual.status ? "style='text-decoration: line-through;'" : ""; //criei uma constante que verifica se a tarefa foi concluida, se a resposta for true, ele coloca um risco na tarefa, se for false, ignora o risco.
        listaElemento.innerHTML += `
    <li>
        <input type="checkbox" class="checkbox-concluir" data-index="${i}" ${tarefaAtual.status ? "checked" : ""}>    
        <!--estou usandoo o data-index para fazer a identação do checkbox-->
        <h3 ${EstiloRisco}>${tarefaAtual.titulo}</h3>
        <p>${tarefaAtual.descricao}</p>
        <button class="btn-excluir" data-index="${i}">Excluir</button>
    </li>
`;
    }

    const checkboxes = document.querySelectorAll(".checkbox-concluir");//criando um array com os checkboxes da lista de tarefas
    for(let i = 0; i < checkboxes.length; i++){
        const checkbox = checkboxes[i] as HTMLInputElement;
        checkbox.addEventListener("change", (evento) => {
            listaTarefas[i].status = checkbox.checked;

            renderizar();

        });
    }
};
function adicionarTarefa(): void{
    const tituloTexto = inputTitulo.value.trim();//estou usando o trim para remover espaços em branco no início e no final do título
    const descricaoTexto = inputDescricao.value.trim();

    if(tituloTexto === ""){
        alert("Digite um título para a tarefa");
        return;
    }
    const novaTarefa = new tarefa(tituloTexto, descricaoTexto);
    listaTarefas.push(novaTarefa);
    renderizar();
    inputTitulo.value = "";
    inputDescricao.value = "";
    console.log(listaTarefas);
}

const botaoExcluir = document.querySelectorAll(".btn-excluir");
for(let i = 0; i < botaoExcluir.length; i++){
    const botao = botaoExcluir[i] as HTMLButtonElement;
    botao.addEventListener("click", () => { 
        listaTarefas.splice(i, 1); //removendo a tarefa da lista
        renderizar(); //atualizando a lista
    })
}