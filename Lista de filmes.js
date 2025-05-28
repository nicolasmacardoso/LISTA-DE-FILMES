import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:3000/filmes'
const OMDB_API_KEY = 'eeeeeeeeee'

export default function App() {
  const [filmes, setFilmes] = useState([])
  const [titulo, setTitulo] = useState('')
  const [ano, setAno] = useState('')
  const [genero, setGenero] = useState('')

  useEffect(() => {
    fetchFilmes()
  }, [])

  const fetchFilmes = async () => {
    const res = await axios.get(API_URL)
    setFilmes(res.data)
  }

  const adicionarFilme = async () => {
    if (!titulo || !ano || !genero) return alert('Preencha todos os campos')

    const { data } = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${titulo}`)

    const novoFilme = {
      titulo,
      ano,
      genero,
      estado: 'pendente',
      imagem: data.Poster !== 'N/A' ? data.Poster : ''
    }

    await axios.post(API_URL, novoFilme)
    setTitulo('')
    setAno('')
    setGenero('')
    fetchFilmes()
  }

  const alterarEstado = async (id, novoEstado) => {
    const filme = filmes.find(f => f.id === id)
    await axios.put(`${API_URL}/${id}`, { ...filme, estado: novoEstado })
    fetchFilmes()
  }

  const removerFilme = async (id) => {
    const confirmar = confirm('Tem certeza que deseja remover este filme?')
    if (!confirmar) return
    await axios.delete(`${API_URL}/${id}`)
    fetchFilmes()
  }

  const renderFilmes = (estado) => (
    filmes
      .filter(f => f.estado === estado)
      .map(filme => (
        <div key={filme.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          {filme.imagem && <img src={filme.imagem} alt={filme.titulo} style={{ height: '150px' }} />}
          <h3>{filme.titulo} ({filme.ano})</h3>
          <p><strong>Gênero:</strong> {filme.genero}</p>
          <div>
            <button onClick={() => alterarEstado(filme.id, 'assistido')}>Assistido</button>
            <button onClick={() => alterarEstado(filme.id, 'favorito')}>Favorito</button>
            <button onClick={() => alterarEstado(filme.id, 'pendente')}>Pendente</button>
            <button onClick={() => removerFilme(filme.id)}>Remover</button>
          </div>
        </div>
      ))
  )

  return (
    <div style={{ padding: '20px' }}>
      <h1>Lista de Filmes 🎬</h1>
      <div>
        <input placeholder="Título" value={titulo} onChange={e => setTitulo(e.target.value)} />
        <input placeholder="Ano" value={ano} onChange={e => setAno(e.target.value)} />
        <input placeholder="Gênero" value={genero} onChange={e => setGenero(e.target.value)} />
        <button onClick={adicionarFilme}>Adicionar Filme</button>
      </div>

      <h2>Filmes Pendentes</h2>
      {renderFilmes('pendente')}

      <h2>Filmes Assistidos</h2>
      {renderFilmes('assistido')}

      <h2>Filmes Favoritos</h2>
      {renderFilmes('favorito')}
    </div>
  )
}
