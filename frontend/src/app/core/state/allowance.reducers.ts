import { Action } from '@ngrx/store';
import { AllowanceActionTypes, AllowanceActions } from './allowance.actions';
import { Allowance } from '../models/allowance';

export enum AllowanceStateEnum {
  LOADING = 'Loading',
  LOADED = 'Loaded',
  ERROR = 'Error',
  INITIAL = 'Initial',
  UPDATING = 'Updating',
  DELETING = 'Deleting',
  SAVING = 'Saving',
}

export interface AllowanceState {
  allowances: Allowance[];
  errorMessage: string;
  dataState: AllowanceStateEnum;
}

const initialState: AllowanceState = {
  allowances: [],
  errorMessage: '',
  dataState: AllowanceStateEnum.INITIAL,
};

export function allowanceReducer(
  state = initialState,
  action: AllowanceActions
): AllowanceState {
  switch (action.type) {
    case AllowanceActionTypes.CREATE_ALLOWANCE:
    case AllowanceActionTypes.GET_ALL_ALLOWANCES:
    case AllowanceActionTypes.UPDATE_ALLOWANCE:
    case AllowanceActionTypes.DELETE_ALLOWANCE:
      return { ...state, dataState: AllowanceStateEnum.LOADING };

    case AllowanceActionTypes.CREATE_ALLOWANCE_SUCCESS:
      return {
        ...state,
        allowances: [...state.allowances, action.payload],
        dataState: AllowanceStateEnum.LOADED,
      };

    case AllowanceActionTypes.GET_ALL_ALLOWANCES_SUCCESS:
      return {
        ...state,
        allowances: action.payload,
        dataState: AllowanceStateEnum.LOADED,
      };

    case AllowanceActionTypes.UPDATE_ALLOWANCE_SUCCESS:
      const updatedAllowance = action.payload;
      const updatedAllowances = state.allowances.map((allowance) =>
        allowance.id === updatedAllowance.id ? updatedAllowance : allowance
      );
      return {
        ...state,
        allowances: updatedAllowances,
        dataState: AllowanceStateEnum.LOADED,
      };

    case AllowanceActionTypes.DELETE_ALLOWANCE_SUCCESS:
      const deletedAllowanceId = action.payload;
      const filteredAllowances = state.allowances.filter(
        (allowance) => allowance.id !== deletedAllowanceId
      );
      return {
        ...state,
        allowances: filteredAllowances,
        dataState: AllowanceStateEnum.LOADED,
      };

    case AllowanceActionTypes.CREATE_ALLOWANCE_ERROR:
    case AllowanceActionTypes.GET_ALL_ALLOWANCES_ERROR:
    case AllowanceActionTypes.UPDATE_ALLOWANCE_ERROR:
    case AllowanceActionTypes.DELETE_ALLOWANCE_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
        dataState: AllowanceStateEnum.ERROR,
      };

    default:
      return { ...state };
  }
}
