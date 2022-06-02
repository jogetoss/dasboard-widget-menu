{
    widgetModel : '<div class="widgetBody"><div class="title"></div><div class="content"></div></div>',
    configModel : '<div class="configScreen"><div class="label">@@org.joget.marketplace.DashboardWidgetMenu.builder.title@@</div> <input type="text" placeholder="@@org.joget.marketplace.DashboardWidgetMenu.builder.title@@" name="title"><br/><div class="label">@@org.joget.marketplace.DashboardWidgetMenu.builder.content@@</div> <input type="text" placeholder="@@org.joget.marketplace.DashboardWidgetMenu.builder.content@@" name="content"><br/> <div class="label">@@org.joget.marketplace.DashboardWidgetMenu.builder.styling@@</div> <textarea name="styling">.widgetBody{\n   border-radius: 10px;\n   border: 1px solid #ddd;\n   background-color: purple;\n   color:white;\n}\n\n.title{\n   font-size:28px;\n   text-align: center;\n}\n\n.content{\n   font-size:32px;\n   text-align:center;\n}\n</textarea></div>',
    counter : 1,
    renderField : function() {
        var thisObj = this;
        
        var css = '.widgetwrapper .widgets-container{position:relative; padding-left: 8px;}';
        css += '.widgetwrapper .widgets-container .buttons {margin-bottom: 6px;}';
        css += '.widgetwrapper .buttons:after{content:""; display:block; clear:both;}';
        css += '.widgetwrapper .buttons .sort{cursor:move;display: block;width: 4px;margin-left: -15px;border-left: 10px dashed;}';
        css += '.widgetwrapper {padding: 5px 0 5px 25px; background-color: #f0f2f3;border: 1px solid #cecece;}';
        css += '.widgetwrapper .widgetBody { width: 300px; float: left; display: inline-block; margin: 5px; padding: 5px; border-radius: 4px; border: 1px solid #eee;}';
        css += '.widgetwrapper .widgetBody input{ width: 100%;}';
        css += '.widgetwrapper .widgetBody .title{margin: 5px auto; width: 200px}';
        css += '.widgetwrapper .widgetBody .content{margin: 20px auto; width: 200px}';
        css += '.widgetwrapper .configScreen { width: 60%; min-width: 300px; float: left; display: inline-block; padding: 10px; border: 1px solid #b0a5a5;}';
        css += '.widgetwrapper .configScreen .title { width: 100%%;}';
        css += '.widgetwrapper .configScreen .label {padding: 8px 0;}';
        css += '.widgetwrapper .configScreen input { width: 90%; height: 100%;}';
        css += '.widgetwrapper .configScreen textarea { width: 90%; height: 200px;}';
        
        var html = '<div name="'+thisObj.id+'"><div class="widgets-container"></div><a class="rbutton pebutton addWidget"> <i class="fas fa-plus-circle"></i>@@org.joget.marketplace.DashboardWidgetMenu.builder.addWidget@@</a>';
        html += '</div>';
        
        return '<style>'+ css + '</style>' + html;
    },
    initScripting : function() {
        var thisObj = this;
        
        thisObj.loadValues();
        
        $("#" + thisObj.id + "_input").find(".addWidget").on("click", function(){
            thisObj.addWidget();
        });
        
        $("#" + thisObj.id + "_input").find(".deleteWidget").on("click", function(){
            thisObj.deleteWidget(this);
        });
        
        $("#" + thisObj.id + "_input").find(".applyWidget").on("click", function(){
            thisObj.refreshWidget(this);
        });
        
        $("#" + thisObj.id + "_input").find("input, textarea").keyup(thisObj.throttle(function(){
           thisObj.refreshWidget(this); 
        }));
        
        $("#" + thisObj.id + "_input .widgets-container").sortable({
            opacity: 0.8,
            axis: 'y',
            handle: '.sort',
            tolerance: 'intersect'
        });
    },
    getData : function(useDefault) {
        var field = this;
        var widgets = [];
        var data = [];
        
        $("#" + field.id + "_input").find(".widgetwrapper").each(function(){
            thisObj.refreshWidget($(this).find(".widgetBody"));
            var obj = {
                "sequence" : $(this).attr("id"),
                "title" : $(this).find("input[name='title']").val(),
                "content" : $(this).find("input[name='content']").val(),
                "styling" : $(this).find("textarea[name='styling']").val(),
                "css" : $(this).find("style").html()
            };
            widgets.push(obj);
        });
        data['widgets'] = widgets;
        return data;
        
    },
    addOnValidation : function(data, errors, checkEncryption) {
        var thisObj = this;
    },
    /*custom methods*/
    loadValues : function() {
        var thisObj = this;
        
        if (thisObj.value !== undefined && thisObj.value !== null) {
            $.each(thisObj.value, function(i, v){
                thisObj.addWidgetWithData(v);
            });
        }
    },
    addWidgetWithData : function(data){
        var thisObj = this;
        var widget = $('<div class="widgetwrapper" id="widget-' + thisObj.counter++ + '"><style></style>' + thisObj.configModel + thisObj.widgetModel + '<span class="buttons"><a class="applyWidget" title="@@org.joget.marketplace.DashboardWidgetMenu.builder.apply@@"><i class="fas fa-check"></i></a> | <span class="buttons"><a class="deleteWidget" title="@@org.joget.marketplace.DashboardWidgetMenu.builder.deleteWidget@@"><i class="fas fa-trash-alt"></i></a><a class="sort" title="@@org.joget.marketplace.DashboardWidgetMenu.builder.sortWidget@@">&nbsp;</a></span></div>');
        
        $(widget).find(".applyWidget").click(function(){
           thisObj.refreshWidget(this);
        });
        $(widget).find("input, textarea").keyup(thisObj.throttle(function(){
           thisObj.refreshWidget(this); 
        }));
        $(widget).find(".deleteWidget").click(function(){
           thisObj.deleteWidget(this);
        });
        
        $(widget).find("input[name='title']").val(data.title);
        $(widget).find("input[name='content']").val(data.content);
        $(widget).find("textarea[name='styling']").val(data.styling);
        $(widget).find(".applyWidget").trigger("click");
        
        $("#" + thisObj.id + "_input").find("> div > .widgets-container").append(widget);
    },
    addWidget : function(){
        var thisObj = this;
        var widget = $('<div class="widgetwrapper" id="widget-' + thisObj.counter++ + '"><style></style>' + thisObj.configModel + thisObj.widgetModel + '<span class="buttons"><a class="applyWidget" title="@@org.joget.marketplace.DashboardWidgetMenu.builder.apply@@"><i class="fas fa-check"></i></a> | <span class="buttons"><a class="deleteWidget" title="@@org.joget.marketplace.DashboardWidgetMenu.builder.deleteWidget@@"><i class="fas fa-trash-alt"></i></a><a class="sort" title="@@org.joget.marketplace.DashboardWidgetMenu.builder.sortWidget@@">&nbsp;</a></span></div>');
        
        $(widget).find(".applyWidget").click(function(){
           thisObj.refreshWidget(this);
        });
        $(widget).find("input, textarea").keyup(thisObj.throttle(function(){
           thisObj.refreshWidget(this); 
        }));
        $(widget).find(".deleteWidget").click(function(){
           thisObj.deleteWidget(this);
        });
        
        $("#" + thisObj.id + "_input").find("> div > .widgets-container").append(widget);
    },
    deleteWidget: function(button){
        var thisObj = this;
        var container = $(button).closest(".widgetwrapper").remove();
    },
    refreshWidget: function(button){
        var thisObj = this;
        var container = $(button).closest(".widgetwrapper");
        var widgetId = $(container).attr("id");
        var title = $(container).find("input[name='title']").val();
        var content = $(container).find("input[name='content']").val();
        var styling = $(container).find("textarea[name='styling']").val();
        
        styling = styling.replaceAll(/[}]*(.+)\{/g, "#" + widgetId + " $1{");
        
        $(container).find("style").html(styling);
        $(container).find(".widgetBody .title").text(title);
        $(container).find(".widgetBody .content").text(content);
        
    },
    throttle: function(f, delay){
        var timer = null;
        return function(){
            var context = this, args = arguments;
            clearTimeout(timer);
            timer = window.setTimeout(function(){
                f.apply(context, args);
            },
            delay || 500);
        };
    }
}