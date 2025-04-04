### README

# 集計ツール

このアプリは、ユーザーが名前を入力し、1から18までの数字を選択して送信できるウェブアプリケーションです。 複数のユーザーからのデータを集計することを目的としています。

## 主な使用パッケージ

| 名前           | 説明          |
| ------------ | ----------- |
| sass: 1.86.0 | CSS効率化のメタ言語 |

### 設定

``` package.json
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


# 使用方法

1. 名前を入力します。
2. 1から18までの数字をボタンで選択します。
3. 選択が終わったら、送信ボタンを押します。

このアプリケーションは、ユーザーの選択を集計し、結果を表示します。



# 検討

## 未導入
``` 検索ページ
<div class="header__menu--desktop-only">
    <!-- 検索ページへのリンク -->
    <a class="header-item  header-item__search" href="/search">
        <span class="header-item__icon">
            <!-- 虫眼鏡のアイコン -->
            <span aria-hidden="true" class="icon icon--16px" role="img">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                    <path
                        d="m16 15.18-5.053-4.924c1.01-1.066 1.6-2.543 1.6-4.102C12.632 2.79 9.768 0 6.316 0 2.863 0 0 2.79 0 6.154s2.779 6.154 6.316 6.154c1.431 0 2.695-.493 3.79-1.231L15.157 16l.842-.82ZM1.263 6.154c0-2.708 2.274-4.923 5.053-4.923s5.052 2.215 5.052 4.923-2.273 4.923-5.052 4.923c-2.78 0-5.053-2.215-5.053-4.923Z">
                    </path>
                </svg>
            </span>
        </span>
        <!-- 検索リンクのテキストを格納するspan要素 -->
        <span class="header-item__text" data-text="検索">
            検索
        </span>
    </a>
</div>

<!-- 縮小画面用のメニュー -->
<div class="header-dropdown__menu header-dropdown__menu--mobile-only">
    <!-- 縮小画面用のドロップダウンメニューのリスト -->
    <ul class="header-dropdown-list ">
        <!-- 縮小画面用の各メニュー項目を格納するリスト -->
        <li class="header-dropdown-list__item ">
            <!-- 縮小画面用の検索ページ -->
            <a class="header-dropdown-list__link" href="/search" data-content="検索">
                <!-- リンクテキスト -->
                <span class="header-dropdown-list__link-text-with-icon">
                    <!-- 虫眼鏡アイコン -->
                    <span aria-hidden="true" class="icon icon--20px" role="img">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16"
                            height="16" viewBox="0 0 16 16">
                            <path
                                d="m16 15.18-5.053-4.924c1.01-1.066 1.6-2.543 1.6-4.102C12.632 2.79 9.768 0 6.316 0 2.863 0 0 2.79 0 6.154s2.779 6.154 6.316 6.154c1.431 0 2.695-.493 3.79-1.231L15.157 16l.842-.82ZM1.263 6.154c0-2.708 2.274-4.923 5.053-4.923s5.052 2.215 5.052 4.923-2.273 4.923-5.052 4.923c-2.78 0-5.053-2.215-5.053-4.923Z">
                            </path>
                        </svg>
                    </span>
                    検索</span>
                <span aria-hidden="true" class="icon icon--12px icon--link"
                    role="img">
                    <svg width="12" height="12" viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M7.3813 1.67358L12.3591 6.59668L7.3813 11.5198L6.4582 10.5967L9.85825 7.19663H2.08008V5.99663H9.85816L6.4582 2.59668L7.3813 1.67358Z">
                        </path>
                    </svg>
                </span>
            </a>
        </li>
    </ul>
</div>
``` 
