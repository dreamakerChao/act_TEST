fetch('loc_info.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('location-container');

    data.forEach(section => {
      // 大標題（使用 .category h2 樣式）
      const sectionDiv = document.createElement('div');
      sectionDiv.className = 'category';

      const title = document.createElement('h2');
      title.textContent = section.category;
      sectionDiv.appendChild(title);

      // 每個項目處理
      section.items.forEach(item => {
        const itemContainer = document.createElement('div');
        itemContainer.className = 'info-container';

        if (item.text) {
          const p = document.createElement('p');
          p.textContent = item.text;
          p.style.marginBottom = '1rem';
          itemContainer.appendChild(p);
        }

        if (item.image) {
          const img = document.createElement('img');
          img.src = item.image;
          img.alt = item.alt || '';
          img.className = 'info-image'; // 適用 category img 樣式
          itemContainer.appendChild(img);
        }

        if (item.map) {
          const iframe = document.createElement('iframe');
          iframe.src = item.map;
          iframe.width = "100%";
          iframe.height = "450";
          iframe.style.border = "0";
          iframe.allowFullscreen = true;
          iframe.loading = "lazy";
          iframe.referrerPolicy = "no-referrer-when-downgrade";
          itemContainer.appendChild(iframe);
        }

        sectionDiv.appendChild(itemContainer);
      });

      container.appendChild(sectionDiv);
    });
  })
  .catch(err => console.error('載入位置資料失敗：', err));
