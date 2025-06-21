fetch('events.json')
  .then(response => response.json())
  .then(data => {
    const slider = document.getElementById('slider');
    const list = document.getElementById('event-list');

    data.forEach((event, i) => {
      // === 建立圖片卡片 ===
      const img = new Image();
      img.src = event.cover;
      img.alt = event.title;

      const showDetail = () => renderDetail(event);

      img.onload = () => {
        const slide = document.createElement('div');
        slide.className = 'slide';

        if (event.label === '新') slide.classList.add('new');
        if (event.label === '已過期') slide.classList.add('expired');
        if (event.label === '報名中') slide.classList.add('open');

        const wrapper = document.createElement('div');
        wrapper.className = 'image-wrapper';

        const link = document.createElement('a');
        link.href = 'javascript:void(0)';
        link.onclick = showDetail;
        link.appendChild(img);
        wrapper.appendChild(link);

        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.textContent = event.label;

        slide.appendChild(tag);
        slide.appendChild(wrapper);
        slider.appendChild(slide);
      };

      img.onerror = () => {
        console.warn(`圖片載入失敗：${event.cover}`);
      };

      // === 活動列表區塊 ===
      const li = document.createElement('li');
      if (event.label === '新') li.classList.add('new');
      if (event.label === '已過期') li.classList.add('expired');
      if (event.label === '報名中') li.classList.add('open');

      li.innerHTML = `
        <a href="javascript:void(0)">${event.title}</a>
        <span class="date">${event.time}</span>
        <span class="status">${event.label}</span>
      `;
      li.querySelector('a').onclick = showDetail;

      list.appendChild(li);
    });
  })
  .catch(error => console.error('載入活動資料失敗：', error));

// === 詳情顯示函式 ===
function renderDetail(event) {
  document.body.innerHTML = ''; // 清空畫面

  const formatDateTime = (str) => {
    const [yy, mm, dd, hm] = str.split('/');
    return `20${yy}年${mm}月${dd}日 ${hm}`;
  };

  const container = document.createElement('div');
  container.className = 'event-detail-container';

  container.innerHTML = `
    <h2 onclick="location.reload()" style="cursor: pointer; color:rgb(114, 224, 118); margin: 1rem auto 0.5rem;">← 回上頁</h2>
    
    <img src="${event.cover}" alt="${event.title}" style="aspect-ratio: 210 / 297; max-width: 300px; width: 100%; display:block; margin:1rem auto 1.5rem; border-radius:8px;" />

    <h1 style="margin-bottom: 1rem;">${event.title}</h1>

    <table style="margin: 0 auto; text-align: left; border-collapse: collapse;">
      <tr><th style="padding: 6px 16px;">活動標籤</th><td style="padding: 6px 16px;">${event.label}</td></tr>
      <tr><th style="padding: 6px 16px;">活動時間</th><td style="padding: 6px 16px;">${formatDateTime(event.time)}</td></tr>
      <tr><th style="padding: 6px 16px;">截止時間</th><td style="padding: 6px 16px;">${formatDateTime(event.deadline)}</td></tr>
      <tr><th style="padding: 6px 16px;">活動地點</th><td style="padding: 6px 16px;">${event.location}</td></tr>
      <tr><th style="padding: 6px 16px;">負責講師</th><td style="padding: 6px 16px;">${event.speaker}</td></tr>
      <tr><th style="padding: 6px 16px;">承辦人員</th><td style="padding: 6px 16px;">${event.host}</td></tr>
      <tr><th style="padding: 6px 16px;">聯絡信箱</th><td style="padding: 6px 16px;"><a href="mailto:${event.email}">${event.email}</a></td></tr>
      <tr><th style="padding: 6px 16px;">聯絡電話</th><td style="padding: 6px 16px;"><a href="tel:${event.phone}">${event.phone}</a></td></tr>
      <tr><th style="padding: 6px 16px;">參與對象</th><td style="padding: 6px 16px;">${event.target}</td></tr>
      <tr><th style="padding: 6px 16px;">活動說明</th><td style="padding: 6px 16px;">${event.description}</td></tr>
      <tr><th style="padding: 6px 16px;">報名連結</th><td style="padding: 6px 16px;"><a href="${event.link}" target="_blank">${event.link}</a></td></tr>
    </table>
  `;

  document.body.appendChild(container);
}
