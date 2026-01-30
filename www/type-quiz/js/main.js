// タイプ相性データ
const types = ['炎', '水', '草'];
const matchups = {
  '炎': [0.5, 0.5, 2],
  '水': [2, 0.5, 0.5],
  '草': [0.5, 2, 0.5]
};

// テーブルを生成
const tbody = document.getElementById('tableBody');

types.forEach(attackType => {
  const row = document.createElement('tr');
  
  // 行ラベル
  const th = document.createElement('th');
  th.textContent = attackType;
  row.appendChild(th);
  
  // 相性セル
  matchups[attackType].forEach(multiplier => {
    const td = document.createElement('td');
    td.textContent = multiplier;
    
    if (multiplier === 2) {
      td.className = 'super-effective';
    } else if (multiplier === 0.5) {
      td.className = 'not-very-effective';
    } else {
      td.className = 'normal';
    }
    
    row.appendChild(td);
  });
  
  tbody.appendChild(row);
});