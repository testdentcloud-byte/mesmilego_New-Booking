const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxQMb41_9J81C_3DGdLSdHxSqattwSBcOuX-pqOqzygk7QxBOKSZAHntWGkJVRny6z8SA/exec';

const LIFF_ID = '#'; 
const LIFF_ID_HISTORY = '#';
const LIFF_ID_CONFIRM = '#'; 

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

async function fetchBranchOptions(apiUrl = WEB_APP_URL) {
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

async function renderBranchButtons(containerId, onSelect, apiUrl = WEB_APP_URL) {
  const container = document.getElementById(containerId);
  if (!container) return [];
  container.innerHTML = '<p class="text-center text-placeholder text-sm">กำลังโหลดสาขา...</p>';
  const branches = await fetchBranchOptions(apiUrl);
  container.innerHTML = '';
  branches.forEach((branch) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn btn-primary branch-btn';
    button.dataset.branch = branch.id;
    button.textContent = branch.name;
    button.onclick = () => onSelect(branch.id, branch);
    container.appendChild(button);
  });
  return branches;
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
  const apiUrl = options.apiUrl || WEB_APP_URL;
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

async function getAllBranchIds(apiUrl = WEB_APP_URL) {
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
