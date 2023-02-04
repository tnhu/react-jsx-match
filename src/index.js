"use strict";
exports.__esModule = true;
exports.Render = exports.Else = exports.Falsy = exports.Truthy = exports.Case = exports.Match = void 0;
function Match(_a) {
    var expr = _a.expr, children = _a.children;
    var Component = children.find(function (child) { var _a, _b; return (_b = (_a = child.type.prototype).evaluate) === null || _b === void 0 ? void 0 : _b.call(_a, expr, child.props); });
    return Component ? Component.props.children : null;
}
exports.Match = Match;
function Case(_a) {
    var children = _a.children;
    return children;
}
exports.Case = Case;
Case.prototype.evaluate = function (expr, props) {
    if (props === void 0) { props = {}; }
    if (typeof props.val === "function") {
        return props.val(expr);
    }
    return props.loose ? expr == props.val : expr === props.val;
};
function Truthy(_a) {
    var children = _a.children;
    return children;
}
exports.Truthy = Truthy;
Truthy.prototype.evaluate = function (expr) { return !!expr; };
function Falsy(_a) {
    var children = _a.children;
    return children;
}
exports.Falsy = Falsy;
Falsy.prototype.evaluate = function (expr) { return !expr; };
function Else(_a) {
    var children = _a.children;
    return children;
}
exports.Else = Else;
Else.prototype.evaluate = function () { return true; };
function Render(_a) {
    var when = _a.when, children = _a.children;
    return when ? children : null;
}
exports.Render = Render;
