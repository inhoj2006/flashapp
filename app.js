// Load from localStorage or fallback to default cards
let cards = JSON.parse(localStorage.getItem('cards')) || [
  {
    question: "태양의 중심 온도는?",
    answer: "약 1,500만 도",
    interval: 1,
    due: "2025-07-23"
  },
  {
    question: "플랑크 상수는?",
    answer: "6.626×10⁻³⁴ Js",
    interval: 1,
    due: "2025-07-23"
  }
];

let today = new Date().toISOString().slice(0, 10);
let dueCards = cards.filter(card => card.due <= today);
let current = 0;

function showCard() {
  if (dueCards.length === 0) {
    document.getElementById("card").innerHTML = "오늘 복습할 카드가 없습니다.";
    return;
  }
  let card = dueCards[current];
  document.getElementById("question").innerText = card.question;
  document.getElementById("answer").style.display = "none";
  document.getElementById("buttons").style.display = "none";
}

function showAnswer() {
  let card = dueCards[current];
  document.getElementById("answer").innerText = card.answer;
  document.getElementById("answer").style.display = "block";
  document.getElementById("buttons").style.display = "block";
}

function grade(difficulty) {
  let card = dueCards[current];
  if (difficulty === 0) card.interval = 1;
  else if (difficulty === 1) card.interval *= 2;
  else if (difficulty === 2) card.interval *= 3;

  let nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + card.interval);
  card.due = nextDate.toISOString().slice(0, 10);

  saveCards();
  current++;
  if (current < dueCards.length) showCard();
  else document.getElementById("card").innerHTML = "오늘 복습 끝!";
}

function saveCards() {
  localStorage.setItem('cards', JSON.stringify(cards));
}

function addCard() {
  const q = prompt("질문을 입력하세요:");
  if (!q) return;
  const a = prompt("정답을 입력하세요:");
  if (!a) return;

  const newCard = {
    question: q,
    answer: a,
    interval: 1,
    due: today
  };
  cards.push(newCard);
  saveCards();
  alert("카드가 추가되었습니다. 새로고침 후 반영됩니다.");
}

function deleteAllCards() {
  if (confirm("정말 모든 카드를 삭제할까요? 복구할 수 없습니다.")) {
    localStorage.removeItem('cards');
    alert("모든 카드가 삭제되었습니다. 새로고침 후 반영됩니다.");
  }
}

showCard();
