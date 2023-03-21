<script src="vendor/tinymce/tinymce/tinymce.min.js"></script>
<script>
    tinymce.init({
        selector: '#tinymce',
        skin: "oxide",
        branding: false,
        promotion: false
    });
</script>
<div class="container-fluid pt-4">
    <form>
        <textarea class="w-100" id="tinymce">Hello, World!</textarea>
    </form>
</div>