const nomePokemon = document.querySelector('.pokemon_name');
const numeroPokemon = document.querySelector('.pokemon_number');
const imagemPokemon = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const botaoVoltar = document.querySelector('.button-preview');
const botaoProximo = document.querySelector('.button-next');

let buscarProximo = 1;

const buscaPokemon = async (pokemon) => {

    const APIResposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResposta.ok){
        const dados = await APIResposta.json();
        return dados;
    }else {
        return null;
    } 
}

const renderPokemon = async(pokemon) => {
    nomePokemon.innerHTML = 'Procurando...';
    numeroPokemon.innerHTML = '';
    const dados = await buscaPokemon(pokemon);

if (dados){
    imagemPokemon.style.display ='block';
    nomePokemon.innerHTML = dados.name;
    numeroPokemon.innerHTML = dados.id;
    imagemPokemon.src = dados['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    buscarProximo = dados.id;
} else {
    imagemPokemon.style.display ='none'
    nomePokemon.innerHTML = 'Não encontrado';
    numeroPokemon.innerHTML = '';
}
}
form.addEventListener('submit', async(event)=> {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
} );
   
botaoVoltar.addEventListener('click', async()=> {
    if (buscarProximo >1){
       buscarProximo -=1;
       renderPokemon(buscarProximo);
   }   
} );

botaoProximo.addEventListener('click', async()=> {
    buscarProximo +=1;
    renderPokemon(buscarProximo);
 } );
    
renderPokemon(buscarProximo);