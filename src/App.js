import { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:3000/filmes'
const OMDB_API_KEY = '19647fbd'

export default function App() {
  const [filmes, setFilmes] = useState([])
  const [titulo, setTitulo] = useState('')
  const [ano, setAno] = useState('')
  const [genero, setGenero] = useState('')
  const [editandoId, setEditandoId] = useState(null)
  const [editTitulo, setEditTitulo] = useState('')
  const [editAno, setEditAno] = useState('')
  const [editGenero, setEditGenero] = useState('')

  useEffect(() => {
    fetchFilmes()
  }, [])

  const fetchFilmes = async () => {
    const res = await axios.get(API_URL)
    setFilmes(res.data)
  }

  const adicionarFilme = async () => {
    if (!titulo || !ano || !genero) return alert('Preencha todos os campos')
    try {
      const imgRes = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${titulo}`)
      const poster = imgRes.data.Poster || ''

      const novoFilme = {
        titulo,
        ano,
        genero,
        status: 'pendente',
        poster
      }
      await axios.post(API_URL, novoFilme)
      fetchFilmes()
      setTitulo('')
      setAno('')
      setGenero('')
    } catch (err) {
      alert('Erro ao adicionar filme')
    }
  }

  const alterarStatus = async (id, novoStatus) => {
    await axios.patch(`${API_URL}/${id}`, { status: novoStatus })
    fetchFilmes()
  }

  const removerFilme = async (id) => {
    if (confirm('Tem certeza que deseja remover este filme?')) {
      await axios.delete(`${API_URL}/${id}`)
      fetchFilmes()
    }
  }

  const iniciarEdicao = (filme) => {
    setEditandoId(filme.id)
    setEditTitulo(filme.titulo)
    setEditAno(filme.ano)
    setEditGenero(filme.genero)
  }

  const salvarEdicao = async (id) => {
    await axios.put(`${API_URL}/${id}`, {
      titulo: editTitulo,
      ano: editAno,
      genero: editGenero,
      status: filmes.find(f => f.id === id).status,
      poster: filmes.find(f => f.id === id).poster
    })
    setEditandoId(null)
    fetchFilmes()
  }

  const renderLista = (status, tituloLista) => (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-2">{tituloLista}</h2>
      <ul>
        {filmes.filter(f => f.status === status).map(f => (
          <li key={f.id} className="bg-gray-100 p-4 mb-4 rounded shadow">
            {editandoId === f.id ? (
              <div className="space-y-2">
                <input className="border p-1 rounded w-full" value={editTitulo} onChange={e => setEditTitulo(e.target.value)} />
                <input className="border p-1 rounded w-full" value={editAno} onChange={e => setEditAno(e.target.value)} />
                <input className="border p-1 rounded w-full" value={editGenero} onChange={e => setEditGenero(e.target.value)} />
                <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => salvarEdicao(f.id)}>Salvar</button>
                <button className="ml-2 bg-gray-400 text-white px-2 py-1 rounded" onClick={() => setEditandoId(null)}>Cancelar</button>
              </div>
            ) : (
              <div>
                <strong>{f.titulo}</strong> ({f.ano}) - {f.genero}<br />
                {f.poster && <img src={f.poster} alt={f.titulo} width={100} className="my-2" />}<br />
                <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2" onClick={() => alterarStatus(f.id, 'assistido')}>Assistido</button>
                <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2" onClick={() => alterarStatus(f.id, 'favorito')}>Favorito</button>
                <button className="bg-purple-500 text-white px-2 py-1 rounded mr-2" onClick={() => alterarStatus(f.id, 'pendente')}>Pendente</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded mr-2" onClick={() => removerFilme(f.id)}>Remover</button>
                <button className="bg-gray-700 text-white px-2 py-1 rounded" onClick={() => iniciarEdicao(f)}>Editar</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Filmes</h1>
      <div className="space-y-2 mb-6">
        <input
          placeholder='Título'
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          placeholder='Ano'
          value={ano}
          onChange={e => setAno(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          placeholder='Gênero'
          value={genero}
          onChange={e => setGenero(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button onClick={adicionarFilme} className="bg-green-600 text-white px-4 py-2 rounded">Adicionar</button>
      </div>

      {renderLista('pendente', 'Filmes Pendentes')}
      {renderLista('assistido', 'Filmes Assistidos')}
      {renderLista('favorito', 'Filmes Favoritos')}
    </div>
  )
}
