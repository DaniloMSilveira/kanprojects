
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
        if (response.status == 'success') {
            alert('Usuário logado com sucesso!');
            localStorage.setItem('token', response.token);
            window.location.href = '/home';
        } else {
            alert('Usuário não logado! Verifique os dados preenchidos');
        }
   })
   .fail(function(response){
        alert('Usuário não logado! Verifique os dados preenchidos');
   });
}
