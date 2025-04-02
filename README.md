### README

# 集計ツール

このアプリは、ユーザーが名前を入力し、1から18までの数字を選択して送信できるウェブアプリケーションです。 複数のユーザーからのデータを集計することを目的としています。

## 主な使用パッケージ

| 名前           | 説明          |
| ------------ | ----------- |
| sass: 1.86.0 | CSS効率化のメタ言語 |

### 設定

```package.json
"scripts": {
  "sass": "sass src/sass/style.scss src/styles/style.css"
}
```

### ビルドの流れ

1. Sass（.scss）をCSSに変換
2. "style.css" に出力
3. 開発中は自動更新（VSCode拡張機能：Live Sass Compiler）

style.scss → style.css → HTMLに読み込ませる

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

## HTML構造

### head セクション

| 階層 | タグ名    | id | class | 説明                     |
| -- | ------ | -- | ----- | ---------------------- |
| 1  | head   |    |       | HTMLのhead要素。メタ情報を含む    |
| 2  | meta   |    |       | ページの文字コードやビューポート設定など   |
| 2  | meta   |    |       | ページの説明やキーワードなどのメタデータ定義 |
| 2  | meta   |    |       | その他のメタ情報設定（例：作者情報など）   |
| 2  | title  |    |       | タブや検索エンジンに表示されるページタイトル |
| 2  | link   |    |       | CSSファイルや外部リソースのリンク     |
| 2  | script |    |       | 外部JavaScriptの読み込み      |

### body セクション

| 階層 | タグ名  | id | class       | 説明            |
| -- | ---- | -- | ----------- | ------------- |
| 1  | body |    |             | ページの本文部分の開始   |
| 2  | a  |    | u-visually-hidden | スクリーンリーダ用"本分へ移動" |

#### header セクション

| 階層 | タグ名    | id                               | class                                                                        | 説明                 |
| -- | ------ | -------------------------------- | ---------------------------------------------------------------------------- | ------------------ |
| 3  | header |                                  | header                                                                       | ヘッダーセクション          |
| 4  | div    |                                  | header\_\_content                                                            | ヘッダー内のコンテンツラッパー    |
| 5  | h1     |                                  | header-title                                                                 | タイトル「集計ツール」表示用     |
| 5  | nav    |                                  | header\_\_nav                                                                | ナビゲーション領域          |
| 6  | div    |                                  | header\_\_menu--desktop-only                                                 | デスクトップ専用ナビメニュー     |
| 7  | a      |                                  | header-item header-item--home                                                | 「ホーム」リンク           |
| 7  | div    |                                  | js-dropdown language-selector                                                | 言語選択ドロップダウン        |
| 8  | button | language-selector-toggle-desktop | language-selector\_\_button                                                  | ドロップダウン切替ボタン       |
| 9  | span   |                                  | language-selector\_\_language-icon                                           | アイコン表示用            |
| 10 | span   |                                  | icon icon--px                                                                | SVGアイコンラッパー        |
| 11 | svg    |                                  |                                                                              | アイコンのSVG本体         |
| 12 | mask   | mask0\_9\_1880                   |                                                                              | SVGマスク定義           |
| 12 | g      |                                  |                                                                              | SVGグループ            |
| 13 | path   |                                  |                                                                              | SVGのパス定義           |
| 9  | span   |                                  | language-selector\_\_text language-selector\_\_text--open                    | 開いているときの表示テキスト     |
| 9  | span   |                                  | language-selector\_\_text language-selector\_\_text--close                   | 閉じているときの表示テキスト     |
| 9  | span   |                                  | language-selector\_\_text language-selector\_\_text--close u-visually-hidden | スクリーンリーダー向け非表示テキスト |
| 9  | span   |                                  | language-selector\_\_arrow-icon                                              | 下向き矢印アイコンのラッパー     |
| 10 | span   |                                  | icon icon--px                                                                | アイコンのスタイル用クラス      |
| 11 | svg    |                                  |                                                                              | 矢印アイコンのSVG         |
| 12 | path   |                                  |                                                                              | 矢印アイコンのパス          |
| 8  | ul     | language-selector-desktop        | language-selector\_\_list                                                    | ドロップダウンのリスト        |
| 9  | li     |                                  | language-selector\_\_item                                                    | 言語選択項目（日本語）        |
| 10 | a      |                                  | language-selector\_\_link is-active                                          | 現在の言語リンク（日本語）      |
| 11 | span   |                                  | language-selector\_\_check-icon                                              | チェックアイコンのラッパー      |
| 12 | span   |                                  | icon icon--px                                                                | SVGアイコンラッパー        |
| 13 | svg    |                                  |                                                                              | チェックマークSVG         |
| 14 | mask   | mask0\_329\_310                  |                                                                              | SVGマスク定義           |
| 14 | g      |                                  |                                                                              | SVGグループ            |
| 15 | path   |                                  |                                                                              | SVGのパス定義           |
| 9  | li     |                                  | language-selector\_\_item                                                    | 言語選択項目（英語）         |
| 10 | a      |                                  | language-selector\_\_link                                                    | 英語へのリンク            |
| 11 | span   |                                  | language-selector\_\_check-icon                                              | チェックアイコンのラッパー（英語）  |
| 7  | button |                                  | header-item header-item--search                                              | 検索ボタン              |
| 7  | span   |                                  | header-item\_\_text header-item\_\_text--open                                | 「すべてのメニュー」表示テキスト   |
| 6  | div    |                                  | header\_\_menu--mobile-only                                                  | モバイル専用メニュー切り替え領域   |
| 7  | button |                                  | header-item header-item--toggle                                              | モバイルメニュー切り替えボタン    |
| 8  | span   |                                  | header-item\_\_text header-item\_\_text--open                                | 開いている状態のテキスト       |
| 8  | span   |                                  | header-item\_\_text header-item\_\_text--close                               | 閉じている状態のテキスト       |
| 8  | span   |                                  | icon icon--px                                                                | 矢印アイコンラッパー         |
| 9  | svg    |                                  |                                                                              | 矢印のSVG本体           |
| 10 | path   |                                  |                                                                              | 矢印のパス定義            |

