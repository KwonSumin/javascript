var SimpleModalObject = function(modalName,modalTitle,body){
    this.modalName = modalName;
    this.modalTitle = modalTitle;
    this.body = body;
    
    this.render = function(target) {
        var modalName = this.modalName;
        var title = this.modalTitle;
        var body = this.body;
        renderModal(target,modalName,title,body);
        this.modal = $('.'+modalName+'Modal');
    }
    this.setBody = function (bodyObj) {
        this.body = bodyObj;
    }
    this.hide = function(){
        var select = "."+this.modalName+'Modal';
        $(select).hide();
    }
    this.show = function(){
        var select = "."+this.modalName+'Modal';
        $(select).show();
    }
    
}





    var bodyUtil = function(eleArray){

       return {
            wrapper : $('<div class="info-inputWrapper" />'),
            elements : eleArray,
            output : function(){
                var result = this.wrapper;
                if(this.elements != null) {
                    for(i=0;i<=this.elements.length-1;i++){
                        result.append(this.elements[i]);
                    }
                }
                return result;

            },
            elementEvent : function(){
                //유효성검사 이벤트 리스너 등 등록.

            }
       };

    };

    function createRadios(radioObj,fieldName){
        var wrapper = $('<div/>');
        wrapper.attr('class','radioField-'+radioObj.name);
        var radio = $('<input type="radio" />');
        radio.attr('name',radioObj.name);
        for(i=0;i<=radioObj.value.length-1;i++) {
            radio.attr('value',radioObj.value[i]);
            var temp = radio.clone();
            wrapper.append(temp);
            temp.after(radioObj.value[i]);
            
        }
        if(fieldName!=null) {
            var field = $('<span/>');
            field.html(fieldName);
            wrapper.prepend(field);
        }
        return wrapper;
    }
    
    function createInput(tagName,attrObj,options){
        var tagObj = $('<'+tagName+'/>');
        tagObj.attr(attrObj);
        console.log(tagObj);
        var isUseField = tagObj.attr('data-field')!=null;
            
        
        var fieldName = tagObj.attr('data-field');
        var wrapper = $('<div class="'+tagObj.attr('name')+'Wrapper"/>');
        var field = $('<span class="field-name"/>');
        field.html(fieldName);
        wrapper.append(field);
        wrapper.append(tagObj);
        
        if(tagObj.attr('data-inner')!=null) {
            tagObj.after(tagObj.attr('data-inner'));
        }
        
        
        if(options != null ) {
            for(i=0;i<=options.length-1;i++) {
                var option = $('<option/>');
                option.attr(options[i]);
                option.html(options[i].value);
                tagObj.append(option);
            }
        }
        
        return wrapper;
        
        
    }
    
    function createForm(formClass,elements,method,action){
        var form = $('<form class="temp-form"/>');
        for(i=0;i<=elements-1;i++) {
            form.append(elements[i]);
        }
        form.removeClass('temp-form');
    }
    
    function renderModal(target,modalName,title,bodyObj){
        var modalObj = modalUtil();
        modalObj.inst(modalName);
        //var target = $('body')
        target = $(target);
        var html = '<div class="style-modal tempClass">';
        html    +=     '<div class="style-modal-header">';
        html    +=         '<span class="style-modal-close" >x</span>';
        html    +=     '</div>';
        html    +=     '<h2 class="style-modal-title">'+title+'</h2>';
        html    +=     '<div class="style-modal-body" ></div>';
        html    +=     '<div class="style-modal-footer">';
        html    +=         '<div class="style-modal-agreeBtn">확인</div>';
        html    +=         '<div class="style-modal-closeBtn">취소</div >';
        html    +=     '</div>';
        html    += '</div>';
        target.append(html);
        
        target.addClass();
        var modalTarget = target.find('.tempClass');
        
        modalTarget.addClass(modalName+"Modal");
        modalTarget.find('.style-modal-close').addClass(modalName+"Modal-close");
        modalTarget.find('.style-modal-closeBtn').addClass(modalName+"Modal-close");
        
        var modal = $('.tempClass');
        if(bodyObj!=null) {
            
            bodyObj.modalSubmit = modalTarget.find('.style-modal-agreeBtn');
            modal.find('.style-modal-body').append(bodyObj);
            try{
                bodyObj.elementEvent();
            }catch(e){
                
            }
        }
        modal.removeClass('tempClass');
        modalObj.showEvent();
        modalObj.closeEvent();
        
        var result = {
            modal : {},
            modalBody : {
                modalSubmit : '',
                elementEvent : function(){},
                output : function(){}
            }
        };
        
        
        
        result.modal = modalObj;
        result.modalBody = bodyObj;
        
        
        return result;
        
        
        
        
        
        
        
        //native code functions
        function modalUtil() {
            return {
                close : "",
                show : "",
                modal : "",
                overLay : "",
                hasneedConsole : false,
                showEvent : function(){
                    var obj = this;
                    $(obj.show).click(function(){
                        $(obj.modal).show();
                        $(obj.overLay).show();
                    })
                },
                closeEvent : function(){
                    var obj = this;
                    console.log($(obj.close))
                    $(obj.close).click(function(){
                        $(obj.modal).hide();
                        $(obj.overLay).hide();
                    })
                },
                inst : function(modalName,overLay) {
                    this.modal = "."+modalName+"Modal";
                    this.close = "."+modalName+"Modal-close";
                    this.show = "."+modalName+"Modal-show";
                    this.showEvent();
                    this.closeEvent();
                    return this;
                }
            }
        }
    }