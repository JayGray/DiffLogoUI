import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import * as ActionTypes from '../actions/types';

export const files = (state = { list: [], selection: [], results: [], timestamp: 0 }, action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_FILES: {
            return Object.assign(
                {},
                state,
                {
                    list: action.filesState.files,
                    alphabet: action.filesState.alphabet,
                    results: action.filesState.results,
                    timestamp: new Date().getTime()
                }
            );
        }
        default: {
            return state;
        }
    }
};

export const configuration = (
    config = {
        alphabet: 'DNA',
        stackHeightMethod: 'Shannon-Divergence',
        symbolHeightMethod: 'Normalized difference of probabilities',
        enableClusterTree: true,
        enableSequenceLogos: true,
        enablePvalue: true,
        timestamp: 0
    },
    action
) => {
    switch (action.type) {
        case ActionTypes.UPDATE_CONFIGURATION: {
            return Object.assign(
                {},
                config,
                {
                    alphabet: action.configuration.alphabet,
                    stackHeightMethod: action.configuration.stackHeightMethod,
                    symbolHeightMethod: action.configuration.symbolHeightMethod,
                    enableClusterTree: action.configuration.enableClusterTree,
                    enableSequenceLogos: action.configuration.enableSequenceLogos,
                    timestamp: new Date().getTime()
                }
            );
        }
        default: {
            return config;
        }
    }
};

export const progress = (state = { active: false, message: '' }, action) => {
    switch (action.type) {
        case ActionTypes.PROGRESS_UPLOAD: {
            return Object.assign(
                {},
                state,
                { active: true, message: 'Uploading Files' }
            );
        }
        case ActionTypes.PROGRESS_PROCESS: {
            return Object.assign(
                {},
                state,
                { active: true, message: 'Processing …' }
            );
        }
        case ActionTypes.PROGRESS_EXAMPLES: {
            return Object.assign(
                {},
                state,
                { active: true, message: 'Prepare Examples' }
            );
        }
        case ActionTypes.PROGRESS_STOPPED: {
            return Object.assign(
                {},
                state,
                { active: false, message: '' }
            );
        }
        default: {
            return state;
        }
    }
};

export default combineReducers({
    files,
    progress,
    configuration,
    routing: routerReducer
});
