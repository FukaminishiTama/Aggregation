# README.md

# 集計ツール

このプロジェクトは、ユーザーが名前を入力し、1から18までの数字を選択して送信できるウェブアプリケーションです。
複数のユーザーからのデータを集計することを目的としています。

## 主な使用パッケージ

| 名前               | 説明                                     |
|:-------------------|----------------------------------------:|
| sass: 1.86.0       | CSS効率化のメタ言語                       |
| tailwindcss: 3.4.1 | ユーティリティファーストなCSSフレームワーク |
| postcss: 8.5.3     | CSSパーサ。Tailwind→CSS変換              |


1. Sass（.scss）をCSSに変換（style.scss → temp-sass.css）
2. TailwindのCSSをビルド（input.css → tailwind.css）
3. それらを結合（統合）
4. "style.css" に出力
5. 開発中は自動更新（watch）

[style.scss] ──sass──▶ [temp-sass.css]
[input.css]  ──postcss──▶ [tailwind.css]

[temp-sass.css] + [tailwind.css]
      ↓ merge
[style.css]（← HTMLに読み込ませる）

Git
git remote add origin https://github.com/FukaminishiTama/Aggregation.git

# ディレクトリ構成
```
 Aggregation/
  ├── node_modules/       
  ├ src
  │   ├─index.html
  │   │
  │   ├─images
  │   │
  │   ├─sass
  │   │  ├─ style.scss
  │   │  │
  │   │  └─mixin
  │   │          gradient-mixin.scss
  │   │
  │   ├─scripts
  │   │    └─app.js
  │   │
  │   └─styles
  │        ├─input.css
  │        ├─style.css
  │        ├─style.css.map
  │        ├─tailwind.css
  │        ├─temp-sass.css
  │        └─temp-sass.css.mapsrc/
  │
  ├── tailwind.config.js  
  ├── package.json        
  ├── package-lock.json  
```

## ファイル構成
- `src/index.html`: アプリケーションのメインHTMLファイル。名前入力フィールドと数字選択ボタンを含むフォームがあります。
- `src/styles/style.css`: アプリケーションのスタイルシート。ユーザーインターフェースのスタイルを定義します。
- `src/scripts/app.js`: アプリケーションのJavaScriptコード。ユーザーが選択した数字を集計し、データを処理します。

### package.json
Sass と Tailwind CSS を一つの style.css に統合して、開発中は自動で更新

```"scripts": 

  "sass": "sass src/sass/style.scss src/styles/temp-sass.css",
      style.scss を Sass で処理して普通のCSSに変換し、temp-sass.css に一時保存。
      📂 出力: src/styles/temp-sass.css   

   "tailwind": "postcss src/styles/input.css -o src/styles/tailwind.css"  
      input.css にある Tailwind の命令（@tailwind base; など）を、tailwind.css に展開（PostCSSを使って）
      📂 出力: src/styles/tailwind.css

   "merge": "powershell -Command \"Get-Content src/styles/temp-sass.css, src/styles/tailwind.css | Set-Content src/styles/style.css\""
      WindowsのPowerShellのコマンド
      2つのCSSファイル（SassとTailwind）を結合し、その結果を style.css に保存
      📂 出力: src/styles/style.css (HTMLに読み込むファイル)

   "build": "npm run sass && npm run tailwind && npm run merge"
      上記3ステップ（sass → tailwind → merge）を順番に自動実行
      npm run build で一括に一発でビルド

   "watch": "concurrently \"npm run sass -- --watch\" \"npx tailwindcss -i ./src/styles/input.css -o ./src/styles/tailwind.css --watch\""
      Sass を監視：style.scss に変更があれば temp-sass.css を再生成
      Tailwind を監視：input.css に変更があれば tailwind.css を再生成
      ※ merge はこの中に入ってないので、再結合は 手動で build を再実行 する必要あり

```
### 実行コマンド
npm run build
   style.scss と input.css から 完全な style.css を生成する
   一度だけ実行して、最新のCSSを出力すればOKな場面で便利

   Tailwind や Sass の設定を変更したとき	✅ 必須
   HTMLだけの修正で、CSSは触っていないとき	❌ 不要
   本番公開用に style.css を生成したいとき	✅ 必須

npm run watch
   - --watch によってファイル変更を監視し、自動で再ビルドされる
   - コードを書く → 保存 → 即 style.css に反映

   使うタイミング
   - ローカルで開発中
   - HTML/CSS/Sass/Tailwind を頻繁に編集しているとき
   - 保存したら即反映されてほしいとき（リアルタイム開発）

## 使用方法

1. 名前を入力します。
2. 1から18までの数字を選択するためのボタンをクリックします。
3. すべての選択が完了したら、送信ボタンをクリックします。

このアプリケーションは、ユーザーの選択を集計し、結果を表示します。