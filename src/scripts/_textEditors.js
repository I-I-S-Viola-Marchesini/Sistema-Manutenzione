document.querySelectorAll('.text-editor').forEach(function (textEditor) {
    //random id 
    let id = "e" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    textEditor.innerHTML = '\
    <form>\
        <textarea class="w-100" id="'+ id +'">Hello, World!</textarea>\
    </form>\
    '

    tinymce.init({
        selector: '#' + id,
        skin: "oxide",
        branding: false,
        promotion: false
    });

});