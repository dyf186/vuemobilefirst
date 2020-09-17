import { extend, localize } from "vee-validate";
import * as rules from "vee-validate/dist/rules";
import zhCN from "vee-validate/dist/locale/zh_CN.json";
localize({
    zhCN
});
localize("zhCN");
Object.keys(rules).forEach(rule => {
    extend(rule, rules[rule]);
});
extend("phone", {
    validate: value => {
        const reg = /^1[35789]\d{9}$/;
        return reg.test(value);
    },
    message: "{_field_}格式不正确"
});