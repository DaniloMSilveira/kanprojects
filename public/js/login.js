
$(document).ready(function() {
    rememberMe();
});

function rememberMe() {
    if (localStorage.getItem('remember')) {
        $('#remember').attr('checked',true);
        $("#email").val(localStorage.getItem('email'));
    }
}

function login(e) {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('remember');
    localStorage.removeItem('email');

    if ($('#remember').is(':checked')) {
        localStorage.setItem('remember', true);
        localStorage.setItem('email', $("#email").val());
    }

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
            localStorage.setItem('token', response.token);
            localStorage.setItem('user_id', response.user.id);
            window.location.href = '/home';
        } else {
            alert('Usuário não logado! Verifique os dados preenchidos');
        }
   })
   .fail(function(response){
        alert('Usuário não logado! Verifique os dados preenchidos');
   });
}
