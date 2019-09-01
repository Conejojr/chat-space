$(function(){
  function buildHTML(message){
    var img = message.image.url ? `<img class="contents__chat__list__info__image" src="${message.image.url}">` : '';

    var html = `<div class="contents__chat__list" data-id="${message.id}">
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
  var url = location.pathname;
  if (window.location.href.match(/\/groups\/\d+\/messages/)){
    var reloadMessages = function() {
      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      last_message_id = $('.contents__chat__list:last').data('id')
      $.ajax({
        //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
        url: "api/messages",
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'get',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: {id: last_message_id}
      })
      .done(function(messages) {
        console.log(messages)
        messages.forEach(function(message){
          var html = buildHTML(message);
          $('.contents__chat').append(html)
        });
        $(".contents__chat").scrollTop( $(".contents__chat").get(0).scrollHeight )
      })
      .fail(function() {
        console.log('error');
      });
    };
  }
  setInterval(reloadMessages, 5000);
});