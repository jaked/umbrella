import { ReadonlyAtom } from "@thi.ng/atom/api";

export type InterceptorFn = (state: any, e: Event, bus?: IDispatch, ctx?: InterceptorContext) => InterceptorContext | void;
export type InterceptorPredicate = (state: any, e: Event, bus?: IDispatch, ctx?: InterceptorContext) => boolean;

export type SideEffect = (x: any, bus?: IDispatch, ctx?: InterceptorContext) => any;
export type EventDef = Interceptor | InterceptorFn | (Interceptor | InterceptorFn)[];
export type EffectDef = SideEffect | [SideEffect, number];
export type AsyncEffectDef = [string, any, string, string];
export type EffectPriority = [string, number];

// Built-in event ID constants

export const EV_SET_VALUE = "--set-value";
export const EV_UPDATE_VALUE = "--update-value";

// Built-in side effect ID constants

export const FX_CANCEL = "--cancel";
export const FX_DISPATCH = "--dispatch";
export const FX_DISPATCH_ASYNC = "--dispatch-async";
export const FX_DISPATCH_NOW = "--dispatch-now";
export const FX_DELAY = "--delay";
export const FX_FETCH = "--fetch";
export const FX_STATE = "--state";

/**
 * Event ID to trigger redo action.
 * See `EventBus.addBuiltIns()` for further details.
 * Also see `snapshot()` interceptor docs.
 */
export const EV_REDO = "--redo";

/**
 * Event ID to trigger undo action.
 * See `EventBus.addBuiltIns()` for further details.
 * Also see `snapshot()` interceptor docs.
 */
export const EV_UNDO = "--undo";

/**
 * Side effect ID to execute redo action.
 * See `EventBus.addBuiltIns()` for further details.
 * Also see `snapshot()` interceptor docs.
 */
export const FX_REDO = EV_REDO;

/**
 * Side effect ID to execute undo action.
 * See `EventBus.addBuiltIns()` for further details.
 * Also see `snapshot()` interceptor docs.
 */
export const FX_UNDO = EV_UNDO;

export interface Event extends Array<any> {
    [0]: PropertyKey;
    [1]?: any;
}

export interface IDispatch {
    readonly state: ReadonlyAtom<any>;
    dispatch(event: Event);
    dispatchNow(event: Event);
}

export interface Interceptor {
    pre?: InterceptorFn;
    post?: InterceptorFn;
}

export interface InterceptorContext {
    [FX_STATE]?: any;
    [FX_CANCEL]?: boolean;
    [FX_DISPATCH]?: Event | Event[];
    [FX_DISPATCH_NOW]?: Event | Event[];
    [FX_DISPATCH_ASYNC]?: AsyncEffectDef | AsyncEffectDef[];
    [FX_UNDO]?: string | string[];
    [FX_REDO]?: string | string[];
    [id: string]: any;
}
