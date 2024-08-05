import { Action } from '@ngrx/store';
import { Allowance } from '../models/allowance';

export enum AllowanceActionTypes {
  CREATE_ALLOWANCE = '[Allowance] Create Allowance',
  CREATE_ALLOWANCE_SUCCESS = '[Allowance] Create Allowance Success',
  CREATE_ALLOWANCE_ERROR = '[Allowance] Create Allowance Error',

  GET_ALL_ALLOWANCES = '[Allowance] Get All Allowances',
  GET_ALL_ALLOWANCES_SUCCESS = '[Allowance] Get All Allowances Success',
  GET_ALL_ALLOWANCES_ERROR = '[Allowance] Get All Allowances Error',

  UPDATE_ALLOWANCE = '[Allowance] Update Allowance',
  UPDATE_ALLOWANCE_SUCCESS = '[Allowance] Update Allowance Success',
  UPDATE_ALLOWANCE_ERROR = '[Allowance] Update Allowance Error',

  DELETE_ALLOWANCE = '[Allowance] Delete Allowance',
  DELETE_ALLOWANCE_SUCCESS = '[Allowance] Delete Allowance Success',
  DELETE_ALLOWANCE_ERROR = '[Allowance] Delete Allowance Error',
}

export class CreateAllowance implements Action {
  readonly type = AllowanceActionTypes.CREATE_ALLOWANCE;
  constructor(public payload: Allowance) {}
}

export class CreateAllowanceSuccess implements Action {
  readonly type = AllowanceActionTypes.CREATE_ALLOWANCE_SUCCESS;
  constructor(public payload: Allowance) {}
}

export class CreateAllowanceError implements Action {
  readonly type = AllowanceActionTypes.CREATE_ALLOWANCE_ERROR;
  constructor(public payload: string) {}
}

export class GetAllAllowances implements Action {
  readonly type = AllowanceActionTypes.GET_ALL_ALLOWANCES;
}

export class GetAllAllowancesSuccess implements Action {
  readonly type = AllowanceActionTypes.GET_ALL_ALLOWANCES_SUCCESS;
  constructor(public payload: Allowance[]) {}
}

export class GetAllAllowancesError implements Action {
  readonly type = AllowanceActionTypes.GET_ALL_ALLOWANCES_ERROR;
  constructor(public payload: string) {}
}

export class UpdateAllowance implements Action {
  readonly type = AllowanceActionTypes.UPDATE_ALLOWANCE;
  constructor(public payload: { id: string; allowance: Allowance }) {}
}

export class UpdateAllowanceSuccess implements Action {
  readonly type = AllowanceActionTypes.UPDATE_ALLOWANCE_SUCCESS;
  constructor(public payload: Allowance) {}
}

export class UpdateAllowanceError implements Action {
  readonly type = AllowanceActionTypes.UPDATE_ALLOWANCE_ERROR;
  constructor(public payload: string) {}
}

export class DeleteAllowance implements Action {
  readonly type = AllowanceActionTypes.DELETE_ALLOWANCE;
  constructor(public payload: string) {}
}

export class DeleteAllowanceSuccess implements Action {
  readonly type = AllowanceActionTypes.DELETE_ALLOWANCE_SUCCESS;
  constructor(public payload: string) {}
}

export class DeleteAllowanceError implements Action {
  readonly type = AllowanceActionTypes.DELETE_ALLOWANCE_ERROR;
  constructor(public payload: string) {}
}

export type AllowanceActions =
  | CreateAllowance
  | CreateAllowanceSuccess
  | CreateAllowanceError
  | GetAllAllowances
  | GetAllAllowancesSuccess
  | GetAllAllowancesError
  | UpdateAllowance
  | UpdateAllowanceSuccess
  | UpdateAllowanceError
  | DeleteAllowance
  | DeleteAllowanceSuccess
  | DeleteAllowanceError;
