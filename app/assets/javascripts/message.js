$(function(){
  function buildHTML(message){
    var img = message.image.url ? `<img class="contents__chat__list__info__image" src="${message.image.url}">` : '';

    var html = `<div class="contents__chat__list">
                  <div class="contents__chat__list__info">
                    <div class="contents__chat__list__info__name">
                      <p class="class">
                        ${message.user_name}
                      </p>
                    </div>
                    <div class="contents__chat__list__info__text">
                      <p class="class">
                        ${message.message}
                      </p>
                    </div>
                    ${img}
                  </div>
                  <div class="contents__chat__list__time">
                    <p>
                      ${message.create_at}
                    </p>
                  </div>
                </div>
                  `
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var href = (window.location.href);
    
    $.ajax({
      type: 'POST',
      url: href,
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      var html = buildHTML(data);
      $('.contents__chat').append(html)
      $("#new_message")[0].reset();
      $(".contents__chat").scrollTop( $(".contents__chat").get(0).scrollHeight )
      $('.contents__footer__send').prop('disabled', false);
    })
    .fail(function(){
      alert('メッセージの送信に失敗しました');
    })
    
  })
});