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
``` すべてのメニュー
                    <!-- ドロップダウンメニューを格納するdiv要素 -->
                    <div class="js-dropdown" data-dropdown-id="header-dropdown" data-dropdown-close-on-outside=""
                        data-dropdown-close-on-escape="" data-dropdown-disable-scroll="" data-dropdown-trap-focus=""
                        data-dropdown-reset-focus="header-dropdown-toggle">
                        <!-- ドロップダウンメニューのトグルボタンを定義するbutton要素 
                         aria-expanded="false": 初期状態では閉じている-->
                        <button id="header-dropdown-toggle" class="header-item header-item__toggle" type="button"
                            data-dropdown-toggle="header-dropdown" aria-expanded="false"
                            aria-controls="header-dropdown">
                            <!-- ドロップダウンメニューのハンバーガーアイコン -->
                            <span class="header-item__icon header-item__icon--open">
                                <span aria-hidden="true" class="icon icon--24px" role="img">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M3 6v1h18V6Zm0 5v1h18v-1Zm0 5v1h18v-1Z"></path>
                                        </svg>
                                </span>
                            </span>
                            <!-- ドロップダウンメニューが開いた後の閉じる（×）アイコン -->
                            <span class="header-item__icon header-item__icon--close">
                                <span aria-hidden="true" class="icon icon--24px" role="img">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path
                                            d="m18.029 5.07-5.87 5.87-5.797-5.8-1.06 1.06 5.797 5.8-5.798 5.798 1.06 1.06 5.799-5.797 5.869 5.869 1.06-1.061L13.22 12l5.87-5.869-1.061-1.06Z">
                                        </path>
                                    </svg>
                                </span>
                            </span>
                            <!-- ドロップダウンメニューが開く前のテキスト「すべてのメニュー」 -->
                            <span class="header-item__text header-item__text--open" data-text="すべてのメニュー">
                                すべてのメニュー</span>
                            <!-- ドロップダウンメニューが開いた後のテキスト「メニューを閉じる」 -->
                            <span class="header-item__text header-item__text--close" data-text="メニューを閉じる">
                                メニューを閉じる</span>
                        </button>

                        <!------------------------- 
                        ドロップダウンメニューコンテナ
                        ---------------------------->
                        <div id="header-dropdown" class="header-dropdown" hidden="" aria-hidden="true">
                            <!-- ドロップダウンコンテンツのコンテナを格納 -->
                            <div class="header-dropdown__container">
                                <div class="header-dropdown__content">
                                    <div class="header-dropdown__menu header-dropdown__menu--mobile-only">
                                        <ul class="header-dropdown-list ">
                                            <li class="header-dropdown-list__item header-dropdown-list__item--desktop-only">
                                                <a class="header-dropdown-list__link" href="/" data-content="ホーム">
                                                    <span class="header-dropdown-list__link-text">
                                                        ホーム</span>
                                                    <!-- 右矢印アイコン -->
                                                    <span aria-hidden="true" class="icon icon--12px icon--link" role="img">
                                                        <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M7.3813 1.67358L12.3591 6.59668L7.3813 11.5198L6.4582 10.5967L9.85825 7.19663H2.08008V5.99663H9.85816L6.4582 2.59668L7.3813 1.67358Z">
                                                            </path>
                                                        </svg>
                                                    </span>
                                                </a>
                                            </li>
                                            <li class="header-dropdown-list__item ">
                                                <a class="header-dropdown-list__link" href="/individual"
                                                    data-content="制約・ルール">
                                                    <span class="header-dropdown-list__link-text">
                                                        制約・ルール</span>
                                                    <span aria-hidden="true" class="icon icon--12px icon--link"
                                                        role="img"><svg width="12" height="12" viewBox="0 0 12 12"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M7.3813 1.67358L12.3591 6.59668L7.3813 11.5198L6.4582 10.5967L9.85825 7.19663H2.08008V5.99663H9.85816L6.4582 2.59668L7.3813 1.67358Z">
                                                            </path>
                                                        </svg>
                                                    </span>
                                                </a>
                                            </li>
                                            <!-- ドロップダウンメニューコンテナ内の区切り線 -->
                                            <li class="header-dropdown-list__item ">
                                                <a class="header-dropdown-list__link" href="" data-content="|">
                                                    <span class="header-dropdown-list__link-text">|</span>
                                                    
                                                    <span aria-hidden="true" class="icon icon--12px icon--link"
                                                        role="img"><svg width="12" height="12" viewBox="0 0 12 12"
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
                                    <!-- 縮小画面で表示されるドロップダウンコンテンツ内で、
                                     カラム形式でメニュー項目を表示するためのコンテナを定義 -->
                                    <div class="header-dropdown__menu header-dropdown__menu--columns">
                                        <ul class="header-dropdown-list ">
                                            <li class="header-dropdown-list__item ">
                                                <a class="header-dropdown-list__link" href="/news" data-content="新着・更新">
                                                    <span class="header-dropdown-list__link-text">新着・更新</span>
                                                    <!-- →アイコン -->
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
                                            <li class="header-dropdown-list__item ">
                                                <a class="header-dropdown-list__link" href="/councils"
                                                    data-content="会議">
                                                    <span class="header-dropdown-list__link-text">会議</span>
                                                    <span aria-hidden="true" class="icon icon--12px icon--link"
                                                        role="img"><svg width="12" height="12" viewBox="0 0 12 12"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M7.3813 1.67358L12.3591 6.59668L7.3813 11.5198L6.4582 10.5967L9.85825 7.19663H2.08008V5.99663H9.85816L6.4582 2.59668L7.3813 1.67358Z">
                                                            </path>
                                                        </svg>
                                                    </span>
                                                </a>
                                            </li>
                                            <li class="header-dropdown-list__item ">
                                                <a class="header-dropdown-list__link" href="/resources"
                                                    data-content="資料">
                                                    <span class="header-dropdown-list__link-text">資料</span>
                                                    <span aria-hidden="true" class="icon icon--12px icon--link"
                                                        role="img"><svg width="12" height="12" viewBox="0 0 12 12"
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
                                    <!-- mobaile用 -->
                                    <div class="header-dropdown__menu header-dropdown__menu--mobile-only">
                                        <!-- 言語設定 -->
                                        <div class="js-dropdown language-selector"
                                            data-dropdown-id="language-selector-mobile"
                                            data-dropdown-close-on-outside="" data-dropdown-close-on-escape=""
                                            data-dropdown-trap-focus=""
                                            data-dropdown-reset-focus="language-selector-toggle-mobile">
                                            <button id="language-selector-toggle-mobile"
                                                class="language-selector__button" type="button"
                                                data-dropdown-toggle="language-selector-mobile" aria-expanded="false"
                                                aria-controls="language-selector-mobile">
                                                <span class="language-selector__language-icon">
                                                    <span aria-hidden="true" class="icon icon--px" role="img">
                                                        <!-- 地球儀のアイコン -->
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                            viewBox="0 0 24 24" fill="none">
                                                            <mask id="mask0_9_1880" style="mask-type:alpha"
                                                                maskUnits="userSpaceOnUse" x="0" y="0" width="24"
                                                                height="24">
                                                                <rect width="24" height="24" fill="#D9D9D9"></rect>
                                                            </mask>
                                                            <g mask="url(#mask0_9_1880)">
                                                                <path
                                                                    d="M12 21.5C10.6974 21.5 9.46825 21.2503 8.3125 20.7509C7.15673 20.2516 6.14872 19.5718 5.28845 18.7115C4.4282 17.8512 3.7484 16.8432 3.24905 15.6875C2.74968 14.5317 2.5 13.3025 2.5 12C2.5 10.6872 2.74968 9.45543 3.24905 8.3048C3.7484 7.15417 4.4282 6.14872 5.28845 5.28845C6.14872 4.4282 7.15673 3.7484 8.3125 3.24905C9.46825 2.74968 10.6974 2.5 12 2.5C13.3128 2.5 14.5445 2.74968 15.6952 3.24905C16.8458 3.7484 17.8512 4.4282 18.7115 5.28845C19.5718 6.14872 20.2516 7.15417 20.7509 8.3048C21.2503 9.45543 21.5 10.6872 21.5 12C21.5 13.3025 21.2503 14.5317 20.7509 15.6875C20.2516 16.8432 19.5718 17.8512 18.7115 18.7115C17.8512 19.5718 16.8458 20.2516 15.6952 20.7509C14.5445 21.2503 13.3128 21.5 12 21.5ZM12 19.9788C12.5102 19.3019 12.9397 18.6192 13.2885 17.9307C13.6372 17.2423 13.9211 16.4897 14.1404 15.673H9.85958C10.0916 16.5153 10.3788 17.2807 10.7211 17.9692C11.0634 18.6577 11.4897 19.3275 12 19.9788ZM10.0635 19.7038C9.68014 19.1538 9.33591 18.5285 9.03078 17.8279C8.72564 17.1272 8.48846 16.4089 8.31922 15.673H4.92688C5.45509 16.7115 6.16343 17.584 7.0519 18.2904C7.94038 18.9968 8.94424 19.4679 10.0635 19.7038ZM13.9365 19.7038C15.0557 19.4679 16.0596 18.9968 16.9481 18.2904C17.8365 17.584 18.5449 16.7115 19.0731 15.673H15.6807C15.4794 16.4153 15.2262 17.1368 14.9211 17.8375C14.616 18.5381 14.2878 19.1602 13.9365 19.7038ZM4.29805 14.1731H8.01538C7.95256 13.8013 7.90705 13.4369 7.87885 13.0798C7.85065 12.7227 7.83655 12.3628 7.83655 12C7.83655 11.6372 7.85065 11.2772 7.87885 10.9202C7.90705 10.5631 7.95256 10.1987 8.01538 9.82688H4.29805C4.2019 10.1666 4.12818 10.5198 4.0769 10.8865C4.02562 11.2532 3.99998 11.6243 3.99998 12C3.99998 12.3756 4.02562 12.7468 4.0769 13.1135C4.12818 13.4801 4.2019 13.8333 4.29805 14.1731ZM9.51535 14.1731H14.4846C14.5474 13.8013 14.5929 13.4401 14.6212 13.0894C14.6494 12.7388 14.6635 12.3756 14.6635 12C14.6635 11.6243 14.6494 11.2612 14.6212 10.9106C14.5929 10.5599 14.5474 10.1987 14.4846 9.82688H9.51535C9.45253 10.1987 9.40702 10.5599 9.3788 10.9106C9.3506 11.2612 9.3365 11.6243 9.3365 12C9.3365 12.3756 9.3506 12.7388 9.3788 13.0894C9.40702 13.4401 9.45253 13.8013 9.51535 14.1731ZM15.9846 14.1731H19.7019C19.7981 13.8333 19.8718 13.4801 19.9231 13.1135C19.9743 12.7468 20 12.3756 20 12C20 11.6243 19.9743 11.2532 19.9231 10.8865C19.8718 10.5198 19.7981 10.1666 19.7019 9.82688H15.9846C16.0474 10.1987 16.0929 10.5631 16.1211 10.9202C16.1493 11.2772 16.1634 11.6372 16.1634 12C16.1634 12.3628 16.1493 12.7227 16.1211 13.0798C16.0929 13.4369 16.0474 13.8013 15.9846 14.1731ZM15.6807 8.32693H19.0731C18.5384 7.27563 17.8349 6.40318 16.9625 5.70958C16.09 5.01599 15.0814 4.54163 13.9365 4.2865C14.3198 4.86855 14.6608 5.50509 14.9596 6.19613C15.2583 6.88716 15.4987 7.59743 15.6807 8.32693ZM9.85958 8.32693H14.1404C13.9083 7.49103 13.6163 6.72083 13.2644 6.01633C12.9125 5.31184 12.491 4.64678 12 4.02113C11.5089 4.64678 11.0875 5.31184 10.7356 6.01633C10.3836 6.72083 10.0916 7.49103 9.85958 8.32693ZM4.92688 8.32693H8.31922C8.50128 7.59743 8.74167 6.88716 9.0404 6.19613C9.33912 5.50509 9.68014 4.86855 10.0635 4.2865C8.91219 4.54163 7.90193 5.0176 7.03268 5.7144C6.16344 6.4112 5.46151 7.28204 4.92688 8.32693Z"
                                                                    fill="#1A1A1A"></path>
                                                            </g>
                                                        </svg>
                                                    </span>
                                                </span>
                                                <!-- ドロップダウンが開いている状態のときに表示 -->
                                                <span class="language-selector__text language-selector__text--open">
                                                    Language</span>
                                                <!-- ドロップダウンが閉じている状態で表示 -->
                                                <span class="language-selector__text language-selector__text--close"
                                                    aria-hidden="true">
                                                    Language</span>
                                                <!-- 視覚的には非表示だが、スクリーンリーダーにだけ読ませる -->
                                                <span class="language-selector__text language-selector__text--close u-visually-hidden">
                                                    Close</span>
                                                <!-- 下向き矢印「V」アイコンを格納 -->
                                                <span class="language-selector__arrow-icon">
                                                    <span aria-hidden="true" class="icon icon--px" role="img">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                            viewBox="0 0 24 24">
                                                            <path
                                                                d="M5 8.67L5.67 8L12 14.33L18.33 8L19 8.67L12 15.67L5 8.67Z"
                                                                style="fill:inherit;"></path>
                                                        </svg>
                                                    </span>
                                                </span>
                                            </button>

                                            <ul id="language-selector-mobile" class="language-selector__list"
                                                aria-hidden="true" hidden="">
                                                <li class="language-selector__item">
                                                    <a lang="ja" href="/" class="language-selector__link is-active"
                                                        aria-current="true">
                                                        <!-- チェックマークアイコンを格納 -->
                                                        <span class="language-selector__check-icon">
                                                            <span aria-hidden="true" class="icon icon--px" role="img">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="21"
                                                                    height="20" viewBox="0 0 21 20" fill="none">
                                                                    <mask id="mask0_329_310" style="mask-type:alpha"
                                                                        maskUnits="userSpaceOnUse" x="0" y="-1"
                                                                        width="21" height="21">
                                                                        <rect x="0.615723" y="-0.293945" width="20"
                                                                            height="20" fill="#D9D9D9"></rect>
                                                                    </mask>
                                                                    <!-- kという謎テキストが直接SVG内に記述 -->
                                                                    <g mask="url(#mask0_329_310)">
                                                                        k
                                                                        <path
                                                                            d="M8.57441 14.4169L4.12891 9.9714L5.01993 9.0804L8.57441 12.6349L16.2122 4.99707L17.1032 5.88807L8.57441 14.4169Z"
                                                                            fill="#00118F"></path>
                                                                    </g>
                                                                </svg>
                                                            </span>
                                                        </span>
                                                        日本語
                                                    </a>
                                                </li>

                                                <li class="language-selector__item">
                                                    <a lang="en" href="/en" class="language-selector__link ">
                                                        <span class="language-selector__check-icon"></span>
                                                        English
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <!--  -->
                                    <div class="header-dropdown__menu header-dropdown__menu--divider">
                                        <ul class="header-dropdown-list header-dropdown__quartary-menu">
                                            <li class="header-dropdown-list__item ">
                                                <a class="header-dropdown-list__link" href="/site-policy"
                                                    data-content="サイトポリシー">
                                                    <span class="header-dropdown-list__link-text">
                                                        サイトポリシー</span>
                                                    <span aria-hidden="true" class="icon icon--12px icon--link" role="img">

                                                        <svg width="12" height="12" viewBox="0 0 12 12"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M7.3813 1.67358L12.3591 6.59668L7.3813 11.5198L6.4582 10.5967L9.85825 7.19663H2.08008V5.99663H9.85816L6.4582 2.59668L7.3813 1.67358Z">
                                                            </path>
                                                        </svg>
                                                    </span>
                                                </a>
                                            </li>
                                            <li class="header-dropdown-list__item ">
                                                <a class="header-dropdown-list__link" href="/social-media-policy"
                                                    data-content="SNSポリシー">
                                                    <span class="header-dropdown-list__link-text">
                                                        SNSポリシー</span>
                                                    <span aria-hidden="true" class="icon icon--12px icon--link"
                                                        role="img"><svg width="12" height="12" viewBox="0 0 12 12"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M7.3813 1.67358L12.3591 6.59668L7.3813 11.5198L6.4582 10.5967L9.85825 7.19663H2.08008V5.99663H9.85816L6.4582 2.59668L7.3813 1.67358Z">
                                                            </path>
                                                        </svg>
                                                    </span>
                                                </a>
                                            </li>
                                            <li class="header-dropdown-list__item ">
                                                <a class="header-dropdown-list__link" href="/contact"
                                                    data-content="ご意見・ご要望">
                                                    <span class="header-dropdown-list__link-text">
                                                        ご意見・ご要望</span>
                                                    <span aria-hidden="true" class="icon icon--12px icon--link"
                                                        role="img"><svg width="12" height="12" viewBox="0 0 12 12"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M7.3813 1.67358L12.3591 6.59668L7.3813 11.5198L6.4582 10.5967L9.85825 7.19663H2.08008V5.99663H9.85816L6.4582 2.59668L7.3813 1.67358Z">
                                                            </path>
                                                        </svg>
                                                    </span>
                                                </a>
                                            </li>
                                            <li class="header-dropdown-list__item ">
                                                <a class="header-dropdown-list__link" href="/sitemap"
                                                    data-content="サイトマップ">
                                                    <span class="header-dropdown-list__link-text">
                                                        サイトマップ</span>
                                                    <span aria-hidden="true" class="icon icon--12px icon--link"
                                                        role="img"><svg width="12" height="12" viewBox="0 0 12 12"
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
                                </div>
                            </div>
                            <!-- ドロップダウンメニューが開いたときにページの背景を暗くするオーバーレイを定義 -->
                            <div class="header-dropdown__overlay" data-dropdown-overlay="header-dropdown"
                                aria-hidden="true"></div>
                        </div>
                    </div>
``` 
``` CSS
//  ドロップダウンメニュー「ハンバーガーアイコンとすべてのメニュー」←→「×メニューを閉じる」表示切り替え
.header-item__toggle[aria-expanded=false] .header-item__icon--close,
.header-item__toggle[aria-expanded=true] .header-item__icon--open,
.header-item__toggle[aria-expanded=false] .header-item__text--close,
.header-item__toggle[aria-expanded=true] .header-item__text--open {
  display: none;
}

// ハンバーガーアイコンと閉じる（×）アイコン
.header-item__icon {
  display: flex;
  height: 1rem;
  // 要素の垂直方向の移動量
  --tw-translate-y: 0.0625rem;
  // flexboxレイアウトにおける垂直方向のアイテムの整列方法
  align-items: center;
  // アイコンの変換（移動、回転、歪み、拡大縮小）を定義
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.header-dropdown {
  // ドロップダウンメニューの上部のボーダーの太さを1pxに設定
  border-top-width: 1px;
  /* ドロップダウンメニューの左端を、
     その親要素（position: relative, absolute, fixed のいずれかが設定されている要素）の左端に揃える */
  left: 0;
  /* ドロップダウンメニュー絶対配置：
      通常のドキュメントフローから外れ、最も近い position プロパティが relative, absolute, fixed の
      いずれかに設定されている祖先要素を基準に配置。基準がない場合は<html>要素を基準に配置 */
  position: absolute;
  // ドロップダウンメニューの右端を、その親要素の右端に揃える
  right: 0;
  // ドロップダウンメニューの上端を、その親要素の上端から 4.5rem 下に配置
  top: 4.5rem;
  // 前面に表示
  z-index: 1;
  // ボーダーの透明度を 1（不透明）
  --tw-border-opacity: 1;
  // 背景色を HSLA カラーモデル：88%不透明度の白色に設定
  background-color: hsla(0, 0%, 100%, .88);
  // ドロップダウンメニューのボーダーの色を RGB カラーモデル：216, 216, 216 のグレーに設定、透明度は上記
  border-color: rgb(216 216 216 / var(--tw-border-opacity));
  /* 影
     0: 水平方向のオフセット（影を左右にずらさない）
     0.25rem: 垂直方向のオフセット（影を下に 0.25rem ずらす）
     0.25rem: ぼかしの半径（影を 0.25rem ぼかす）
     0: 広がりの半径（影を広げない）
     rgba(0, 0, 0, .16): 影の色（黒色で 16% の透明度）*/
  --tw-shadow: 0 0.25rem 0.25rem 0 rgba(0, 0, 0, .16);
  // --tw-shadow-color が設定されていないため、実質的には --tw-shadow と同じ効果
  --tw-shadow-colored: 0 0.25rem 0.25rem 0 var(--tw-shadow-color);
  // ドロップダウンメニューに影
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

// ドロップダウンのコンテナ
.header-dropdown__container {
  // 水平方向、中央揃え
  margin-left: auto;
  margin-right: auto;
  /* 高さ calc(): 値を計算 */
  max-height: calc(100dvh - var(--header-block-size));
  max-width: 74.375rem;
  // コンテナの内容がコンテナの高さからはみ出す場合に、垂直方向のスクロールバーを表示
  overflow-y: auto;
  padding: 3rem 1.5rem 4rem;
  // スクロールバーの表示/非表示によってレイアウトが変動するのを防ぐ
  scrollbar-gutter: stable;
  width: 100%;
}
// ドロップダウンコンテナの内側
.header-dropdown__content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

// ドロップダウンコンテナ内の各項目
.header-dropdown-list__external-link, .header-dropdown-list__item {
  margin-bottom: .5rem;
}
.header-dropdown-list__external-link, .header-dropdown-list__link {
  align-items: center;
  border-radius: 1rem;
  display: flex;
  font-weight: 500;
  justify-content: space-between;
  min-height: 3rem;
  padding: .5rem 1.25rem;
}

// ドロップダウンコンテナ内の矢印アイコン
.header-dropdown-list__link .icon--link {
  align-items: center;
  border-radius: 624.9375rem;
  border-width: 1px;
  display: inline-flex;
  flex: none;
  height: 1.5rem;
  justify-content: center;
  width: 1.5rem;
  --tw-border-opacity: 1;
  // 青の囲い円
  border-color: rgb(0 17 143 / var(--tw-border-opacity));
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: rgb(0 17 143 / var(--tw-text-opacity));
}
// 矢印アイコンの位置調整
.header-dropdown-list__external-link .icon svg, 
.header-dropdown-list__link .icon svg {
  left: -1px;
  position: relative;
  top: -1px;
}

// ドロップダウンコンテナ内の区切り「|」
.header-dropdown-list__item [data-content="|"], .header-dropdown-list__item--desktop-only {
  display: none;
}

// ドロップダウンコンテナ内の右側メニュー
.header-dropdown__quartary-menu .header-dropdown-list__external-link, 
.header-dropdown__quartary-menu .header-dropdown-list__link {
  font-size: .875rem !important;
  min-height: 2.5rem;
}


// 項目選択時
.header-dropdown-list__link:hover {
  color: rgb(0 17 143/ 1) !important;
  outline-color: rgb(0 17 143/ 1) !important;
  outline-style: solid;
  outline-width: 1px;
  .icon--link {
    // 囲い円を青に塗る
    background-color: rgb(0 17 143/ 1) !important;
    --tw-text-opacity: 1;
    color: rgb(255, 255, 255) !important;
  }
}

```

