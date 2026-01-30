# ポケモンダメージ計算機

## 📌 プロジェクト概要
ポケモン対戦時のダメージ計算を簡単に実行できるWebツール。
複数のポケモンから攻撃側・防御側を選択し、ダメージを自動計算します。

## 🎯 目的
- **短期**: ユーザーが使いやすいダメージ計算ツールの提供
- **中期**: アクセス数増加によるGoogle AdSense収入化
- **長期**: 対戦シミュレーター機能への拡張

## 📂 プロジェクト構造
```
poke/
├── www/                  # 公開用コード
│   ├── index.html
│   ├── css/style.css
│   ├── js/main.js
│   ├── data/pokemon.json
│   └── README.md
├── doc/                  # 設計・計画書
│   ├── README.md        # このファイル
│   ├── ROADMAP.md       # 実装計画
│   ├── ARCHITECTURE.md  # システム設計
│   ├── DATA_SCHEMA.md   # データベーススキーマ
│   └── DEPLOYMENT.md    # デプロイメント手順
└── .vscode/             # VSCode設定
```

## 🚀 クイックスタート
1. Live Server起動: `Go Live`ボタンクリック
2. `http://localhost:5500/www/` でアクセス
3. ポケモンと技を選択 → 「計算する」ボタン

## 📊 ステータス
- **現在**: 初期版（3体のポケモン、基本計算式）
- **次フェーズ**: データ拡充 + タイプ相性実装
- **公開URL**: https://poke.180r.com/

## 📞 関連ドキュメント
- [実装ロードマップ](ROADMAP.md)
- [システム設計](ARCHITECTURE.md)
- [データスキーマ](DATA_SCHEMA.md)
- [デプロイ手順](DEPLOYMENT.md)
