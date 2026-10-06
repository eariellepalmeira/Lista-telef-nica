const URL_BASE = "http://localhost:55000"

const api = {
  async buscarcontatos() {
    try {
      const response = await axios.get(`${URL_BASE}/contatos`)
      return await response.data
    }
    catch {
      alert('Erro ao buscar contatos')
      throw error
    }
  },

  async salvarcontato(contato) {
    try {
      const response = await axios.post(`${URL_BASE}/contatos`, contato)
      return await response.data
    }
    catch {
      alert('Erro ao salvar contato')
      throw error
    }
  },

  async buscarcontatoPorId(id) {
    try {
      const response = await axios.get(`${URL_BASE}/contatos/${id}`)
      return await response.data
    }
    catch {
      alert('Erro ao buscar contato')
      throw error
    }
  },

  async editarcontato(contato) {
    try {
      const response = await axios.put(`${URL_BASE}/contatos/${contato.id}`, contato)
      return await response.data
    }
    catch {
      alert('Erro ao editar contato')
      throw error
    }
  },

  async excluircontato(id) {
    try {
      const response = await axios.delete(`${URL_BASE}/contatos/${id}`)
    }
    catch {
      alert('Erro ao excluir um contato')
      throw error
    }
  }
  
}

export default api