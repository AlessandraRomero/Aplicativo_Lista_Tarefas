var inputDescricao = document.querySelector('input[name=descricao]')
var selectQuadro = document.querySelector('select[name=quadroSelecionado]')
var btnAdicionar = document.querySelector('.btnAdicionar')
var quadros = document.querySelectorAll('.quadro')
var cartaoAtivo // variável utilizada para armazenar o cartão que está sendo arrastado

function adicionarCartao(){
    // CRIAÇÃO DO CARTÃO
    var cartao = document.createElement('div')
    cartao.setAttribute('class',"cartao")
    cartao.setAttribute('draggable',"true") // torna o elemento arrastável
    var conteudo = 
    `
    <div class="status"></div>
    <p>
       ${inputDescricao.value} 
    </p>
    `
    cartao.innerHTML=conteudo
    // DEFINIR O QUADRO
    var quadroSelecionado = document.querySelector(selectQuadro.value)
    quadroSelecionado.appendChild(cartao)

    // eventos de DRAG

    cartao.addEventListener('dragstart',dragstart)
    cartao.addEventListener('dragend',dragend)
}

// funcões do elemento arrastável
function dragstart(event){
  /* variável cartaoAtivo recebe o elemento que disparou o evento de arrasto
    Utilizada para identificar qual cartão está sendo arrastado para posteirmente 
    ser adicionado ao quadro que disparou o evento de drop
   */  
  cartaoAtivo = event.target  
  /*
    adiciona a classe a todos os quadros para mudar cor de fundo como forma
    de mostrar para o usuário em quais locais ele pode soltar o cartão
  */
  for(quadro of quadros){
      quadro.classList.add('quadrosDestaque')
  }
}
function dragend(){
    for(quadro of quadros){
        quadro.classList.remove('quadrosDestaque')
    }
}
for(quadro of quadros){
    quadro.addEventListener('dragenter',dragenter)
    quadro.addEventListener('dragover',dragover)
    quadro.addEventListener('dragleave',dragleave)
    quadro.addEventListener('drop',drop)
}
// funções para as zonas soltura

function dragenter(event){
    if(event.target.className != 'cartao' ){
        var quadro = event.target
        quadro.classList.add('quadrosRealce')
    }
}
function dragover(event){
    event.preventDefault()
}
function dragleave(event){
    var quadro = event.target
    quadro.classList.remove('quadrosRealce')
}
function drop(event){
    /* verifica se o elemento que disparou o evento é realmente um  quadro
     Essa verificação é necesária para evitar que um cartão seja inserido 
     dentro de outro cartão. Caso o elemento alvo for um quadro, adiciona
     o cartão.
    */
    if(event.target.classList.contains('quadro')){ 
    var quadro = event.target
    quadro.classList.remove('quadrosRealce')
    quadro.appendChild(cartaoAtivo)
    }
}
// função para verificar se os campos do formulário foram preenchidos
function validarCampos(){
    if(inputDescricao.checkValidity()){
        adicionarCartao()
    }else{
        inputDescricao.reportValidity()
    }
}

btnAdicionar.addEventListener('click',validarCampos)