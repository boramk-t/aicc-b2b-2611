/* 상담어드바이저 목업 공통 셸: 아이콘 스프라이트 · LNB(퀵 메뉴 포함) · 상단 바 · 고객 탭. mockup.js보다 먼저 실행합니다. */
(function () {
  'use strict';
  var P = {
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>', x: '<path d="M18 6 6 18M6 6l12 12"/>',
    pin: '<path d="M12 17v5"/><path d="M9 10.8a2 2 0 0 1-1.1 1.8l-1.8.9A2 2 0 0 0 5 15.2V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.8a2 2 0 0 0-1.1-1.8l-1.8-.9A2 2 0 0 1 15 10.8V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/>',
    chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"/>',
    mega: '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
    headset: '<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',
    panel: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
    bm: '<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
    tsearch: '<path d="M21 6H3M10 12H3M10 18H3"/><circle cx="17" cy="15" r="3"/><path d="m21 19-1.9-1.9"/>',
    spark: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 3v4M17 5h4"/>',
    alert: '<path d="m21.7 18-8-14a2 2 0 0 0-3.5 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3"/><path d="M12 9v4M12 17h.01"/>',
    check: '<path d="M20 6 9 17l-5-5"/>', adown: '<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',
    refresh: '<path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M8 16H3v5"/>',
    clip: '<path d="m21.4 11.1-9.2 9.2a6 6 0 0 1-8.5-8.5l8.6-8.6A4 4 0 1 1 18 8.8l-8.6 8.6a2 2 0 0 1-2.8-2.8l8.5-8.5"/>',
    file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>',
    up: '<path d="M7 10v12"/><path d="M15 5.9 14 10h5.8a2 2 0 0 1 1.9 2.6l-2.3 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.8a2 2 0 0 0 1.8-1.1L12 2a3.1 3.1 0 0 1 3 3.9z"/>',
    down: '<path d="M17 14V2"/><path d="M9 18.1 10 14H4.2a2 2 0 0 1-1.9-2.6l2.3-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.8a2 2 0 0 0-1.8 1.1L12 22a3.1 3.1 0 0 1-3-3.9z"/>',
    send: '<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',
    layout: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>',
    pip: '<path d="M21 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4"/><rect x="12" y="13" width="10" height="7" rx="2"/>',
    plus: '<path d="M12 5v14M5 12h14"/>', chevr: '<path d="m9 18 6-6-6-6"/>', grip: '<circle cx="9" cy="6" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="18" r="1"/><circle cx="15" cy="6" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="18" r="1"/>',
    pencil: '<path d="M21.2 6.8a2.8 2.8 0 0 0-4-4L3.8 16.2a2 2 0 0 0-.5.8L2 22l5-1.3a2 2 0 0 0 .8-.5z"/>',
    trash: '<path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
    updown: '<path d="m7 15 5 5 5-5M7 9l5-5 5 5"/>', logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5M21 12H9"/>'
  };
  /* 디자인시스템 아이콘(mockup-icons.js)이 있으면 그 path를 우선 사용합니다 */
  var DS = window.DSICON || {}; Object.keys(DS).forEach(function (k) { P[k] = DS[k]; });
  document.body.insertAdjacentHTML('afterbegin', '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>' +
    Object.keys(P).map(function (k) { return '<symbol id="i-' + k + '" viewBox="0 0 24 24">' + P[k] + '</symbol>'; }).join('') + '</defs></svg>');
  function ic(n, big) { return '<svg class="i' + (big ? '' : ' s') + '" aria-hidden="true"><use href="#i-' + n + '"></use></svg>'; }
  function bd(k, c) { return '<i class="n' + (c ? ' ' + c : '') + '" data-k="' + k + '"></i>'; }
  function flags(el) { var b = (el.dataset.bd || '').split(','); return function (x) { return b.indexOf(x) >= 0; }; }
  window.MKIC = ic;
  document.querySelectorAll('[data-ic]').forEach(function (e) { e.outerHTML = ic(e.dataset.ic, e.hasAttribute('data-big')); });

  /* 퀵 메뉴 팝오버 (와이어프레임 1-2: 등록 현황 3/5 · 링크별 순서 변경·수정·삭제 · [+ 추가]) */
  function qrow(nm) { return '<div class="qrow">' + ic('grip') + '<span class="nm">' + nm + '</span><span class="ib sm" title="수정">' + ic('pencil') + '</span><span class="ib sm" title="삭제">' + ic('trash') + '</span></div>'; }
  var QPOP = '<div class="qpop" style="left:calc(100% + 16px);bottom:0"><div class="qph"><b>퀵 메뉴</b><span class="hint">3/5</span><span class="sp"></span><span class="btn s p">' + ic('plus') + '추가</span></div>' +
    qrow('업무포털') + qrow('상품공시실') + qrow('인사시스템') + (document.body.dataset.portal === 'L' ? '' : bd('65', 'r')) + '</div>';
  var PMENU = '<div class="qpop" style="left:calc(100% + 16px);bottom:0;width:200px;gap:2px;padding:6px"><div class="qrow">' + ic('chat') + '<span class="nm">의견 보내기</span></div><div class="qrow">' + ic('logout') + '<span class="nm">로그아웃</span></div>' + bd('75', 'r') + '</div>';

  /* LNB (I.A 기준). body[data-portal] A=상담사(Agent advisor) · L=관리자/리더(Leader advisor)
     nav 속성: data-on(현재 메뉴 키) · data-qm(퀵 메뉴 팝오버) · data-pm(프로필 메뉴) · data-al(알림 선택) · data-nt(공지사항 선택) · data-bd(qm,nt,al,pf 배지) */
  var PORTAL = document.body.dataset.portal === 'L' ? 'L' : 'A';
  var IA = PORTAL === 'L' ? {
    svc: '리더어드바이저', user: ['박', '박지훈', '리더', '서울센터'], admin: true,
    groups: [
      ['일반', [['ladv', 'dash', '리더 어드바이저']]],
      ['조회', [['mon', 'mon', '실시간 모니터링'], ['hist', 'tsearch', '상담 이력 조회'], ['issue', 'alert', '이슈 콜 목록'], ['bm', 'bm', '상담 어시스트 책갈피']]],
      ['통계 · 분석', [['stats', 'chart', '콜 통계'], ['imp', 'ccheck', '개선 이행', [['impd', '대시보드'], ['impr', '리포트']]]]],
      ['도구', [['kw', 'tag', '키워드 관리'], ['watch', 'phone', '관심 통화 관리'], ['threat', 'shield', '위협 감지 설정'], ['kms', 'book', '지식 관리']]]
    ]
  } : {
    svc: 'AI 상담어드바이저', user: ['이', '이서연', '상담직원', '서울센터'], admin: false,
    groups: [
      ['일반', [['adv', 'headset', '상담 어드바이저']]],
      ['조회', [['hist', 'tsearch', '상담 이력 조회'], ['issue', 'alert', '이슈 콜 목록'], ['bm', 'bm', '상담 어시스트 책갈피']]]
    ]
  };
  var OPS = [['users', '사용자 관리'], ['roles', '역할 관리'], ['audit', '감사로그']];
  document.querySelectorAll('nav.asb').forEach(function (el) {
    var on = el.dataset.on, has = flags(el), d = el.dataset;
    function item(key, icon, label, cls, extra) { return '<div class="nv' + (cls || '') + (on === key ? ' on' : '') + '">' + (icon ? ic(icon, 1) : '') + '<span>' + label + '</span>' + (extra || '') + '</div>'; }
    function subs(list) { return '<div class="nsub">' + list.map(function (s) { return item(s[0], '', s[1]); }).join('') + '</div>'; }
    var h = '<div class="lg"><span class="lgm">D</span><div><b>대신증권</b><span class="hint">' + IA.svc + '</span></div></div>';
    IA.groups.forEach(function (g) {
      h += '<div class="sg">' + g[0] + '</div>';
      g[1].forEach(function (m) { h += item(m[0], m[1], m[2], '', m[3] ? '<span class="sp"></span>' + ic('chev') : '') + (m[3] ? subs(m[3]) : ''); });
    });
    h += '<span class="grow"></span><div class="ft">';
    h += '<div class="nv' + (d.qm ? ' on' : '') + '">' + ic('link', 1) + '<span>퀵 메뉴</span>' + (has('qm') ? bd('65', 'r') : '') + (d.qm ? QPOP : '') + '</div>';
    h += '<div class="nv' + (d.nt ? ' on' : '') + '" title="공지사항 목록으로 이동합니다">' + ic('mega', 1) + '<span>공지사항</span><span class="nvc">2</span>' + (has('nt') ? bd(PORTAL === 'L' ? '12' : '61', 'r') : '') + '</div>';
    if (PORTAL === 'A') h += '<div class="nv' + (d.mm ? ' on' : '') + '" title="스티키 메모가 화면 위에 팝업됩니다">' + ic('pencil', 1) + '<span>메모</span>' + (has('mm') ? bd('44', 'r') : '') + '</div>';
    h += '<div class="nv' + (d.al ? ' on' : '') + '">' + ic('bell', 1) + '<span>알림</span><span class="nvc">3</span>' + (has('al') ? bd(PORTAL === 'L' ? '13' : '61', 'r') : '') + '</div>';
    if (IA.admin) {
      var opsOn = OPS.some(function (o) { return o[0] === on; });
      h += item('ops', 'ucog', '운영 관리', '', '<span class="sp"></span>' + ic('chev'));
      if (opsOn) h += subs(OPS);
    }
    h += '</div>';
    h += '<div class="prof' + (d.pm ? ' on' : '') + '"><span class="av">' + IA.user[0] + '</span><div style="min-width:0"><b>' + IA.user[1] + '</b><span class="hint">' + IA.user[2] + '</span><span class="hint">' + IA.user[3] + '</span></div><span class="sp"></span>' + ic('updown') +
      (has('pf') ? bd('75', 'r') : '') + (d.pm ? PMENU : '') + '</div>';
    el.innerHTML = h;
  });

  /* 상단 바 (DS Common / Header): [LNB 펼치기·접기] | 브레드크럼 | (상담사) 내 상태 … 미니 팝업 · 화면 설정 · 코칭 요청
     data-st(talk|wait|after|none: 상태·상담사 버튼 없음) · data-tm · data-ttl(> 로 구분) · data-bd(st,pip,set,coach). 직접 넣은 버튼은 오른쪽 끝에 붙습니다. */
  document.querySelectorAll('.tnb[data-st]').forEach(function (el) {
    var has = flags(el), st = el.dataset.st, off = st !== 'talk' ? ' ghost' : '';
    var h = '<span class="ib sm hb" title="메뉴 접기/펼치기">' + ic('panel') + '</span><span class="dv sm"></span>';
    h += '<nav class="bc" aria-label="breadcrumb">' + (el.dataset.ttl || '상담 어드바이저').split('>').map(function (x, i, a) { return (i < a.length - 1 ? '<span class="bci">' : '<b class="ttl">') + x.trim() + (i < a.length - 1 ? '</span><span class="bcs">›</span>' : '</b>'); }).join('') + '</nav>';
    if (st !== 'none') {
      var S = { talk: '통화중', wait: '대기중', away: '자리비움', after: '후처리' }[st];
      h += '<span class="dv"></span><div class="mys" title="통화 상태: 통화중 · 대기중 · 자리비움 · 후처리"><span class="st ' + st + '"><i></i>' + S + '</span>' + (el.dataset.tm ? '<span class="tm">' + el.dataset.tm + '</span>' : '') + (has('st') ? bd('34') : '') + '</div>';
    }
    h += '<span class="sp"></span>';
    if (st !== 'none') {
      h += '<span class="btn" title="별도 창으로 열리며 항상 다른 창 위에 표시됩니다">' + ic('pip') + '미니 팝업 열기' + (has('pip') ? bd('62') + bd('60', 'r b') : '') + '</span>';
      h += '<span class="btn">' + ic('layout') + '화면 설정' + (has('set') ? bd('63') : '') + '</span>';
      h += '<span class="btn p' + off + '">' + ic('headset') + '코칭 요청' + (has('coach') ? bd('67') : '') + '</span>';
    }
    el.insertAdjacentHTML('afterbegin', h);
  });
  /* 고객 탭 (와이어프레임 실시간대화 [A2] Tabs): [핀] 고객명 [X] · 최대 5개 */
  document.querySelectorAll('.ctb[data-gen]').forEach(function (el) {
    var has = flags(el), T = [['김민준', 0], ['이지영', 1], ['박민호', 0]];
    el.innerHTML = '<div class="ctabs">' + T.map(function (t, i) {
      return '<span class="ct' + (i === 0 ? ' on' : '') + '"><span class="pn2' + (t[1] ? ' on' : '') + '" title="' + (t[1] ? '고정 해제' : '탭 고정') + '">' + ic('pin') +
        (i === 1 && has('pin') ? bd('31', 'r') : '') + '</span><span>' + t[0] + '</span><span class="pn2" title="탭 닫기">' + ic('x') + '</span></span>';
    }).join('') + '</div>';
  });
})();
