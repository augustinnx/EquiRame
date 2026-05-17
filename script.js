const NUM_WAGONS = 5;
let currentData = [];
let mode = 'normal'; // normal | rush | low

function getClass(pct) {
  if (pct < 30) return 'green';
  if (pct < 70) return 'orange';
  return 'red';
}

function getIcon(pct) {
  if (pct < 30) return '👤';
  if (pct < 70) return '👥';
  return '🧑‍🤝‍🧑';
}

function randomOccupancy(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateData() {
  if (mode === 'rush') {
    return Array.from({length: NUM_WAGONS}, () => randomOccupancy(55, 98));
  } else if (mode === 'low') {
    return Array.from({length: NUM_WAGONS}, () => randomOccupancy(5, 35));
  } else {
    const base = [22, 71, 85, 31, 78];
    return base.map(b => Math.max(5, Math.min(99, b + Math.floor((Math.random() - 0.5) * 14))));
  }
}

function renderWagons(data) {
  const container = document.getElementById('wagons');
  container.innerHTML = '';

  data.forEach((pct, i) => {
    const cls = getClass(pct);
    const icon = getIcon(pct);

    if (i > 0) {
      const conn = document.createElement('div');
      conn.className = 'wagon-connector';
      container.appendChild(conn);
    }

    const w = document.createElement('div');
    w.className = `wagon ${cls}`;
    w.innerHTML = `
      <div class="wagon-windows">
        <div class="win"></div><div class="win"></div><div class="win"></div>
      </div>
      <div class="wagon-icon">${icon}</div>
      <div class="wagon-pct">${pct}%</div>
      <div class="wagon-tooltip" id="tt-${i}">Rame ${i+1} · ${pct}% occupé</div>
    `;

    w.addEventListener('mouseenter', () => {
      document.getElementById(`tt-${i}`).classList.add('show');
    });
    w.addEventListener('mouseleave', () => {
      document.getElementById(`tt-${i}`).classList.remove('show');
    });

    container.appendChild(w);
  });
}

function updateRecommendation(data) {
  const bestIdx = data.indexOf(Math.min(...data));
  const worstIdx = data.indexOf(Math.max(...data));
  const avgOcc = Math.round(data.reduce((a,b) => a+b,0) / data.length);

  const title = document.getElementById('rec-title');
  const desc = document.getElementById('rec-desc');

  if (data[bestIdx] < 30) {
    title.textContent = `🟢 Montez en rame ${bestIdx + 1}`;
    desc.textContent = `Seulement ${data[bestIdx]}% d'occupation — places assises disponibles. Évitez la rame ${worstIdx + 1} (${data[worstIdx]}% saturée).`;
  } else if (data[bestIdx] < 60) {
    title.textContent = `🟡 Rame ${bestIdx + 1} recommandée`;
    desc.textContent = `Occupation modérée à ${data[bestIdx]}%. Places debout disponibles. Rame ${worstIdx + 1} à éviter (${data[worstIdx]}%).`;
  } else {
    title.textContent = `🔴 Train très chargé`;
    desc.textContent = `Toutes les rames sont saturées (moyenne : ${avgOcc}%). Envisagez d'attendre le prochain train dans ${document.getElementById('time2').textContent} min.`;
  }
}

function updateStation() {
  const sel = document.getElementById('station-select');
  // On récupère directement le texte visible de l'option choisie
  const name = sel.options[sel.selectedIndex].text;
  document.getElementById('station-name').textContent = name;
}

function updateTimes() {
  const t1 = Math.floor(Math.random() * 4) + 1;
  const t2 = t1 + Math.floor(Math.random() * 4) + 2;
  document.getElementById('time1').textContent = t1;
  document.getElementById('time2').textContent = t2;
}

function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  document.getElementById('clock').textContent = `${h}:${m}`;
}

function updateAll() {
  updateStation();
  updateTimes();
  currentData = generateData();
  renderWagons(currentData);
  updateRecommendation(currentData);
}

function refreshData() {
  currentData = generateData();
  renderWagons(currentData);
  updateRecommendation(currentData);
  updateTimes();
}

function simulateRush() {
  mode = 'rush';
  updateAll();
}

function simulateLow() {
  mode = 'low';
  updateAll();
}

// Initialisation au chargement
updateClock();
setInterval(updateClock, 10000);
updateAll();

// Compte à rebours du métro
setInterval(() => {
  const t1el = document.getElementById('time1');
  let t1 = parseInt(t1el.textContent);
  if (t1 > 1) {
    t1el.textContent = t1 - 1;
  } else {
    updateTimes();
    currentData = generateData();
    renderWagons(currentData);
    updateRecommendation(currentData);
  }
}, 15000);