``` js
  // 「すべてのメニュー」ドロップダウンの外部クリック
  const OtherMenuButton = document.getElementById('header-dropdown-toggle');
  const OtherMenu = document.getElementById('header-dropdown');

  if (OtherMenuButton && OtherMenu) {
    // クリックしたとき
    document.addEventListener('click', (event) => {
      if (
        // クリックされた要素が、言語選択ボタン内に含まれていないAND
        !OtherMenuButton.contains(event.target) &&
        // クリックされた要素が、言語選択メニュー内に含まれていないAND
        !OtherMenu.contains(event.target) &&
        // 現在言語選択ドロップダウンが開いている（aria-expanded が 'true'）
        OtherMenuButton.getAttribute('aria-expanded') === 'true'
      ) {
        // ドロップダウン開閉関数を実行
        toggleDropdown(OtherMenuButton, OtherMenu);
      }
    });
  }

    // Escキーによる閉じる処理
    // ドキュメント全体に対してキーダウンイベントリスナーを登録
    document.addEventListener('keydown', (event) => {
      // 押されたキーが「Esc」AND、ドロップダウンが開いている
      if (event.key === 'Escape' && 
        (OtherMenuButton.getAttribute('aria-expanded') === 'true')) {
        // ドロップダウン開閉関数を実行
        toggleDropdown(OtherMenuButton, OtherMenu);
      }
    });
``` 

