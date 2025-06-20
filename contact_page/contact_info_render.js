fetch('teacher_info.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('info-container');

    data.forEach(section => {
      const sectionDiv = document.createElement('div');
      sectionDiv.className = 'category';

      const h2 = document.createElement('h2');
      h2.textContent = section.category;
      sectionDiv.appendChild(h2);

      const ul = document.createElement('ul');

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
      container.appendChild(sectionDiv);
    });
  })
  .catch(err => console.error('載入教師聯絡資料失敗：', err));
