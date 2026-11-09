/* 대신증권 AI 상담어드바이저 · 리더어드바이저 스토리보드 프로토타입 목업 데이터
 * 기준일: 2026.11.07 (토). 모든 값은 화면 검토용 샘플이다.
 * 화면에서 바꾼 값(이슈 처리, 설정 등)은 브라우저 localStorage에 저장해 화면 간에 이어 보이게 한다.
 */
window.MOCK = (function () {
  'use strict';
  var TODAY = '2026.11.07';
  var NOW = '2026.11.07 15:05:12';

  var CENTERS = {
    '서울센터': ['계좌상담1팀', '주식상담2팀', '운영지원팀'],
    '부산센터': ['해외주식팀', '연금상담팀']
  };
  var WORK_TEAMS = ['계좌상담1팀', '주식상담2팀', '해외주식팀', '연금상담팀'];

  var AGENTS = {
    D10231: { name: '이서연', center: '서울센터', team: '계좌상담1팀' },
    D10245: { name: '김호준', center: '서울센터', team: '계좌상담1팀' },
    D10262: { name: '인하영', center: '서울센터', team: '주식상담2팀' },
    D10277: { name: '조광림', center: '서울센터', team: '주식상담2팀' },
    D10281: { name: '하종찬', center: '부산센터', team: '해외주식팀' },
    D10290: { name: '안지아', center: '부산센터', team: '해외주식팀' },
    D10302: { name: '주우재', center: '부산센터', team: '연금상담팀' },
    D10315: { name: '성윤희', center: '부산센터', team: '연금상담팀' }
  };

  /* 로그인 사용자 (보기 역할별) */
  var LOGIN = {
    agent: { emp: 'D10231', name: '이서연', center: '서울센터', team: '계좌상담1팀', roleName: '상담사' },
    leader: { emp: 'L20011', name: '박지훈', center: '서울센터', team: '계좌상담1팀', roleName: '리더' },
    admin: { emp: 'A30002', name: '정민수', center: '서울센터', team: '운영지원팀', roleName: '관리자' }
  };

  var CONSULT_TYPES = [
    '계좌 > 계좌개설 > 비대면 개설 > 본인인증',
    '계좌 > 이체 > 출금 > 한도 문의',
    '주식 > 주문 > 정정·취소 > 주문 오류',
    '주식 > 주문 > 매수 > 시세 문의',
    '주식 > 신용 > 담보부족 > 반대매매 안내',
    '해외주식 > 환전 > 자동환전 > 환율 문의',
    '해외주식 > 환전 > 환전 오류 > 시스템 장애',
    '해외주식 > 주문 > 예약주문 > 체결 문의',
    '해외주식 > 세금 > 양도세 > 신고 문의',
    '연금 > IRP > 이전 > 수수료 문의',
    '연금 > IRP > 가입 > 상품 비교',
    '연금 > 연금저축 > 수령 > 세금 문의',
    '상품 > 펀드 > 가입 > 위험등급 안내',
    '상품 > ISA > 가입 > 세제 혜택'
  ];

  /* 키워드 유형: 기본 3개 + 추가한 유형 */
  var KW_TYPES = ['상품', '리스크', '제외 키워드', '약관 안내'];
  var BASE_KW_TYPES = ['상품', '리스크', '제외 키워드'];

  function K(t, k) { return { t: t, k: k }; }

  /* 상담이력 */
  var CALLS = [
    { id: 'CL-20261107-0035', dt: '2026.11.07 14:51:40', emp: 'D10277', type: '', dur: '00:03:02', dir: 'I/B', sil: '', re: false, kws: [], issueKws: [], analyzing: true },
    { id: 'CL-20261107-0031', dt: '2026.11.07 14:32:05', emp: 'D10231', type: CONSULT_TYPES[0], dur: '00:05:32', dir: 'I/B', sil: '00:00:41', re: true, kws: [K('상품', '크레온 CMA'), K('리스크', '원금 보장'), K('제외 키워드', '잠시만요')], issueKws: ['민원', '금감원'] },
    { id: 'CL-20261107-0027', dt: '2026.11.07 11:08:47', emp: 'D10262', type: CONSULT_TYPES[2], dur: '00:07:20', dir: 'I/B', sil: '00:01:12', re: false, kws: [K('리스크', '손실 보상'), K('제외 키워드', '잠시만요')], issueKws: ['시스템 오류'] },
    { id: 'CL-20261107-0019', dt: '2026.11.07 09:21:36', emp: 'D10290', type: CONSULT_TYPES[8], dur: '00:03:58', dir: 'I/B', sil: '00:00:27', re: false, kws: [K('약관 안내', '양도세'), K('상품', '크레온 해외주식')], issueKws: ['해지 요청'] },
    { id: 'CL-20261106-0118', dt: '2026.11.06 16:41:10', emp: 'D10281', type: CONSULT_TYPES[5], dur: '00:04:33', dir: 'I/B', sil: '00:00:22', re: false, kws: [K('상품', '크레온 해외주식')], issueKws: [] },
    { id: 'CL-20261106-0094', dt: '2026.11.06 10:15:33', emp: 'D10302', type: CONSULT_TYPES[9], dur: '00:06:07', dir: 'O/B', sil: '00:00:58', re: false, kws: [K('상품', '대신 IRP'), K('약관 안내', '중도 해지')], issueKws: ['해지 요청'] },
    { id: 'CL-20261105-0077', dt: '2026.11.05 15:22:19', emp: 'D10245', type: CONSULT_TYPES[12], dur: '00:08:41', dir: 'I/B', sil: '00:02:03', re: true, kws: [K('상품', '대신 글로벌 배당 펀드'), K('리스크', '무조건 수익'), K('리스크', '원금 보장'), K('제외 키워드', '네네')], issueKws: ['불완전판매'] },
    { id: 'CL-20261105-0052', dt: '2026.11.05 09:47:02', emp: 'D10290', type: CONSULT_TYPES[7], dur: '00:03:15', dir: 'I/B', sil: '00:00:18', re: false, kws: [K('상품', '크레온 해외주식')], issueKws: [] },
    { id: 'CL-20261104-0133', dt: '2026.11.04 17:05:44', emp: 'D10277', type: CONSULT_TYPES[4], dur: '00:09:12', dir: 'O/B', sil: '00:01:47', re: false, kws: [K('리스크', '손실 없음'), K('제외 키워드', '잠시만요')], issueKws: ['금감원'] },
    { id: 'CL-20261104-0088', dt: '2026.11.04 13:30:11', emp: 'D10315', type: CONSULT_TYPES[11], dur: '00:05:49', dir: 'I/B', sil: '00:00:35', re: false, kws: [K('상품', '대신 연금저축')], issueKws: [] },
    { id: 'CL-20261103-0061', dt: '2026.11.03 11:12:57', emp: 'D10231', type: CONSULT_TYPES[1], dur: '00:02:41', dir: 'I/B', sil: '00:00:12', re: true, kws: [K('상품', '크레온 CMA')], issueKws: ['불만'] },
    { id: 'CL-20261102-0145', dt: '2026.11.02 16:58:20', emp: 'D10262', type: CONSULT_TYPES[3], dur: '00:04:02', dir: 'I/B', sil: '00:00:29', re: false, kws: [K('리스크', '원금 보장')], issueKws: ['민원'] },
    { id: 'CL-20261030-0102', dt: '2026.10.30 14:20:31', emp: 'D10245', type: CONSULT_TYPES[13], dur: '00:06:55', dir: 'I/B', sil: '00:01:05', re: false, kws: [K('상품', '대신 ISA 중개형'), K('리스크', '무조건 수익')], issueKws: ['불완전판매'] },
    { id: 'CL-20261029-0071', dt: '2026.10.29 10:05:48', emp: 'D10281', type: CONSULT_TYPES[6], dur: '00:07:33', dir: 'I/B', sil: '00:02:40', re: true, kws: [K('상품', '크레온 해외주식')], issueKws: ['시스템 오류', '불만'] },
    { id: 'CL-20261028-0039', dt: '2026.10.28 15:44:09', emp: 'D10302', type: CONSULT_TYPES[10], dur: '00:05:10', dir: 'O/B', sil: '00:00:44', re: false, kws: [K('상품', '대신 IRP')], issueKws: [] }
  ];
  CALLS.forEach(function (c) { var a = AGENTS[c.emp]; c.agent = a.name; c.center = a.center; c.team = a.team; });

  /* 이슈 콜 (이슈 키워드가 태깅된 콜) */
  var ISSUE_BASE = {
    'CL-20261107-0031': { reg: '2026.11.07', status: '미처리', due: '일', itype: '민원 우려', owner: '', done: '' },
    'CL-20261107-0027': { reg: '2026.11.07', status: '검토필요', due: '주', itype: '시스템 오류', owner: '박지훈', done: '' },
    'CL-20261107-0019': { reg: '2026.11.07', status: '미처리', due: '주', itype: '', owner: '', done: '' },
    'CL-20261106-0094': { reg: '2026.11.06', status: '처리완료', due: '주', itype: '해지·이탈 우려', owner: '최유나', done: '2026.11.06' },
    'CL-20261105-0077': { reg: '2026.11.05', status: '미처리', due: '일', itype: '불완전판매 우려', owner: '박지훈', done: '' },
    'CL-20261104-0133': { reg: '2026.11.04', status: '검토필요', due: '월', itype: '민원 우려', owner: '정민수', done: '' },
    'CL-20261103-0061': { reg: '2026.11.03', status: '이슈없음', due: '주', itype: '', owner: '최유나', done: '2026.11.04' },
    'CL-20261102-0145': { reg: '2026.11.02', status: '처리완료', due: '주', itype: '민원 우려', owner: '박지훈', done: '2026.11.05' },
    'CL-20261030-0102': { reg: '2026.10.30', status: '검토필요', due: '주', itype: '불완전판매 우려', owner: '박지훈', done: '' },
    'CL-20261029-0071': { reg: '2026.10.29', status: '처리완료', due: '월', itype: '시스템 오류', owner: '정민수', done: '2026.11.03' }
  };

  var ISSUE_HISTORY = {
    'CL-20261107-0031': [
      { t: '2026.11.07 14:38:20', w: '시스템', c: '이슈 콜 등록 (이슈 키워드: 민원, 금감원) · 이슈 기한 일' },
      { t: '2026.11.07 14:40:03', w: '박지훈(L20011)', c: '이슈 유형 지정: 민원 우려' }
    ],
    'CL-20261107-0027': [
      { t: '2026.11.07 11:15:41', w: '시스템', c: '이슈 콜 등록 (이슈 키워드: 시스템 오류) · 이슈 기한 주' },
      { t: '2026.11.07 11:30:12', w: '박지훈(L20011)', c: '담당 관리자 지정: 박지훈 · 이슈 유형 지정: 시스템 오류' },
      { t: '2026.11.07 11:31:05', w: '박지훈(L20011)', c: '상태 변경: 미처리 → 검토필요 · 처리 내용: 주문 시스템 지연 여부 IT팀 확인 요청' }
    ]
  };

  var OWNERS = [
    { emp: 'L20011', name: '박지훈', center: '서울센터', team: '계좌상담1팀', types: ['민원 우려', '불완전판매 우려'] },
    { emp: 'L20024', name: '최유나', center: '부산센터', team: '연금상담팀', types: ['해지·이탈 우려'] },
    { emp: 'A30002', name: '정민수', center: '서울센터', team: '운영지원팀', types: [] }
  ];

  var ISSUE_TYPES = [
    { name: '민원 우려', desc: '민원 제기, 금감원 신고 언급', use: true, mod: '2026.10.21' },
    { name: '불완전판매 우려', desc: '원금 보장·확정 수익 등 부적절한 안내 가능성', use: true, mod: '2026.10.21' },
    { name: '시스템 오류', desc: '주문·인증·환전 등 시스템 장애 관련', use: true, mod: '-' },
    { name: '해지·이탈 우려', desc: '계좌·상품 해지 요청', use: true, mod: '2026.10.30' },
    { name: '기타', desc: '', use: false, mod: '2026.11.02' }
  ];

  var SUGGESTIONS = [
    { type: '민원 우려', text: '고객 불만 원인을 확인하고 당일 안에 회신 일정을 안내한다.', use: true, by: '박지훈', mod: '2026.10.21' },
    { type: '민원 우려', text: '민원 접수 전 리더가 직접 콜백해 처리 과정과 일정을 설명한다.', use: true, by: '박지훈', mod: '-' },
    { type: '불완전판매 우려', text: '상품 설명서와 위험등급을 다시 안내했는지 녹취로 확인하고, 필요하면 재안내 콜을 진행한다.', use: true, by: '정민수', mod: '2026.10.25' },
    { type: '시스템 오류', text: 'IT 장애 접수번호를 처리 내용에 남기고, 복구되면 고객에게 결과를 안내한다.', use: true, by: '정민수', mod: '-' },
    { type: '해지·이탈 우려', text: '해지 사유를 확인하고 대체 상품이나 수수료 혜택을 안내한다.', use: true, by: '최유나', mod: '2026.10.30' }
  ];

  /* 상담이력 상세용 샘플 전사 */
  var TRANSCRIPT = {
    kws: [K('상품', '크레온 CMA'), K('리스크', '원금 보장'), { t: '이슈', k: '민원' }, { t: '이슈', k: '금감원' }, K('제외 키워드', '잠시만요')],
    utts: [
      { s: 0, who: 'agent', text: '안녕하세요, 대신증권 고객센터 상담사 {AGENT}입니다. 무엇을 도와드릴까요?' },
      { s: 6, who: 'cust', text: '비대면으로 계좌를 만들려고 하는데 본인인증이 계속 안 돼요.' },
      { s: 14, who: 'agent', text: '불편을 드려 죄송합니다. 잠시만요, 어느 단계에서 오류가 나는지 확인해 보겠습니다.' },
      { s: 25, who: 'cust', text: '신분증 촬영하고 나면 실패라고 나와요. 벌써 세 번째예요.' },
      { silence: [31, 52] },
      { s: 52, who: 'agent', text: '확인해 보니 신분증 진위 확인 시스템이 일시적으로 지연되고 있습니다.' },
      { s: 65, who: 'cust', text: '그럼 크레온 CMA 가입도 오늘 못 하는 건가요? 원금 보장은 되는 상품이죠?' },
      { s: 78, who: 'agent', text: 'CMA는 예금자 보호 대상이 아니어서 원금 보장 상품은 아닙니다. 상품 설명서를 함께 안내해 드리겠습니다.' },
      { s: 94, who: 'cust', text: '이렇게 계속 안 되면 민원 넣을 거예요. 금감원에 신고할 수도 있고요.' },
      { s: 106, who: 'agent', text: '불편을 드려 정말 죄송합니다. 담당 부서에 바로 전달하고 처리 결과를 연락드리겠습니다.' },
      { silence: [118, 138] },
      { s: 138, who: 'cust', text: '네, 오늘 안에 연락 주세요.' },
      { s: 144, who: 'agent', text: '네, 오늘 중으로 연락드리겠습니다. 이용해 주셔서 감사합니다.' }
    ],
    length: 332
  };

  /* 키워드 관리 */
  var PRODUCTS = [
    { code: 'P-CMA-001', name: '크레온 CMA', desc: '수시 입출금이 가능한 종합자산관리계좌', use: true, kws: ['CMA', '씨엠에이', '종합자산관리'], sync: '반영 완료', reg: '2026.09.01', mod: '2026.10.20' },
    { code: 'P-ISA-002', name: '대신 ISA 중개형', desc: '국내 상장 주식·ETF에 투자할 수 있는 중개형 ISA', use: true, kws: ['ISA', '중개형 ISA'], sync: '수정 반영 대기', reg: '2026.09.01', mod: '2026.11.07' },
    { code: 'P-IRP-003', name: '대신 IRP', desc: '개인형 퇴직연금 계좌', use: true, kws: ['IRP', '퇴직연금', '개인형 퇴직연금', '아이알피'], sync: '반영 완료', reg: '2026.09.01', mod: '2026.10.02' },
    { code: 'P-OVS-005', name: '크레온 해외주식', desc: '미국·홍콩·일본 주식 온라인 매매 서비스', use: true, kws: ['해외주식', '미국주식'], sync: '반영 완료', reg: '2026.09.03', mod: '-' },
    { code: 'P-PNS-006', name: '대신 연금저축', desc: '연금저축 계좌', use: false, kws: [], sync: '반영 완료', reg: '2026.09.03', mod: '2026.10.11' },
    { code: 'PFND14', name: '대신 글로벌 배당 펀드', desc: '', use: true, kws: ['배당 펀드'], sync: '등록 반영 실패', fail: '상품 코드 형식이 기간계 규칙과 다릅니다. (기간계 응답 E-1032)', reg: '2026.11.06', mod: '-' }
  ];

  var KEYWORDS = {
    '리스크': [
      { k: '원금 보장', desc: '원금 손실 가능 상품에 보장 표현을 쓰는 경우', types: [CONSULT_TYPES[12], CONSULT_TYPES[0]], by: '박지훈', reg: '2026.09.12', mod: '2026.10.02' },
      { k: '무조건 수익', desc: '수익을 단정하는 표현', types: [CONSULT_TYPES[12], CONSULT_TYPES[13]], by: '박지훈', reg: '2026.09.12', mod: '-' },
      { k: '손실 없음', desc: '', types: [CONSULT_TYPES[4]], by: '정민수', reg: '2026.09.20', mod: '-' },
      { k: '손실 보상', desc: '손실을 보상해 준다는 약속', types: [], by: '정민수', reg: '2026.10.05', mod: '2026.10.06' },
      { k: '확정 수익', desc: '', types: [CONSULT_TYPES[13]], by: '최유나', reg: '2026.10.18', mod: '-' }
    ],
    '제외 키워드': [
      { k: '잠시만요', desc: '대기 안내 관용 표현', types: [], by: '정민수', reg: '2026.09.15', mod: '-' },
      { k: '네네', desc: '맞장구 표현', types: [], by: '정민수', reg: '2026.09.15', mod: '-' },
      { k: '감사합니다', desc: '', types: [], by: '박지훈', reg: '2026.10.01', mod: '-' }
    ],
    '약관 안내': [
      { k: '중도 해지', desc: '연금·ISA 중도 해지 안내', types: [CONSULT_TYPES[9]], by: '최유나', reg: '2026.10.22', mod: '-' },
      { k: '양도세', desc: '해외주식 양도소득세 안내', types: [CONSULT_TYPES[8]], by: '최유나', reg: '2026.10.22', mod: '-' }
    ]
  };

  /* 공지사항 */
  var NOTICES = [
    { id: 'N-0012', cat: '중요', title: '상담이력 조회 하위 메뉴(이슈 콜 목록) 오픈 안내', by: '정민수', reg: '2026.11.06', mod: '', body: '상담이력 조회 메뉴에 이슈 콜 목록이 추가되었습니다.\n\n이슈 키워드가 감지된 콜은 이슈 콜 목록에 자동으로 등록되며, 처리 상태(미처리·검토필요·처리완료·이슈없음)와 이슈 기한(일·주·월·연)을 관리할 수 있습니다.\n이슈 기한은 달력 기준으로 계산합니다. 예를 들어 \'주\'는 등록일이 속한 주의 일요일이 기한일입니다.\n\n문의: 운영지원팀 정민수', file: '이슈콜목록_사용안내.pdf (1.2MB)' },
    { id: 'N-0011', cat: '중요', title: '키워드 관리 상품 탭 기간계 전송 점검 안내 (2026.11.08 02:00~04:00)', by: '정민수', reg: '2026.11.05', mod: '2026.11.06', body: '기간계 점검으로 2026.11.08 02:00~04:00에는 상품 정보가 기간계로 전송되지 않습니다.\n점검 중에 저장한 상품은 \'반영 대기\'로 표시되며, 점검이 끝나면 순서대로 전송됩니다.', file: '' },
    { id: 'N-0010', cat: '일반', title: '11월 상담유형 분류 체계 변경 사전 안내', by: '정민수', reg: '2026.11.03', mod: '', body: '상담유형 분류 체계(대분류 > 중분류 > 소분류 > 세분류) 일부 세분류가 2026.11.16부터 바뀝니다.\n이미 분석된 콜의 분류 결과는 바뀌지 않습니다.', file: '상담유형_변경내역.xlsx (48KB)' },
    { id: 'N-0009', cat: '일반', title: '녹취 재생 속도 선택 기능 추가 안내', by: '정민수', reg: '2026.10.28', mod: '', body: '상담이력 상세의 녹취 재생에서 0.5x·1.0x·1.5x·2.0x 재생 속도를 선택할 수 있습니다.', file: '' },
    { id: 'N-0008', cat: '일반', title: '개인정보 마스킹 정책 적용 안내', by: '정민수', reg: '2026.10.20', mod: '', body: '전사 텍스트의 주민등록번호·계좌번호는 마스킹해서 표시합니다.', file: '' }
  ];

  /* 사용자·역할 */
  var USERS = [
    { emp: 'A30002', name: '정민수', center: '서울센터', team: '운영지원팀', role: '관리자', st: '사용', last: '2026.11.07 08:52:13' },
    { emp: 'L20011', name: '박지훈', center: '서울센터', team: '계좌상담1팀', role: '리더', st: '사용', last: '2026.11.07 08:40:02' },
    { emp: 'L20024', name: '최유나', center: '부산센터', team: '연금상담팀', role: '리더', st: '사용', last: '2026.11.06 18:11:47' },
    { emp: 'D10231', name: '이서연', center: '서울센터', team: '계좌상담1팀', role: '상담사', st: '사용', last: '2026.11.07 08:57:31' },
    { emp: 'D10245', name: '김호준', center: '서울센터', team: '계좌상담1팀', role: '상담사', st: '사용', last: '2026.11.07 08:59:02' },
    { emp: 'D10262', name: '인하영', center: '서울센터', team: '주식상담2팀', role: '상담사', st: '사용', last: '2026.11.07 08:55:48' },
    { emp: 'D10277', name: '조광림', center: '서울센터', team: '주식상담2팀', role: '상담사', st: '사용', last: '2026.11.07 09:01:15' },
    { emp: 'D10281', name: '하종찬', center: '부산센터', team: '해외주식팀', role: '상담사', st: '사용', last: '2026.11.06 17:58:20' },
    { emp: 'D10290', name: '안지아', center: '부산센터', team: '해외주식팀', role: '상담사', st: '잠금', last: '2026.11.07 09:12:40' },
    { emp: 'D10302', name: '주우재', center: '부산센터', team: '연금상담팀', role: '상담사', st: '사용', last: '2026.11.07 08:50:09' },
    { emp: 'D10315', name: '성윤희', center: '부산센터', team: '연금상담팀', role: '상담사', st: '사용', last: '2026.11.07 08:48:33' },
    { emp: 'D10199', name: '오태민', center: '부산센터', team: '해외주식팀', role: '상담사', st: '미사용', last: '2026.08.29 17:20:05' }
  ];

  var ROLES = [
    { name: '상담사', desc: '상담어드바이저 사용자', base: true, mod: '2026.10.14', scope: '본인',
      perm: { history: [1, 0], issue: [1, 0], issueSet: [0, 0], monitor: [0, 0], keyword: [0, 0], stats: [0, 0], notice: [1, 0], users: [0, 0], roles: [0, 0], audit: [0, 0] } },
    { name: '리더', desc: '리더어드바이저 사용자', base: true, mod: '2026.10.14', scope: '소속 센터',
      perm: { history: [1, 0], issue: [1, 1], issueSet: [1, 1], monitor: [1, 0], keyword: [1, 1], stats: [0, 0], notice: [1, 0], users: [0, 0], roles: [0, 0], audit: [0, 0] } },
    { name: '관리자', desc: '콜 통계·사용자 관리·역할 관리·감사로그 등 관리자 화면 사용자', base: true, mod: '2026.10.14', scope: '전체',
      perm: { history: [1, 0], issue: [1, 1], issueSet: [1, 1], monitor: [1, 0], keyword: [1, 1], stats: [1, 0], notice: [1, 1], users: [1, 1], roles: [1, 1], audit: [1, 0] } },
    { name: 'QA 담당', desc: '콜 통계·감사로그 조회 전용', base: false, mod: '2026.11.02', scope: '전체',
      perm: { history: [1, 0], issue: [1, 0], issueSet: [0, 0], monitor: [0, 0], keyword: [0, 0], stats: [1, 0], notice: [1, 0], users: [0, 0], roles: [0, 0], audit: [1, 0] } }
  ];

  var AUDIT = [
    { t: '2026.11.07 14:40:03', emp: 'L20011', name: '박지훈', role: '리더', menu: '이슈 콜 목록', act: '이슈 처리', target: 'CL-20261107-0031', ok: true, ip: '10.21.4.118', change: '이슈 유형: 미지정 → 민원 우려' },
    { t: '2026.11.07 14:12:51', emp: 'A30002', name: '정민수', role: '관리자', menu: '키워드 관리', act: '수정', target: 'P-ISA-002', ok: true, ip: '10.21.2.7', change: '상품 설명 수정 · 연관 키워드: ISA → ISA, 중개형 ISA' },
    { t: '2026.11.07 14:12:52', emp: 'A30002', name: '정민수', role: '관리자', menu: '키워드 관리', act: '기간계 전송', target: 'P-ISA-002', ok: true, ip: '10.21.2.7', change: '수정 요청 전송 · 반영 대기' },
    { t: '2026.11.07 11:31:05', emp: 'L20011', name: '박지훈', role: '리더', menu: '이슈 콜 목록', act: '이슈 처리', target: 'CL-20261107-0027', ok: true, ip: '10.21.4.118', change: '상태: 미처리 → 검토필요' },
    { t: '2026.11.07 10:02:44', emp: 'D10231', name: '이서연', role: '상담사', menu: '상담이력', act: '녹취 재생', target: 'CL-20261103-0061', ok: true, ip: '10.21.7.33', change: '' },
    { t: '2026.11.07 09:58:10', emp: 'D10231', name: '이서연', role: '상담사', menu: '상담이력', act: '조회', target: 'CL-20261103-0061', ok: true, ip: '10.21.7.33', change: '' },
    { t: '2026.11.07 09:12:40', emp: 'D10290', name: '안지아', role: '상담사', menu: '-', act: '로그인', target: '-', ok: false, ip: '10.21.9.61', change: '', fail: '로그인 5회 실패로 계정 잠금' },
    { t: '2026.11.06 18:20:31', emp: 'A30002', name: '정민수', role: '관리자', menu: '키워드 관리', act: '기간계 전송', target: 'PFND14', ok: false, ip: '10.21.2.7', change: '등록 요청 전송', fail: '상품 코드 형식이 기간계 규칙과 다릅니다. (E-1032)' },
    { t: '2026.11.06 17:05:12', emp: 'A30002', name: '정민수', role: '관리자', menu: '역할 관리', act: '권한 변경', target: '리더', ok: true, ip: '10.21.2.7', change: '키워드 관리: 조회 → 조회·편집' },
    { t: '2026.11.06 16:44:09', emp: 'L20024', name: '최유나', role: '리더', menu: '이슈 콜 설정', act: '등록', target: '해지·이탈 우려', ok: true, ip: '10.21.5.20', change: '개선 제안 등록' },
    { t: '2026.11.06 15:10:27', emp: 'A30002', name: '정민수', role: '관리자', menu: '공지사항', act: '등록', target: 'N-0012', ok: true, ip: '10.21.2.7', change: '' },
    { t: '2026.11.06 09:00:02', emp: 'A30002', name: '정민수', role: '관리자', menu: '사용자 관리', act: '권한 변경', target: 'D10199', ok: true, ip: '10.21.2.7', change: '계정 상태: 사용 → 미사용' }
  ];

  /* ---- 로컬 저장 (화면 간 상태 유지) ---- */
  var LS = 'daishin-advisor-proto:';
  function load(key, fallback) {
    try { var v = localStorage.getItem(LS + key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; }
  }
  function save(key, val) { try { localStorage.setItem(LS + key, JSON.stringify(val)); } catch (e) { /* 저장 불가 환경 */ } }

  function issues() {
    var over = load('issues', {});
    return CALLS.filter(function (c) { return ISSUE_BASE[c.id]; }).map(function (c) {
      var base = ISSUE_BASE[c.id];
      var o = Object.assign({}, c, base, over[c.id] || {});
      return o;
    });
  }
  function saveIssue(id, patch) {
    var over = load('issues', {});
    over[id] = Object.assign({}, over[id] || {}, patch);
    save('issues', over);
  }
  function history(id) {
    var extra = load('history', {});
    return (ISSUE_HISTORY[id] || []).concat(extra[id] || []);
  }
  function addHistory(id, entry) {
    var extra = load('history', {});
    extra[id] = (extra[id] || []).concat([entry]);
    save('history', extra);
  }
  function issueTypes() { return load('issueTypes', ISSUE_TYPES); }
  function owners() { return load('owners', OWNERS); }
  function settings() {
    return Object.assign({ defaultDue: '주', scope: '본인' }, load('settings', {}));
  }
  function saveSettings(patch) { save('settings', Object.assign(settings(), patch)); }

  /* ---- 통계용 합성 데이터 (재현 가능한 의사 난수) ---- */
  function rng(seed) {
    return function () {
      seed |= 0; seed = seed + 0x6D2B79F5 | 0;
      var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  var STATS = null;
  function stats() {
    if (STATS) return STATS;
    var r = rng(20261107);
    var teamCenter = { '계좌상담1팀': '서울센터', '주식상담2팀': '서울센터', '해외주식팀': '부산센터', '연금상담팀': '부산센터' };
    var types = ['민원 우려', '불완전판매 우려', '시스템 오류', '해지·이탈 우려', ''];
    var ownerByType = { '민원 우려': '박지훈', '불완전판매 우려': '박지훈', '시스템 오류': '정민수', '해지·이탈 우려': '최유나', '': '' };
    var dueUnits = ['주', '주', '주', '일', '월'];
    var days = [], issueRecs = [];
    var end = new Date(2026, 10, 7);
    for (var i = 59; i >= 0; i--) {
      var d = new Date(end); d.setDate(end.getDate() - i);
      var ds = d.getFullYear() + '.' + String(d.getMonth() + 1).padStart(2, '0') + '.' + String(d.getDate()).padStart(2, '0');
      var wk = d.getDay(); var weekend = wk === 0 || wk === 6;
      WORK_TEAMS.forEach(function (team) {
        var calls = Math.round((weekend ? 28 : 96) + r() * (weekend ? 18 : 48));
        var re = Math.round(calls * (0.06 + r() * 0.05));
        var iss = Math.max(0, Math.round(calls * (0.025 + r() * 0.025)));
        var avgDur = 280 + Math.round(r() * 90);
        var avgSil = 32 + Math.round(r() * 22);
        days.push({ date: ds, center: teamCenter[team], team: team, calls: calls, re: re, issue: iss, dur: calls * avgDur, sil: calls * avgSil });
        for (var k = 0; k < iss; k++) {
          var ty = types[Math.floor(r() * types.length)];
          var age = i; // 기준일로부터 경과일
          var x = r(); var status;
          if (age >= 10) status = x < 0.76 ? '처리완료' : (x < 0.94 ? '이슈없음' : '검토필요');
          else if (age >= 3) status = x < 0.45 ? '처리완료' : (x < 0.6 ? '이슈없음' : (x < 0.82 ? '검토필요' : '미처리'));
          else status = x < 0.18 ? '처리완료' : (x < 0.26 ? '이슈없음' : (x < 0.52 ? '검토필요' : '미처리'));
          var done = '';
          if (status === '처리완료' || status === '이슈없음') {
            var dd = new Date(d); dd.setDate(d.getDate() + Math.floor(r() * Math.min(6, age + 1)));
            if (dd > end) dd = new Date(end);
            done = dd.getFullYear() + '.' + String(dd.getMonth() + 1).padStart(2, '0') + '.' + String(dd.getDate()).padStart(2, '0');
          }
          issueRecs.push({ date: ds, center: teamCenter[team], team: team, itype: ty, owner: status === '미처리' && r() < 0.5 ? '' : ownerByType[ty], due: dueUnits[Math.floor(r() * dueUnits.length)], status: status, done: done });
        }
      });
    }
    /* 실시간 모니터링: 오늘(0시~현재 15시)·전일(0시~23시) 시간대별 이슈 콜 인입 건수 */
    var todayHourly = [0, 0, 0, 0, 0, 0, 0, 0, 1, 4, 6, 5, 3, 4, 2, 1];
    var prevHourly = [0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 4, 3, 3, 2, 4, 3, 2, 1, 0, 0, 0, 0, 0];
    STATS = { days: days, issues: issueRecs, todayHourly: todayHourly, prevHourly: prevHourly, recentHour: 2, nowHour: 15, nowMin: 5,
      todayStatus: { '미처리': 12, '검토필요': 6, '처리완료': 6, '이슈없음': 2 }, overdueAll: 4 };
    return STATS;
  }

  /* 키워드 관리에서 추가한 유형·키워드는 다른 화면(상담이력 키워드 유형 드롭다운 등)에도 이어서 보이게 한다 */
  var kwTypes = load('kwTypes', KW_TYPES);
  var keywords = load('keywords', KEYWORDS);

  return {
    TODAY: TODAY, NOW: NOW, CENTERS: CENTERS, WORK_TEAMS: WORK_TEAMS, AGENTS: AGENTS, LOGIN: LOGIN,
    CONSULT_TYPES: CONSULT_TYPES, KW_TYPES: kwTypes, BASE_KW_TYPES: BASE_KW_TYPES,
    CALLS: CALLS, TRANSCRIPT: TRANSCRIPT, PRODUCTS: PRODUCTS, KEYWORDS: keywords, SUGGESTIONS: SUGGESTIONS,
    NOTICES: NOTICES, USERS: USERS, ROLES: ROLES, AUDIT: AUDIT,
    load: load, save: save, issues: issues, saveIssue: saveIssue, history: history, addHistory: addHistory,
    issueTypes: issueTypes, owners: owners, settings: settings, saveSettings: saveSettings, stats: stats
  };
})();
