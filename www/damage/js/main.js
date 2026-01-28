let pokemonData = {};

fetch("data/pokemon.json")
  .then(res => res.json())
  .then(data => {
    pokemonData = data;
    initSelectBoxes();
  });

function initSelectBoxes() {
  const attacker = document.getElementById("attacker");
  const defender = document.getElementById("defender");

  for (const key in pokemonData) {
    const opt1 = document.createElement("option");
    opt1.value = key;
    opt1.text = pokemonData[key].name;
    attacker.add(opt1);

    const opt2 = document.createElement("option");
    opt2.value = key;
    opt2.text = pokemonData[key].name;
    defender.add(opt2);
  }
}

function calculate() {
  const atkKey = document.getElementById("attacker").value;
  const defKey = document.getElementById("defender").value;
  const power = parseInt(document.getElementById("move").value);

  const atk = pokemonData[atkKey];
  const def = pokemonData[defKey];

  const level = 50;

  // 超簡易ダメージ式（タイプ・乱数なし）
  const damage = Math.floor(
    (((2 * level / 5 + 2) * power * atk.attack / def.defense) / 50) + 2
  );

  document.getElementById("result").innerText =
    `${atk.name} → ${def.name} に ${damage} ダメージ！`;
}
