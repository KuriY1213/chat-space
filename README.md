# README

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true, index|

### Association
- has_many :group_users
- has_many :messages
- has_many :users, through: :group_users

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true, index|

### Association
- has_many :groups, through: :group_users
- has_many :group_users
- has_many :messages

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|user_id|bigint|null :false,foreign_key: true| 
|group_id|bigint|null :false,foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## group_usersテーブル（中間テーブル）

|Column|Type|Options|
|------|----|-------|
|user_id|bigint|null :false,foreign_key :true|
|group_id|bigint|null :false,foreign_key :true|

### Association
- belongs_to :group
- belongs_to :user