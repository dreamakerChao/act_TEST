fetch('events.json')
  .then(response => response.json())
  .then(data => {
    const slider = document.getElementById('slider');
    const list = document.getElementById('event-list');

    data.forEach(event => {
      // 圖片區塊
      const slide = document.createElement('div');
      slide.className = 'slide';

      if (event.tag === '新') slide.classList.add('new');
      if (event.tag === '已過期') slide.classList.add('expired');
      if (event.tag === '報名中') slide.classList.add('open');

      slide.innerHTML = `
        <span class="tag">${event.tag}</span>
        <div class="image-wrapper">
          <a href="${event.link}" target="_blank">
            <img src="${event.image}" alt="${event.title}" />
          </a>
        </div>
      `;
      slider.appendChild(slide);

      // 清單區塊
      const li = document.createElement('li');
      li.className = `list-item ${event.tag === '新' ? 'new' : event.tag === '已過期' ? 'expired' : 'open'}`;
      li.innerHTML = `
        <a href="${event.link}" target="_blank">${event.title}</a>
        <span class="tag">${event.tag}</span>
      `;
      list.appendChild(li);
    });
  })
  .catch(err => console.error('載入活動資料失敗：', err));
