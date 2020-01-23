$('.btn-primary').click(function(){
    function validateEmail(email) {
       var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       return re.test(String(email).toLowerCase());
   }
});

function validateform(){
    var nome = $('#nome').val().trim();
    var cognome = $('#cognome').val().trim();
    var username = $('#username').val().trim();
    var pass = $('#pass').val().trim();
    var confpass = $('#confpass').val().trim();
    var email = $("#email").val().trim();
    // valida nome
    if(nome.lenght < 4) {
        return false;
    }

    //valida cognome
    if(cognome.length < 4) {
        return false;
    }
    //valida username
    if(username.length < 7 || username.lenght > 20) {
    //     var formData = $('form').serialize();
    //     $.ajax({
    //         url: 'username.php',
    //         data: formData,
    //         error: function() {
    //             $('<img src="spunta.png">').insertAfter(".immagine");
    //             alert('giusto')
    //         },
    //         success: function(){
    //             $('<img src="xrossa.png">').insertAfter(".immagine");
    //             alert('già presente')
    //         }
            
    // })
        return false;
    }

    //valida pass e confirm pass
    if(pass!=confpass) {
        return false;
    }

    //valida email
    if(validateEmail(email)){
        return false;
    }

    if ($('#form').find('is-invalid').length >= 0) {
        return false;
    }
   
}



$('#form').submit(function(e){
    

    if(!validateform()) {
        e.preventDefault();
    }
});


$('#username').on('blur', function(){
    var elemento = $(this);

    $.ajax({
        url: 'username.php',
        data: {
            username: elemento.val()
        },
        method: 'post',
        dataType: 'json',

        success: function(result) {
            if (result.valid) {
                elemento.removeClass('is-invalid')
                elemento.addClass('is-valid')
            }
            else {
                elemento.removeClass('is-valid')
                elemento.addClass('is-invalid')
            }
        }
    })
})