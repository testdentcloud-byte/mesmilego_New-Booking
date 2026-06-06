const CONFIG_URL = 'https://script.google.com/macros/s/AKfycbx52mV2D_9JiKPO826l9cJjh6gE9wLKSd4BOSFipeHIsU-dwbgBLu6h06KfS398WbNo/exec';
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbz4J0kgkseIWm1VA2f_Z7i88eRmk0CU4gnQZC5bITaSNDfsxzy4TY6TD6wRCZSz3Kid/exec';

const DEFAULT_BRANCHES = [
  { id: '1', name: 'CPF มีนบุรี 1' },
  { id: '2', name: 'CPF มีนบุรี 2' },
  { id: '3', name: 'อสร.หนองจอก' },
  { id: '4', name: 'แปรรูปไข่หนองจอก' },
  { id: '5', name: 'แปรรูปและตัดแต่งแปดริ้ว' },
  { id: '6', name: 'โรงงานชำแหละสุกรบางคล้า' },
  { id: '7', name: 'อสร.แปดริ้ว NH Food' },
  { id: '8', name: 'ขนมปังบางน้ำเปรี้ยว' },
  { id: '9', name: 'โรงงานไก่ย่างห้าดาว' },
  { id: '10', name: 'ศูนย์กระจายสินค้าบางน้ำเปรี้ยว' },
  { id: '11', name: 'แปรรูปไข่บ้านนา' },
  { id: '12', name: 'แปรรูปเนื้อไก่สระบุรี' },
  { id: '13', name: 'ซีพี-เมจิ สระบุรี' },
  { id: '14', name: 'อสร.สระบุรี' },
  { id: '15', name: 'ผลิตอาหารสัตว์หนองแค' },
  { id: '16', name: 'โรงงานผลิตอาหารสัตว์ธารเกษม' },
];

installDashboardResponsiveStyles();
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applyDashboardResponsiveLayout);
} else {
  applyDashboardResponsiveLayout();
}