#### main セクション

| 階層 | タグ名     | id          | class                  | 説明               |
| -- | ------- | ----------- | ---------------------- | ---------------- |
| 3  | main    |             | main                   | ページの主なコンテンツエリア   |
| 4  | div     |             | card card--wide        | ワイドレイアウトのカードラッパー |
| 5  | section |             | section section--entry | 入力フォームセクション      |
| 6  | h2      |             |                        | セクションタイトル        |
| 6  | div     |             | entry                  | 入力フォームの全体ラッパー    |
| 7  | div     |             | input-block            | 名前入力用のブロック       |
| 8  | label   |             | input-label            | 入力欄のラベル（名前）      |
| 8  | input   | input-name  |                        | 名前入力フィールド        |
| 7  | div     |             | select-group           | 数字選択ブロック全体       |
| 8  | label   |             | select-label           | 数字選択のラベル         |
| 8  | div     |             | number-group           | 数字ボタンの集合         |
| 9  | button  |             | number-btn             | 数字選択ボタン（1〜18まで繰り返し） |
| 8  | div     |             | error-message          | エラーメッセージ表示ブロック   |
| 7  | div     |             | button-wrap            | 送信ボタンラッパー        |
| 8  | button  | send-button | button button--main    | 入力内容送信ボタン        |

#### footer セクション

| 階層 | タグ名    | id | class     | 説明                    |
| -- | ------ | -- | --------- | --------------------- |
| 3  | footer |    | footer    | フッターエリア全体（サイト下部）      |
| 4  | small  |    | copyright | 著作権表示（例：© 集計ツール 2025） |

## CSS対応表

| クラス名 | 使用要素 | 用途・説明 |
|----------|---------|-----------|
| u-visually-hidden | a | 視覚的に非表示、スクリーンリーダー用 |
| header | header | ヘッダー全体のスタイル |
| header__inner | div | ヘッダー内部構造のグリッドまたはflex制御用 |
| header__content | div | タイトル・ナビの配置用コンテナ |
| header-title | h1 | サイトタイトルの装飾 |
| header__nav | nav | ナビゲーションエリア全体 |
| header__menu--desktop-only | div | デスクトップ表示時メニュー |
| header-menu | ul | メニューリスト全体 |
| header-menu__item | li | 個々のメニュー項目 |
| header-menu__link | a | メニューリンクのデザイン |
| header-item | span | 汎用的なナビテキスト装飾用 |
| js-dropdown | div | JavaScriptで制御されるドロップダウン基底クラス |
| language-selector | div | 言語切り替えメニュー全体 |
| language-selector__button | button | ドロップダウンを開くボタン |
| language-selector__language-icon | span | 言語アイコンラッパー |
| language-selector__text | span | 表示テキスト制御用ベースクラス |
| language-selector__text--open | span | ドロップダウン開状態表示テキスト |
| language-selector__text--close | span | 閉状態表示テキスト |
| language-selector__arrow-icon | span | ▼アイコン表示部分 |
| language-selector__list | ul | 言語選択肢のリスト |
| language-selector__item | li | 各言語リスト項目 |
| language-selector__link | a | 言語変更リンク |
| language-selector__check-icon | span | チェックアイコンラッパー |
| icon | span | 汎用アイコン表示用クラス |
| icon--px | span | アイコンサイズ制御（例：padding） |



# 使用方法

1. 名前を入力します。
2. 1から18までの数字をボタンで選択します。
3. 選択が終わったら、送信ボタンを押します。

このアプリケーションは、ユーザーの選択を集計し、結果を表示します。





