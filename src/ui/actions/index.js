import fetch from 'isomorphic-fetch';

// Files
export const UPDATE_FILES = 'UPDATE_FILES';

export const updateFiles = (files) => ({
    type: UPDATE_FILES,
    files
});

export const getFiles = () => {
    return (dispatch) => {
        fetch('/files/list', {
            credentials: 'same-origin'
        })
            .then((response) => response.json())
            .then((files) => dispatch(updateFiles(files)));
    };
};

export const renameFile = (files, name, index) => {
    return (dispatch) => {
        files[index].name = name;
        dispatch(updateFiles(files));
    };
};

export const uploadFiles = (fileList) => {
    return (dispatch) => {
        const formData = new FormData();
        const length = fileList.length;

        for (let i = 0; i < length; i++) {
            const file = fileList[i];
            formData.append('files', file, file.name);
        }

        fetch('/files', {
            credentials: 'same-origin',
            method: 'POST',
            body: formData
        })
            .then((response) => response.json())
            .then((files) => dispatch(updateFiles(files)));
    };
};

export const deleteFiles = () => {
    return (dispatch) => {
        fetch('/files', {
            credentials: 'same-origin',
            method: 'DELETE'
        })
            .then((response) => response.json())
            .then((files) => dispatch(updateFiles(files)));
    };
};

export const PUBLISH_RESULT = 'PUBLISH_RESULT';

export const publishResult = (result) => ({
    type: PUBLISH_RESULT,
    result
});

export const startAnalysis = (config) => {
    return (dispatch) => {

        fetch('/process', {
            credentials: 'same-origin',
            method: 'POST',
            body: JSON.stringify(config),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then((response) => response.json())
            .then((result) => {
                result.isProcessing = false;
                dispatch(publishResult(result));
            });
    };
};

export const SET_OPTIONS = 'SET_OPTIONS';

export const setOptions = (options) => ({
    type: SET_OPTIONS,
    options
});

export const getOptions = () => {
    return (dispatch) => {
        fetch('/options')
            .then((response) => response.json())
            .then((options) => dispatch(setOptions(options)));
    };
};
