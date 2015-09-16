(function ($){
    $(document).ready(function (){
        $("#form_cart").validate({
            rules: {
                username: {
                    required: true,
                    minlength: 3
                },
                first_name: {
                    required: true,
                    number: false,
                    minlength: 2
                },
                last_name: {
                    required: true,
                    number: false,
                    minlength: 2
                },
                phone: {
                    required: true,
                    number: true,
                    minlength: 11,
                    maxlength: 11
                },
                address: {
                    required: true,
                    minlength: 5
                },
                city: {
                    required: true,
                    minlength: 3
                },
                zip: {
                    required: true,
                    minlength: 6,
                    maxlength: 6
                },
                email: {
                    required: true,
                    email: true
                }
            }
        });
    });
})(jQuery);