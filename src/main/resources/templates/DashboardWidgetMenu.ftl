<div id="${elementParamName!}${element.properties.elementUniqueKey!}">

    ${element.properties.customHeader!}

    <style>
        .widgetBody {
            width: 300px;
            float: left;
            display: inline-block;
            margin: 5px;
            padding: 5px;
            border-radius: 4px;
            border: 1px solid #eee;
        }

        .widgetBody .title {
            margin: 5px auto;
        }

        .widgetBody .content {
            margin: 20px auto;
        }

        ${element.properties.css!}
    </style>

    <#assign count = 0>

    <#list widgets as widget>
        <style>
            ${widget.css!?html}
        </style>
        <div id="${widget.sequence!}">
            <div class="widgetBody">
                <div class="title"> ${widget.title!?html} </div>
                <div class="content"> ${widget.content!?html} </div>
            </div>
        </div>
        <#assign count = count + 1>
    </#list>
    
    ${element.properties.customFooter!}
</div>