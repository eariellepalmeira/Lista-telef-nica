import ui from "./ui.js"
import api from "./api.js"

document.addEventListener("DOMContentLoaded", () => {
  ui.renderizarcontatos()

  const formulariocontato = document.getElementById("contato-form")
  const botaoCancelar = document.getElementById("botao-cancelar")

  formulariocontato.addEventListener("submit", manipularSubmissaoFormulario)
  botaoCancelar.addEventListener("click", manipularCancelamento)
})

async function manipularSubmissaoFormulario(event) {
  event.preventDefault()
  const id = document.getElementById("contato-id").value
  const conteudo = document.getElementById("contato-conteudo").value
  const numero = document.getElementById("contato-numero").value

  try { 
    if(id) {
      await api.editarcontato({ id, conteudo, numero })
    } else {
      await api.salvarcontato({ conteudo, numero })
    }
    ui.renderizarcontatos()
  }
  catch {
    alert("Erro ao salvar contato")
  }
}

function manipularCancelamento() {
  ui.limparFormulario()
}