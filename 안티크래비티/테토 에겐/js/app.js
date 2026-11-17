// 앱 상태 관리
const state = {
  selectedGender: null, // 'MALE' | 'FEMALE'
  currentQuestionIndex: 0,
  scores: {
    teto: 0,
    egen: 0
  },
  answers: []
};

// DOM 요소 참조
const screens = {
  intro: document.getElementById('screen-intro'),
  gender: document.getElementById('screen-gender'),
  question: document.getElementById('screen-question'),
  loading: document.getElementById('screen-loading'),
  result: document.getElementById('screen-result')
};

// 화면 전환 유틸리티
function showScreen(screenName) {
  Object.values(screens).forEach(screen => {
    screen.classList.remove('active');
  });
  if (screens[screenName]) {
    screens[screenName].classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// 토스트 메시지 표시
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.innerText = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2200);
}

// 1. 테스트 시작 (인트로 -> 성별 선택)
function startTest() {
  state.selectedGender = null;
  state.currentQuestionIndex = 0;
  state.scores = { teto: 0, egen: 0 };
  state.answers = [];
  showScreen('gender');
}

// 2. 성별 선택 후 첫 문항 진입
function selectGender(gender) {
  state.selectedGender = gender;
  showScreen('question');
  renderQuestion();
}

// 3. 질문 렌더링
function renderQuestion() {
  const q = questions[state.currentQuestionIndex];
  const total = questions.length;
  const current = state.currentQuestionIndex + 1;
  const progressPercent = Math.round((current / total) * 100);

  // 진행률 업데이트
  document.getElementById('q-counter').innerText = `${current} / ${total}`;
  document.getElementById('q-progress-bar').style.width = `${progressPercent}%`;
  document.getElementById('q-category').innerText = q.category;

  // 질문 텍스트
  document.getElementById('q-title').innerText = q.question;

  // 선택지 세팅
  const btnA = document.getElementById('option-a-btn');
  const btnB = document.getElementById('option-b-btn');

  btnA.innerHTML = `
    <span class="text-xs font-semibold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 mb-1 inline-block">A</span>
    <p class="text-sm font-medium leading-relaxed">${q.optionA.text}</p>
    <span class="text-[11px] text-slate-400 mt-1 block">${q.optionA.desc}</span>
  `;

  btnB.innerHTML = `
    <span class="text-xs font-semibold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 mb-1 inline-block">B</span>
    <p class="text-sm font-medium leading-relaxed">${q.optionB.text}</p>
    <span class="text-[11px] text-slate-400 mt-1 block">${q.optionB.desc}</span>
  `;

  // 기존 이벤트 리스너 제거 후 새로 등록
  btnA.onclick = () => handleAnswer(q.optionA.type, btnA);
  btnB.onclick = () => handleAnswer(q.optionB.type, btnB);
}

// 4. 답변 선택 처리
function handleAnswer(type, btnElement) {
  // 클릭 시각 피드백
  btnElement.classList.add('border-indigo-400', 'bg-indigo-950/60');

  if (type === 'TETO') {
    state.scores.teto += 1;
  } else {
    state.scores.egen += 1;
  }
  state.answers.push(type);

  setTimeout(() => {
    btnElement.classList.remove('border-indigo-400', 'bg-indigo-950/60');
    if (state.currentQuestionIndex < questions.length - 1) {
      state.currentQuestionIndex++;
      renderQuestion();
    } else {
      processResult();
    }
  }, 220);
}

// 5. 로딩 연출 후 결과 계산
function processResult() {
  showScreen('loading');

  const loadingMessages = [
    "당신의 응답 패턴을 분석하고 있습니다...",
    "테스토스테론 vs 에스트로겐 에너지 대조 중...",
    "행동 양식과 커뮤니케이션 성향 매칭 중...",
    "최종 본능 유형 분석 완료!"
  ];

  let msgIndex = 0;
  const loadingTextElem = document.getElementById('loading-subtext');
  
  const interval = setInterval(() => {
    msgIndex++;
    if (msgIndex < loadingMessages.length) {
      loadingTextElem.innerText = loadingMessages[msgIndex];
    }
  }, 450);

  setTimeout(() => {
    clearInterval(interval);
    renderResult();
  }, 1900);
}

