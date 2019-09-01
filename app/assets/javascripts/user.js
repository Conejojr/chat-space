$(function(){
  function buildHTML(user){
    var html = `<div class="chat-group-user">
                  <p class="chat-group-user__name">${user.user_name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.user_id}" data-user-name="${user.user_name}">追加</div>
                </div>`
    return html;
  }


  
  $('#user-search-field').on('input', function(e){  
    e.preventDefault();
    var input = $("#user-search-field").val();
    // var href = (window.location.href);
    if (input == ""){
      $("#user-search-result").empty();
    }
    else{
      $.ajax({
        type: 'GET',
        url: '/users',
        data: {keyword: input},
        dataType: 'json',
      })
      
      .done(function(users){
        $("#user-search-result").empty();
        users.forEach(function(user){
          var html = buildHTML(user);
          $('#user-search-result').append(html);
        })
      })

      .fail(function(){
        alert('ユーザーを検索できませんでした');
      })
    }
  
  });
});

$(function(){
  
  function buildHTML(id,name){
    var html = `<div class='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`  
    return html;
  }

  $('#user-search-result').on('click', '.user-search-add', function(e){
  $('.chat-group-user__name').val();
  var id = $(this).attr("data-user-id")
  var name = $(this).attr("data-user-name")

  buildHTML(id,name)
  var html = buildHTML(id,name)
  $('#user-chat-member').append(html);

  $(this).parent().remove();

  });

  $('#user-chat-member').on('click', '.user-search-remove', function(e){
    $(this).parent().remove();
  });
});

