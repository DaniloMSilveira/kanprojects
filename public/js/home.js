$(document).ready(function() {
    populaProjetos();
});

function populaProjetos() {
    $.ajax({
        type: "GET",
        url: "/projects",
        headers: {
            Authorization: 'Bearer '+localStorage.getItem('token')
        },
        //data: {  },
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: response => {
            if (response != null) {
                preencheComboComAjax(response.projects,$('#project'));
            }
        }
    });
}