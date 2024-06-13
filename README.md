# 献立ジェネレーター

<img src="docs/images/top-screen.png" width="50%" />

## アプリの概要
このアプリはAIが自動で献立を提案してくれる機能を持っています

### 主な機能
- 入力条件からAIが献立の生成
- 生成された献立をお気に入り登録

### 使用した技術
#### フロントエンド
- Expo
- expo-router
- React Native
- Tamagui

#### バックエンド
- Kotlin
- Spring Boot

## 環境構築
* 環境構築にはDockerを使用します。まだインストールしていない場合は \
下記の記事を参考にPodman,Rancher Desktop等をインストールしてくだい。 \
https://zenn.dev/cloud_ace/articles/docker-desktop-verification

1. `/app`に`.env`を作成。入力内容は以下を参考。
```.env
EXPO_PUBLIC_API_URL=<APIのエンドポイント>
EXPO_PUBLIC_CLIENT_ID=<GITHUB APPのCLIENT ID>
EXPO_PUBLIC_CLIENT_SECRET=<GITHUB APPのCLIENT SECRET>
```

2. `/backend`に`.env`を作成。入力内容は以下を参考。
```.env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=menu_db
CLAUDE_API_KEY=<ClaudeのAPI KEY>
```

3. `docker compose up db`を実行。
4. Spring Bootの実行。
5. `npm run ios`を実行。


