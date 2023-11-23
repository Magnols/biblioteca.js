import chalk from 'chalk';

function extraiLinks(arrLinks) {
    return arrLinks.map((objetoLink) => Object.values(objetoLink).join());
}

async function checaLinks(listaURLs) {
    const arrStatus = await Promise.all(
        listaURLs.map(async(url) => {
            try {
                const resposta = await fetch(url);
                return resposta.status;
            } catch (erro) {
                return manejaErros(erro)
            }
        })
    )
    return arrStatus;
}

function manejaErros(erro) {
    if (erro.cause.code === 'ENOTFOUND') {
        return 'Link não encontrado';

    } else {
        return 'Ocorreu algum erro';

    }
}

export default async function listaValidada(listaDeLinks) {
    const links = extraiLinks(listaDeLinks);
    const status = await checaLinks(links);
    console.log(status);
    return listaDeLinks.map((Objeto, indice) => ({
        ...Objeto,
        status: status[indice]
    }))
}