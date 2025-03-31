# README

# 集計ツール

このプロジェクトは、ユーザーが名前を入力し、1から18までの数字を選択して送信できるウェブアプリケーションです。 複数のユーザーからのデータを集計することを目的としています。

## 主な使用パッケージ

| 名前           | 説明          |
| ------------ | ----------- |
| sass: 1.86.0 | CSS効率化のメタ言語 |

## ビルドの流れ

1. Sass（.scss）をCSSに変換
2. "style.css" に出力
3. 開発中は自動更新（VSCode拡張機能：Live Sass Compiler）

style.scss → style.css → HTMLに読み込ませる

#### Git

```
git remote add origin https://github.com/FukaminishiTama/Aggregation.git
```

# ディレクトリ構成

```
Aggregation/
 ├── node_modules/       
 ├── src/
 │    ├── index.html
 │    ├── images/
 │    ├── sass/
 │    │    └── style.scss      
 │    ├── scripts/
 │    │    └── app.js
 │    └── styles/
 │         ├── style.css
 │         └── style.css.map
 ├── package.json        
 └── package-lock.json  
```

## ファイル構成

- `src/index.html`: アプリケーションのメインHTMLファイル
- `src/styles/style.css`: Sass のビルド結果。UIスタイルを定義
- `src/scripts/app.js`: JavaScriptコード。選択された数値を集計する

### package.json

```json
"scripts": {
  "sass": "sass src/sass/style.scss src/styles/style.css",
  "watch": "sass --watch src/sass/style.scss src/styles/style.css"
}
```

### 実行コマンド

#### npm run sass

Sass を一度だけビルド

#### npm run watch

コードを保存するたびに自動ビルド

## 使用方法

1. 名前を入力します。
2. 1から18までの数字をボタンで選択します。
3. 選択が終わったら、送信ボタンを押します。

このアプリケーションは、ユーザーの選択を集計し、結果を表示します。





