# slackのワークフローで匿名の質問・回答
slackのチャンネルで匿名で質問と回答ができるワークフローを作成する。<br>

## 環境構築
slackのワークスペースとslack appを作ってあることが前提とする。<br>
slack appは[bolt公式](https://slack.dev/bolt-js/ja-jp/tutorial/getting-started)を参照

### slack cliのインストール
macOSとLinuxの場合
```
curl -fsSL https://downloads.slack-edge.com/slack-cli/install.sh | bash
```
windowsの方やエラーが起きた場合は[公式](https://api.slack.com/automation/cli/install-mac-linux)を参照。

### npm install
node modulesを生成する
```
cd bolt
npm install
```

### 環境変数の設定
slack appで作った変数を`.env`に記載する。
```
SLACK_SIGNING_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SLACK_BOT_TOKEN=xoxb-xxxxxxxxxxxxxxxxxx-xxxxxxxxxxxxxx
PORT=3000
```
.slackディレクトリを作成し、その配下に`config.json`を作成する。
```
{
  "project_id": "xxxxxxxxxxxxxxxxxxxxx" // 自分のプロジェクトIDs
}
```

### slack cliでログインする
ワークスペースにlogin
```
slack login
```
`/slackauthticket xxxxxxxxx`をコピーしワークスペースに投稿する。<br>
投稿すると、`token`が発行されるので`token`をターミナル側で貼り付ける。
```
Enter challenge code <token>
```
これでslackにログインできる。

### ローカルでサーバーを立ち上げる
typescriptをコンパイルする。
```
npm run tsc
```
tscでエラーになる場合はtypescriptをグローバルでinstallする。
```
npm install -g typescript
```
サーバーを立ち上げる。
```
slack run local
```


## 質問
1. URLからワークフローを起動
2. フォームのモーダルを表示
3. 内容を記載
  - メンション
  - 質問ラベル
  - 回答期限
  - 質問内容
      * マークダウンの記述ができる
      * 画像を添付することができる
4. 送信ボタンをクリック
5. チャンネルにメッセージが送信される
  - アプリが投稿し誰が投稿したかはわからない
  - 投稿ないように「回答」ボタンが設置されている

## 回答
1. 質問にある「回答」ボタンをクリック
2. 回答用のモーダル表示
3. 内容を記載
  - マークダウンの記述ができる
  - 画像を添付することができる
4. 送信ボタンをクリック
5. スレッドに回答が投稿される
  - 質問の「回答」ボタンは残る
  - 誰が回答したかはわからない
