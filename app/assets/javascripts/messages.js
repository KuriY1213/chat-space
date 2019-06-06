$(function(){
  function buildHTML(message){
    var image = (message.image.url)? `<div class="image-a">
      <image src = "${ message.image.url}" class ="lower-message__image">
      </div>` : ``;
    var html = `
      <div class="message-group" id = ${message.id}>
      <p class = "wrapper__main__body__chat__name">
      ${message.user_name}
      </p>
      <p class ="wrapper__main__body__chat__date">
      ${message.created_at}
      </p>
      <p class = "wrapper__main__body__chat__text">
      ${message.content}
      </p>
      ${image}`
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
        $(`.wrapper__main__body__chat`).append(html)
        $(`.textbox`).val('');
        $(`input`).prop("disabled", false);
        $(`#new_message`)[0].reset();
        $('.wrapper__main__body').animate({scrollTop: $('.wrapper__main__body')[0].scrollHeight}, 'fast');
      })
      .fail(function(){
        alert('error');
        $(`input`).prop("disabled", false);
      })
    })
})