function fileChangeListener(){
    var fileInput = document.getElementById('file-input');

    fileInput.addEventListener('change', function (event) {
        var file = event.target.files[0];
        showSpinner();
        setTimeout(() => {
            if (isValidFile(file)) {
                processFile(file).then(hideSpinner);
            } else {
                resetFileInput(fileInput);
                hideSpinner();
            }
        }, 0);
    });
}

function isValidFile(file) {
    if (!file) {
        showToast('No file selected.', 'File Error');
        return false;
    }

    if (!isValidFileName(file.name)) {
        showToast('Invalid file name. The file name cannot be blank.', 'File Name Error');
        return false;
    }

    if (!isHtmlFileType(file)) {
        showToast('Invalid file type. Please select an HTML file.', 'File Type Error');
        return false;
    }

    return true;
}


function isValidFileName(fileName) {
    return fileName.trim() !== '';
}

function isHtmlFileType({ type, name }) {
    var fileType = type;
    var fileName = name;
    return fileType === 'text/html' || fileName.endsWith('.html');
}

function resetFileInput(fileInput) {
    fileInput.value = '';
}



// UI

function showSpinner() {
    document.getElementById('loadingSpinner').style.display = 'block';
}

function hideSpinner() {
    document.getElementById('loadingSpinner').style.display = 'none';
}