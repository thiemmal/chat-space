$(function(){

  $("#UserSearch__field").on("keyup", function(){
    let input = $("#UserSearch__field").val();
    $.ajax({
      type: 'GET',    
      url: '/users',       
      dataType: 'json',
      data: { keyword: input },   //テキストフィールドに入力された文字を設定する
    })
  })
});