function installDashboardResponsiveStyles() {
  if (document.getElementById('dashboard-responsive-styles')) return;
  const style = document.createElement('style');
  style.id = 'dashboard-responsive-styles';
  style.textContent = `
    html, body {
      max-width: 100%;
      overflow-x: hidden;
    }

    .dashboard-mobile-bar,
    .dashboard-nav-backdrop {
      display: none;
    }

    .dashboard-menu-button {
      display: inline-flex;
      width: 2.5rem;
      height: 2.5rem;
      align-items: center;
      justify-content: center;
      border: 1px solid #cbd5e1;
      border-radius: 0.5rem;
      color: #334155;
      background: #ffffff;
    }

    .dashboard-table-scroll {
      max-width: 100%;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }

    @media (max-width: 1023px) {
      body {
        display: block !important;
        min-height: 100dvh;
      }

      .dashboard-mobile-bar {
        position: sticky;
        top: 0;
        z-index: 70;
        display: flex;
        min-height: 3.5rem;
        align-items: center;
        gap: 0.75rem;
        border-bottom: 1px solid #e2e8f0;
        background: #ffffff;
        padding: 0.5rem 1rem;
      }

      .dashboard-mobile-title {
        min-width: 0;
      }

      .dashboard-mobile-title p {
        color: #64748b;
        font-size: 0.68rem;
        font-weight: 700;
        line-height: 1;
      }

      .dashboard-mobile-title h1 {
        max-width: calc(100vw - 5rem);
        overflow: hidden;
        color: #0f172a;
        font-size: 1rem;
        font-weight: 700;
        line-height: 1.4;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .dashboard-nav-backdrop {
        position: fixed;
        inset: 0;
        z-index: 75;
        background: rgba(15, 23, 42, 0.45);
      }

      body.dashboard-nav-open .dashboard-nav-backdrop {
        display: block;
      }

      .dashboard-shell,
      body > div.h-screen {
        display: block !important;
        height: auto !important;
        min-height: 100dvh !important;
        overflow: visible !important;
      }

      .dashboard-sidebar,
      body > aside,
      body > div > aside {
        position: fixed !important;
        top: 0 !important;
        bottom: 0 !important;
        left: 0 !important;
        z-index: 80 !important;
        width: min(82vw, 20rem) !important;
        max-width: 20rem !important;
        height: 100dvh !important;
        overflow-y: auto !important;
        box-shadow: 0 20px 60px rgba(15, 23, 42, 0.25);
        transform: translateX(-105%);
        transition: transform 180ms ease;
      }

      body.dashboard-nav-open .dashboard-sidebar,
      body.dashboard-nav-open > aside,
      body.dashboard-nav-open > div > aside {
        transform: translateX(0);
      }

      .dashboard-main,
      body > main,
      body > div > main {
        width: 100% !important;
        max-width: 100% !important;
        min-width: 0 !important;
        margin-left: 0 !important;
      }

      .dashboard-main > header {
        position: sticky !important;
        top: 3.5rem !important;
        z-index: 60 !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: stretch !important;
        gap: 0.75rem !important;
        padding: 0.75rem 1rem !important;
      }

      .dashboard-main > header > *,
      .dashboard-main > header .relative,
      .dashboard-main > header select,
      .dashboard-main > header input {
        width: 100% !important;
        max-width: 100% !important;
      }

      .dashboard-main > .flex-1 {
        padding: 1rem !important;
        overflow: visible !important;
      }

      .dashboard-stack-row {
        flex-direction: column !important;
        align-items: stretch !important;
        gap: 0.75rem !important;
      }

      .dashboard-stack-row > button,
      .dashboard-stack-row > a {
        width: 100%;
        justify-content: center;
      }

      .dashboard-card {
        padding: 1rem !important;
      }

      .dashboard-table-scroll,
      .table-scroll-container,
      .overflow-x-auto {
        max-width: 100%;
        overflow-x: auto !important;
        -webkit-overflow-scrolling: touch;
      }

      .dashboard-table-scroll table,
      .table-scroll-container table,
      .overflow-x-auto > table {
        min-width: 100%;
      }

      .dashboard-table-scroll table:not(.table-fixed),
      .table-scroll-container table:not(.table-fixed),
      .overflow-x-auto > table:not(.table-fixed) {
        width: max-content;
      }

      .dashboard-main table th,
      .dashboard-main table td {
        white-space: nowrap;
      }

      .dashboard-modal-panel {
        width: calc(100vw - 2rem) !important;
        max-width: calc(100vw - 2rem) !important;
        max-height: calc(100dvh - 2rem) !important;
        overflow-y: auto;
      }

      .dashboard-floating-branch {
        position: static !important;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin: 0 !important;
        z-index: auto !important;
      }

      .flatpickr-calendar {
        max-width: 100% !important;
      }
    }

    @media (max-width: 640px) {
      .dashboard-main > .flex-1 {
        padding: 0.75rem !important;
      }

      .dashboard-card,
      .dashboard-main section,
      #formSection {
        padding: 0.875rem !important;
      }

      .dashboard-main h1,
      .dashboard-main h2 {
        font-size: 1.125rem !important;
        line-height: 1.5rem !important;
      }

      .dashboard-main input,
      .dashboard-main select,
      .dashboard-main textarea,
      .dashboard-main button {
        min-height: 2.5rem;
      }

      #serviceCards {
        grid-template-columns: 1fr !important;
      }

      #timeDropdown {
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      }

      .dashboard-main .space-x-3,
      .dashboard-main .space-x-4 {
        margin-left: 0 !important;
      }
    }
  `;
  document.head.appendChild(style);
}

function applyDashboardResponsiveLayout() {
  const sidebar = document.querySelector('body > aside, body > div > aside');
  if (!sidebar) return;

  sidebar.classList.add('dashboard-sidebar');
  const shell = sidebar.parentElement;
  if (shell && shell !== document.body) shell.classList.add('dashboard-shell');

  const main = Array.from(document.querySelectorAll('main')).find((item) => !item.closest('aside'));
  if (main) main.classList.add('dashboard-main');

  moveFloatingBranchSelector_(main);
  createDashboardMobileNavigation_(main, sidebar);
  enhanceDashboardResponsiveNodes(main || document);
  observeDashboardResponsiveNodes(main || document);
}

