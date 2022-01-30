// ==UserScript==
// @name         outlineTool
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  try to take over the world!
// @author       yejf
// @match        https://*/*
// @icon         https://www.google.com/s2/favicons?domain=github.com
// @grant        none
// @resource css https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css
// ==/UserScript==



(function() {
    // Your code here...
    let outline = document.createElement("div")
    outline.id = "outline"
    outline.style.height = "400px"
    outline.style.position = "fixed";
    outline.style.right = "50px"
    outline.style.top = "300px"
    outline.style.border = "solid 1px"
    outline.style.backgroundColor = "white"
    outline.style.overflow = "scroll"
    outline.style.zIndex = 100
    outline.style.width = "300px"

    loadStyleString("/*设置滚动条的样式*/#outline::-webkit-scrollbar{width:8px;height:8px;}/*滚动槽*/#outline::-webkit-scrollbar-track{-webkit-box-shadow:inset006pxrgba(0,0,0,0.2);border-radius:8px;}/*滚动条滑块*/#outline::-webkit-scrollbar-thumb{border-radius:8px;background:#bbb;-webkit-box-shadow:inset006pxrgba(0,0,0,0.25);}/*非激活窗口*/#outline::-webkit-scrollbar-thumb:window-inactive{background:rgba(0,255,0,0.4);}");

    document.body.append(outline)

    let ul = document.createElement("ul")
    ul.style.padding = "10px"
    outline.append(ul)

    refreshoutline(ul)

    // 添加拖动条
    let dragBar = document.createElement("div")
    dragBar.style.height = "20px"
    dragBar.style.backgroundColor = "#80808066"
    dragBar.style.position = "sticky"
    dragBar.style.top = 0
    dragBar.style.cursor = "move"
    dragBar.id = "dragBar"
    drag(outline,dragBar)

    outline.prepend(dragBar)

    // 添加关闭按钮
    //'<a href="#"><i class="fa fa-close"></i></a>'
    let closeicon = document.createElement("a")
    closeicon.style.padding = "0 10px"
    closeicon.href = "javascript:void(0);"
    closeicon.append("×")
    closeicon.style.fontSize="x-large"
    closeicon.style.lineHeight=0
    closeicon.style.fontWeight="bold"
    dragBar.append(closeicon)

    closeicon.onclick =(event)=>{
        document.body.removeChild(outline)
        document.body.onscroll = null
    }


    //添加刷新按钮
    let refresh = document.createElement("a")
    refresh.style.padding = "0 10px"
    refresh.href = "javascript:void(0);"
    refresh.append("刷新")
    refresh.style.float = "right"
    dragBar.append(refresh)

    refresh.onclick =(event)=>{
        refreshoutline(ul)
    }

    //添加动态高亮
    var outlineContext = {}
    document.body.onscroll = (event)=>{
        let viewport = pageY()[1] + window.screen.height /2
        let nodes = ul.childNodes
        let currNode = nodes[0]
        for(let node of nodes){
            let realNode = document.getElementById(node.firstChild.realnode)
            let absloute = getElementTop(realNode)
            if(viewport > absloute){
                currNode = node
            }else{
                if(outlineContext.currNode){
                    outlineContext.currNode.firstChild.style.color = null
                }
                outlineContext.currNode = currNode
                currNode.firstChild.style.color = "red"
                outline.scrollTo(0,currNode.offsetTop-outline.offsetHeight/2)
                break;
            }
        }
    }

    function pageY() {
        var e = document.compatMode && "BackCompat" !== document.compatMode ? document.documentElement : document.body;
        return [e.scrollLeft || window.pageXOffset, e.scrollTop || window.pageYOffset]
    }

    function getElementTop(element){
        if(!element){
            return 0
        }
        return element.offsetTop+element.clientTop+getElementTop(element.offsetParent);
    }

    function refreshoutline(ul){
        while(ul.hasChildNodes()){
            ul.removeChild(ul.firstChild)
        }

        let maxDeep = 4;

        let helements = getHelements(maxDeep)

        try{
            for(let node of helements){
                let ol = document.createElement("ol")
                ol.style.marginLeft = 20*(node.tagName[1]-1)+"px"
                ol.style.padding =0
                if(!node.id){
                    node.id = node.textContent.trim()
                }
                let a = document.createElement("a")
                a.href = "#"+node.id
                a.textContent = node.textContent
                a.realnode = node.id
                ol.append(a)
                ul.append(ol)
            }
        }catch(e){
            console.log(e)
        }
    }

    function drag(outline,dragBar){
        dragBar.onmousedown = function (e) {
            let disx = e.pageX - outline.offsetLeft;
            let disy = e.pageY - outline.offsetTop;
            document.onmousemove = function (e) {
                if(outline.style.right){
                    outline.style.right = null
                }
                outline.style.left = e.pageX - disx + 'px';
                outline.style.top = e.pageY - disy + 'px';
            }
            //释放鼠标按钮，将事件清空，否则始终会跟着鼠标移动
            document.onmouseup = function () {
                document.onmousemove = document.onmouseup = null;
            }
        }
    }

    function getHelements(maxDeep){
        let query = [];
        for(let i=1; i<=maxDeep; i++){
            query.push(`h${i}`)
        }
        let nodes = document.querySelectorAll(query.join(","))
        return nodes
    }

    function loadStyleString(css){
        var style = document.createElement("style");
        style.type = "text/css";
        try{
            style.appendChild(document.createTextNode(css));
        } catch (ex){
            style.textContent = css;
        }
        var head = document.getElementsByTagName("head")[0];
        head.appendChild(style);
    }



})();

