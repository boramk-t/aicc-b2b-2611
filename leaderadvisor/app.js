/* 대신증권 AI 상담어드바이저 · 리더어드바이저 스토리보드 프로토타입 공통 스크립트
 * - 포털(상담/리더)은 폴더 경로로 판단한다. agentadvisor → 상담어드바이저, leaderadvisor → 리더어드바이저
 * - LNB, 프로토타입 보기 역할, 모달, 토스트, 정렬·페이지 크기, 다중 선택 드롭다운, 기간 입력을 제공한다.
 */
window.UI = (function () {
  'use strict';
  var body = document.body;
  var path = decodeURIComponent(location.pathname).toLowerCase();
  var PORTAL = path.indexOf('leaderadvisor') >= 0 ? 'leader' : (path.indexOf('agentadvisor') >= 0 ? 'agent' : (body.dataset.portal || 'agent'));
  body.dataset.portal = PORTAL;
  var PAGE = body.dataset.page || '';
  var PORTAL_NAME = PORTAL === 'leader' ? '리더어드바이저' : '상담어드바이저';
  document.title = '대신증권 AI ' + PORTAL_NAME + ' · ' + (body.dataset.title || '');
  var TODAY = window.MOCK ? MOCK.TODAY : '2026.11.07';
  var params = new URLSearchParams(location.search);

  /* ---------- 프로토타입 보기 역할 ---------- */
  var ROLE_OPTS = PORTAL === 'leader' ? [['leader', '리더'], ['admin', '관리자']] : [['agent', '상담사'], ['admin', '관리자']];
  var ROLE_KEY = 'daishin-advisor-proto:role-' + PORTAL;
  var role = null;
  try { role = localStorage.getItem(ROLE_KEY); } catch (e) { role = null; }
  var asRole = params.get('as');
  if (ROLE_OPTS.some(function (o) { return o[0] === asRole; })) { role = asRole; try { localStorage.setItem(ROLE_KEY, role); } catch (e) { /* 저장 불가 */ } }
  if (!ROLE_OPTS.some(function (o) { return o[0] === role; })) role = 'admin';
  body.dataset.role = role;
  var LOGIN = window.MOCK ? MOCK.LOGIN[role] : { name: '-', center: '-', team: '-', roleName: '-' };

  /* ---------- 메뉴 ---------- */
  var ALL = ['agent', 'leader', 'admin'];
  var MENU = [
    { key: 'monitor', label: '실시간 상태 모니터링', href: 'monitoring.html', leaderOnly: true, roles: ['leader', 'admin'] },
    { key: 'history-group', label: '상담이력 조회', children: [
      { key: 'history', label: '상담이력', href: 'history-list.html', pages: ['history', 'history-detail'], roles: ALL },
      { key: 'issue', label: '이슈 콜 목록', href: 'issue-list.html', pages: ['issue', 'issue-settings'], roles: ALL }
    ] },
    { key: 'keyword', label: '키워드 관리', href: 'keyword.html', roles: ['leader', 'admin'] },
    { key: 'stats', label: '콜 통계', href: 'call-stats.html', roles: ['admin'] }
  ];
  var COMMON = [
    { key: 'notice', label: '공지사항', href: 'notice.html', pages: ['notice', 'notice-detail', 'notice-form'], roles: ALL },
    { key: 'users', label: '사용자 관리', href: 'users.html', roles: ['admin'] },
    { key: 'roles', label: '역할 관리', href: 'roles.html', pages: ['roles', 'role-form'], roles: ['admin'] },
    { key: 'audit', label: '감사로그', href: 'audit.html', roles: ['admin'] }
  ];
  var PAGE_ROLES = { 'issue-settings': ['leader', 'admin'], 'notice-form': ['admin'], 'role-form': ['admin'], index: ALL };

  function flat() {
    var out = [];
    MENU.concat(COMMON).forEach(function (m) { if (m.children) out = out.concat(m.children); else out.push(m); });
    return out;
  }
  function activeKey() {
    if (PAGE === 'history-detail' && params.get('from') === 'issue') return 'issue';
    var hit = flat().filter(function (m) { return m.key === PAGE || (m.pages && m.pages.indexOf(PAGE) >= 0); })[0];
    return hit ? hit.key : '';
  }
  function visibleItem(m) {
    if (m.leaderOnly && PORTAL !== 'leader') return false;
    return m.roles.indexOf(role) >= 0;
  }
  function pageAllowed() {
    if (PAGE_ROLES[PAGE]) return PAGE_ROLES[PAGE].indexOf(role) >= 0 && !(PAGE === 'issue-settings' && PORTAL !== 'leader');
    var hit = flat().filter(function (m) { return m.key === PAGE || (m.pages && m.pages.indexOf(PAGE) >= 0); })[0];
    return hit ? visibleItem(hit) : true;
  }

  function itemHtml(m, act) {
    return '<a class="sb-item' + (m.key === act ? ' active' : '') + '" href="' + m.href + '"><span class="dot"></span>' + esc(m.label) + '</a>';
  }
  function renderSidebar() {
    var mount = document.getElementById('sidebar');
    if (!mount) return;
    var act = activeKey();
    var work = MENU.map(function (m) {
      if (m.children) {
        var kids = m.children.filter(visibleItem);
        if (!kids.length) return '';
        var open = kids.some(function (k) { return k.key === act; });
        return '<div class="sb-item parent' + (open ? ' open' : '') + '" data-toggle-sub><span class="dot"></span>' + esc(m.label) + '<span class="caret">▾</span></div>' +
          '<div class="sb-sub' + (open ? ' open' : '') + '">' + kids.map(function (k) { return itemHtml(k, act); }).join('') + '</div>';
      }
      return visibleItem(m) ? itemHtml(m, act) : '';
    }).join('');
    var common = COMMON.filter(visibleItem).map(function (m) { return itemHtml(m, act); }).join('');
    var other = PORTAL === 'leader' ? ['../agentadvisor/index.html', '상담어드바이저 화면으로 이동 →'] : ['../leaderadvisor/index.html', '리더어드바이저 화면으로 이동 →'];
    var html =
      '<aside class="sidebar">' +
        '<a class="sb-brand" href="index.html"><span class="sb-logo">D</span><b>' + PORTAL_NAME + '</b></a>' +
        '<div class="sb-scroll"><div class="sb-section">업무</div>' + work + '</div>' +
        '<div class="sb-foot">' +
          '<div class="sb-section" style="padding-top:2px">공통</div>' + common +
          '<div class="sb-user"><span class="ava"></span><div><div style="font-size:13px;font-weight:600">' + esc(LOGIN.name) + '</div><small>' + esc(LOGIN.center + ' · ' + LOGIN.team + ' (' + LOGIN.roleName + ')') + '</small></div></div>' +
          '<div class="sb-role"><label for="proto-role">프로토타입 보기 역할</label><select id="proto-role">' +
            ROLE_OPTS.map(function (o) { return '<option value="' + o[0] + '"' + (o[0] === role ? ' selected' : '') + '>' + o[1] + '</option>'; }).join('') +
          '</select></div>' +
          '<a class="sb-portal" href="' + other[0] + '">' + other[1] + '</a>' +
        '</div>' +
      '</aside>';
    mount.outerHTML = html;
    var sel = document.getElementById('proto-role');
    sel.addEventListener('change', function () { try { localStorage.setItem(ROLE_KEY, sel.value); } catch (e) { /* 저장 불가 */ } location.reload(); });
    $$('[data-toggle-sub]').forEach(function (p) {
      p.addEventListener('click', function () { p.classList.toggle('open'); p.nextElementSibling.classList.toggle('open'); });
    });
  }

  /* ---------- 유틸 ---------- */
  function $(s, el) { return (el || document).querySelector(s); }
  function $$(s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
  }
  function parseD(s) { var p = String(s).slice(0, 10).split('.'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function fmtD(d) { return d.getFullYear() + '.' + String(d.getMonth() + 1).padStart(2, '0') + '.' + String(d.getDate()).padStart(2, '0'); }
  function validD(s) { return /^\d{4}\.\d{2}\.\d{2}$/.test(s) && fmtD(parseD(s)) === s; }
  function addDays(s, n) { var d = parseD(s); d.setDate(d.getDate() + n); return fmtD(d); }
  function diffDays(a, b) { return Math.round((parseD(b) - parseD(a)) / 86400000); }
  /* 이슈 기한 (달력 기준): 일=당일, 주=그 주 일요일(월~일), 월=그 달 말일, 연=그 해 12월 31일 */
  function dueDate(reg, unit) {
    var d = parseD(reg);
    if (unit === '일') return fmtD(d);
    if (unit === '주') { d.setDate(d.getDate() + (7 - d.getDay()) % 7); return fmtD(d); }
    if (unit === '월') return fmtD(new Date(d.getFullYear(), d.getMonth() + 1, 0));
    if (unit === '연') return d.getFullYear() + '.12.31';
    return '-';
  }
  function isOpen(s) { return s === '미처리' || s === '검토필요'; }
  function isOverdue(it) { return isOpen(it.status) && parseD(TODAY) > parseD(dueDate(it.reg, it.due)); }
  function toSec(hms) { if (!hms) return 0; var p = hms.split(':').map(Number); return p.length === 3 ? p[0] * 3600 + p[1] * 60 + p[2] : p[0] * 60 + p[1]; }
  function hms(sec) { sec = Math.round(sec); var h = Math.floor(sec / 3600), m = Math.floor(sec % 3600 / 60), s = sec % 60; return [h, m, s].map(function (x) { return String(x).padStart(2, '0'); }).join(':'); }
  function mmss(sec) { sec = Math.max(0, Math.round(sec)); return sec >= 3600 ? hms(sec) : String(Math.floor(sec / 60)).padStart(2, '0') + ':' + String(sec % 60).padStart(2, '0'); }
  function n(v) { return Number(v).toLocaleString('ko-KR'); }

  var ST_CLS = { '미처리': 'st-open', '검토필요': 'st-review', '처리완료': 'st-done', '이슈없음': 'st-none' };
  var STATUSES = ['미처리', '검토필요', '처리완료', '이슈없음'];
  var DUE_UNITS = ['일', '주', '월', '연'];
  function stBadge(s) { return '<span class="bdg ' + (ST_CLS[s] || 'secondary') + '">' + esc(s) + '</span>'; }
  function kwClass(t) { return t === '상품' ? 't-상품' : t === '리스크' ? 't-리스크' : t === '제외 키워드' ? 't-제외' : t === '이슈' ? 't-이슈' : 't-추가'; }
  function kwChip(o) {
    return '<span class="kw ' + kwClass(o.t) + '" title="' + esc(o.t === '이슈' ? '이슈 키워드 (BE 태깅)' : '키워드 유형: ' + o.t) + '">' + esc(o.k) +
      (o.t === '이슈' ? '<span class="issue-tag">이슈</span>' : '') + '</span>';
  }
  function kwChips(list, max) {
    if (!list || !list.length) return '-';
    max = max || 3;
    var h = list.slice(0, max).map(kwChip).join('');
    if (list.length > max) h += ' <span class="more" title="' + esc(list.map(function (x) { return x.k; }).join(', ')) + '">+' + (list.length - max) + '</span>';
    return h;
  }
  function moreList(arr, max, empty) {
    if (!arr || !arr.length) return empty == null ? '-' : empty;
    var h = arr.slice(0, max).map(esc).join(', ');
    if (arr.length > max) h += ' <span class="more" title="' + esc(arr.join('\n')) + '">+' + (arr.length - max) + '</span>';
    return h;
  }

  /* ---------- 토스트·모달 ---------- */
  function toast(msg) {
    var w = $('.toast-wrap');
    if (!w) { w = document.createElement('div'); w.className = 'toast-wrap'; body.appendChild(w); }
    var t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; w.appendChild(t);
    setTimeout(function () { t.remove(); }, 2600);
  }
  function openModal(id) {
    var m = typeof id === 'string' ? document.getElementById(id) : id;
    if (!m) return;
    m.hidden = false;
    var f = m.querySelector('input:not([type=hidden]):not([type=checkbox]):not([type=radio]):not([disabled]):not([readonly]), textarea:not([disabled])');
    if (f) setTimeout(function () { f.focus(); }, 30);
  }
  function closeModal(id) { var m = typeof id === 'string' ? document.getElementById(id) : id; if (m) m.hidden = true; }
  function dialog(o) {
    var ov = document.createElement('div');
    ov.className = 'modal-overlay';
    ov.innerHTML = '<div class="modal" role="dialog" aria-modal="true"><h3>' + esc(o.title) + '</h3>' +
      (o.desc ? '<p class="desc">' + esc(o.desc) + '</p>' : '') + (o.html || '') +
      '<div class="modal-actions">' + (o.cancel === null ? '' : '<button class="btn" data-x>' + esc(o.cancel || '취소') + '</button>') +
      '<button class="btn ' + (o.danger ? 'danger' : 'pri') + '" data-ok>' + esc(o.ok || '확인') + '</button></div></div>';
    body.appendChild(ov);
    ov.querySelector('[data-ok]').focus();
    ov.addEventListener('click', function (e) {
      if (e.target === ov || e.target.hasAttribute('data-x')) ov.remove();
      else if (e.target.hasAttribute('data-ok')) { ov.remove(); if (o.onOk) o.onOk(); }
    });
  }
  document.addEventListener('click', function (e) {
    var op = e.target.closest('[data-open]');
    if (op) { openModal(op.getAttribute('data-open')); return; }
    var cl = e.target.closest('[data-close]');
    if (cl) { closeModal(cl.closest('.modal-overlay')); return; }
    if (e.target.classList && e.target.classList.contains('modal-overlay') && e.target.id) closeModal(e.target);
    $$('.ms.open').forEach(function (m) { if (!m.contains(e.target)) m.classList.remove('open'); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var open = $$('.modal-overlay').filter(function (m) { return !m.hidden; });
    var top = open[open.length - 1];
    if (top) { if (top.id) top.hidden = true; else top.remove(); }
    $$('.ms.open').forEach(function (m) { m.classList.remove('open'); });
  });

  /* ---------- 다중 선택 드롭다운 ---------- */
  function initMs(root) { $$('.ms[data-options]', root).forEach(buildMs); }
  function buildMs(el) {
    var opts = (el.dataset.options || '').split('|').filter(Boolean);
    el.innerHTML = '<button type="button" class="ms-btn"></button><div class="ms-panel"></div>';
    setMsOptions(el, opts, []);
    el.querySelector('.ms-btn').addEventListener('click', function (e) {
      e.stopPropagation();
      $$('.ms.open').forEach(function (o) { if (o !== el) o.classList.remove('open'); });
      el.classList.toggle('open');
    });
    el.querySelector('.ms-panel').addEventListener('change', function () { msLabel(el); el.dispatchEvent(new CustomEvent('ms-change', { bubbles: true })); });
  }
  function setMsOptions(el, opts, keep) {
    var panel = el.querySelector('.ms-panel');
    keep = keep || msValue(el);
    panel.innerHTML = opts.length ? opts.map(function (o) {
      return '<label><input type="checkbox" value="' + esc(o) + '"' + (keep.indexOf(o) >= 0 ? ' checked' : '') + '> ' + esc(o) + '</label>';
    }).join('') : '<div class="hint" style="padding:6px 8px">선택할 항목이 없습니다.</div>';
    msLabel(el);
  }
  function msValue(el) { return $$('.ms-panel input:checked', el).map(function (i) { return i.value; }); }
  function setMsValue(el, vals) { $$('.ms-panel input', el).forEach(function (i) { i.checked = vals.indexOf(i.value) >= 0; }); msLabel(el); }
  function msLabel(el) {
    var v = msValue(el), b = el.querySelector('.ms-btn');
    b.textContent = !v.length ? (el.dataset.all || '전체') : (v.length === 1 ? v[0] : v[0] + ' 외 ' + (v.length - 1));
  }
  /* 센터 → 팀 연동: 센터를 바꾸면 범위를 벗어난 팀 선택은 해제 */
  function linkCenterTeam(cEl, tEl) {
    function teams() {
      var cs = msValue(cEl); if (!cs.length) cs = Object.keys(MOCK.CENTERS);
      return cs.reduce(function (a, c) { return a.concat(MOCK.CENTERS[c] || []); }, []);
    }
    setMsOptions(tEl, teams(), []);
    cEl.addEventListener('ms-change', function () { var t = teams(); setMsOptions(tEl, t, msValue(tEl).filter(function (x) { return t.indexOf(x) >= 0; })); });
  }

  /* ---------- 기간 입력 ---------- */
  function dateRange(el, defDays) {
    var ins = $$('input', el);
    function set(d) { ins[0].value = addDays(TODAY, -d); ins[1].value = TODAY; }
    el.addEventListener('click', function (e) { var q = e.target.getAttribute('data-q'); if (q != null) set(+q); });
    if (defDays != null) set(defDays);
    return {
      get: function () { return [ins[0].value.trim(), ins[1].value.trim()]; },
      reset: function () { set(defDays); },
      set: function (a, b) { ins[0].value = a; ins[1].value = b; },
      check: function () {
        var a = ins[0].value.trim(), b = ins[1].value.trim();
        if (!a || !b) return '조회 기간을 선택해 주세요.';
        if (!validD(a) || !validD(b)) return '날짜는 yyyy.mm.dd 형식으로 입력해 주세요.';
        if (parseD(a) > parseD(b)) return '종료일은 시작일 이후로 선택해 주세요.';
        if (diffDays(a, b) > 89) return '조회 기간은 최대 90일까지 선택할 수 있습니다. (최대 기간 확인 필요)';
        return '';
      }
    };
  }
  function drHtml() {
    return '<div class="dr" data-dr><input class="inp-s" placeholder="yyyy.mm.dd" aria-label="시작일"> ~ <input class="inp-s" placeholder="yyyy.mm.dd" aria-label="종료일">' +
      '<span class="quick"><button type="button" class="btn xs" data-q="0">오늘</button><button type="button" class="btn xs" data-q="6">최근 7일</button><button type="button" class="btn xs" data-q="29">최근 30일</button></span></div>';
  }
  function showErr(root, msg) { var e = $('.filter-err', root); if (e) { e.textContent = msg || ''; e.style.display = msg ? 'block' : 'none'; } }

  /* ---------- 표: 정렬 + 페이지 크기 + 페이지네이션 ---------- */
  function num(s) { var t = String(s).replace(/,/g, ''); return /^-?\d+(\.\d+)?(건|%|일|명)?$/.test(t) ? parseFloat(t) : null; }
  function cellVal(td) { if (!td) return ''; return td.dataset.sort != null ? td.dataset.sort : td.textContent.trim(); }
  function cmp(a, b) {
    var na = num(a), nb = num(b);
    if (na !== null && nb !== null) return na - nb;
    var ea = a === '-' || a === '' || a === '미지정', eb = b === '-' || b === '' || b === '미지정';
    if (ea && !eb) return 1; if (eb && !ea) return -1;
    return a.localeCompare(b, 'ko');
  }
  function table(tbl, o) {
    o = o || {};
    var st = { page: 1, size: 20, key: null, dir: null };
    function idx(th) { return Array.prototype.indexOf.call(th.parentNode.children, th); }
    $$('th.sortable', tbl).forEach(function (th) {
      if (!th.querySelector('.si')) th.insertAdjacentHTML('beforeend', '<span class="si">⇅</span>');
      if (th.dataset.default) { st.key = idx(th); st.dir = th.dataset.default; }
      th.addEventListener('click', function () {
        var i = idx(th);
        if (st.key === i) st.dir = st.dir === 'asc' ? 'desc' : 'asc'; else { st.key = i; st.dir = 'asc'; }
        st.page = 1; apply();
      });
    });
    if (o.sizeSel) { st.size = +o.sizeSel.value; o.sizeSel.addEventListener('change', function () { st.size = +o.sizeSel.value; st.page = 1; apply(); }); }
    if (o.pager) o.pager.addEventListener('click', function (e) { var p = e.target.getAttribute('data-p'); if (p) { st.page = +p; apply(); } });
    function apply() {
      var tb = tbl.tBodies[0];
      var rows = $$('tr', tb);
      var pinned = rows.filter(function (r) { return r.classList.contains('sum-row-tr'); });
      var data = rows.filter(function (r) { return !r.classList.contains('sum-row-tr') && !r.classList.contains('empty-row'); });
      $$('th.sortable', tbl).forEach(function (th) {
        var on = idx(th) === st.key; th.classList.remove('asc', 'desc');
        th.querySelector('.si').textContent = on ? (st.dir === 'asc' ? '▲' : '▼') : '⇅';
        if (on) th.classList.add(st.dir);
      });
      if (st.key != null && data.length) {
        data.sort(function (a, b) { var r = cmp(cellVal(a.cells[st.key]), cellVal(b.cells[st.key])); return st.dir === 'asc' ? r : -r; });
        pinned.concat(data).forEach(function (r) { tb.appendChild(r); });
      }
      var pages = Math.max(1, Math.ceil(data.length / st.size));
      if (st.page > pages) st.page = pages;
      data.forEach(function (r, i) { r.style.display = (o.noPaging || (i >= (st.page - 1) * st.size && i < st.page * st.size)) ? '' : 'none'; });
      if (o.totalEl) o.totalEl.textContent = '총 ' + n(data.length) + '건';
      if (o.pager) {
        var h = '<span>' + st.page + ' / ' + pages + ' 페이지</span><span class="nav">' +
          '<span data-p="1" title="처음">«</span><span data-p="' + Math.max(1, st.page - 1) + '" title="이전">‹</span>';
        for (var p = 1; p <= pages; p++) h += '<span data-p="' + p + '"' + (p === st.page ? ' class="on"' : '') + '>' + p + '</span>';
        h += '<span data-p="' + Math.min(pages, st.page + 1) + '" title="다음">›</span><span data-p="' + pages + '" title="마지막">»</span></span>';
        o.pager.innerHTML = h;
      }
      if (o.onApply) o.onApply();
    }
    apply();
    return { refresh: function () { st.page = 1; apply(); }, apply: apply, state: st };
  }
  function selection(tbl, btns, onChange) {
    function vis(c) { return c.closest('tr').style.display !== 'none'; }
    function upd() {
      var sel = $$('tbody input.chk-row:checked', tbl);
      (btns || []).forEach(function (b) { if (b) b.disabled = !sel.length; });
      var all = $('thead input.chk-all', tbl), rows = $$('tbody input.chk-row', tbl).filter(vis);
      if (all) all.checked = rows.length > 0 && rows.every(function (c) { return c.checked; });
      if (onChange) onChange(sel.length);
    }
    tbl.addEventListener('change', function (e) {
      if (e.target.classList.contains('chk-all')) $$('tbody input.chk-row', tbl).filter(vis).forEach(function (c) { c.checked = e.target.checked; });
      if (e.target.classList.contains('chk-all') || e.target.classList.contains('chk-row')) upd();
    });
    upd();
    return {
      ids: function () { return $$('tbody input.chk-row:checked', tbl).map(function (c) { return c.value; }); },
      update: upd,
      clear: function () { $$('input.chk-row, input.chk-all', tbl).forEach(function (c) { c.checked = false; }); upd(); }
    };
  }
  function emptyRow(cols, msg) { return '<tr class="empty-row"><td colspan="' + cols + '">' + esc(msg) + '</td></tr>'; }
  function interactive(el) { return !!el.closest('input, select, button, a, label, textarea, .ms'); }

  /* ---------- 탭 ---------- */
  function selectTab(root, key) {
    $$('.tab[data-tab]', root).forEach(function (t) { t.classList.toggle('on', t.dataset.tab === key); });
    $$('.tabpane[data-pane]', root).forEach(function (p) { p.classList.toggle('on', p.dataset.pane === key); });
  }
  function tabs(root, onChange) {
    root.addEventListener('click', function (e) {
      var t = e.target.closest('.tab[data-tab]');
      if (!t || !root.contains(t)) return;
      selectTab(root, t.dataset.tab);
      if (onChange) onChange(t.dataset.tab);
    });
  }

  /* ---------- 칩 입력 ---------- */
  function chipInput(root, o) {
    o = o || {};
    var list = [], inp = $('input', root), btn = $('[data-add]', root), box = $('.chips', root), err = $('.err', root);
    function render() {
      box.innerHTML = list.map(function (k, i) { return '<span class="chip">' + esc(k) + '<button type="button" data-rm="' + i + '" aria-label="' + esc(k) + ' 빼기">×</button></span>'; }).join('');
      if (o.onChange) o.onChange(list);
    }
    function add() {
      var v = inp.value.trim();
      if (!v) return;
      if (list.indexOf(v) >= 0) { err.textContent = o.dupMsg || '이미 등록된 연관 키워드입니다.'; return; }
      if (o.max && list.length >= o.max) { err.textContent = '연관 키워드는 상품당 최대 ' + o.max + '개까지 등록할 수 있습니다. (최대 개수 확인 필요)'; return; }
      err.textContent = ''; list.push(v); inp.value = ''; render();
    }
    btn.addEventListener('click', add);
    inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); add(); } });
    box.addEventListener('click', function (e) { var i = e.target.getAttribute('data-rm'); if (i != null) { list.splice(+i, 1); render(); } });
    return {
      get: function () { return list.slice(); },
      set: function (a) { list = (a || []).slice(); err.textContent = ''; inp.value = ''; render(); },
      disable: function (d) { inp.disabled = d; btn.disabled = d; }
    };
  }

  /* ---------- 공통 화면 요소 ---------- */
  function decorateTopbar() {
    var bar = $('.topbar');
    if (!bar) return;
    var act = $('.topbar-actions', bar);
    if (!act) { act = document.createElement('div'); act.className = 'topbar-actions'; bar.appendChild(act); }
    act.insertAdjacentHTML('beforeend', '<span class="hint" style="margin:0">목업 기준일 ' + TODAY + ' · 보기 역할: ' + esc(LOGIN.roleName) + '</span>');
  }
  var denied = false;
  function guard() {
    if (pageAllowed()) return;
    denied = true;
    var leaderOnly = PORTAL !== 'leader' && (PAGE === 'monitor' || PAGE === 'issue-settings');
    var c = $('.content');
    if (c) c.innerHTML = '<div class="placeholder"><div class="pi">!</div><h2>접근 권한이 없습니다.</h2><p>' +
      (leaderOnly ? '리더어드바이저에서만 제공하는 화면입니다.' : '현재 보기 역할(' + esc(LOGIN.roleName) + ')에는 이 화면의 접근 권한이 없습니다. 왼쪽 아래 \'프로토타입 보기 역할\'을 바꿔 확인할 수 있습니다.') + '</p></div>';
  }

  /* ---------- 화면 이동 후 토스트, 목록 상태 유지 ---------- */
  var SS = 'daishin-advisor-proto:' + PORTAL + ':';
  function flash(msg) { try { sessionStorage.setItem(SS + 'flash', msg); } catch (e) { toast(msg); } }
  function showFlash() {
    var m = null;
    try { m = sessionStorage.getItem(SS + 'flash'); sessionStorage.removeItem(SS + 'flash'); } catch (e) { m = null; }
    if (m) toast(m);
  }
  function stash(key, val) { try { sessionStorage.setItem(SS + 'list-' + key, JSON.stringify(val)); } catch (e) { /* 저장 불가 */ } }
  function unstash(key) { try { return JSON.parse(sessionStorage.getItem(SS + 'list-' + key) || 'null'); } catch (e) { return null; } }
  function formState(root) {
    var s = {};
    $$('input[id], select[id]', root).forEach(function (el) { s[el.id] = el.type === 'checkbox' ? el.checked : el.value; });
    $$('.ms[id]', root).forEach(function (el) { s[el.id] = msValue(el); });
    return s;
  }
  function restoreForm(root, s) {
    if (!s) return;
    $$('.ms[id]', root).forEach(function (el) {
      if (!s[el.id]) return;
      setMsValue(el, s[el.id]);
      el.dispatchEvent(new CustomEvent('ms-change', { bubbles: true }));
    });
    $$('input[id], select[id]', root).forEach(function (el) {
      if (!(el.id in s)) return;
      if (el.type === 'checkbox') el.checked = !!s[el.id]; else el.value = s[el.id];
      el.dispatchEvent(new Event('change'));
    });
  }
  /* 상세에서 [목록으로]로 돌아갈 때 표시: 목록 화면이 저장해 둔 상태를 복원한다 */
  function markRestore(key) { try { sessionStorage.setItem(SS + 'restore-' + key, '1'); } catch (e) { /* 저장 불가 */ } }
  /* 목록 화면: 상세로 이동할 때 필터·정렬·페이지 크기·페이지 번호를 저장하고, 돌아오면 복원한다 */
  function keepList(key, root, dr, sizeSel) {
    var flag = null;
    try { flag = sessionStorage.getItem(SS + 'restore-' + key); sessionStorage.removeItem(SS + 'restore-' + key); } catch (e) { flag = null; }
    var saved = flag ? unstash(key) : null;
    return {
      saved: saved,
      restoreForm: function () {
        if (!saved) return;
        restoreForm(root, saved.f);
        if (saved.dr && dr) dr.set(saved.dr[0], saved.dr[1]);
        if (sizeSel && saved.size) sizeSel.value = saved.size;
      },
      restoreTable: function (ctl) {
        if (!saved || !saved.t || !ctl) return;
        ctl.state.key = saved.t.key; ctl.state.dir = saved.t.dir; ctl.state.page = saved.t.page; ctl.apply();
      },
      save: function (ctl) {
        stash(key, { f: formState(root), dr: dr ? dr.get() : null, size: sizeSel ? sizeSel.value : null,
          t: ctl ? { key: ctl.state.key, dir: ctl.state.dir, page: ctl.state.page } : null });
      }
    };
  }

  renderSidebar();
  decorateTopbar();
  guard();
  showFlash();

  return {
    PORTAL: PORTAL, PAGE: PAGE, role: role, LOGIN: LOGIN, TODAY: TODAY, params: params,
    canEdit: role !== 'agent', isAdmin: role === 'admin', isLeader: PORTAL === 'leader',
    STATUSES: STATUSES, DUE_UNITS: DUE_UNITS,
    $: $, $$: $$, esc: esc, n: n, parseD: parseD, fmtD: fmtD, validD: validD, addDays: addDays, diffDays: diffDays,
    dueDate: dueDate, isOpen: isOpen, isOverdue: isOverdue, toSec: toSec, hms: hms, mmss: mmss,
    stBadge: stBadge, kwChip: kwChip, kwChips: kwChips, kwClass: kwClass, moreList: moreList,
    toast: toast, openModal: openModal, closeModal: closeModal, dialog: dialog,
    initMs: initMs, setMsOptions: setMsOptions, msValue: msValue, setMsValue: setMsValue, linkCenterTeam: linkCenterTeam,
    dateRange: dateRange, drHtml: drHtml, showErr: showErr,
    table: table, selection: selection, emptyRow: emptyRow, interactive: interactive,
    tabs: tabs, selectTab: selectTab, chipInput: chipInput,
    flash: flash, keepList: keepList, markRestore: markRestore, formState: formState,
    page: function (fn) { if (!denied) fn(); }
  };
})();
