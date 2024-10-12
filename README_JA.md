<h3 align="center">
  <img
    src="https://quantaquestapp.com/logo.png"
    height="200"
  >
</h3>
<div>
  <p align="center">
    <a href="https://x.com/ethanfrostlove">
      <img src="https://img.shields.io/badge/Follow%20on%20X-000000?style=for-the-badge&logo=x&logoColor=white" alt="Follow on X" />
    </a>
    <a href="https://discord.gg/v5Ns5m7H">
      <img src="https://img.shields.io/badge/Join%20our%20Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Join our Discord" />
    </a>
  </p>
</div>
<div>
  <p align="center">
    <a href="./README.md"><img alt="README in English" src="https://img.shields.io/badge/English-d9d9d9"></a>
    <a href="./README_CN.md"><img alt="简体中文版自述文件" src="https://img.shields.io/badge/简体中文-d9d9d9"></a>
    <a href="./README_JA.md"><img alt="日本語のREADME" src="https://img.shields.io/badge/日本語-d9d9d9"></a>
  </p>
</div>

# Quanta Questとは何か？

「エッジサイドLLM + 消費者データのローカライゼーション」を中核的な開発方針とする世界初の製品です。現在、すべての消費者データ（Gmail、Notion、Dropboxなど）を統合し、AI駆動の検索を実現しています。

## Quanta Questの目標

1. ユーザーが Gmail、Notion、Dropbox、カレンダー、ドキュメント、ドライブ、iCloud などからすべてのデータを簡単にローカルに保存し、ベクターデータベースで処理できるようにすること（重要なデータをローカライズして保存・バックアップし、データ損失を防ぐ）。

2. 「エッジサイドLLM + 個人データ」➡️「パーソナライズされた、プライベートな、エッジサイドLLM（重要なデータがローカライズされた）」➡️「あなたを最もよく知るLLM、最もプライベートなLLM」。個人データと、increasingly一般的になりつつあるエッジサイドLLMを組み合わせて、最も安全で、プライバシーを重視し、あなたを最もよく理解する、パーソナライズされたエッジサイドLLMを訓練すること。

## 現在のQuanta Questのバージョン

1. ユーザーがNotion、Dropbox、Raindrops、Gmailなどのクラウドデータを、AWSのベクターデータベースに接続することをサポートしています。

2. ChatGPTやClaudeなどのLLMを組み合わせ、RAG（Retrieval-Augmented Generation）を使用して、パーソナライズされたAI駆動の検索を実現しています（Perplexicaはすべての公開情報を扱い、Quanta Questはすべての個人データの処理に焦点を当てています。一般ユーザーはPerplexicaに「明日の会議は何か」「xxプロジェクトから学んだ教訓は何か」「どのニュースレターを購読しているか」などを尋ねることはできませんが、Quanta Questにはこれらのあなたに関連するすべての質問をすることができます）。

## 詳細なユースケース図

1. Asking "What newsletters have I subscribed to?"

![newsletters](https://quantaquestapp.com/imgs/newsletters.png)

2. Which AI projects have recently received funding?

![aistartups](https://quantaquestapp.com/imgs/aistartups.png)

# 最新の情報を入手

GitHub上でQuanta Questにスターを付けることで、Difyに関する新しいニュースを受け取れます。

![githubstar](https://quantaquestapp.com/imgs/githubstar.gif)

# デプロイ方法

アプリケーションは2つの部分に分かれています：Next.jsとFastAPI

- Next.js（現在のプロジェクト）：このプロジェクトでは、主にページのレンダリング、認証、基本的なデータクエリなどに使用されています。
- FastAPI（quanta-quest-server）：このプロジェクトには、データ処理、AIクエリ、生成などのロジック、および一部のより複雑なロジックが含まれています。すべてのデータ定義はこのプロジェクトに基づいています。

## のプロジェクトのサードパーティ依存関係

- Kinde
  - ユーザーのログインと登録に使用され、マルチテナンシーを実装します
- Stripe
  - ユーザーの試用期間後の有料サブスクリプションに使用されます
- データベース - PostgreSQL
  - アプリケーションデータ用のデータベース

## のプロジェクトの環境変数

- `DATABASE_URL` - データベース接続
- `BASE_URL` - 現在のプロジェクトのアクセスURL
- `SERVER_URL` - バックエンドプロジェクトのアクセスURL
- `PRISMA_LOG_LEVEL` - Prismaログレベルの設定
- `KINDE_CLIENT_ID` - KindeでのプロジェクトユニークID
- `KINDE_CLIENT_SECRET` - Kindeでのプロジェクトシークレット（共有しないでください）
- `KINDE_ISSUER_URL` - Kinde上のアプリケーションURL
- `KINDE_SITE_URL` - アプリケーションが実行されているURL
- `KINDE_POST_LOGOUT_REDIRECT_URL` - ユーザーログアウト後のリダイレクトURL
- `KINDE_POST_LOGIN_REDIRECT_URL` - ユーザーログイン後のリダイレクトURL
- `KINDE_DEBUG_MODE` - Kindeのデバッグモード
- `STRIPE_MONTHLY_PRICE_ID` - Stripeの月額サブスクリプション価格
- `STRIPE_QUARTERLY_PRICE_ID` - Stripeの四半期サブスクリプション価格
- `STRIPE_YEARLY_PRICE_ID` - Stripeの年間サブスクリプション価格
- `NEXT_PUBLIC_PUBLISHABLE_KEY` - Stripeの公開可能キー
- `STRIPE_SECRET_KEY` - Stripeのシークレットキー

# ロードマップ

- [x] Notion
- [ ] Gmail
- [x] Dropbox
- [x] Raindrops
- [ ] RAGクエリの意図の最適化
- [ ] RAGクエリ結果の再ランキングの最適化
- [ ] Google Workspaceアプリケーション承認のためのCASAセキュリティ認証への対応
- [ ] データソースの範囲内でのベクター検索のサポート
- [ ] より多くのデータソースのサポート

# License

Copyright 2024 Quanta Quest Private Limited

Quanta Questライセンスに基づいてライセンスされています。ライセンスに準拠する場合を除き、このファイルを使用することはできません。

適用される法律で要求されるか、書面で合意されない限り、ライセンスに基づいて配布されるソフトウェアは、明示的または黙示的を問わず、いかなる種類の保証や条件もなく「現状のまま」提供されます。ライセンスの下での許可と制限に関する具体的な内容については、ライセンスをご覧ください。
