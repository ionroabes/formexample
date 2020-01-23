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
    var richiestapendente = false;
    // valida nome
    if(nome.length < 4) {
        return false;
    }

    //valida cognome
    if(cognome.length < 4) {
        return false;
    }
    //valida username
    if(username.length < 7 || username.length > 20) {
        return false;
    }

    //valida pass e confirm pass
    if(pass!=confpass) {
        return false;
    }

    //valida email

    $('#email').on('blur', function(){
        var elemento = $(this);
        var email = $(this).val().trim();

        if(validateEmail(email)){
            if(!richiestapendente){

                

                $.post(
                    'email.php',
                    {
                        email: email
                    },
                    'json',
            
                    function(result) {
                        if (result.valid) {
                            elemento.removeClass('is-invalid')
                            elemento.addClass('is-valid')
                        }
                        else {
                            elemento.removeClass('is-valid')
                            elemento.addClass('is-invalid')
                        }
                        richiestapendente = false;
                    }
                )
            }
            richiestapendente = true;
            

        }
        else{

        }
        
        return false;
    })

    if ($('#form').find('.is-invalid').length >= 0) {

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
    var username = $('#username').val().trim();
    if (username.length >= 7 && username.length <= 20){
        // if(richiestapendente == true){

        // }
        // else{
        //     console.log('va')
        
        // richiestapendente = true
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
    // }
    } else {
        console.log('non va')
        elemento.removeClass('is-valid')
        elemento.addClass('is-invalid')
    }
    // richiestapendente= false;
})


$('#email').on('input', function(){
    var elemento = $(this);
    $.post({
        url: 'email.php',
        data: {
            email: elemento.val()
        },
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