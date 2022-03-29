const cardArray =[
    {
        name: 'img1',
        img: 'images/img1.jpg'
    },
    {
        name: 'img2',
        img: 'images/img2.jpg'
    },
    {
        name: 'img3',
        img: 'images/img3.jpg'
    },
    {
        name: 'img4',
        img: 'images/img4.jpg'
    },
    {
        name: 'img5',
        img: 'images/img5.jpg'
    },
    {
        name: 'img6',
        img: 'images/img6.jpg'
    },
    {
        name: 'img1',
        img: 'images/img1.jpg'
    },
    {
        name: 'img2',
        img: 'images/img2.jpg'
    },
    {
        name: 'img3',
        img: 'images/img3.jpg'
    },
    {
        name: 'img4',
        img: 'images/img4.jpg'
    },
    {
        name: 'img5',
        img: 'images/img5.jpg'
    },
    {
        name: 'img6',
        img: 'images/img6.jpg'
    }
]

cardArray.sort(()=> 0.5 - Math.random())

const griddisplay = document.querySelector('#grid');
let result = document.querySelector('#result')
let cardChosen = [];
let cardChosenIds = [];
const cardsWon = [];

function createBoard(){
    for (let i = 0;i<cardArray.length;i++){
        const card = document.createElement('img');
        card.setAttribute('src','images/imgfirst.jpg');
        card.setAttribute('data-id', i)
        card.setAttribute('class', 'img')
        card.addEventListener('click',flipCard)
        griddisplay.appendChild(card);
    }
}

createBoard()

function checkMatch(){
    const cards = document.querySelectorAll('img')
    if(cardChosenIds[0] == cardChosenIds[1]){
        cards[cardChosenIds[0]].setAttribute('src','images/imgfirst.jpg');
        cards[cardChosenIds[1]].setAttribute('src','images/imgfirst.jpg');
    }
    else if(cardChosen[0] == cardChosen[1]){
        alert('You found a match!')
        cards[cardChosenIds[0]].setAttribute('src','images/imgwhite.png');
        cards[cardChosenIds[1]].setAttribute('src','images/imgwhite.png');
        cards[cardChosenIds[0]].removeEventListener('click',flipCard)
        cards[cardChosenIds[1]].removeEventListener('click',flipCard)
        cardsWon.push(cardChosen)
    } else {
       cards[cardChosenIds[0]].setAttribute('src', 'images/imgfirst.jpg');
       cards[cardChosenIds[1]].setAttribute('src', 'images/imgfirst.jpg');
       alert('Sorry try again!')
    }
    cardChosen = []
    cardChosenIds = []

    if(cardsWon.length == cards.length / 2){
        result.innerHTML = 'Tabriklaymiz';
    }
}

function  flipCard(){
    const cardId = this.getAttribute('data-id');
    cardChosen.push(cardArray[cardId].name);
    cardChosenIds.push(cardId);
    this.setAttribute('src', cardArray[cardId].img);
    if(cardChosen.length === 2){
        setTimeout(checkMatch, 500)
    }
}












