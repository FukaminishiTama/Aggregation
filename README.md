
# 集計ツール - README
これはHTML, CSS, JSの練習用に制作したWebツールです。
  https://aggregation-d1rr.onrender.com
  (Renderの無料版のため、最初は画面はAPPLICATION LOADINGとなり、時間がかかります)

## 概要
- ユーザーが投票を行い、その結果をリアルタイムで集計・表示するためのWebツールです。
- 投票データはMongoDBに保存され、管理画面から簡単に操作できます。

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

## 使用方法

1. **プロジェクトの作成**
   - スタート画面でプロジェクト名を入力し、「作成」ボタンを押します。
   - 管理画面と投票画面のURLが生成されます。

2. **投票**
   - 投票画面で名前を入力し、数字を選択します。
   - 「投票」ボタンを押すと、投票データが保存されます。

3. **結果の確認**
   - 結果画面で投票結果と集計結果を確認できます。
   - LINE共有ボタンを押して、結果を他のユーザーと共有できます。

4. **管理画面の操作**
   - 管理画面で投票データのリセットや、投票済みユーザーの確認が可能です。

---

## 技術スタック

- **フロントエンド**: HTML, CSS, JavaScript
- **バックエンド**: Node.js, Express
- **データベース**: MongoDB
- **スタイリング**: Sass
- **デプロイ**: Render

### MongoDB(DB)とRenderの接続
- `MongoDB Atlas`には `Render`の静的IPアドレスのみ許可
- `.env` は環境変数としてRender上に登録

1. GitHubリポジトリをRenderに接続
2. 環境変数に以下を追加
   - `MONGODB_URI`
   - `PORT=3000`
   - `NODE_ENV=production`
3. 自動ビルド＆デプロイが実行される

### MongoDBに保存するデータファイル
- 読込、更新用ユーザを作成し、.envファイルにて接続を管理
- 「作成」ボタンクリック時に、以下形式のJSONをMongoDBに保存
```
// プロジェクトの名前（入力）
  projectId: { type: String, required: true, unique: true }, 
// プロジェクト同名回避用のキー（自動生成）
  token: { type: String, required: true }, 
// { "ニックネーム": [ [1回目[順位,番号], [順位,番号]],2回目[順位,番号]... ] }
  votes: { type: Map, of: Array }, 
```
作成されるファイル例
```
_id: 68079f15062402991219ff3c
projectId: "生姜焼きGP2025"
token: "Dpe0oFbb"
votes: Object
createdAt: 2025-04-22T13:52:21.748+00:00
__v: 0
```

---

## 開発環境
- VScode
- GitHub Copilot

## 開発環境のセットアップ

1. Sassをインストール

2. ローカルサーバーを起動して、URLにアクセス
   ```bash
   node server.js
   ```
   ```
   http://localhost:3000
   ```
   
ディレクトリ構成
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
	│   ├── results.js
	│   └── startup_screen.js
	└── styles
	      ├── style.css.map
	      └── style.css