// 6. 결과 화면 렌더링
function renderResult(customCode, customTetoPercent) {
  let resultCode = customCode;
  let tetoPercent = customTetoPercent;
  let egenPercent = 100 - tetoPercent;

  if (!resultCode) {
    const isTeto = state.scores.teto >= state.scores.egen;
    resultCode = `${isTeto ? 'TETO' : 'EGEN'}_${state.selectedGender || 'MALE'}`;
    tetoPercent = Math.round((state.scores.teto / questions.length) * 100);
    egenPercent = 100 - tetoPercent;
  }

  const resultData = resultTypes[resultCode] || resultTypes.TETO_MALE;

  // 화면 데이터 바인딩
  document.getElementById('res-emoji').innerText = resultData.characterEmoji;
  document.getElementById('res-badge').innerText = resultData.badge;
  document.getElementById('res-title').innerText = resultData.type;
  document.getElementById('res-subtitle').innerText = resultData.subTitle;
  document.getElementById('res-summary').innerText = resultData.summary;

  // 게이지 바 세팅
  document.getElementById('gauge-teto-num').innerText = `${tetoPercent}%`;
  document.getElementById('gauge-egen-num').innerText = `${egenPercent}%`;
  
  // 게이지 바 너비 애니메이션 적용
  setTimeout(() => {
    const tetoBar = document.getElementById('gauge-teto-bar');
    const egenBar = document.getElementById('gauge-egen-bar');
    if (tetoBar && egenBar) {
      tetoBar.style.width = `${tetoPercent}%`;
      egenBar.style.width = `${egenPercent}%`;
    }
  }, 200);

  // 태그
  const tagsContainer = document.getElementById('res-tags');
  tagsContainer.innerHTML = resultData.tags.map(tag => 
    `<span class="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800/80 border border-slate-700 text-slate-300">${tag}</span>`
  ).join('');

  // 상세 특징 설명
  const descContainer = document.getElementById('res-descriptions');
  descContainer.innerHTML = resultData.description.map(desc => 
    `<li class="flex items-start text-sm text-slate-300 leading-relaxed"><span class="text-indigo-400 mr-2 font-bold">•</span>${desc}</li>`
  ).join('');

  // 연애 스타일
  document.getElementById('res-love-quote').innerText = resultData.loveStyle.title;
  document.getElementById('res-love-desc').innerText = resultData.loveStyle.desc;

  // 궁합
  document.getElementById('match-good-emoji').innerText = resultData.goodMatch.emoji;
  document.getElementById('match-good-name').innerText = resultData.goodMatch.name;
  document.getElementById('match-good-relation').innerText = resultData.goodMatch.relation;
  document.getElementById('match-good-desc').innerText = resultData.goodMatch.desc;

  document.getElementById('match-bad-emoji').innerText = resultData.badMatch.emoji;
  document.getElementById('match-bad-name').innerText = resultData.badMatch.name;
  document.getElementById('match-bad-relation').innerText = resultData.badMatch.relation;
  document.getElementById('match-bad-desc').innerText = resultData.badMatch.desc;

  showScreen('result');

  // 축하 폭죽 효과 (canvas-confetti)
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
  }
}

// 7. 공유 및 복사 기능
function copyResultLink() {
  const url = window.location.origin + window.location.pathname;
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(url).then(() => {
      showToast("🔗 테스트 링크가 클립보드에 복사되었습니다!");
    }).catch(() => {
      fallbackCopy(url);
    });
  } else {
    fallbackCopy(url);
  }
}

function fallbackCopy(text) {
  const tempInput = document.createElement('input');
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
  showToast("🔗 링크가 복사되었습니다!");
}

// 결과 카드 이미지 저장 (html2canvas)
function downloadResultCard() {
  const cardElement = document.getElementById('result-card-capture');
  showToast("📸 결과 카드를 이미지로 변환 중입니다...");

  if (typeof html2canvas === 'function') {
    html2canvas(cardElement, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#0f172a'
    }).then(canvas => {
      const link = document.createElement('a');
      link.download = `테토에겐_결과_${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      showToast("✅ 이미지가 저장되었습니다! 인스타 스토리에 공유해보세요.");
    }).catch(err => {
      console.error(err);
      showToast("⚠️ 이미지 생성 중 오류가 발생했습니다.");
    });
  } else {
    showToast("⚠️ 이미지 변환 라이브러리를 불러오지 못했습니다.");
  }
}

// 카카오톡 공유
function shareKakao() {
  const currentTitle = document.getElementById('res-title').innerText || "테토 vs 에겐 성향 테스트";
  const currentSummary = document.getElementById('res-summary').innerText || "나의 숨겨진 본능 에너지는?";
  const currentUrl = window.location.href;

  if (window.Kakao && window.Kakao.isInitialized && window.Kakao.isInitialized()) {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `[테토 vs 에겐 테스트] 나의 결과는 "${currentTitle}"!`,
        description: currentSummary,
        imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
        link: {
          mobileWebUrl: currentUrl,
          webUrl: currentUrl,
        },
      },
      buttons: [
        {
          title: '나도 테스트해보기',
          link: {
            mobileWebUrl: currentUrl,
            webUrl: currentUrl,
          },
        },
      ],
    });
  } else {
    // 카카오 SDK 미설정 시 링크 복사로 유도
    copyResultLink();
    showToast("카카오 개발자 키가 등록되지 않아 링크 복사로 대체합니다.");
  }
}

// 초기화 & 첫 화면 로드 시 딥링크 파라미터 체크
window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const typeParam = params.get('type');
  const tetoParam = parseInt(params.get('teto') || '50', 10);

  if (typeParam && resultTypes[typeParam]) {
    renderResult(typeParam, tetoParam);
  }
});
