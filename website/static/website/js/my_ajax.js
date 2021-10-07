var ajax92 = {
    bind_form: function(selector, form_options){
        let form = $(selector);
        let poster_btn = form.find('[type="submit"]:first');
        form.submit(function(e){
            e.preventDefault();
            if(!form_options){
                form_options = {}
            }
            if(!$(form).attr('method'))
            {
                form_options.type = 'POST';
            }
            form_options.dataType = 'JSON';
            let submit_url = form.attr('action');
            if(!submit_url){
                submit_url = form_options.url;
            }
            form_options.success = function(data){
                let message = 'Invalid status response from API';
                if(data && data.status){
                    if(data.status == 'success'){
                        if(form_options.on_success)
                        {
                            form_options.on_success(data.data);
                        }
                        else{
                            console.log(data);
                        }
                        form[0].reset();
                        return;
                    }
                    else{
                        if(data.status == 'error' && data.message)
                        {
                            message = data.message;
                        }
                    }
                }
                if(form_options.on_error)
                {
                    form_options.on_error({message: message});
                }
                else{
                    form.find('.error-message:first').html(message+' in '+submit_url).show();
                    console.log(data.detail);
                }
            }

            form_options.error = function(data){
                let message = '';
                if(data && data.responseJSON && data.responseJSON.message)
                {
                    message = data.responseJSON.message;
                }
                else{
                    message = $(data.responseText);
                    message = ajax92.parseMessage(message, 'django');
                }
                if(form_options.on_error)
                {
                    form_options.on_error({message: message});
                }
                else{
                    form.find('.error-message:first').html(message+' in '+submit_url).show();
                }
            }

            form_options.complete = function(){
                poster_btn.removeAttr('disabled');
                if(form_options.on_complete){
                    form_options.on_complete();
                }
                $('textarea:visible, input:visible, select:visible').first().focus();
            }
            if(!form_options.url){
                form_options.url = form.attr('action');
            }
            if(!form.find(".error-message").length){
                form.prepend('<h5 class="error-message"></h5>');
            }
            form.find('.error-message:first').hide();
            poster_btn.attr('disabled', 'disabled');
            form.ajaxSubmit(form_options);
        })
    },
    http: function(ajax_options){
        if(!ajax_options){
            ajax_options = {}
        }
        ajax_options.dataType = 'JSON';
        submit_url = ajax_options.url;
        ajax_options.success = function(data){
            let message = 'Invalid status response from API';
            if(data && data.status){
                if(data.status == 'success'){
                    if(ajax_options.on_success)
                    {
                        ajax_options.on_success(data.data);
                    }
                    else{
                        console.log(data);
                    }
                    return;
                }
                else{
                    if(data.detail)
                    {
                        console.log(data.detail);
                    }
                    if(data.status == 'error' && data.message)
                    {
                        message = data.message;
                    }
                }
            }
            if(ajax_options.on_error)
            {
                ajax_options.on_error({message: message});
            }
            else{
                console.log(data.detail);
            }
        }

        ajax_options.error = function(data){
            let message = '';
            if(data && data.responseJSON && data.responseJSON.message)
            {
                message = data.responseJSON.message;
            }
            else{
                message = $(data.responseText);
                message = ajax92.parseMessage(message, 'django');
            }
            if(ajax_options.on_error)
            {
                ajax_options.on_error({message: message});
            }
            else{
                console.log(message);
            }
        }

        ajax_options.complete = function(){
            if(ajax_options.on_complete){
                ajax_options.on_complete();
            }
        }
        $.ajax(ajax_options);
    },
    parseMessage: function(arr, framework){
        let error_message = 'Error not parsed';
        switch(framework){
            case 'django':
                for(let el of arr){
                    if(el.id == 'summary')
                    {
                        if(el.childNodes.length>1)
                        {
                            el.innerHTML = el.childNodes[0].outerHTML + el.childNodes[1].outerHTML;
                        }
                        error_message = el.outerHTML;
                    }
                }
            break;
        }
        return error_message;
    }
}
$(function(){
    $('textarea:visible, input:visible, select:visible').first().focus();
});