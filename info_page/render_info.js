fetch('info.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('info-content');

    data.forEach(section => {
      const title = document.createElement('div');
      title.className = 'Title2';
      title.textContent = section.category;
      container.appendChild(title);

      const context = document.createElement('div');
      context.className = 'context';

      section.items.forEach(item => {
        if (item.link) {
          const a = document.createElement('a');
          a.href = item.link;
          a.target = '_blank';
          a.textContent = item.text;
          context.appendChild(a);
        } else if (item.image) {
          const img = document.createElement('img');
          img.src = item.image;
          img.alt = item.alt || '';
          img.style.width = '90%';
          context.appendChild(img);
        } else if (item.text) {
          const li = document.createElement('li');
          li.textContent = item.text;
          context.appendChild(li);
        }
      });

      container.appendChild(context);
    });
  })
  .catch(err => console.error('載入資訊失敗', err));
