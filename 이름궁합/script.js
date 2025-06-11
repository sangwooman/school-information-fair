const strokeMap = {
    'ㄱ':1, 'ㄴ':2, 'ㄷ':3, 'ㄹ':1, 'ㅁ':3, 'ㅂ':2, 'ㅅ':4, 'ㅇ':4,
    'ㅈ':4, 'ㅊ':4, 'ㅋ':2, 'ㅌ':4, 'ㅍ':4, 'ㅎ':4, 'ㅏ':2, 'ㅑ':2,
    'ㅓ':2, 'ㅕ':2, 'ㅗ':2, 'ㅛ':2, 'ㅜ':2, 'ㅠ':2, 'ㅡ':1, 'ㅣ':1,
    'ㅐ':2, 'ㅔ':2, 'ㅒ':4, 'ㅖ':4, 'ㅘ':4, 'ㅙ':4, 'ㅚ':2, 'ㅝ':4,
    'ㅞ':4, 'ㅟ':2, 'ㅢ':2
  };

  function mixNames(name1, name2) {
    const arr1 = name1.split('');
    const arr2 = name2.split('');
    const result = [];
    const maxLen = Math.max(arr1.length, arr2.length);
  
    for (let i = 0; i < maxLen; i++) {
      if (i < arr1.length) result.push(arr1[i]);
      if (i < arr2.length) result.push(arr2[i]);
    }
  
    return result.join('');
  }
  
  function getStrokes(char) {
    const code = char.charCodeAt(0);
    if (code < 0xAC00 || code > 0xD7A3) return 0;
  
    const base = code - 0xAC00;
    const 초성 = Math.floor(base / 588);
    const 중성 = Math.floor((base % 588) / 28);
    const 종성 = base % 28;
  
    const 초성List = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
    const 중성List = ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'];
    const 종성List = ['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
  
    const 초 = 초성List[초성] || '';
    const 중 = 중성List[중성] || '';
    const 종 = 종성List[종성] || '';
    
    console.log((strokeMap[초] || 0) + (strokeMap[중] || 0) + (strokeMap[종] || 0))

    return (strokeMap[초] || 0) + (strokeMap[중] || 0) + (strokeMap[종] || 0);


  }
  
  async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async function reduceToTwoDigits(arr, visual) {
    while (arr.length > 2) {
      const newArr = [];
      let row = document.createElement('div');
      row.className = 'line-group';
      for (let i = 0; i < arr.length - 1; i++) {
        const sum = (arr[i] + arr[i + 1]) % 10;
        newArr.push(sum);
        const box = document.createElement('div');
        box.textContent = sum;
        row.appendChild(box);
      }
      visual.appendChild(row);
      await delay(600); // dramatic pause
      arr = newArr;
    }
    return arr.join('');
  }
  
  async function calculate() {
    const name1 = document.getElementById('name1').value.trim();
    const name2 = document.getElementById('name2').value.trim();
    const visual = document.getElementById('visual');
    visual.innerHTML = '';
  
    if (!name1 || !name2) {
      visual.textContent = '두 이름을 입력해주세요!';
      return;
    }
  
    // 이름 섞기
    const mixedName = mixNames(name1, name2);
  
    const combined = mixedName.split('');
    const strokes = combined.map(getStrokes);
  
    // Character row
    let row1 = document.createElement('div');
    row1.className = 'line-group';
    row1.style.animationDelay = `0ms`;
    combined.forEach(c => {
      const box = document.createElement('div');
      box.innerHTML = `<strong>${c}</strong>`;
      row1.appendChild(box);
    });
    visual.appendChild(row1);
    await delay(600);
  
    // Stroke count row
    let row2 = document.createElement('div');
    row2.className = 'line-group';
    row2.style.animationDelay = `100ms`;
    strokes.forEach(s => {
      const box = document.createElement('div');
      box.textContent = s;
      row2.appendChild(box);
    });
    visual.appendChild(row2);
    await delay(600);
  
    // Reduction steps
    const finalScore = await reduceToTwoDigits(strokes, visual);
  
    // Heart + Message
    const result = document.createElement('div');
    result.className = 'line-group';
    result.style.animationDelay = '400ms';
  
    const resultBox = document.createElement('div');
    resultBox.textContent = `${finalScore}%`;
    resultBox.style.fontSize = '28px';
    resultBox.style.fontWeight = 'bold';
    resultBox.style.color = '#d6336c';
  
    result.appendChild(resultBox);
    visual.appendChild(result);
  
    // 추가 메시지 조건
    const score = parseInt(finalScore, 10);
    if (score >= 80 && score <= 90) {
      const messageBox = document.createElement('div');
      messageBox.textContent = '천생연분이네요 💖';
      messageBox.style.fontSize = '22px';
      messageBox.style.color = '#d6336c';
      messageBox.style.marginTop = '10px';
      messageBox.className = 'line-group';
      visual.appendChild(messageBox);
    }
    
  }
  
