/**
 *   "containerWidth": "300",
    "containerHeight": "300",
    "canvasWidth": "300",
    "canvasHeight": "300",
    "canvasTop": "0",
    "canvasLeft": "0"
 * @param {*} target 
 * @param {*} modelList 
 */
function resetContainer(target, modelList) {
    let model = modelList.modelLayoutInfos[target];
    if (!model) {
        model = modelList.modelLayoutInfos["default"];
    }
    if (!model) {
        return;
    }
    resetContainerModel(model);

}


function resetContainerModel(model) {
    // 写配置
    let live2d = document.getElementById("live2d");

    if (live2d.parentElement.id != "canvasContainer") {
        initLive2dContainer()
    }

    live2d.setAttribute("width", `${model.canvasWidth*2}px`);
    live2d.setAttribute("height", `${model.canvasHeight*2}px`);
    live2d.style.left = `${model.canvasLeft}px`
    live2d.style.top = `${model.canvasTop}px`

    let box = document.getElementById("canvasContainer");
    box.style.width = `${model.containerWidth}px`;
    box.style.height = `${model.containerHeight}px`;

    resetViewPort();
}

function resetViewPort() {
    let gl = document.getElementById("live2d").getContext("webgl")
    gl.viewport(0, 0,
        gl.drawingBufferWidth, gl.drawingBufferHeight);
}

function initLive2dContainer() {
    let canvas = document.getElementById("live2d")
    let parent = canvas.parentElement
    parent.removeChild(canvas)
    let container = document.createElement("div")
    container.id = "canvasContainer"
    container.appendChild(canvas)
    parent.appendChild(container)

    container.style.zIndex = 20
    document.getElementById("waifu-tool").style.zIndex = 10
}