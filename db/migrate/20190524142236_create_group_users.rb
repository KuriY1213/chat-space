class CreateGroupUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :group_users do |t|
      t.bigint :group, null: false, foreign_key: true
      t.bigint :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
