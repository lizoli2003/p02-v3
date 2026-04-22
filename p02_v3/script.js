const endMessage = document.getElementById("end-message");
const home = document.getElementById("home");

home.addEventListener("click", () => {
  home.classList.add("hidden");

  const elements = document.querySelectorAll(".image, .text");

  setInterval(() => {
    
    elements.forEach(el => el.classList.add("blur"));

    setTimeout(() => {
      elements.forEach(el => el.classList.remove("blur"));
    }, 4000);

  }, 19000); 
});



const canvas = document.getElementById("canvas");

const images = [
    "images/photo1.jpg",
    "images/photo2.jpg",
    "images/photo3.jpg",
    "images/photo4.jpg",
    "images/photo5.jpg",
    "images/photo6.jpg",
    "images/photo7.jpg",
    "images/photo8.jpg",
    "images/photo9.jpg",
    "images/photo10.jpg",
    "images/photo11.jpg",
    "images/photo12.jpg",
    "images/photo13.jpg",
    "images/photo14.jpg",
    "images/photo15.jpg",
    "images/photo16.jpg",
    "images/photo17.jpg",
    "images/photo18.jpg",
    "images/photo19.jpg",
    "images/photo20.jpg",
    "images/photo21.jpg",
    "images/photo22.jpg",
    "images/photo23.jpg",
    "images/photo24.jpg",
    "images/photo25.jpg",
    "images/photo26.jpg",
    "images/photo27.jpg",
    "images/photo28.jpg",
    "images/photo29.jpg",
    "images/photo30.jpg",
    "images/photo31.jpg",
    "images/photo32.jpg",
    "images/photo33.jpg",
    "images/photo34.jpg",
    "images/photo35.jpg",
    "images/photo36.jpg",
    "images/photo37.jpg",
    "images/photo38.jpg",
    "images/photo39.jpg",
    "images/photo40.jpg",
    "images/photo41.jpg",
    "images/photo42.jpg",    
];

const texts = [
    "L’hiver vous tiendra bien occupé",
    "L'hiver montréalais",
    "Le ski de fond c’est cool",
    "Je suis déjà arrivée en retard à un tournage, parce que j’ai tombé 4 fois dans la côte de Pie-IX et j’ai manqué le metro.",
    "J’ai foncé dans un arbre en ski sur la piste de la forêt enchantée.",
    "C’est pas si pire que ça Lizhi l’hiver...",
    "Je refuse d’avoir froid, alors j’ai toujours des combines en dessous de tout et mes mitaines sur un fils pour toujours les avoir.",
    "i wanna look pretty, pas d'un sac de patate sportif",
];

images.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.classList.add("image");

    const x = Math.random() * 4800;
    const y = Math.random() * 4800;

    img.style.left = x + "px";
    img.style.top = y + "px";

    const size = 100 + Math.random() * 200;
    img.style.width = size + "px";
    img.style.height = size + "px";

    canvas.appendChild(img);
});

texts.forEach(text => {
    const div = document.createElement("div");
    div.classList.add("text");
    div.innerText = text;

    const x = Math.random() * 4800;
    const y = Math.random() * 4800;

    div.style.left = x + "px";
    div.style.top = y + "px";

    canvas.appendChild(div);
});


let isDragging = false;
let startX, startY;
let offsetX = 0, offsetY = 0;

const screenW = window.innerWidth;
const screenH = window.innerHeight;

const edgeIndicators = {
  top: createEdgeIndicator('top'),
  bottom: createEdgeIndicator('bottom'),
  left: createEdgeIndicator('left'),
  right: createEdgeIndicator('right'),
};

function createEdgeIndicator(side) {
  const el = document.createElement('div');
  el.className = `edge-indicator edge-${side}`;
  el.innerHTML = 'ne part pas!';
  document.body.appendChild(el);
  return el;
}

function updateEdgeIndicators() {
  const canvasW = canvas.offsetWidth;
  const canvasH = canvas.offsetHeight;

  const canGoUp    = offsetY < 0;
  const canGoDown  = offsetY > -(canvasH - screenH);
  const canGoLeft  = offsetX < 0;
  const canGoRight = offsetX > -(canvasW - screenW);

  edgeIndicators.top.classList.toggle('visible',    !canGoUp);
  edgeIndicators.bottom.classList.toggle('visible', !canGoDown);
  edgeIndicators.left.classList.toggle('visible',   !canGoLeft);
  edgeIndicators.right.classList.toggle('visible',  !canGoRight);
}

document.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX - offsetX;
  startY = e.clientY - offsetY;
  document.body.style.cursor = "grabbing";
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  document.body.style.cursor = "grab";
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  offsetX = e.clientX - startX;
  offsetY = e.clientY - startY;
  canvas.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  updateEdgeIndicators();
});