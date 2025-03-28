// postcss.config.js

/**
 * PostCSS の設定ファイルです。
 * PostCSS は、CSS を変換するためのツールキットであり、
 * プラグインを組み合わせて様々な処理を行うことができます。
 */
module.exports = {
    /**
     * `plugins` オブジェクトは、PostCSS が使用するプラグインを定義します。
     * キーがプラグインの名前、値がプラグインの設定オブジェクト（または単純に `true` でデフォルト設定を適用）です。
     * ここに記述された順序でプラグインが実行されます。
     */
    plugins: {
      /**
       * `tailwindcss: {}` は、Tailwind CSS を PostCSS プラグインとして有効化します。
       * Tailwind CSS は、ユーティリティファーストな CSS フレームワークであり、
       * `tailwind.config.js` ファイルで定義された設定に基づいて、
       * `@tailwind` ディレクティブなどを処理し、最終的な CSS を生成します。
       * 空のオブジェクト `{}` は、Tailwind CSS プラグインにデフォルトの設定を使用することを意味します。
       */
      tailwindcss: {},
  
      /**
       * `autoprefixer: {}` は、Autoprefixer を PostCSS プラグインとして有効化します。
       * Autoprefixer は、Can I Use のデータに基づいて、必要なベンダープレフィックス
       * （例: `-webkit-`, `-moz-` など）を CSS ルールに自動的に追加します。
       * これにより、さまざまなブラウザで CSS がより互換性を持って動作するようになります。
       * 空のオブジェクト `{}` は、Autoprefixer プラグインにデフォルトの設定を使用することを意味します。
       */
      autoprefixer: {},
    },
  };