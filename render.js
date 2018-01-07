var RenderUtil = function(className){
        
    this.index = 0;
    this.className = className;
    this.setObj = function(obj){
        
        this.obj = $(obj).attr('data-type','test');
        this.obj.attr('class',this.className);
    }
    
    
    this.renderHTML = function(target,fun){
        var tmp = this.obj.clone();
        $(target).html(tmp);
        tmp.attr('data-index',this.index++);
        
        if(typeof fun == 'function') {
            fun(); 
        }
        
    }
    
    
    this.renderAppend = function(target,fun){
        var tmp = this.obj.clone();
        $(target).append(tmp);
        tmp.attr('data-index',this.index++);
        if(typeof fun == 'function') {
            fun();
        }
    }
}