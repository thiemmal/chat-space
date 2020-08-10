$(function(){
  function buildHTML(message){
    if (message.image) {
      let html =`<div class="main-chat__message-list__forth-items">
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
    `<div class="main-chat__message-list__forth-items">
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
});