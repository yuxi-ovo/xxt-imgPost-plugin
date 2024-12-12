export async function uploadImg(data: File) {
    const formData = new FormData();
    formData.append("file", data);
    const res = await fetch("https://www.course.pink:3001/upload", {
        method: "POST",
        body: formData,
        referrerPolicy: "no-referrer",
    });
    const result = await res.json();
    return result.files[0].url;
}