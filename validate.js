var ValidateUtil = function(formSelect){
    this.form = $(formSelect);
    var obj = this;
    
    
    
    this.run = function(beforeFun,afterFun){

        if(typeof beforeFun == 'function'){
            beforeFun();

        }
        var form = this.form;
        var obj = this;
        var validate = true;
        form.find('*').each(function(){
            var type = $(this).attr('data-validate');
            var val = $(this).val();
            var length = $(this).attr('data-length');
            var error = $(this).attr('data-error');
            console.log(type);
            if(type!=null) {
                return validate = eval('obj.'+type+'Vali(val,error)');
            }
            if(length != null) {
                length = length.split('/');
                return validate =  obj.checkLength(val,length,error);
            }
            

        });
        if(typeof afterFun == 'function') {
            afterFUn();
        }
        return validate;
        
    }
    this.help = function(){
        
    }
    
    
    this.checkLength = function(val,length,error){
        var isNotNull = length[0] == 1;
        
        if(isNotNull) {
            if( val == '') {
                alert(error+" 필수항목 입니다.");
                return false;
            }
        } else {
            var isLowLength = val.length < length[0];
            var isOverLength = val.length > length[1];
            if(isLowLength) {
                alert(error +' ' +length[0]+'이상 입력하여야 합니다.');
                return false;
            }
            if(isOverLength){
                alert(error +' ' +length[1]+'이하로 입력하여야 합니다.');
                return false;
            }
            
        }
        console.log(val);
        console.log(length);
    }
    
    this.emailVali = function(val){
        var regExp = /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/;
        if(!regExp.test(val)) {
            alert('잘못된 이메일형식 입니다.');
            return false;
        }
    }
    this.numberVali = function(val,error){
        if(isNaN(val)) {
            
            alert(error+' 숫자만 입력 가능합니다.');
            return false;
        }
        return true;
    }
}