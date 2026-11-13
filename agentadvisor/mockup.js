/* 넘버링 배지 렌더링과 화면별·전체 기능 매핑표 생성 */
(function () {
  'use strict';
  var SPEC = window.SPEC || [], byK = {};
  SPEC.forEach(function (s, i) { s.i = i; byK[s.k] = s; });
  var portal = document.body.dataset.portal;
  var other = portal === 'A'
    ? { href: '../leaderadvisor/' + encodeURIComponent('목업 · 대신증권 AI 리더어드바이저.html'), name: '리더어드바이저 목업' }
    : { href: '../agentadvisor/' + encodeURIComponent('목업 · 대신증권 AI 상담어드바이저.html'), name: '상담어드바이저 목업' };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function badge(s) { return '<i class="n' + (s.be ? ' be' : '') + '">' + esc(s.no) + '</i>'; }

  /* 배지 */
  var missing = [];
  document.querySelectorAll('.n[data-k]').forEach(function (el) {
    var s = byK[el.dataset.k];
    if (!s) { missing.push(el.dataset.k); el.textContent = '?'; return; }
    el.textContent = s.no;
    el.title = s.no + '. ' + s.fn;
    if (s.be) el.classList.add('be');
    var p = el.parentElement;
    if (p && getComputedStyle(p).position === 'static' && !el.classList.contains('in')) p.style.position = 'relative';
  });
  if (missing.length && window.console) console.warn('정의되지 않은 번호:', missing);

  /* 넘버링 켜기/끄기: 오른쪽 아래 버튼 또는 N 키. 상태는 브라우저에 저장합니다. 매핑표의 번호는 항상 보입니다. */
  var KEY = 'mockup-numbering';
  var tg = document.createElement('button');
  tg.type = 'button'; tg.className = 'nbtg'; tg.title = '화면 위 넘버링 배지를 켜거나 끕니다 (N 키)';
  document.body.appendChild(tg);
  function setNb(on) {
    document.body.classList.toggle('nb-off', !on);
    tg.innerHTML = '<span class="sw' + (on ? ' on' : '') + '"></span>넘버링 ' + (on ? '켜짐' : '꺼짐') + ' <kbd>N</kbd>';
    tg.setAttribute('aria-pressed', on ? 'true' : 'false');
    try { localStorage.setItem(KEY, on ? '1' : '0'); } catch (e) { /* 저장 불가 환경은 무시 */ }
  }
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) { /* 무시 */ }
  setNb(saved !== '0');
  tg.addEventListener('click', function () { setNb(document.body.classList.contains('nb-off')); });
  document.addEventListener('keydown', function (e) {
    var tag = (e.target && e.target.tagName) || '';
    if ((e.key === 'n' || e.key === 'N') && !e.ctrlKey && !e.metaKey && !e.altKey && !/INPUT|TEXTAREA|SELECT/.test(tag)) setNb(document.body.classList.contains('nb-off'));
  });

  /* 화면별 매핑표 */
  var where = {};
  document.querySelectorAll('section.screen[id]').forEach(function (sec) {
    var cap = sec.querySelector('.screen-caption .tag');
    var title = (sec.dataset.title || (cap ? cap.textContent : sec.id));
    var keys = [];
    sec.querySelectorAll('.n[data-k]').forEach(function (el) { if (keys.indexOf(el.dataset.k) < 0 && byK[el.dataset.k]) keys.push(el.dataset.k); });
    keys.sort(function (a, b) { return byK[a].i - byK[b].i; });
    keys.forEach(function (k) { (where[k] = where[k] || []).push({ id: sec.id, title: title }); });
    var box = sec.querySelector('.map');
    if (!box) { box = document.createElement('div'); box.className = 'map'; sec.appendChild(box); }
    box.innerHTML = '<h3>넘버링 매핑 (' + keys.length + '건)</h3><table class="mapt"><tr><th>No</th><th>대분류</th><th>중분류</th><th>표준 기능명</th><th>상세 기능 설명</th><th>비고</th></tr>' +
      keys.map(function (k) { var s = byK[k]; return '<tr><td class="no">' + badge(s) + '</td><td>' + esc(s.d1) + '</td><td>' + esc(s.d2) + '</td><td><b>' + esc(s.fn) + '</b></td><td>' + esc(s.ds) + '</td><td>' + esc(s.nt || (s.be ? '분석 엔진(BE) 처리 결과 표시' : '')) + '</td></tr>'; }).join('') + '</table>';
  });

  /* 전체 매핑표 */
  var all = document.getElementById('all-map');
  if (all) {
    var shown = 0, excluded = 0;
    all.innerHTML = '<h3>전체 기능 목록 · 목업 위치</h3><table class="mapt"><tr><th>No</th><th>대분류</th><th>중분류</th><th>표준 기능명</th><th>상세 기능 설명</th><th>목업 위치</th></tr>' +
      SPEC.map(function (s) {
        var w = where[s.k];
        if (w) shown++;
        if (!w && s.x) excluded++;
        var cell = w ? w.map(function (x) { return '<a href="#' + x.id + '">' + esc(x.title) + '</a>'; }).join('<br>')
          : s.x ? '목업 제외 · ' + esc(s.x) : '<a href="' + other.href + '">' + other.name + '</a>';
        return '<tr' + (w ? '' : ' class="other"') + '><td class="no">' + badge(s) + '</td><td>' + esc(s.d1) + '</td><td>' + esc(s.d2) + '</td><td><b>' + esc(s.fn) + '</b></td><td>' + esc(s.ds) + '</td><td class="where">' + cell + '</td></tr>';
      }).join('') + '</table>';
    var cnt = document.getElementById('cover-count');
    if (cnt) cnt.textContent = '이 목업에 붙인 기능 ' + shown + '건 / 전체 ' + SPEC.length + '건 (목업 제외 ' + excluded + '건 · 나머지는 ' + other.name + '에 있습니다)';
  }
  /* 영역 배치 좌우 바꾸기: 화면 설정 [⇄] 클릭 또는 슬롯 끌어 놓기 → 같은 화면의 실시간 대화 · 상담 어시스트 좌우 교체 */
  function swapArea(box) {
    var b = box.querySelectorAll('.slot b'); if (b.length < 2) return;
    var x = b[0].textContent; b[0].textContent = b[1].textContent; b[1].textContent = x;
    var ab = box.closest('.ab'); if (ab) ab.classList.toggle('swp-on');
  }
  document.querySelectorAll('.spop .slots').forEach(function (box) {
    var sw = box.querySelector('.swp'); if (sw) sw.addEventListener('click', function () { swapArea(box); });
    box.querySelectorAll('.slot').forEach(function (s) {
      s.addEventListener('dragstart', function (e) { e.dataTransfer.setData('text/plain', 'slot'); s.classList.add('drag'); });
      s.addEventListener('dragend', function () { s.classList.remove('drag'); });
      s.addEventListener('dragover', function (e) { e.preventDefault(); s.classList.add('over'); });
      s.addEventListener('dragleave', function () { s.classList.remove('over'); });
      s.addEventListener('drop', function (e) { e.preventDefault(); s.classList.remove('over'); if (!s.classList.contains('drag')) swapArea(box); });
    });
  });
})();
