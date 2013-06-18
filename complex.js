!function($){
    $.fn.complexScore = function(options, callback){
        var MIN_COMPLEXITY = 60, 
            MAX_COMPLEXITY = 120;
        
            CHARSETS = [
                [0x0030, 0x0039], // Numbers
                [0x0041, 0x005A], // Uppercase
      			    [0x0061, 0x007A], // Lowercase
    				    [0x0021, 0x002F], 
    				    [0x003A, 0x0040],
    				    [0x005B, 0x0060], 
    				    [0x007B, 0x007E] 
            ],
            
            defaults = [
                mininumChars : 8,
                strengthScaleFactor : 1
            ];
            
        options = $.extend(defaults, options);
        
        return this.each(function(){
            $(this).bind('keyup',function(){
                var _psw = $(this).val(),
                    _complexity = 0, 
                    _valid = false;
                
                for(var i=0, len=CHARSETS.length;i<len;i++)
                {
                    _complexity += getCharset(_psw, CHARSETS[i]);
                }
                
                _complexity = Math.log(Math.pow(_complexity, password.length)) * (1/options.strengthScaleFactor);

  				      _valid = (complexity > MIN_COMPLEXITY && password.length >= options.mininumChars);


					      _complexity = (_complexity / MAX_COMPLEXITY) * 100;
					      _complexity = (_complexity > 100) ? 100 : _complexity;
                
                callback.call(this, valid, _complexity);
            });
        });
        
        function getCharset(str, charset){
            for(var i=0, len=str.length;i<len;i++)
            {
                if (charset[0] <= str.charCodeAt(i) && str.charCodeAt(i) <= charset[1]) 
                {
  					        return charset[1] - charset[0] + 1;
					      }
            }
            
            return 0;
        }
    }
}(jQuery);
