import api from "./api.js"

const ui = {

  async preencherFormulario(contatoId) {
    const contato = await api.buscarcontatoPorId(contatoId)
    document.getElementById("contato-id").value = contato.id
    document.getElementById("contato-conteudo").value = contato.conteudo
    document.getElementById("contato-numero").value = contato.numero
  },

  limparFormulario() {
    document.getElementById("contato-form").reset();
  },
  
  async renderizarcontatos() {
    const listacontatos = document.getElementById("lista-contatos")
    const mensagemVazia = document.getElementById("mensagem-vazia")
    listacontatos.innerHTML = ""

    try {
      const contatos = await api.buscarcontatos()
      if (contatos.length === 0) {
        mensagemVazia.style.display = "block"
      } else {
        mensagemVazia.style.display = "none"
        contatos.forEach(ui.adicionarcontatoNaLista)
      } 
    }
    catch {
      alert('Erro ao renderizar contatos')
    }
  },

  adicionarcontatoNaLista(contato) {
    const listacontatos = document.getElementById("lista-contatos")
    const li = document.createElement("li")
    li.setAttribute("data-id", contato.id)
    li.classList.add("li-contato")

    const iconeAspas = document.createElement("img")
    iconeAspas.src = "assets/imagens/aspas-azuis.png"
    iconeAspas.alt = "Aspas azuis"
    iconeAspas.classList.add("icone-aspas")

    const contatoCabecalho = document.createElement("div")
    contatoCabecalho.classList.add("contato-cabecalho")

    const contatoNome = document.createElement("div")
    contatoNome.classList.add("contato-nome")

    const nomeLabel = document.createElement("span")
    nomeLabel.textContent = "Nome:"
    nomeLabel.classList.add("label-contato")

    const nomeValor = document.createElement("span")
    nomeValor.textContent = contato.conteudo
    nomeValor.classList.add("valor-contato")

    contatoNome.appendChild(nomeLabel)
    contatoNome.appendChild(nomeValor)

    const contatoNumero = document.createElement("div")
    contatoNumero.classList.add("contato-numero")

    const numeroLabel = document.createElement("span")
    numeroLabel.textContent = "tel:"
    numeroLabel.classList.add("label-contato")

    const numeroValor = document.createElement("span")
    numeroValor.textContent = contato.numero
    numeroValor.classList.add("valor-contato")

    contatoNumero.appendChild(numeroLabel)
    contatoNumero.appendChild(numeroValor)

    contatoCabecalho.appendChild(iconeAspas)
    contatoCabecalho.appendChild(contatoNome)
    contatoCabecalho.appendChild(contatoNumero)

    const botaoEditar = document.createElement("button")
    botaoEditar.classList.add("botao-editar")
    botaoEditar.onclick = () => ui.preencherFormulario(contato.id)

    const iconeEditar = document.createElement("img")
    iconeEditar.src = "assets/imagens/icone-editar.png"
    iconeEditar.alt = "Editar"
    botaoEditar.appendChild(iconeEditar)

    const botaoExcluir = document.createElement("button")
    botaoExcluir.classList.add("botao-excluir")
    botaoExcluir.onclick = async () => {
      try {
        await api.excluircontato(contato.id)
        ui.renderizarcontatos()
      } catch (error) {
        alert("Erro ao excluir contato")
      }
    }

    const iconeExcluir = document.createElement("img")
    iconeExcluir.src = "assets/imagens/icone-excluir.png"
    iconeExcluir.alt = "Excluir"
    botaoExcluir.appendChild(iconeExcluir)

    const icones = document.createElement("div")
    icones.classList.add("icones")
    icones.appendChild(botaoEditar)
    icones.appendChild(botaoExcluir)

    li.appendChild(contatoCabecalho)
    li.appendChild(icones)
    listacontatos.appendChild(li)
  }
}

export default ui