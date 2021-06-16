
function register(e) {
    e.preventDefault();
    var user = {
        name: $("#name").val(),
        email: $("#email").val(),
        password: $("#password").val()
    }

    $.ajax({
        type : 'POST',
        url : "http://localhost:3333/users",
        dataType: "json",
        contentType: 'application/json',
        data: JSON.stringify(user)
   })
   .done(function(response){
        if (response.status == 'success') {
            alert('Usuário cadastrado com sucesso!');
            window.location.href = '/login';
        } else {
            alert('Usuário não cadastrado! Verifique os dados preenchidos');
        }
   })
   .fail(function(response){
        alert('Usuário não cadastrado! Verifique os dados preenchidos');
   });
}
