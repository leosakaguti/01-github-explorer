import { useState, useEffect } from 'react';
import { RepositoryItem } from "./RepositoryItem";

import '../styles/repositories.scss'

interface Repository {
    name: string;
    description: string;
    html_url: string;
}

export function RepositoryList(){
    //useState serve para modificar uma variável usando o setVariável
    const [repositories, setRepositories] = useState<Repository[]>([]);

    //useEffect é uma trigger, que é ativada toda vez que a variável setada no final do comando mudar
    useEffect(() => {
        //fetch => buscar, está puxando todos os repositórios da organização rocketseat
        fetch('https://api.github.com/orgs/rocketseat/repos')
        //quando tiver resposta, transforma a resposta em .json
        .then(response => response.json())
        // quando tiver dados, envia os dados para o setRepositories que atualiza o useState
        .then(data => setRepositories(data))
    }, []);

    return ( // .map irá passar por todos os elementos do array, neste caso, o repositories
        <section className="repository-list">
            <h1>Lista de Repositórios</h1>
            <button>Botão</button>
                <ul>
                    {repositories.map(repository => {
                        return <RepositoryItem key={repository.name} repository={repository} />
                    })}
                </ul>
        </section>
    )
}