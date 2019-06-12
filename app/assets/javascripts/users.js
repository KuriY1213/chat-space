$(document).on('turbolinks:load', function(){
  $(function(){
    var search_list = $("#user-search-result");
    var member_list = $("#chat-group-users");

    function appendUser(user){
      var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${ user.name }</p>
                    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add js-add-btn" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
                  </div>`
    search_list.append(html);
    }
    function appendNotUser(user){
      var html = 
      `<div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${ user }</p>
      </div>`
    search_list.append(html);
    }
    function addUsers(id,name){
      var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-22'>
                    <input name='group[user_ids][]' type='hidden' value='${ id }'>
                    <p class='chat-group-user__name'>${ name }</p>
                    <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                  </div>`;
      member_list.append(html);
    }
    $(function(){
      $("#user-search-field").on("keyup", function(){
        var input = $("#user-search-field").val();
        $.ajax({
          type: 'GET',
          url: '/users',
          data: { keyword: input },
          dataType: 'json'
        })
        
        .done(function(users) {
        $("#user-search-result").empty()
          if (users.length !== 0) {
            users.forEach(function(user){
            appendUser(user);
            });
          }
          else {
            appendNotUser("一致するユーザーがいません。");
          }
        })
        .fail(function() {
          alert('ユーザー検索に失敗しました');
        })
      });
      $(function(){
        $("#user-search-result").on("click",".user-search-add", function(){
          $(this).parent().remove();
          $('#chat-group-users').val();
          var id = $(this).data('user-id');
          var name = $(this).data("user-name")
          var html = addUsers(id,name)
          $('#chat-group-users').append(html);
        });
        $(document).on("click", ".user-search-remove", function(){
          $(this).parent().remove();
        });
      });
    });
  });
});