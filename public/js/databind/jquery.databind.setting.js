;;;!function() {
    $.databind = {
        setting: {
            imgUrl: {
                input: function(v, data) {
                   return v; 
                },
                "default": function(v, data) {
                    return '<img src="' + v + '" />';
                }
            },
            price: function(v) {
                return $.toAmount(v);
            },
            isBargainPrice: function(v) {
                if("1" == v) {
                    return "是";
                }
                else {
                    return "否";
                }
            },
            goodsDetailProps: function(v, data) {
                var propsTpl, html;
                propsTpl = [
                    '<div class="form-group">',
                        '<label class="col-md-3 control-label">{0}：</label>',
                        '<div class="col-md-8">',
                            '<p class="form-control-static">{1}</p>',
                        '</div>',
                    '</div>'
                ].join("");
                html = [];
                $.each(data.goodsPropsExts, function(i, prop) {
                    html.push($.format(propsTpl, prop.goodsPropName, prop.goodsPropValue || ""));
                });
                return html.join("");
            },
            goodsListStatusLabel: function(v, data) {
                switch(data.goodsStatus) {
                    case "01":
                        return '<p class="clearfix text-center bg-primary"><a href="javascript:;" role="addShopcart" data-goods-id="' + data.id + '">加入购物车</a></p>';
                    case "02":
                        return '<p class="clearfix text-center bg-danger">已被预定</p>';
                }
                if("02" == data.goodsStatus) {
                }
            },
            goodsPriceAndDiscountPrice: function(v, data) {
                var price, str;
                price = data.price;
                str = "";
                if(!isNaN($.g.userDiscount) && "" != $.g.userDiscount && 1 != data.isBargainPrice) {
                    str = '拿货价：￥' + $.toAmount(price + price * ($.g.userDiscount / 100));
                }
                if(1 == data.isBargainPrice) {
                    str = '<strong><img src="' + contextPath + '/static/images/sale.png" /></strong>&nbsp;';
                }
                return str;
            },
            mainStoneWeight: function(v) {
                if(null != v) {
                    return v;
                }
                else {
                    return "无";
                }
            }
        }
    }
}();
