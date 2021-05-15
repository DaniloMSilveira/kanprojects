
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
        console.log('cai no done');
        console.log(response);
        if (response.status == 'success') {
            alert('Usuário cadastrado com sucesso!');
            window.location.href = '/login';
        } else {
            alert('Usuário não cadastrado! Verifique os dados preenchidos');
        }
   })
   .fail(function(response){
        console.log('cai no fail');
        console.log(response.responseJSON);
        alert('Usuário não cadastrado! Verifique os dados preenchidos');
   });
}
