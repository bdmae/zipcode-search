# 郵便番号検索アプリ

このアプリは、ユーザーが郵便番号を入力すると、対応する住所を検索して表示するシンプルなVueアプリケーションです。検索履歴の表示やエラーハンドリングも対応しています。

## 📦 主な技術

- [Vue 3](https://vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)（状態管理）
- [ZipCloud API](https://zipcloud.ibsnet.co.jp/doc/api)

## 🚀 機能概要

- 郵便番号を入力して検索
- 該当する住所の表示
- 検索履歴の保存と表示（Piniaで管理）
- APIエラー、ネットワークエラーの表示（Piniaで管理）

📋 機能一覧
✅ 郵便番号検索
入力された郵便番号を zipcloud API で検索

住所情報を画面に表示

✅ 検索履歴の保存
最新の検索結果を履歴として Pinia に保存
履歴は画面に一覧表示

✅ エラーハンドリング
存在しない郵便番号：notFound エラー表示

通信エラー：networkError エラー表示


## 🛠 使用方法

> ⚠️ このプロジェクトは [pnpm](https://pnpm.io/) を使用しています。未インストールの場合は以下のコマンドでグローバルにインストールしてください：
>
> ```bash
> npm install -g pnpm
> ```

### 1. リポジトリをクローン

```
git clone https://github.com/your-username/zipcode-search.git
cd zipcode-search
```

### 2. 依存パッケージのインストール
```
pnpm install
```

### 3. 開発サーバーの起動
```
pnpm dev
```

### 4. ブラウザで表示
http://localhost:5173 にアクセスしてください。