```

---
## データのやり取り

### server.js(エンドポイント一覧)
- **POST /api/create-project**
  - 新しいプロジェクトを作成します。
  - リクエストボディ:
    ```json
    {
      "projectId": "プロジェクトID",
      "token": "プロジェクト用の一意なトークン"
    }
    ```
  - レスポンス:
    ```json
    {
      "success": true,
      "message": "プロジェクトを作成しました"
    }
    ```

- **GET /api/create-auto-delete**
  - 指定されたプロジェクトの作成日時と削除予定日を取得します。
  - クエリパラメータ:
    ```
    ?projectId=プロジェクトID&token=トークン
    ```
  - レスポンス:
    ```json
    {
      "createdAt": "プロジェクト作成日時",
      "votes": {
        "ニックネーム": [ [ラウンド, ランキング[]], ... ]
      }
    }
    ```

- **POST /api/vote**
  - 投票データを保存または更新します。
  - リクエストボディ:
    ```json
    {
      "projectId": "プロジェクトID",
      "nickname": "ユーザー名",
      "selections": [["1回目", [[1, 3], [2, 6]]], ...]
    }
    ```
  - レスポンス:
    ```json
    {
      "success": true,
      "message": "データを更新or保存しました"
    }
    ```

- **GET /api/results**
  - 指定されたプロジェクトIDの投票結果を取得します。
  - クエリパラメータ:
    ```
    ?projectId=プロジェクトID&token=トークン
    ```
  - レスポンス:
    ```json
    {
      "ニックネーム": [ [ラウンド, ランキング[]], ... ]
    }
    ```

- **DELETE /api/admin/reset-user**
  - 指定されたプロジェクト内の特定のユーザーの投票データを削除します。
  - クエリパラメータ:
    ```
    ?projectId=プロジェクトID&token=トークン&nickname=ユーザー名
    ```
  - レスポンス:
    ```json
    {
      "success": true
    }
    ```

- **DELETE /api/admin/delete-project**
  - 指定されたプロジェクトを完全に削除します。
  - クエリパラメータ:
    ```
    ?projectId=プロジェクトID&token=トークン
    ```
  - レスポンス:
    ```json
    {
      "success": true,
      "message": "プロジェクト プロジェクトID を削除しました"
    }
    ```
---

## 各画面のフロー

### index.html（スタート画面）のフロー
1. **プロジェクト作成**
   - ユーザーがプロジェクト名を入力し、「作成」ボタンを押下。
   - 入力されたプロジェクト名（`projectId`）をローカルストレージに保存。
   - ランダムなトークン（`token`）を生成し、MongoDBにプロジェクトを登録。
   - 管理画面（`admin.html`）のURLを生成し、遷移。
     ```
     例: /admin.html?project=プロジェクトID&token=トークン
     ```

### admin.html（管理画面）のフロー
1. **プロジェクト情報の表示**
   - URLのクエリパラメータから`projectId`と`token`を取得。
   - サーバーにリクエストを送信し、該当プロジェクトの作成日時と削除予定日を取得。
     ```
     例: GET /api/create-auto-delete?projectId=プロジェクトID&token=トークン
     ```
   - プロジェクトの削除予定日を計算し、画面に表示。

2. **管理画面URLの表示**
   - 管理画面、投票画面、結果画面のURLを生成し、それぞれのコピー機能を提供。

3. **投票済みユーザーの表示**
   - サーバーにリクエストを送信し、該当プロジェクトの投票済みユーザー一覧を取得。
     ```
     例: GET /api/results?projectId=プロジェクトID&token=トークン
     ```
   - ユーザー一覧を画面に描画。

4. **プロジェクトの削除**
   - 「DELETE」ボタンを押下すると、プロジェクト全体を削除するリクエストをサーバーに送信。
     ```
     例: DELETE /api/admin/delete-project?projectId=プロジェクトID&token=トークン
     ```
   - 削除成功後、スタート画面（`index.html`）に遷移。


### main.html（投票画面）のフロー
1. **投票**
   - ユーザーがニックネーム（`nickname`）を入力。
   - 1回につき最大4つの数字を選択し、順位を決定。
   - 「投票」ボタンを押下すると、以下のデータがサーバーに送信される。
     ```json
     {
       "projectId": "生姜焼きGP2025",
       "nickname": "たま",
       "selections": [["1回目", [[1, 3], [2, 6]]], ...]
     }
     ```
   - 投票データはMongoDBに保存される。

2. **結果画面への遷移**
   - 投票後、結果画面（`results.html`）に遷移。
     ```
     例: /results.html?project=プロジェクトID
     ```

### results.html（結果画面）のフロー
1. **プロジェクトデータの取得**
   - URLのクエリパラメータから`projectId`を取得。
   - サーバーにリクエストを送信し、該当プロジェクトの投票データを取得。
     ```
     例: GET /api/results?projectId=プロジェクトID&token=トークン
     ```

2. **データの描画**
   - サーバーから取得したJSONデータを解析。
     ```json
     {
       "ニックネーム": [ [ラウンド, ランキング[]], ... ]
     }
     ```
   - ローカルストレージから自分のニックネームを取得し、該当データを抽出。
   - `forEach`で画面に描画し、全ユーザー分のデータを集計。

3. **ポイント設定**
   - 投票結果に基づき、順位ごとのポイントを設定可能。
   - 「決定」ボタンを押下すると、ポイントが更新され、集計結果が表示される。

4. **LINE共有**
   - 集計結果をLINEで共有するボタンを提供。
   - LINE共有リンクを生成し、クリックで外部アプリに遷移。


## 今後の改善点
- **レスポンシブ対応**: モバイルデバイスでの表示最適化。