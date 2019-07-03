$(function(){
  function buildHTML(message){
    image = (message.image.url)? `<img src=${message.image.url} class="lower-message__image" >`: "";
    var html = `
      <div class="message-group" data-id="${message.id}">
        <p class="wrapper__main__body__chat__name">
          ${message.user_name}
        </p>
        <p class="wrapper__main__body__chat__date">
          ${message.created_at}
        </p>
        <div class="wrapper__main__body__chat__text">
          ${message.content}
          ${image}
        </div>
      </div>`
      return html;
  }
    $('#new_message').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action')
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){
        var html = buildHTML(data);
        $(`#message`).append(html)
        $(`input`).prop("disabled", false);
        $(`#new_message`)[0].reset();
        $('.wrapper__main__body').animate({scrollTop: $('.wrapper__main__body')[0].scrollHeight}, 'fast');
      })
      .fail(function(){
        alert('error');
        $(`input`).prop("disabled", false);
      });
    });

    var reloadMessages = function(){
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
        var last_message_id = $('.message-group').last().data('id');
        $.ajax({
          url: "api/messages",
          type: 'get',
          data: {id: last_message_id},
          dataType: 'json'
        })
        .done(function(messages){
          var insertHTML = "";
          messages.forEach(function(message){
            insertHTML = buildHTML(message);
            $(`#message`).append(insertHTML);
          })
          $('.wrapper__main__body').animate({scrollTop: $('.wrapper__main__body')[0].scrollHeight}, 'fast');
        })
        .fail(function(){
          alert('error');
        });
      } else {
        clearInterval(interval)
      };
    };
  setInterval(reloadMessages, 5000);
});