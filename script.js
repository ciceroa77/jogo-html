const pokemons = [
    { name: "Bulbasaur", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png", evolution: "Ivysaur" },
    { name: "Ivysaur", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png", evolution: "Venusaur" },
    { name: "Venusaur", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png", evolution: "Venusaur" },
    { name: "Charmander", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png", evolution: "Charmeleon" },
    { name: "Charmeleon", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png", evolution: "Charizard" },
    { name: "Charizard", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png", evolution: "Charizard" },
    // Adicione mais Pokémon conforme necessário
  ];
  
  let cards = [];
  let flippedCards = [];
  let matchedCards = [];
  let phase = 1;
  
  const cardGrid = document.getElementById('card-grid');
  const nextPhaseButton = document.getElementById('next-phase');
  const phaseDisplay = document.getElementById('phase');
  
  function generateCards() {
    const numCards = phase * 2;
    const selectedPokemons = pokemons.slice(0, numCards / 2); // Seleciona os Pokémon para a fase
    cards = [];
  
    selectedPokemons.forEach(pokemon => {
      cards.push(
        { id: pokemon.name, image: pokemon.image, name: pokemon.name },
        { id: pokemon.name, image: pokemon.image, name: pokemon.name }
      );
    });
  
    cards = shuffle(cards);
    renderCards();
  }
  
  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  
  function renderCards() {
    cardGrid.innerHTML = '';
    cards.forEach((card, index) => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('card');
      cardElement.setAttribute('data-id', index);
      cardElement.innerHTML = `<img src="${card.image}" alt="${card.name}">`;
  
      cardElement.addEventListener('click', () => handleCardClick(index));
      cardGrid.appendChild(cardElement);
    });
  }
  
  function handleCardClick(index) {
    if (flippedCards.length === 2 || flippedCards.includes(index) || matchedCards.includes(cards[index].id)) return;
  
    flippedCards.push(index);
    const cardElement = cardGrid.children[index];
    cardElement.classList.add('flipped');
  
    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
  
  function checkMatch() {
    const [firstIndex, secondIndex] = flippedCards;
    const firstCard = cards[firstIndex];
    const secondCard = cards[secondIndex];
  
    if (firstCard.id === secondCard.id) {
      matchedCards.push(firstCard.id);
      cardGrid.children[firstIndex].classList.add('matched');
      cardGrid.children[secondIndex].classList.add('matched');
      flippedCards = [];
      if (matchedCards.length === cards.length / 2) {
        setTimeout(nextPhase, 1000);
      }
    } else {
      setTimeout(() => {
        cardGrid.children[firstIndex].classList.remove('flipped');
        cardGrid.children[secondIndex].classList.remove('flipped');
        flippedCards = [];
      }, 1000);
    }
  }
  
  function nextPhase() {
    phase++;
    phaseDisplay.textContent = phase;
    matchedCards = [];
    generateCards();
  }
  
  nextPhaseButton.addEventListener('click', nextPhase);
  
  // Inicia o jogo
  generateCards();
  