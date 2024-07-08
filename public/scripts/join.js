const signInBtn = $("#signIn");
const signUpBtn = $("#signUp");
const container = $(".container");
const lookAroundBtn = $("#btn_look_around")
signInBtn.on("click", function() {
    container.removeClass("right-panel-active");
})
signUpBtn.on("click", function() {
    container.addClass("right-panel-active");
})
lookAroundBtn.on("click", function() {
    window.location.href = '/info';
})
const validateEmail = function() {
    const emailInput = $("#email").val();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (emailPattern.test(emailInput)) {
        return true;
    } 
};

const signIn = async ()=>{
    const qrDiv = $('#qr');
    const urlDiv = $('#url');
    const connBtn = $('#conn');

    const eventSource = new EventSource('/users/login',{withCredentials:true});
    eventSource.onerror = function(event) {
        console.error('Error occurred:', event);
        eventSource.close();
    };
    eventSource.onmessage = function(event){
      connBtn.remove();
      event = JSON.parse(event.data);
      if('url' in event && 'qr' in event){
        const newBtn = $('<button></button>', {
          class: 'join_btn',
          text:'url 클립보드로 복사'
        });
        const newImg = $('<img>', {
          class: 'col-md-9',
        });
        newBtn.click(()=>{
          navigator.clipboard.writeText(event.url)
            .then(function() {
                alert('url이 성공적으로 복사되었습니다. 기기에서 url을 입력해주세요');
            })
            .catch(function(err) {
                console.error('url 복사에 실패했습니다:', err);
            });
        })
        newImg.attr('src',event.qr);
        qrDiv.append(newImg);
        urlDiv.append(newBtn);
      }else{
        newDiv.text(event.message);
        urlDiv.append(newDiv);
      }
  };
}

$(document).ready(()=> {
  const btn= $('<button/>', {
    text: 'email 검증하기',
    id: 'email-validation-btn',
    class: 'join_btn',
    type:"button"
  });
  $('#email').on('input', ()=>{
      const statusEmail = validateEmail();
      if(statusEmail) {
        $('#email-validation-btn').remove()
        const el = $('#email-validation')
        el.append(btn)
      }
  });

  btn.on('click',()=>{
      const email = $('#email').val();
      if(email){
        axios.post('/auth/email',{email})
        .then((res)=>{
          $('#email-validation-btn').remove();
          // console.log(JSON.stringify(res))
          alert(res.data.msg);
        }).catch((err)=>{
          alert(err);
        });
      }
  })

});

