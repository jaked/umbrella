//! Generated by @thi.ng/wasm-api-bindgen at 2022-11-24T11:08:40.917Z
//! DO NOT EDIT!

const std = @import("std");
const wasmtypes = @import("wasmapi-types");

pub const Task = extern struct {
    state: TaskState = .open,
    body: wasmtypes.ConstStringPtr,
    dateCreated: u32,
    dateDone: u32 = 0,
};

pub const TaskState = enum(i32) {
    open,
    done,
};
