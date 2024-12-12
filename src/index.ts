import { createUi } from "./createUi";

// 主函数运行
function main() {
    const iframe = document.getElementById("ueditor_0") as HTMLIFrameElement;
    console.log(iframe);
    const newDocument = iframe.contentDocument || iframe.contentWindow?.document;
    const body = newDocument?.querySelectorAll(".view")[1]! as HTMLBodyElement;

    const isHasInputEl = () => {
        return document.querySelector("#yux-input-pro");
    };

    body.contentEditable = "false";
    body.onfocus = function () {
        if (isHasInputEl()) return;
        const { UI, inputEl } = createUi();
        document.body.appendChild(UI);
        document.addEventListener("keydown", e => {
            if (e.key === "Enter") {
                const text = inputEl.innerHTML;
                body.innerHTML += `<p>${text}</p>`;
                inputEl.style.display = "none";
                inputEl.innerHTML = "";
                inputEl.remove();
            }
        });
    };
}


window.onload = () => {
    main();
}

