function formatDateWithWeekday(dateStr) {
  const [yy, mm, dd] = dateStr.split('/').map(Number);
  const dateObj = new Date(2000 + yy, mm - 1, dd); // 補上 20xx 年
  const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
  const weekday = weekdays[dateObj.getDay()];
  return `${dateStr} (${weekday})`;
}

fetch('events.json')
  .then((response) => response.json())
  .then((data) => {
    const slider = document.getElementById('slider');
    const list = document.getElementById('event-list');

    data.forEach((event) => {
      // --- 圖片先用 Image() 載入，確保圖片載入完成才插入 DOM ---
      const img = new Image();
      img.src = event.image;
      img.alt = event.title;

      img.onload = () => {
        const slide = document.createElement('div');
        slide.className = 'slide';

        if (event.tag === '新') slide.classList.add('new');
        if (event.tag === '已過期') slide.classList.add('expired');
        if (event.tag === '報名中') slide.classList.add('open');

        const wrapper = document.createElement('div');
        wrapper.className = 'image-wrapper';

        const link = document.createElement('a');
        link.href = event.link;
        link.appendChild(img);

        wrapper.appendChild(link);
        slide.appendChild(document.createElement('span')).className = 'tag';
        slide.querySelector('.tag').textContent = event.tag;
        slide.appendChild(wrapper);

        slider.appendChild(slide);
      };

      img.onerror = () => {
        console.warn(`圖片載入失敗：${event.image}`);
      };

      // --- 清單區塊 ---
      const li = document.createElement('li');
      if (event.tag === '新') li.classList.add('new');
      if (event.tag === '已過期') li.classList.add('expired');
      if (event.tag === '報名中') li.classList.add('open');

      const formattedDate = formatDateWithWeekday(event.date);
      li.innerHTML = `
        <a href="${event.link}">${event.title}</a>
        <span class="date">${formattedDate}</span>
        <span class="status">${event.tag}</span>
      `;
      list.appendChild(li);
    });
  })
  .catch((err) => console.error('載入活動資料失敗：', err));
