$(function(){
  function buildHTML(message){
    if (message.image) {
      let html =`<div class="MessageBox" data-message-id=${message.id}>
                  <div class="main-chat__message-list__forth-items__upper">
                    <div class="main-chat__message-list__forth-items__upper__name">
                      ${message.user_name}
                    </div>
                    <p class="main-chat__message-list__forth-items__upper__time">
                      ${message.created_at}
                    </p>
                  </div>
                  <div class="main-chat__message-list__forth-items__lower">
                    <p class="main-chat__message-list__forth-items__lower__message">
                      ${message.body}
                    </p>
                    <img class="main-chat__message-list__forth-items__lower__image" src="${message.image}">
                  </div>
                </div>`
                return html;
    } else {
      let html = 
      `<div class="MessageBox" data-message-id=${message.id}>
      <div class="main-chat__message-list__forth-items__upper">
        <div class="main-chat__message-list__forth-items__upper__name">
          ${message.user_name}
        </div>
        <p class="main-chat__message-list__forth-items__upper__time">
          ${message.created_at}
        </p>
      </div>
      <div class="main-chat__message-list__forth-items__lower">
        <p class="main-chat__message-list__forth-items__lower__message">
          ${message.body}
        </p>
      </div>
    </div>`
    return html;
    };
  }
  $('#new_form').on('submit',function(e){
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,  
      type: 'POST',  
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data)
      $('.main-chat__message-list').append(html);
      $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      $('#new_form')[0].reset();
      $('.main-chat__message-form__fifth-items__send-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });

  let reloadMessages = function() {
    let last_message_id = $('.main-chat__message-list__forth-items:last').data("message-id") || 0;
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main-chat__message-list').append(insertHTML);
        $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});