const dataInput = document.querySelector('#data');
const rankingForm = document.querySelector('form');
const selection = document.querySelector('#rank');

selection.addEventListener('change', (event) => {
  const rankSelection = selection.value;

  fetch('http://localhost:3000/data?selection=' + rankSelection)
    .then((res) => res.json())
    .then((data) => {
      dataInput.innerHTML =
        `<div class="data__date">Date: ${data[0].date}</div><ol>` +
        data
          .map((obj, index) => {
            let hide = '';
            if (index > 9) hide = "class='data__hide'";
            return `<li ${hide}><span class="data__area-name">${obj.areaName}</span>
          <br><span class="data__info">Increase = <span class="data__percent-increase">${obj.cumPercentIncrease}%</span>
          <br>New: ${obj.new}
          <br>Cumulative: ${obj.cum}</span></li>`;
          })
          .join('') +
        `</ol>` +
        (data.length > 9 ? `<p id="data__show">Show all values</p>` : '');
      const show = document.querySelector('#data__show');
      show.addEventListener('click', () => {
        const hiddenLists = document.querySelectorAll('.data__hide');
        hiddenLists.forEach((li) => {
          li.classList.remove('data__hide');
        });
        show.classList.add('data__hide');
      });
    });
});
