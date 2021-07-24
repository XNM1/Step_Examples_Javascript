window.onload = () => {
    let progressbars = document.getElementsByClassName('progressbar');

    function progress(progressbar, step = 1) {
        let progressElement = progressbar.querySelector('.progress');
        let p = 0;
        let maxWidth = progressbar.offsetWidth;
        let pgf = () => {
            p+=step;
            progressElement.style.width = p + 'px';
            if(p >= maxWidth - 4) {
                clearTimeout(timer);
                return;
            }
            timer = setTimeout(pgf);
        }
        let timer = setTimeout(pgf);
    }

    progress(progressbars[0], 1);
    progress(progressbars[1], 0.7);

    // for(let i = 0, j = 0; i <= 500 || j <= 500; i+=0.001, j+=0.01) {
    //     if (i <= 500) progressbars[0].children[0].style.width = i + 'px';
    //     if (j <= 500) progressbars[1].children[0].style.width = j + 'px';
    // }
}