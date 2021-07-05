$(document).ready(function() {
    setTimeout(() => {if (localStorage.getItem('token')) {
        var token = localStorage.getItem('token')
        $.ajax({
            type: "GET",
            url: "/usersall",
            headers: {
                Authorization: 'Bearer '+token
            },
            //data: {  },
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success: response => {
                if (response != null) {
                    console.log('token válido!');
                }
            },
            error: (xhr, ajaxOptions, thrownError) => {
                if (xhr.status == 401)
                    reiniciarSessao();
            }
        });
    } else {
        reiniciarSessao();
    }},200);
});

function reiniciarSessao() {
    alert('Sua sessão expirou! Você será direcionado para a página de login')
    window.location.href = '/';
}
