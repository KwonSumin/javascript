var FormUtil = function(){
    this.form = $('<form/>');
    
    this.setAction = function(action){
        this.form.attr('action',action);
    }
    this.setMethod = function(method){
        this.form.attr('method',method);
    }
    this.renderHTML = function(target){
        $(target).html(this.form);
    }
    this.renderAppend = function(target){
        $(target).append(this.form);
    }
    
}