function createDashboardMobileNavigation_(main, sidebar) {
  if (document.getElementById('dashboardMobileBar')) return;

  const titleSource = main && (main.querySelector('header h1, header h2') || main.querySelector('h1, h2'));
  const title = titleSource && titleSource.textContent.trim()
    ? titleSource.textContent.trim()
    : document.title.replace(/\s*-\s*Dashboard\s*$/i, '').trim() || 'Dashboard';

  const bar = document.createElement('div');
  bar.id = 'dashboardMobileBar';
  bar.className = 'dashboard-mobile-bar';

  const menuButton = document.createElement('button');
  menuButton.type = 'button';
  menuButton.className = 'dashboard-menu-button';
  menuButton.setAttribute('aria-label', 'เปิดเมนู');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fill-rule="evenodd" d="M3 5.5A1.5 1.5 0 014.5 4h11a1.5 1.5 0 010 3h-11A1.5 1.5 0 013 5.5zm0 4A1.5 1.5 0 014.5 8h11a1.5 1.5 0 010 3h-11A1.5 1.5 0 013 9.5zm1.5 2.5a1.5 1.5 0 000 3h11a1.5 1.5 0 000-3h-11z" clip-rule="evenodd" />
    </svg>
  `;

  const titleWrap = document.createElement('div');
  titleWrap.className = 'dashboard-mobile-title';
  const brand = document.createElement('p');
  brand.textContent = 'ME-SMILE';
  const heading = document.createElement('h1');
  heading.textContent = title;
  titleWrap.append(brand, heading);
  bar.append(menuButton, titleWrap);

  const backdrop = document.createElement('div');
  backdrop.className = 'dashboard-nav-backdrop';
  backdrop.setAttribute('aria-hidden', 'true');

  document.body.insertBefore(backdrop, document.body.firstChild);
  document.body.insertBefore(bar, document.body.firstChild);

  const closeMenu = () => {
    document.body.classList.remove('dashboard-nav-open');
    menuButton.setAttribute('aria-expanded', 'false');
  };
  const openMenu = () => {
    document.body.classList.add('dashboard-nav-open');
    menuButton.setAttribute('aria-expanded', 'true');
  };

  menuButton.addEventListener('click', () => {
    if (document.body.classList.contains('dashboard-nav-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });
  backdrop.addEventListener('click', closeMenu);
  sidebar.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

function moveFloatingBranchSelector_(main) {
  const branchSelector = document.getElementById('branchSelector');
  const floatingWrapper = branchSelector && branchSelector.parentElement;
  const inlineStyle = floatingWrapper && floatingWrapper.getAttribute('style');
  if (!main || !floatingWrapper || !inlineStyle || !/position\s*:\s*fixed/i.test(inlineStyle)) return;

  const header = main.querySelector('header');
  if (!header) return;
  floatingWrapper.removeAttribute('style');
  floatingWrapper.className = 'dashboard-floating-branch font-thai';
  header.appendChild(floatingWrapper);
}

function enhanceDashboardResponsiveNodes(root) {
  if (!root) return;

  root.querySelectorAll('.flex.justify-between.items-center').forEach((row) => {
    if (!row.closest('aside') && row.children.length <= 4) row.classList.add('dashboard-stack-row');
  });

  root.querySelectorAll('section.bg-white, #formSection, .bg-white.shadow, .bg-white.rounded-lg.shadow').forEach((card) => {
    if (!card.closest('aside')) card.classList.add('dashboard-card');
  });

  root.querySelectorAll('.table-scroll-container, .overflow-x-auto').forEach((container) => {
    container.classList.add('dashboard-table-scroll');
  });

  root.querySelectorAll('table').forEach((table) => {
    const parent = table.parentElement;
    if (parent && !table.closest('aside')) parent.classList.add('dashboard-table-scroll');
  });

  document.querySelectorAll('.fixed.inset-0 > .bg-white, .fixed.inset-0 > div').forEach((panel) => {
    const parent = panel.parentElement;
    if (panel.classList.contains('spinner') || (parent && parent.id === 'loadingOverlay')) return;
    if (!panel.closest('aside')) panel.classList.add('dashboard-modal-panel');
  });
}

function observeDashboardResponsiveNodes(root) {
  if (!root || root.dataset.dashboardResponsiveObserved === 'true') return;
  root.dataset.dashboardResponsiveObserved = 'true';
  const observer = new MutationObserver(() => enhanceDashboardResponsiveNodes(root));
  observer.observe(root, { childList: true, subtree: true });
}

async function fetchBranchOptions(apiUrl = CONFIG_URL) {
  try {
    const response = await fetch(`${apiUrl}?action=fetchBranches&_=${Date.now()}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (Array.isArray(data) && data.length) {
      return data
        .map((branch) => ({
          id: String(branch.id || branch.branch || '').trim(),
          name: String(branch.name || branch.branchName || '').trim(),
        }))
        .filter((branch) => branch.id && branch.name);
    }
  } catch (error) {
    console.warn('fetchBranchOptions fallback:', error);
  }
  return DEFAULT_BRANCHES;
}

