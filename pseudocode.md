# 擬似的な構成。データの扱い

更新日5/9

データの動きを表すときにJSONを使っていますがそれを指示しているわけではなく、
適宜変更してください

## データの管理

### webの方のやつ

localStorage等で保存する感じ

- チーム名

### GAS等スプレッドシート

- チーム名データ
- レベル等データ
- 実績達成データ

## ユーザー関連

### ユーザー確認

request値

```json
{
 "teamName": "abc12345",
 "password": "abcd12345"
}
```

response値

```json
{
 "status": 200,
}
```

### ユーザー登録

googleフォームにて実施

### ステータス表示

request値

```json
{
 "teamName": "abc12345"
}
```

response値

status未定

```json
{
 "teamName": "abc12345",
 "teamSize": 6,
 "status": {},
 "discoveryCount": {
  "checkpoint": 5,
  "mentor": 6
 }
}
```

### ランキング表示

request値 無し

response値

```json
[
 {
  "rank": 1,
  "teamName": "abc12345",
  "level": 100,
 },{
  "rank": 2,
  "teamName": "Reactガチ勢",
  "level": 80,
 },{
  "rank": 3,
  "teamName": "エナドリ同好会",
  "level": 60,
 },{
  "rank": 4,
  "teamName": "スタレ同好会",
  "level": 50,
 },{
  "rank": 5,
  "teamName": "原神研究会",
  "level": 45,
 }
]
```

## レベルアップ概念

未定なんであんま考えてない

## 地図概念

基本的に大体web側で処理するけどそのチームが何個したかは残さなきゃ行けない

### チェックポイント等の実績の達成

request値

1がチェックポイント2がメンターTA

```json
{
 "type": 1,
 "teamName": "abc12345",
 "achievementId": 1,
}
```

response値

```json
{
 "status": 200,
}
```

### 実績達成の一覧

例えば完了したものが薄くなるとか...

request値

```json
{
 "type": 1,
 "teamName": "abc12345"
}
```

response値

```json
[1,2,3,4,5,6]
```
