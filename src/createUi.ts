import { uploadImg } from "./api";

// 创建元素
export function createInputEl() {
    const div = document.createElement("div");
    div.id = "yux-input-pro";
    div.style.width = "30vw";
    div.style.height = "80vh";
    div.style.display = "inline-block";
    div.style.background = "#fff";
    div.style.borderRadius = "10px";
    div.style.padding = "10px";
    div.style.fontSize = "14px";
    div.style.color = "#666";
    div.style.resize = "none";
    div.style.outline = "none";
    div.style.overflowY = "scroll";
    div.style.border = "1px solid #f5f5f5";
    div.style.textAlign = "left";
    div.style.position = "fixed";
    div.style.right = "0%";
    div.style.top = "50%";
    div.style.transform = "translate(0%,-50%)";
    div.style.zIndex = "9999";
    const textarea = document.createElement("textarea");
    textarea.style.width = "100%";
    textarea.style.height = "10%";
    textarea.style.border = "none";
    textarea.style.resize = "none";
    textarea.style.outline = "none";
    div.appendChild(textarea);
    const { show, hide } = createLoadingUi();
    div.addEventListener(
        "paste",
        async function (e) {
            show();
            var cbd = e.clipboardData!;
            var ua = window.navigator.userAgent;
            // 如果是 Safari 直接 return
            if (!(e.clipboardData && e.clipboardData.items)) {
                return;
            }
            // Mac平台下Chrome49版本以下 复制Finder中的文件的Bug Hack掉
            if (
                cbd.items &&
                cbd.items.length === 2 &&
                cbd.items[0].kind === "string" &&
                cbd.items[1].kind === "file" &&
                cbd.types &&
                cbd.types.length === 2 &&
                cbd.types[0] === "text/plain" &&
                cbd.types[1] === "Files" &&
                ua.match(/Macintosh/i) &&
                Number(ua.match(/Chrome\/(\d{2})/i)![1]) < 49
            ) {
                return;
            }
            for (var i = 0; i < cbd.items.length; i++) {
                var item = cbd.items[i];
                if (item.kind == "file") {
                    var blob = item.getAsFile();
                    const url = await uploadImg(blob!);
                    if (blob!.size === 0) {
                        return;
                    }
                    var imgs = new Image();
                    imgs.src = url;
                    imgs.className = "ans-ued-img";
                    imgs.style.width = "100%";
                    imgs.style.height = "100%";
                    imgs.style.objectFit = 'cover';
                    div.appendChild(imgs);
                    hide();
                }
            }
        },
        false
    );
    div.addEventListener("click", () => {
        div.style.border = '2px solid #3498db';
        div.clientHeight;
    });

    return div;
}

// 创建标题
function createTitle() {
    const div = document.createElement('div');
    div.style.width = '20vw';
    div.style.position = "absolute";
    div.style.right = "22%";
    div.style.top = "15%";
    div.style.transform = "translate(-50%,-50%)";
    div.style.background = '#fff';
    div.style.border = '2px solid #3498db';
    div.style.borderRadius = '10px';
    const p = document.createElement('p');

    p.innerHTML = ' <b style="color:#3498db">《学习通粘贴图片插件》</b> 使用方式：点击右边白框 复制图片 等待几秒钟就会显示您上传的图片 按 回车键插入到答题框里面 完美!🚀';
    p.style.fontSize = '16px';
    p.style.padding = '10px';
    p.style.color = '#525b56';



    div.appendChild(p);

    return div;
}

export function createUi() {
    const div = document.createElement('div');
    const inputEl = createInputEl();
    div.appendChild(inputEl);
    div.appendChild(createTitle());

    return {
        UI: div,
        inputEl,
    };
}

function createLoadingUi() {
    const div = document.createElement('div');
    div.id = 'yuxi-loading-ui';
    div.style.width = '100%';
    div.style.height = '100vh';
    div.style.position = "absolute";
    div.style.top = '0px';
    div.style.left = '0px';
    div.style.zIndex = '99999999';
    div.style.background = 'rgba(0,0,0,0.5)';
    div.style.display = 'flex';
    div.style.justifyContent = 'center';
    div.style.alignItems = 'center';
    div.style.flexDirection = 'column';

    // 创建加载动画的元素
    const loader = document.createElement('div');
    loader.style.border = '8px solid #f3f3f3'; // Light gray
    loader.style.borderTop = '8px solid #3498db'; // Blue
    loader.style.borderRadius = '50%';
    loader.style.width = '60px';
    loader.style.height = '60px';
    loader.style.animation = 'spin 2s linear infinite';

    // 将loader添加到loadingContainer中
    div.appendChild(loader);



    const title = document.createElement('p');
    title.innerHTML = '正在上传图片，请耐心等待...';
    title.style.color = '#fff';
    title.style.fontSize = '16px';
    div.appendChild(title);
    div.style.display = 'none';

    // 添加CSS样式

    const style = document.createElement('style');
    style.innerHTML = `
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
    document.head.appendChild(style);
    const show = () => {
        div.style.display = 'flex';
    };
    const hide = () => {
        div.style.display = 'none';

    };
    // 将loadingContainer添加到body中
    document.body.appendChild(div);
    return {
        hide,
        show,
    };
}