function getAdminAllowedBranches() {
  try {
    const raw = localStorage.getItem('adminBranches');
    const parsed = raw ? JSON.parse(raw) : ['1'];
    return Array.isArray(parsed) && parsed.length ? parsed.map(String) : ['1'];
  } catch (error) {
    return ['1'];
  }
}

async function populateBranchSelector(selectOrId, options = {}) {
  const select = typeof selectOrId === 'string' ? document.getElementById(selectOrId) : selectOrId;
  if (!select) return [];
  const storageKey = options.storageKey || 'branch';
  const apiUrl = options.apiUrl || CONFIG_URL;
  const allowed = options.allowedBranches || getAdminAllowedBranches();
  const allBranches = await fetchBranchOptions(apiUrl);
  const branches = allowed[0] === 'all'
    ? allBranches
    : allBranches.filter((branch) => allowed.includes(branch.id));
  const finalBranches = branches.length ? branches : allBranches.slice(0, 1);
  const savedBranch = localStorage.getItem(storageKey) || (finalBranches[0] && finalBranches[0].id) || '1';
  const selectedBranch = finalBranches.some((branch) => branch.id === savedBranch)
    ? savedBranch
    : finalBranches[0].id;

  select.innerHTML = '';
  finalBranches.forEach((branch) => {
    const option = document.createElement('option');
    option.value = branch.id;
    option.textContent = branch.name;
    select.appendChild(option);
  });
  select.value = selectedBranch;
  localStorage.setItem(storageKey, selectedBranch);
  return finalBranches;
}

async function getAllBranchIds(apiUrl = CONFIG_URL) {
  const branches = await fetchBranchOptions(apiUrl);
  return branches.map((branch) => branch.id);
}

function normalizeServiceListResponse(data) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.services)) return data.services;
  if (data && Array.isArray(data.data)) return data.data;
  if (data && data.success === false) {
    throw new Error(data.message || 'API ส่งข้อผิดพลาดกลับมา');
  }
  throw new Error('รูปแบบข้อมูลบริการไม่ถูกต้อง');
}

function normalizeBookingServiceList(data) {
  return normalizeServiceListResponse(data)
    .map((service) => ({
      id: service.id || service['ไอดี'] || '',
      name: service.name || service['รายการ'] || '',
      details: service.details || service['รายละเอียด'] || '',
      price: service.price || service['ราคา'] || '',
    }))
    .filter((service) => service.id || service.name);
}

async function fetchBookingServices(branch) {
  const primaryUrl = typeof WEB_APP_URL !== 'undefined' ? WEB_APP_URL : '';
  const configUrl = typeof CONFIG_URL !== 'undefined' ? CONFIG_URL : '';
  const endpoints = [];
  if (primaryUrl) endpoints.push({ url: primaryUrl, action: 'fetchServices' });
  if (configUrl && configUrl !== primaryUrl) endpoints.push({ url: configUrl, action: 'fetchData' });
  if (primaryUrl) endpoints.push({ url: primaryUrl, action: 'fetchData' });

  let lastError = null;
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(`${endpoint.url}?action=${endpoint.action}&branch=${encodeURIComponent(branch)}&_=${Date.now()}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return normalizeBookingServiceList(await response.json());
    } catch (error) {
      lastError = error;
      console.warn(`fetchBookingServices fallback from ${endpoint.action}:`, error);
    }
  }
  throw lastError || new Error('ไม่พบ endpoint สำหรับโหลดรายการบริการ');
}
