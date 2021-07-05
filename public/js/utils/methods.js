function preencheComboComAjax(data,combo) {
    combo.find('option').remove();
    $('<option style="display:none" disabled selected/>').val("").text('').appendTo(combo)
    $.each(data, (i, d) => {
        $('<option>').val(d.id).text(d.title).appendTo(combo);
    });
}