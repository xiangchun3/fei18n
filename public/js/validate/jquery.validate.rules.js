;;;+function() {
    var doc, tip, timer;
    doc = $(document);
    function oneTip(error, ele, placement) {
        if(tip) {
            return;
        }
        tip = ele;
        ele = $(ele);
        timer = ele.poptips(error.text(), placement || "top");
        ele.bind("poptipsDestroy", function() {
            tip = null;
        });
    };

    doc.bind("validate", function() {
        if(tip) {
            tip.popover("destroy");
            tip = null;
            clearTimeout(timer);
        }
    });

    $.validate = {
        login: {
            rules: {
                loginName: {
                    required: true
                },
                pwd: {
                    required: true
                }
            },
            messages: {
                loginName: {
                    required: "用户名必须填写"
                },
                pwd: {
                    required: "用户密码必须填写"
                }
            },
            errorPlacement : oneTip
        },
        userAdd: {
            rules: {
                loginName: {
                    maxLength: 15
                },
                mobile: {
                    maxLength: 15
                },
                userName: {
                    maxLength: 20
                },
                shopName: {
                    maxLength: 20
                },
                address: {
                    maxLength: 40
                },
                email: {
                    maxLength: 20
                },
                discount: {
                    range: [-90, 0]
                }
            },
            messages: {
                discount: "折扣必须为{0}到{1}之间"
            },
            errorPlacement : function(error, ele) {
                    oneTip(error, ele);
            }
        },
        goods: {
            rules: {
                mainUploadFile: {
                    // required: true
                },
                goodsName: {
                    required: true,
                    maxLength: 60
                },
                price: {
                    required: true,
                    amount: true
                },
                goodsStyleNo: {
                    required: true,
                    maxLength: 30
                },
                goodsNo: {
                    required: true
                },
                categoryId: {
                    required: true
                },
                viceStoneWeight: {
                    weight: true
                },
                mainStoneWeight: {
                    weight: true
                },
                laborCost: {
                    amount: true
                },
                goodsWeight: {
                    weight: true
                },
                goldWeight: {
                    weight: true
                },
                remark: {
                    maxLength: 50
                },
                goodsSize: {
                    maxLength: 10
                }
            },
            messages: {
                mainUploadFile: {
                    required: "商品必须上传图片"
                },
                goodsName: {
                    required: "商品名称必须填写"
                },
                price: {
                    required: "商品价格必须填写",
                },
                goodsStyleNo: {
                    required: "商品款号必须填写"
                },
                goodsNo: {
                    required: "商品编号必须填写"
                },
                categoryId: {
                    required: "商品品类必须选择"
                },
                viceStoneWeight: {
                    required: "您选择该商品有副石，请填写副石重量"
                }
            },
            errorPlacement : function(error, ele) {
                switch(ele[0].name) {
                    case "uploadFile": case "goodsName":
                        oneTip(error, ele, "bottom");
                        break;
                    default:
                        oneTip(error, ele);
                }
            }
        },
        editPwd: {
            rules: {
                pwd: {
                    required: true
                },
                newPwd: {
                    required: true
                },
                reNewPwd: {
                    required: true
                }
            },
            messages: {
                pwd: {
                    required: "密码必须填写"
                },
                newPwd: {
                    required: "新密码必须填写"
                },
                reNewPwd: {
                    required: "确认新密码必须填写"
                }
            },
            errorPlacement : function(error, ele) {
                switch(ele[0].name) {
                    case "uploadFile": case "goodsName":
                        oneTip(error, ele, "bottom");
                        break;
                    default:
                        oneTip(error, ele);
                }
            }
        }
    }

    $.fn.addValidateRules = function() {
        var args, lastParam, submitHandler, ruleObj;
        args = $.makeArray(arguments);
        lastParam = args.pop();
        if("function" != typeof lastParam) {
            args.push(lastParam);
        }
        else {
            submitHandler = lastParam;
        }
        args.unshift({onfocusin: false, onfocusout: false, onkeyup: false, onclick: false});
        ruleObj = $.extend.apply($, args);
        if(submitHandler) {
            ruleObj.submitHandler = function(form, e) {
                var sourceData, data, k, item;
                form = $(form);
                sourceData = form.serializeArray();
                data = {};
                for(k in sourceData) {
                    item = sourceData[k];
                    if(data[item.name]) {
                        data[item.name] = data[item.name].split(",");
                        data[item.name].push(item.value);
                        data[item.name] = data[item.name].join(",");
                    }
                    else {
                        data[item.name] = item.value;
                    }
                }
                submitHandler(e, data, form);
            };
        }
        this.validate(ruleObj);
    }
}();
