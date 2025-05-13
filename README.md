
# 条件付きWeb集計ツール - README
  https://aggregation-d1rr.onrender.com
  
  ※このツールはRenderの無料プランで動作しているため、初回起動時に
  画面が「APPLICATION LOADING」と表示され、読み込みに時間がかかる場合があります。

## 概要
   - HTML・CSS・JavaScriptの練習用で作成
   - ユーザーが投票を行い、結果をリアルタイムで集計・表示できるWebツール
   - 投票データは MongoDB に保存され、管理画面から簡単に操作

## 主な機能

1. **投票プロジェクトの作成**
   - 新しい投票プロジェクトを作成し、管理画面でデータを管理
   - プロジェクトは14日後に自動削除
   - プロジェクト名の重複を避けるため、一意のトークンを自動生成
  以下の操作が可能：
   - 投票に関する説明文の記入
   - 投票データのリセット
   - 投票済みユーザーの一覧表示

2. **投票機能**
   - 任意の名前を入力し、1～20の数字から最大4つまで選択可能
   - 選んだ順番がそのまま順位として記録される
   - リセットボタンで選択のやり直しが可能
   - 投票ボタンを押すと、選んだ順番と内容が保存
   - 同じ名前で再投票すると、既存データが上書き保存される

3. **集計**
   - 投票データをリアルタイムで集計し、順位に応じたポイントを算出
   - ポイント配分はカスタマイズ可能（順位ごとに設定）

4. **結果表示・共有**
   - 投票結果をリアルタイムで表示
   - 集計結果はLINEでの共有機能あり

## 使用方法

1. **プロジェクトの作成**
   - スタート画面でプロジェクト名を入力し、「作成」ボタンをクリック
   - 管理画面と投票画面のURLが生成

2. **投票**
   - 投票画面で名前を入力し、数字を選択
   - 「投票」ボタンを押すと、投票データが保存

3. **結果の確認**
   - 結果画面で投票結果と集計結果を確認
   - LINE共有ボタンを押して、結果を他のユーザーと共有

4. **管理画面の操作**
   - 管理画面で投票データのリセットや、投票済みユーザーの確認が可能

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

### MongoDBに保存するデータ構造
- 読込、更新用ユーザーを作成し、.envファイルにて接続を管理
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
projectId: "空き地署杯2025"
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
   
主なディレクトリ構成
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
 - server.jsでURL（パス）+ HTTPメソッド（GET/POSTなどのエンドポイント）を記述
 - server.js では app.get(...) や app.post(...) の形で実装

### server.js(エンドポイント一覧)
| メソッド | パス                            | 説明                                           |
|----------|---------------------------------|------------------------------------------------|
| POST     | /api/create-project             | プロジェクトを新規作成                         |
| GET      | /api/create-auto-delete         | プロジェクトの作成日時と投票データを取得       |
| POST     | /api/vote                       | ニックネームごとの投票データを保存・更新       |
| GET      | /api/results                    | 投票結果（nickname: selections）を取得         |
| POST     | /api/admin/vote-info            | 管理画面から説明データ（votesInfo）を保存      |
| GET      | /api/vote-info                  | 説明データ（votesInfo）を取得                  |
| DELETE   | /api/admin/reset-user           | 指定ユーザー（nickname）の投票データを削除     |
| DELETE   | /api/admin/delete-project       | プロジェクト全体を完全削除                     |

### server.js(エンドポイント詳細)
- **POST /api/create-project**
  - 新しいプロジェクトを作成
  - リクエストボディ:
    ```
    {
      "projectId": "プロジェクトID",
      "token": "プロジェクト用の一意なトークン"
    }
    ```
  - レスポンス:
    ```
    {
      "success": true,
      "message": "プロジェクトを作成しました"
    }
    ```

- **GET /api/create-auto-delete**
  - 指定されたプロジェクトは14日後に削除されることを表示（※TTL設定は15日）
  - クエリパラメータ:
    ```
    ?projectId=プロジェクトID&token=トークン
    ```
  - レスポンス:
    ```
    {
      "createdAt": "プロジェクト作成日時",
      "votes": {
        "ニックネーム": [ [ラウンド, "ランキング": []], ... ]
      }
    }
    ```

- **POST /api/vote**
  - 投票データを保存または更新
  - リクエストボディ:
    ```
    {
      "projectId": "プロジェクトID",
      "nickname": "ユーザー名",
      "selections": [["1回目", [[1, 3], [2, 6]]], ...]
    }
    ```
  - レスポンス:
    ```
    {
      "success": true,
      "message": "データを更新or保存しました"
    }
    ```

- **GET /api/results**
  - 指定されたプロジェクトIDの投票結果を取得
  - クエリパラメータ:
    ```
    ?projectId=プロジェクトID&token=トークン
    ```
  - レスポンス:
    ```
    {
      "ニックネーム": [ [ラウンド, "ランキング": []], ... ]
    }
    ```

- **POST /api/admin/vote-info**
  - ユーザーが入力した投票に関する説明情報を保存、更新
  - リクエストボディ:
    ```
    {
      "projectId": "プロジェクトID",
      "token": "プロジェクト用の一意なトークン",
      "voteInfos": { "1": "説明情報", "2": "説明情報", ... }
    }
    ```
    - レスポンス:
    ```
    {
      "success": true,
      "message": "保存しました"
    }
    ```

- **DELETE /api/admin/reset-user**
  - 指定されたプロジェクト内の特定のユーザーの投票データを削除
  - クエリパラメータ:
    ```
    ?projectId=プロジェクトID&token=トークン&nickname=ユーザー名
    ```
  - レスポンス:
    ```
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
    ```
    {
      "success": true,
      "message": "プロジェクト「プロジェクトID」を削除しました"
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
       "projectId": "空き地署杯2025",
       "nickname": "青島",
       "selections": [["1回目", [[1, 3], [2, 6]]], ]
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
       "ニックネーム": [ ["ラウンド", "ランキング"[]],  ]
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