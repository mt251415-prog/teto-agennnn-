// 테토 vs 에겐 진단 12문항 데이터
const questions = [
  {
    id: 1,
    category: "공감 vs 해결",
    question: "친구가 힘든 고민을 털어놓으며 눈물을 보일 때, 내 머릿속에 먼저 드는 생각은?",
    optionA: {
      text: "‘어쩌다 그런 일이 생긴 거지? 일단 해결책부터 찾아주자.’",
      type: "TETO",
      desc: "현실적 대안과 솔루션 우선"
    },
    optionB: {
      text: "‘진짜 너무 속상했겠다... 얼마나 힘들었을까 ㅠㅠ’",
      type: "EGEN",
      desc: "감정적 공감과 정서적 지지 우선"
    }
  },
  {
    id: 2,
    category: "갈등 대처",
    question: "지인과 사소한 오해나 갈등이 생겼을 때 나의 행동은?",
    optionA: {
      text: "마음에 담아두기 답답해서 바로 만나거나 연락해 삼자대면식으로 확실히 푼다.",
      type: "TETO",
      desc: "빠르고 명확한 정면 돌파"
    },
    optionB: {
      text: "당장 부딪히면 감정이 격해질 수 있으니, 시간을 두고 분위기를 보며 부드럽게 푼다.",
      type: "EGEN",
      desc: "감정 추스르기 및 온화한 조율"
    }
  },
  {
    id: 3,
    category: "데이트 리드",
    question: "주말 약속이나 데이트 장소를 정할 때 나의 스타일은?",
    optionA: {
      text: "“여기 분위기랑 맛 보장된 곳 찾았어. 2시에 여기서 보자!” 바로 정해준다.",
      type: "TETO",
      desc: "주도적이고 확실한 리드"
    },
    optionB: {
      text: "“너는 요즘 뭐 먹고 싶어? 가고 싶었던 카페나 동네 있어?” 먼저 묻는다.",
      type: "EGEN",
      desc: "상대방의 기분과 취향 우선 고려"
    }
  },
  {
    id: 4,
    category: "대화 스타일",
    question: "평소 사람들과 일상 대화를 나눌 때 나의 화법은?",
    optionA: {
      text: "핵심과 결론부터 말하는 편이고, 직설적이며 군더더기가 없다.",
      type: "TETO",
      desc: "직진형 담백한 소통"
    },
    optionB: {
      text: "상대방의 기분을 살피며 쿠션어(‘혹시~’, ‘그럴 수도 있겠다’)를 많이 쓴다.",
      type: "EGEN",
      desc: "섬세하고 배려 깊은 소통"
    }
  },
  {
    id: 5,
    category: "연애 & 플러팅",
    question: "마음에 쏙 드는 이성을 발견했을 때 나의 태도는?",
    optionA: {
      text: "밀당은 사치! 눈빛과 행동으로 호감을 숨김없이 당당하게 표현한다.",
      type: "TETO",
      desc: "거침없는 돌직구 직진"
    },
    optionB: {
      text: "상대방의 반응을 조심스레 살피며, 은근하고 다정하게 챙겨준다.",
      type: "EGEN",
      desc: "자연스러운 스며들기 플러팅"
    }
  },
  {
    id: 6,
    category: "상황 대처",
    question: "식당에서 주문하지 않은 엉뚱한 메뉴가 나왔을 때 나는?",
    optionA: {
      text: "“저기요! 이거 저희가 주문한 거 아닌데요?” 즉시 벨 누르고 바꾼다.",
      type: "TETO",
      desc: "단호한 권리 주장과 수정"
    },
    optionB: {
      text: "‘바쁘셔서 실수하셨나 보다...’ 웬만하면 그냥 먹거나 아주 조심스럽게 여쭤본다.",
      type: "EGEN",
      desc: "상대 상황 이해 및 배려"
    }
  },
  {
    id: 7,
    category: "약속 시간",
    question: "친구가 약속 시간에 20분 늦게 도착했을 때 나의 첫마디는?",
    optionA: {
      text: "“왜 늦었어? 늦으면 미리 카톡을 남겨줬어야지.”",
      type: "TETO",
      desc: "팩트 확인과 규칙 강조"
    },
    optionB: {
      text: "“오느라 고생했어! 차 많이 막혔어? 숨 좀 돌려~”",
      type: "EGEN",
      desc: "안도와 상대방 상태 케어"
    }
  },
  {
    id: 8,
    category: "팀 활동 & 역할",
    question: "조별 과제나 단체 모임에서 내가 자연스럽게 맡게 되는 포지션은?",
    optionA: {
      text: "할 일 딱딱 나누고 일정 챙기며 목표를 향해 끌고 가는 추진력 총괄",
      type: "TETO",
      desc: "결단력 있는 리더형"
    },
    optionB: {
      text: "서로 다른 의견을 조율하고 서먹한 분위기를 화기애애하게 만드는 분위기 메이커",
      type: "EGEN",
      desc: "조화로운 화합형 피스메이커"
    }
  },
  {
    id: 9,
    category: "멘탈 회복",
    question: "누군가에게 기분 나쁜 소리를 듣거나 실수했을 때 나의 멘탈은?",
    optionA: {
      text: "“어쩌라고? 이미 벌어진 일인데.” 털어버리고 할 일에 집중한다.",
      type: "TETO",
      desc: "빠른 멘탈 회복과 쿨함"
    },
    optionB: {
      text: "‘내가 뭘 잘못했나?’, ‘나를 싫어하나?’ 침대에서 밤새 곱씹으며 생각에 잠긴다.",
      type: "EGEN",
      desc: "깊은 여운과 섬세한 감수성"
    }
  },
  {
    id: 10,
    category: "소비 성향",
    question: "마음에 드는 물건이나 옷을 쇼핑할 때 가장 중요한 기준은?",
    optionA: {
      text: "기능성, 가성비, 내구성! 실제로 쓸모가 명확해야 산다.",
      type: "TETO",
      desc: "실용주의와 효율성"
    },
    optionB: {
      text: "디자인, 색감, 그리고 그 물건을 보았을 때 느껴지는 특별한 감성과 무드!",
      type: "EGEN",
      desc: "감성주의와 취향 존중"
    }
  },
  {
    id: 11,
    category: "서운함 표현",
    question: "연인이나 친구가 “너한테 좀 서운해”라고 말했을 때 반응은?",
    optionA: {
      text: "“어떤 부분 때문에 서운했던 건데? 구체적으로 말해줘 봐.”",
      type: "TETO",
      desc: "원인 규명과 논리적 접근"
    },
    optionB: {
      text: "“아... 내가 널 서운하게 만들었구나 ㅠㅠ 미안해, 속상했지?”",
      type: "EGEN",
      desc: "마음 다독이기와 공감"
    }
  },
  {
    id: 12,
    category: "자기 인식",
    question: "주변 사람들이 나를 묘사할 때 더 자주 쓰는 단어는?",
    optionA: {
      text: "“주관이 뚜렷하고 당당하다”, “뒤끝 없고 시원시원하다”",
      type: "TETO",
      desc: "당당한 테토 에너지"
    },
    optionB: {
      text: "“다정하고 따뜻하다”, “눈치와 센스가 좋고 분위기를 편하게 해준다”",
      type: "EGEN",
      desc: "부드러운 에겐 에너지"
    }
  }
];
