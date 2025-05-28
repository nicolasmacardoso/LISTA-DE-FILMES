# <h1>Lista de Filmes React</h1>

## <h2>Sobre</h2>
<p>App em React para gerenciar filmes pendentes, assistidos e favoritos. Usa JSON Server pra backend local e busca capa dos filmes na OMDB API. Estilização feita com Tailwind CSS.</p>

## <h2>Funcionalidades</h2>
<ul>
  <li>Adicionar filme (título, ano, gênero)</li>
  <li>Listar por status (pendente, assistido, favorito)</li>
  <li>Alterar status do filme</li>
  <li>Editar e remover filme com confirmação</li>
  <li>Busca automática da imagem do filme via OMDB API</li>
</ul>

## <h2>Tecnologias</h2>
<p>React, Tailwind CSS, Axios, JSON Server</p>

## <h2>Como rodar</h2>
<ol>
  <li>Clone e entre na pasta  
    <pre><code>git clone &lt;url&gt;
cd lista-de-filmes
    </code></pre>
  </li>
  <li>Instale dependências  
    <pre><code>npm install
    </code></pre>
  </li>
  <li>Crie <code>db.json</code> com:  
    <pre><code>{
  "filmes": []
}
    </code></pre>
  </li>
  <li>Rode JSON Server  
    <pre><code>npm run json-server
    </code></pre>
  </li>
  <li>Atualize a API Key na variável <code>OMDB_API_KEY</code> do arquivo principal</li>
  <li>Rode a aplicação  
    <pre><code>npm start
    </code></pre>
  </li>
</ol>

<p>Acesse <code>http://localhost:3000</code> para JSON Server e a app React normalmente na porta padrão (3000 ou 3001)</p>
