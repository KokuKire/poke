# デプロイメント手順

## 現状確認

- **ホスティング**: さくらのレンタルサーバ（契約済み）
- **公開URL**: https://poke.180r.com/
- **公開フォルダ**: www/

---

## デプロイメント手順

### ステップ1: ローカル開発環境での確認

```bash
# VSCode Live Server起動
# または http://localhost:5500/www/ でアクセス

# 動作確認項目
- ポケモン選択が正常に動作
- 計算ボタンをクリックしてダメージが表示される
- コンソールエラーがないこと（F12で開発者ツール確認）
```

### ステップ2: さくらサーバへのアップロード

#### 方法A: FTPクライアント使用（推奨）

1. **FTPクライアントをインストール**
   - WinSCP (Windows推奨)
   - Filezilla (クロスプラットフォーム)

2. **さくらのコントロールパネルで情報取得**
   - FTPホスト: `ftp.sakura.ne.jp` または サーバーマネージャに記載
   - FTPユーザー: (契約時に通知)
   - FTPパスワード: (契約時に通知)

3. **FTP接続**
   ```
   ホスト: ftp.sakura.ne.jp
   ユーザー名: (契約情報)
   パスワード: (契約情報)
   ```

4. **ファイルアップロード**
   ```
   ローカル: d:\kyohei\git\poke\www\*
   リモート: public_html/ または www/
   
   アップロード対象:
   - index.html
   - css/style.css
   - js/main.js
   - data/pokemon.json
   - data/moves.json (追加後)
   - data/typeChart.json (追加後)
   ```

#### 方法B: SFTP使用（セキュア）

```bash
# コマンドラインでのアップロード例
sftp username@sakura.ne.jp
cd public_html
put -r www/*
exit
```

### ステップ3: 公開ファイルの確認

アップロード後、ブラウザでアクセス:
```
https://poke.180r.com/
```

**確認項目**:
- ページが正常に読み込まれる
- CSS（スタイル）が適用されている
- JavaScriptが実行される（計算が動作）
- ポケモン選択肢が表示される
- コンソールエラーがないこと

---

## トラブルシューティング

### 問題1: ページが404エラーで表示されない

**原因**: ファイルパスが誤っている / アップロード位置が違う

**解決**:
- さくらのコントロールパネルで公開フォルダを確認
- FTPで `public_html/index.html` に正しくアップロード

### 問題2: JavaScriptが読み込まれない

**原因**: JavaScriptパスが誤っている / CORSエラー

**解決**:
- HTMLの `<script src="js/main.js">` パスを確認
- ブラウザコンソール（F12）でエラー内容を確認
- 相対パスで記述: `./js/main.js`

### 問題3: JSONデータが読み込まれない

**原因**: 
- JSONファイルがアップロードされていない
- JSONのパスが誤っている
- MIME タイプが誤認識

**解決**:
```javascript
// main.js内の fetch() に認識できるか確認
fetch('./data/pokemon.json')
  .then(res => {
    console.log('Status:', res.status); // ステータス確認
    if (!res.ok) throw new Error('JSONファイルが見つかりません');
    return res.json();
  })
  .catch(err => console.error('エラー:', err));
```

### 問題4: HTTPSでのエラー

**原因**: 混合コンテンツ（HTTPとHTTPS混在）

**解決**:
- すべてのリソースパスを相対パスに変更
- 外部リソース使用時は HTTPS URL を指定
- `http://` → `https://` に変更

---

## 更新・保守手順

### コード更新時

1. **ローカルで変更・テスト**
   ```
   VSCode Live Server で動作確認
   ```

2. **変更ファイルをアップロード**
   ```
   差分ファイルのみアップロード（FTP）
   例: main.js の修正 → js/main.js をアップロード
   ```

3. **ブラウザで確認**
   ```
   キャッシュ削除後にアクセス (Ctrl+Shift+Delete)
   ```

### ポケモンデータ追加時

```bash
# 1. ローカルで pokemon.json 編集
# 2. json-lint でシンタックス確認
# 3. Live Server で動作確認
# 4. FTP でアップロード
# 5. 公開サイトで確認
```

### バージョン管理

```
www/
├── index.html    → v1.0 (2025-01-23)
├── main.js       → v1.1 (計画中)
└── data/
    └── pokemon.json → v1.0 (3体版)
```

---

## モニタリング

### 公開後の確認項目

1. **アクセス確認**: Google Analytics で トラフィック監視
2. **エラー監視**: ブラウザコンソール、ログファイル
3. **パフォーマンス**: 読み込み速度測定
   - Google PageSpeed Insights
   - GTmetrix

### 定期メンテナンス

- **週1回**: アクセスログ確認、エラーチェック
- **月1回**: データ更新確認、SEO確認
- **四半期ごと**: 大規模アップデート検討

---

## セキュリティ対策（本番環境）

- ✅ HTTPS化: さくらのSSL（無料）で対応
- ✅ ファイルパーミッション: 644（ファイル）、755（フォルダ）
- ✅ .htaccess設定:
  ```apache
  # ファイル直アクセス防止
  <Files "*.json">
    Allow from all
  </Files>
  ```
- ✅ バックアップ: 定期的にローカルに同期

---

## チェックリスト

デプロイ前に確認:

- [ ] ローカルで全機能動作確認
- [ ] コンソールエラーなし
- [ ] JSONファイルが正しく読み込まれている
- [ ] レスポンシブ対応確認（モバイル）
- [ ] FTP接続情報を確認
- [ ] ファイアウォール設定確認
- [ ] さくらの管理画面でドメイン設定確認
- [ ] HTTPSリダイレクト設定確認（.htaccess）
- [ ] Robots.txtとサイトマップの準備

デプロイ後に確認:

- [ ] https://poke.180r.com/ にアクセス可能
- [ ] ページが完全に読み込まれる
- [ ] すべての機能が動作
- [ ] Google Analytics が記録している
- [ ] 検索エンジンに登録（Google Search Console）
