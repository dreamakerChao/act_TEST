function loadInfo(jsonPath, containerId) {
  fetch(jsonPath)
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById(containerId);
      container.innerHTML = ''; // 清除先前內容

      data.forEach(section => {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'category';

        const h2 = document.createElement('h2');
        h2.textContent = section.category;
        sectionDiv.appendChild(h2);

        // 單張圖片（不需要項目符號）
        const isSingleImage = section.items.length === 1 && section.items[0].image;
        if (isSingleImage) {
          const img = document.createElement('img');
          img.src = section.items[0].image;
          img.alt = section.items[0].alt || '';
          sectionDiv.appendChild(img);
        } else {
          const ul = document.createElement('ul');
          ul.style.listStyleType = 'disc';

          section.items.forEach(item => {
            const li = document.createElement('li');

            if (item.link && item.text) {
              const a = document.createElement('a');
              a.href = item.link;
              a.target = '_blank';
              a.textContent = item.text;
              li.appendChild(a);
            } else if (item.text) {
              li.textContent = item.text;
            }

            ul.appendChild(li);
          });

          sectionDiv.appendChild(ul);
        }

        container.appendChild(sectionDiv);
      });
    })
    .catch(err => console.error('載入 JSON 失敗：', err));
}
