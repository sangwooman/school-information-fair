const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const message = document.getElementById('message');
let isReady = false;
let startTime = 0;
let timeoutId;

startBtn.addEventListener('click', () => {
  startBtn.classList.add('hidden');
  message.textContent = '초록색이 될 때까지 기다리세요...';
  
  // 랜덤 시간 후 초록색 배경 표시
  const delay = Math.floor(Math.random() * 2000) + 1000; // 1~3초
  timeoutId = setTimeout(() => {
    document.body.style.backgroundColor = 'green';
    startTime = Date.now();
    isReady = true;
    message.textContent = '지금 클릭하세요!';
  }, delay);
});

document.body.addEventListener('click', () => {
  // 클릭이 준비되기 전에 누르면 실패
  if (!isReady && startTime === 0) return;

  if (!isReady) {
    clearTimeout(timeoutId);
    document.body.style.backgroundColor = '#ff4d4d'; // 빨간 배경
    message.textContent = '너무 성급했어요! 초록색이 된 후 클릭하세요.';
    resetBtn.classList.remove('hidden');
    return;
  }

  const reactionTime = Date.now() - startTime;
  document.body.style.backgroundColor = '#ffffff';
  message.textContent = `반응 속도: ${reactionTime}ms`;
  isReady = false;
  resetBtn.classList.remove('hidden');

});

resetBtn.addEventListener('click', () => {
  document.body.style.backgroundColor = '#ffffff';
  message.textContent = '"게임 시작"을 눌러주세요.';
  resetBtn.classList.add('hidden');
  startBtn.classList.remove('hidden');
  isReady = false;
  startTime = 0;
});
