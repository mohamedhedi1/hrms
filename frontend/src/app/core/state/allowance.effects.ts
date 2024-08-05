import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AllowanceService } from '../services/allowance.service';
import {
  AllowanceActionTypes,
  CreateAllowance,
  CreateAllowanceSuccess,
  CreateAllowanceError,
  GetAllAllowances,
  GetAllAllowancesSuccess,
  GetAllAllowancesError,
  UpdateAllowance,
  UpdateAllowanceSuccess,
  UpdateAllowanceError,
  DeleteAllowance,
  DeleteAllowanceSuccess,
  DeleteAllowanceError,
} from './allowance.actions';

@Injectable()
export class AllowanceEffects {
  constructor(
    private actions$: Actions,
    private allowanceService: AllowanceService
  ) {}

  createAllowance$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(AllowanceActionTypes.CREATE_ALLOWANCE),
      mergeMap((action: CreateAllowance) =>
        this.allowanceService.createAllowance(action.payload).pipe(
          map((allowance) => new CreateAllowanceSuccess(allowance)),
          catchError((error) => of(new CreateAllowanceError(error.message)))
        )
      )
    )
  );

  getAllAllowances$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(AllowanceActionTypes.GET_ALL_ALLOWANCES),
      mergeMap((action: GetAllAllowances) =>
        this.allowanceService.getAllAllowances().pipe(
          map((allowances) => new GetAllAllowancesSuccess(allowances)),
          catchError((error) => of(new GetAllAllowancesError(error.message)))
        )
      )
    )
  );

  updateAllowance$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(AllowanceActionTypes.UPDATE_ALLOWANCE),
      mergeMap((action: UpdateAllowance) =>
        this.allowanceService
          .updateAllowance(action.payload.id, action.payload.allowance)
          .pipe(
            map((allowance) => new UpdateAllowanceSuccess(allowance)),
            catchError((error) => of(new UpdateAllowanceError(error.message)))
          )
      )
    )
  );

  deleteAllowance$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(AllowanceActionTypes.DELETE_ALLOWANCE),
      mergeMap((action: DeleteAllowance) =>
        this.allowanceService.deleteAllowance(action.payload).pipe(
          map(() => new DeleteAllowanceSuccess(action.payload)),
          catchError((error) => of(new DeleteAllowanceError(error.message)))
        )
      )
    )
  );
}
