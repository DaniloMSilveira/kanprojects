
function login(e) {
    e.preventDefault();
    localStorage.removeItem('token');

    var user = {
        email: $("#email").val(),
        password: $("#password").val()
    }

    $.ajax({
        type : 'POST',
        url : "http://localhost:3333/login",
        dataType: "json",
        contentType: 'application/json',
        data: JSON.stringify(user)
   })
   .done(function(response){
        console.log('cai no done');
        console.log(response);
        if (response.status == 'success') {
            alert('Usuário logado com sucesso!');
            localStorage.setItem('token', response.token);
            window.location.href = '/main?token=' + response.token;
        } else {
            alert('Usuário não logado! Verifique os dados preenchidos');
        }
   })
   .fail(function(response){
        console.log('cai no fail');
        console.log(response.responseJSON);
        alert('Usuário não logado! Verifique os dados preenchidos');
   });
}
