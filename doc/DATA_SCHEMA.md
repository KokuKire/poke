# データスキーマ設計

## JSON形式仕様

### pokemon.json - ポケモン基本情報

**ファイル構成**: キーをポケモンのIDまたはスラッグで管理

```json
{
  "pikachu": {
    "id": 25,
    "name": "ピカチュウ",
    "generation": 1,
    "type": ["electric"],
    "baseStats": {
      "hp": 35,
      "attack": 55,
      "defense": 40,
      "spAtk": 50,
      "spDef": 50,
      "speed": 90
    },
    "imageUrl": "https://example.com/pokemon/pikachu.png",
    "dex": "電気ネズミポケモン"
  },
  "bulbasaur": {
    "id": 1,
    "name": "フシギダネ",
    "generation": 1,
    "type": ["grass", "poison"],
    "baseStats": {
      "hp": 45,
      "attack": 49,
      "defense": 49,
      "spAtk": 65,
      "spDef": 65,
      "speed": 45
    },
    "imageUrl": "https://example.com/pokemon/bulbasaur.png",
    "dex": "種ポケモン"
  }
}
```

**フィールド説明**:
- `id`: 全国図鑑番号
- `name`: ポケモン名（日本語）
- `generation`: 世代（1=赤/緑, 2=金/銀など）
- `type`: タイプ配列（単タイプの場合も配列）
- `baseStats`: 基礎ステータス
  - `hp`: HP
  - `attack`: 攻撃
  - `defense`: 防御
  - `spAtk`: 特攻
  - `spDef`: 特防
  - `speed`: 素早さ
- `imageUrl`: 公式画像へのURL
- `dex`: ポケモン図鑑説明

---

### typeChart.json - タイプ相性表

**ファイル構成**: タイプごとに相手タイプへの効果を定義

```json
{
  "normal": {
    "effective": [],
    "notEffective": ["rock", "steel"],
    "noEffect": ["ghost"]
  },
  "electric": {
    "effective": ["water", "flying"],
    "notEffective": ["grass", "electric", "dragon"],
    "noEffect": []
  },
  "water": {
    "effective": ["fire", "ground", "rock"],
    "notEffective": ["water", "grass", "ice"],
    "noEffect": []
  },
  "grass": {
    "effective": ["water", "ground", "rock"],
    "notEffective": ["fire", "grass", "poison", "flying", "bug"],
    "noEffect": []
  },
  "poison": {
    "effective": ["grass", "fairy"],
    "notEffective": ["poison", "ground", "rock"],
    "noEffect": []
  },
  "fire": {
    "effective": ["grass", "ice", "bug", "steel"],
    "notEffective": ["fire", "water", "ground", "rock"],
    "noEffect": []
  }
}
```

**ロジック説明**:
- `effective`: 攻撃側がこのタイプ時、防御側がこのタイプなら1.5倍ダメージ
- `notEffective`: 攻撃側がこのタイプ時、防御側がこのタイプなら0.5倍ダメージ
- `noEffect`: 攻撃側がこのタイプ時、防御側がこのタイプなら0倍ダメージ

**複合タイプの場合**: 両方とも効果抜群なら2.25倍、一つが無効なら0倍

---

### moves.json - 技データベース

**ファイル構成**: 技名をキーに、パラメータを定義

```json
{
  "thunderbolt": {
    "id": 24,
    "name": "10まんボルト",
    "type": "electric",
    "category": "special",
    "power": 90,
    "accuracy": 100,
    "description": "10万ボルトを浴びせて攻撃する。相手をまひさせることがある。"
  },
  "earthquake": {
    "id": 89,
    "name": "じしん",
    "type": "ground",
    "category": "physical",
    "power": 100,
    "accuracy": 100,
    "description": "地震を起こして、相手全員に大ダメージを与える。"
  },
  "flamethrower": {
    "id": 15,
    "name": "かえんほうしゃ",
    "type": "fire",
    "category": "special",
    "power": 90,
    "accuracy": 100,
    "description": "強い炎を浴びせて攻撃する。やけど状態にすることがある。"
  }
}
```

**フィールド説明**:
- `id`: 技ID
- `name`: 技名（日本語）
- `type`: タイプ
- `category`: 分類
  - `physical`: 物理（攻撃ステータスを参照）
  - `special`: 特殊（特攻ステータスを参照）
  - `status`: 変化技
- `power`: 威力（数値、変化技は0）
- `accuracy`: 命中率（100 = 100%）
- `description`: 技説明

---

### 計算用補助データ

#### statNames.json (統計情報)
```json
{
  "hp": { "label": "HP", "display": true },
  "attack": { "label": "攻撃", "display": true },
  "defense": { "label": "防御", "display": true },
  "spAtk": { "label": "特攻", "display": true },
  "spDef": { "label": "特防", "display": true },
  "speed": { "label": "素早さ", "display": true }
}
```

---

## データ更新方針

### 初版（v1.0）
- ポケモン: 30体（初代人気種中心）
- 技: 10～15種類
- タイプ: 18種類すべて

### 中期拡張（v2.0）
- ポケモン: 151体（第1世代全）
- 技: 40～50種類
- 特性データ追加

### 長期計画（v3.0以降）
- 全ポケモン対応
- 全技対応
- 個性値・努力値対応
- API化（バックエンド連携）

---

## データソース

- **公式ポケモンデータ**: https://www.pokemon.co.jp/
- **コミュニティリソース**: 
  - ポケモンWiki: https://wiki.xn--rckteqa2e.jp/
  - Pokébase: https://pokemondb.net/
  
**注記**: 使用するデータは公式情報またはコミュニティが提供する非営利用途に合致したものを使用

---

## ファイル保管場所

```
www/data/
├── pokemon.json
├── moves.json
├── typeChart.json
└── statNames.json
```

すべてJSONフォーマットで、main.jsから`fetch()`で読み込む
