# システム設計書

## 全体アーキテクチャ

```
┌─────────────────────────────────────┐
│         ブラウザ (Client)            │
├─────────────────────────────────────┤
│ HTML/CSS/JavaScript                 │
│ ├── index.html                      │
│ ├── css/style.css                   │
│ └── js/main.js                      │
└──────────────┬──────────────────────┘
               │
               ├── data/pokemon.json (ポケモンデータ)
               ├── data/typeChart.json (タイプ相性表)
               └── data/moves.json (技データベース)
```

## モジュール構成

### 1. main.js (メインロジック)
```
main.js
├── ポケモン読み込み
│   └── initSelectBoxes()
├── 技データ読み込み
│   └── initMoveSelect()
├── タイプ相性データ読み込み
│   └── initTypeChart()
├── ダメージ計算
│   └── calculate()
│       ├── 基本ダメージ計算
│       ├── タイプ相性を反映
│       └── 乱数変動を計算
└── UI制御
    ├── 検索機能
    └── 結果表示
```

### 2. データファイル

#### pokemon.json (ポケモン情報)
```json
{
  "pikachu": {
    "id": 25,
    "name": "ピカチュウ",
    "type": ["electric"],
    "hp": 35,
    "attack": 55,
    "defense": 40,
    "spAtk": 50,
    "spDef": 50,
    "speed": 90,
    "image": "url_to_image"
  }
}
```

#### typeChart.json (タイプ相性)
```json
{
  "electric": {
    "effective": ["water", "flying"],  // 効果抜群
    "notEffective": ["grass", "electric", "dragon"],
    "noEffect": []
  }
}
```

#### moves.json (技データ)
```json
{
  "thunderbolt": {
    "name": "10まんボルト",
    "power": 90,
    "accuracy": 100,
    "type": "electric",
    "category": "special"
  }
}
```

## ダメージ計算式

### 基本式（公式準拠）
```
ダメージ = floor((((2 × Level / 5 + 2) × 威力 × 攻撃 / 防御) / 50) + 2)
```

### 応用版（タイプ相性考慮）
```
ダメージ = floor(基本式 × タイプ相性倍率 × 乱数変動)

乱数変動 = 0.85 ～ 1.00 の範囲でランダム
タイプ相性倍率:
  - 効果抜群: 1.5倍
  - イマイチ: 0.5倍
  - 無効: 0倍
```

## ページフロー

```
index.html表示
    ↓
ポケモン・技データ読み込み
    ↓
ドロップダウン初期化
    ↓
ユーザー選択
    ├── 攻撃側ポケモン
    ├── 防御側ポケモン
    └── 技選択
    ↓
「計算する」ボタンクリック
    ↓
calculate()実行
    ├── 入力値バリデーション
    ├── ダメージ計算
    └── タイプ相性判定
    ↓
結果表示
    └── 「◯◯ → △△ に ××ダメージ！」
```

## 使用技術

| 項目 | 技術 |
|------|------|
| フロントエンド | HTML5, CSS3, Vanilla JavaScript |
| データ形式 | JSON |
| ホスティング | さくらのレンタルサーバ |
| CDN | 不使用（軽量のため） |
| 分析 | Google Analytics 4 |
| 広告 | Google AdSense |

## ファイルサイズ目標

| ファイル | 現在 | 目標 |
|---------|------|------|
| index.html | ~1KB | ~5KB |
| main.js | ~1KB | ~10KB |
| pokemon.json | ~500B | ~50KB (50体分) |
| typeChart.json | - | ~10KB |
| style.css | ~200B | ~5KB |
| **合計** | ~2.7KB | ~80KB |

## パフォーマンス要件

- 初期ロード: < 2秒（通常回線）
- 計算実行: < 100ms
- ポケモン検索: < 50ms

## セキュリティ考慮

- XSS対策: DOMメソッド使用（innerHTML避ける）
- CSRF: 計算のみで状態変更なし
- SQLインジェクション: JSONベースで該当なし
- HTTPS: さくらサーバで自動SSL対応

## 拡張性

今後の追加を考慮した設計:
- APIベース化（バックエンド追加時の対応を想定）
- モジュール分割（関数分離を進める）
- キャッシング機構（オフライン対応を想定）
