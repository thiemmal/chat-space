# Chat Space CB設計
## messages テーブル
|Column|Type|Options|
|------|----|-------|
|body|text|null: false, index|
|image|string||
|group_id|integer|foreign_key: true|
|user_id|integer|foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|username|string|null: false, index|
|email|string|null: false|
|password|string|null: false|
### Association
- has_many :messages
- has_many :users_groupes
- has_many :groupes, through: :users_groupes

## groupesテーブル
|Column|Type|Options|
|------|----|-------|
|group|string|null: false|
### Association
- has_many :messages
- has_many :users_groupes
- has_many :users, through: :users_groupes

## users_groupesテーブル
|Column|Type|Options|
|------|----|-------|
|users_id|integer|null: false, foreign_key: true|
|groupes_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :groupe