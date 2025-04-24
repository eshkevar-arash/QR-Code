const inputElem = document.querySelector('input')
const btnGenerator = document.querySelector('.generate-btn')
const qrCodeElem = document.querySelector('.qr-code')
const qrImg = document.querySelector('.qr-image')
const btnDownload = document.querySelector('.download-btn')
const btnCopy = document.querySelector('.copy-btn')
const clearBtn = document.querySelector('.clear-btn');
function resetBox(){
    inputElem.value = ''
    inputElem.focus()
    qrCodeElem.classList.remove('active')
    qrImg.src = ''
}
function inputReset(){
    inputElem.value = ''
    inputElem.focus()
}
function generator(){
    let inputValue = inputElem.value.trim();
    if (!inputValue) return alert('is empty');

    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(inputValue)}`;

    qrImg.onload = () => {
        qrCodeElem.classList.add('active');
    }

    qrImg.setAttribute('src', qrUrl);
}
inputReset()

btnGenerator.addEventListener('click', generator);

inputElem.addEventListener('keyup', event=>{
    if (event.keyCode === 13){
        generator()
    }
})
btnDownload.addEventListener('click', () => {
    const imgSrc = qrImg.getAttribute('src'); // آدرس تصویر QR
    if (!imgSrc) return alert('هیچ کدی برای دانلود نیست!');

    const link = document.createElement('a');
    link.href = imgSrc;
    link.download = 'qr-code.png';
    document.body.appendChild(link); // این خط برای اطمینان از کارکرد در بعضی مرورگرها
    link.click();
    document.body.removeChild(link); // پاک کردن لینک موقتی از DOM
});



btnCopy.addEventListener('click', async () => {
    const imgSrc = qrImg.getAttribute('src');
    if (!imgSrc) return alert('لینکی برای کپی نیست!');

    try {
        await navigator.clipboard.writeText(imgSrc);
        alert('لینک QR کپی شد!');
    } catch (err) {
        alert('خطا در کپی لینک');
    }
});



clearBtn.addEventListener('click', () => {
    resetBox()
});