---

# 集計ツール - README

## 概要

- ユーザーが投票を行い、その結果をリアルタイムで集計・表示するためのWebアプリケーションです。
- 投票データはMongoDBに保存され、管理画面から簡単に操作できます。
- LINE共有機能を通じて、結果を他のユーザーと簡単に共有することができます。

---

## 主な機能

1. **投票機能**
   - ユーザーは名前を入力し、複数回に分けて数字を選択できます。
   - 同じ名前で再投票を行うと、既存のデータが上書きされます。

2. **リアルタイム集計**
   - 投票データをリアルタイムで集計し、ポイント計算を行います。
   - ポイントはカスタマイズ可能で、順位ごとに異なる値を設定できます。

3. **結果表示と共有**
   - 投票結果をリアルタイムで表示します。
   - 集計結果をLINEで共有する機能を提供します。

4. **管理画面**
   - プロジェクトごとに投票データを管理できます。
   - プロジェクト名の重複を回避するため、tokenを生成
   - 投票データのリセットや、投票済みユーザーの一覧表示が可能です。

---

## 技術スタック

- **フロントエンド**: HTML, CSS, JavaScript
- **バックエンド**: Node.js, Express
- **データベース**: MongoDB
- **スタイリング**: Sass
- **デプロイ**: Render

### MongoDB
読込、更新用ユーザを作成し、.envファイルにて接続を管理
以下形式のJSONを保存
```
// プロジェクトの名前
  projectId: { type: String, required: true, unique: true }, 
// プロジェクト同名回避用のキー
  token: { type: String, required: true }, 
// { "ニックネーム": [ [1回目[順位,番号], [順位,番号]],2回目[順位,番号]... ] }
  votes: { type: Map, of: Array }, 
```
「作成」ボタンクリック時に作成されるデータ例
```
_id: 68079f15062402991219ff3c
projectId: "生姜焼きGP2025" ←入力
token: "Dpe0oFbb"　←自動生成
votes: Object
createdAt: 2025-04-22T13:52:21.748+00:00
__v: 0
```

---

## 使用方法

1. **プロジェクトの作成**
   - スタート画面でプロジェクト名を入力し、「作成」ボタンを押します。
   - 管理画面と投票画面のURLが生成されます。

2. **投票**
   - 投票画面で名前を入力し、数字を選択します。
   - 「送信」ボタンを押すと、投票データが保存されます。

3. **結果の確認**
   - 結果画面で投票結果と集計結果を確認できます。
   - LINE共有ボタンを押して、結果を他のユーザーと共有できます。

4. **管理画面の操作**
   - 管理画面で投票データのリセットや、投票済みユーザーの確認が可能です。

---

---

## 開発環境
VScode
GitHub Copilot

```
Aggregation
├── README.md
├── .env (ローカル)
├── package.json
├── prettier.config.js
├── server.js
├── eslint.config.mjs
├── models
│   └── Project.js
└── src
	├── admin.html
	├── index.html
	├── main.html
	├── results.html
	├── images
	│   ├── Button
	│   ├── Main
	│   └── SNS
	├── sass
	│   └── style.scss
	├── scripts
	│   ├── app.js
	│   ├── header.js
	│   ├── results.js
	│   └── startup_screen.js
	└── styles
	      ├── style.css.map
	      └── style.css
```

---

## 開発環境のセットアップ

1. 必要なパッケージをインストールします。
   ```bash
   npm install
   ```

2. Sassをコンパイルします。
   ```bash
   npm run sass
   ```

3. ローカルサーバーを起動します。
   ```bash
   node server.js
   ```

4. ブラウザで以下のURLにアクセスします。
   ```
   http://localhost:3000
   ```

---

## APIエンドポイント

- **POST /api/vote**
  - 投票データを保存します。
  - リクエストボディ:
    ```json
    {
      "projectId": "プロジェクトID",
      "nickname": "ユーザー名",
      "selections": [["1回目", [[1, 3], [2, 6]]], ...]
    }
    ```

- **GET /api/results**
  - 指定されたプロジェクトIDの投票結果を取得します。
  - クエリパラメータ:
    ```
    ?projectId=プロジェクトID
    ```

- **DELETE /api/admin/reset**
  - 指定されたプロジェクトIDの投票データをリセットします。

---

## index.html（スタート画面）のフロー
↓  [作成] ボタン押下
  - projectId を生成
  - main.html にクエリ付きで遷移（?project=プロジェクトID）

## main.html（投票画面）のフロー
↓ [投票]
  - ユーザーが nickname と selections を入力
↓ [決定] ボタン押下
  - POST /api/vote
    例 : payload: {
         projectId: "生姜焼きGP2025",
         nickname: "たま",
         selections: [["1回目", [[1, 3], [2, 6]]], ...]
         }
↓
results.html に遷移（?project=〇〇）

## results.html（結果画面）のフロー
window.location.search で projectId を取得
↓
fetch(`/api/results?projectId=xxx`)
↓
MongoDB (Project モデル) からその projectId の votes を取得
↓
JSONデータ（{ ニックネーム: [ [ラウンド, ランキング[]], ... ] }）を受け取る
↓
自分のニックネームを localStorage から取得して data[nickname]
↓
forEach で画面に描画
↓
集計用に全ユーザー分のデータを再利用


## 今後の改善点
- **レスポンシブ対応**: モバイルデバイスでの表示最適化。