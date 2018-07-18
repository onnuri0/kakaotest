/**
 * rnfauth.js
 * @type {string}
 */
import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';

import CommTx from '../../containers/CommTx';

/* asyncfunctions */
function getBoardByAsync(){
    return CommTx.GET("/friday/freeboard");
}

/* asyncfunctions */
function saveBoardByAsync(vo){
    return CommTx.POST("/friday/freeboard", vo);
}

/* asyncfunctions */
function deleteBoardByAsync(id){
    return CommTx.DELETE("/friday/freeboard/" +id);
}
/* asyncfunctions */
function updateBoardByAsync(vo){
    return CommTx.PATCH("/friday/freeboard" , vo);
}



/* Actions type */
const READ_BOARD = "READ_BOARD";
const SAVE_BOARD = "SAVE_BOARD";
const DELETE_BOARD = "DELETE_BOARD";
const UPDATE_BOARD = "UPDATE_BOARD";


/* Action Creators */
export const saveBoard = createAction(SAVE_BOARD, saveBoardByAsync); // index, boards
export const readBoard = createAction(READ_BOARD, getBoardByAsync); // index, boards
export const deleteBoard = createAction(DELETE_BOARD, deleteBoardByAsync);
export const updateBoard = createAction(UPDATE_BOARD, updateBoardByAsync);

/* actionCreates initialState */
const initialState = {
    boardlist : []
};

/* Reducer */
export default handleActions({
    ...pender({
        type : READ_BOARD,
        onSuccess : (state, action) => {
            return {...state,
                boardlist : action.payload
            }
        }
    },{
        type : SAVE_BOARD
    },{
        type : DELETE_BOARD
    },{
        type : UPDATE_BOARD
    }),
}, initialState);