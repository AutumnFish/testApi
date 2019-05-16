# testApi
下面列出的接口基本都是可以直接使用的，如有问题记得告诉我哦

## 支持的请求方法

- GET（SELECT）：从服务器取出资源（一项或多项）。
- POST（CREATE）：在服务器新建一个资源。
- PUT（UPDATE）：在服务器更新资源（客户端提供改变后的完整资源）。
- PATCH（UPDATE）：在服务器更新资源（客户端提供改变的属性）。
- DELETE（DELETE）：从服务器删除资源。
- HEAD：获取资源的元数据。
- OPTIONS：获取信息，关于资源的哪些属性是客户端可以改变的。

## 通用返回状态说明

| *状态码* |         *含义*        |                        *说明*                       |
|----------|-----------------------|-----------------------------------------------------|
|      200 | OK                    | 请求成功                                            |
|      201 | CREATED               | 创建成功                                            |
|      204 | DELETED               | 删除成功                                            |
|      400 | BAD REQUEST           | 请求的地址不存在或者包含不支持的参数                |
|      401 | UNAUTHORIZED          | 未授权                                              |
|      403 | FORBIDDEN             | 被禁止访问                                          |
|      404 | NOT FOUND             | 请求的资源不存在                                    |
|      422 | Unprocesable entity   | [POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误 |
|      500 | INTERNAL SERVER ERROR | 内部错误                                            |



## joke
> 笑话接口

### 随机获取笑话

> 随机获取笑话的接口

* 请求地址：https://autumnfish.cn/api/joke
* 请求方法：get
* 请求参数：无

* 响应内容：随机笑话



## hero

> 英雄接口

### 英雄查询接口

> 根据英雄 姓名 查询英雄的 外号

- 请求地址：https://autumnfish.cn/api/hero
  - 示例：https://autumnfish.cn/api/hero?name=提莫
- 请求方法：get
- 请求参数：name

| 参数名 | 参数说明 | 备注                                 |
| :----- | :------- | :----------------------------------- |
| name   | 英雄名   | 不能为空,直接跟在url后，格式name=xxx |

- 响应内容：英雄的外号

## 天气预报

>  可以获取中国的天气，世界天气获取不到

### 获取json格式的天气

- 请求地址：http://wthrcdn.etouch.cn/weather_mini
  - 示例:http://wthrcdn.etouch.cn/weather_mini?city=深圳
- 请求方法：get
- 请求参数：city

| 参数名 | 参数说明     | 备注               |
| :----- | :----------- | :----------------- |
| City   | 查询的城市名 | 不能为空，不能写错 |

- 响应内容：json

```json
{
    "data": {
        "yesterday": {
            "date": "15日星期三",
            "high": "高温 31℃",
            "fx": "无持续风向",
            "low": "低温 26℃",
            "fl": "<![CDATA[<3级]]>",
            "type": "多云"
        },
        "city": "深圳",
        "forecast": [
            {
                "date": "16日星期四",
                "high": "高温 32℃",
                "fengli": "<![CDATA[<3级]]>",
                "low": "低温 27℃",
                "fengxiang": "无持续风向",
                "type": "阵雨"
            },
            {
                "date": "17日星期五",
                "high": "高温 32℃",
                "fengli": "<![CDATA[<3级]]>",
                "low": "低温 27℃",
                "fengxiang": "无持续风向",
                "type": "雷阵雨"
            },
            {
                "date": "18日星期六",
                "high": "高温 32℃",
                "fengli": "<![CDATA[<3级]]>",
                "low": "低温 27℃",
                "fengxiang": "无持续风向",
                "type": "雷阵雨"
            },
            {
                "date": "19日星期天",
                "high": "高温 32℃",
                "fengli": "<![CDATA[<3级]]>",
                "low": "低温 25℃",
                "fengxiang": "无持续风向",
                "type": "雷阵雨"
            },
            {
                "date": "20日星期一",
                "high": "高温 29℃",
                "fengli": "<![CDATA[<3级]]>",
                "low": "低温 24℃",
                "fengxiang": "无持续风向",
                "type": "阵雨"
            }
        ],
        "ganmao": "各项气象条件适宜，发生感冒机率较低。但请避免长期处于空调房间中，以防感冒。",
        "wendu": "30"
    },
    "status": 1000,
    "desc": "OK"
}
```

### 获取xml格式的天气



- 请求地址：http://wthrcdn.etouch.cn/WeatherApi
  - 示例：http://wthrcdn.etouch.cn/WeatherApi?city=武汉
- 请求方法：get
- 请求参数：city

| 参数名 | 参数说明     | 备注               |
| :----- | :----------- | :----------------- |
| city   | 查询的城市名 | 不能写错，不能为空 |

- 响应内容：聊天的信息

```xml
<?xml version="1.0" encoding="UTF-8"?>
<resp>
    <city>武汉</city>
    <updatetime>15:26</updatetime>
    <wendu>23</wendu>
    <fengli>
        <![CDATA[1级]]>
    </fengli>
    <shidu>86%</shidu>
    <fengxiang>东北风</fengxiang>
    <sunrise_1>05:28</sunrise_1>
    <sunset_1>19:11</sunset_1>
    <sunrise_2></sunrise_2>
    <sunset_2></sunset_2>
    <yesterday>
        <date_1>15日星期三</date_1>
        <high_1>高温 23℃</high_1>
        <low_1>低温 17℃</low_1>
        <day_1>
            <type_1>小雨</type_1>
            <fx_1>北风</fx_1>
            <fl_1>
                <![CDATA[3-4级]]>
            </fl_1>
        </day_1>
        <night_1>
            <type_1>多云</type_1>
            <fx_1>西北风</fx_1>
            <fl_1>
                <![CDATA[<3级]]>
            </fl_1>
        </night_1>
    </yesterday>
    <forecast>
        <weather>
            <date>16日星期四</date>
            <high>高温 24℃</high>
            <low>低温 20℃</low>
            <day>
                <type>多云</type>
                <fengxiang>东风</fengxiang>
                <fengli>
                    <![CDATA[<3级]]>
                </fengli>
            </day>
            <night>
                <type>小雨</type>
                <fengxiang>北风</fengxiang>
                <fengli>
                    <![CDATA[<3级]]>
                </fengli>
            </night>
        </weather>
        <weather>
            <date>17日星期五</date>
            <high>高温 28℃</high>
            <low>低温 19℃</low>
            <day>
                <type>多云</type>
                <fengxiang>北风</fengxiang>
                <fengli>
                    <![CDATA[<3级]]>
                </fengli>
            </day>
            <night>
                <type>多云</type>
                <fengxiang>东北风</fengxiang>
                <fengli>
                    <![CDATA[<3级]]>
                </fengli>
            </night>
        </weather>
        <weather>
            <date>18日星期六</date>
            <high>高温 29℃</high>
            <low>低温 21℃</low>
            <day>
                <type>多云</type>
                <fengxiang>东风</fengxiang>
                <fengli>
                    <![CDATA[<3级]]>
                </fengli>
            </day>
            <night>
                <type>中雨</type>
                <fengxiang>东风</fengxiang>
                <fengli>
                    <![CDATA[3-4级]]>
                </fengli>
            </night>
        </weather>
        <weather>
            <date>19日星期天</date>
            <high>高温 26℃</high>
            <low>低温 18℃</low>
            <day>
                <type>中雨</type>
                <fengxiang>北风</fengxiang>
                <fengli>
                    <![CDATA[4-5级]]>
                </fengli>
            </day>
            <night>
                <type>多云</type>
                <fengxiang>北风</fengxiang>
                <fengli>
                    <![CDATA[3-4级]]>
                </fengli>
            </night>
        </weather>
        <weather>
            <date>20日星期一</date>
            <high>高温 27℃</high>
            <low>低温 14℃</low>
            <day>
                <type>多云</type>
                <fengxiang>北风</fengxiang>
                <fengli>
                    <![CDATA[3-4级]]>
                </fengli>
            </day>
            <night>
                <type>多云</type>
                <fengxiang>北风</fengxiang>
                <fengli>
                    <![CDATA[<3级]]>
                </fengli>
            </night>
        </weather>
    </forecast>
    <zhishus>
        <zhishu>
            <name>晨练指数</name>
            <value>适宜</value>
            <detail>天气不错，空气清新，是您晨练的大好时机，建议不同年龄段的人们积极参加户外健身活动。</detail>
        </zhishu>
        <zhishu>
            <name>舒适度</name>
            <value>舒适</value>
            <detail>白天不太热也不太冷，风力不大，相信您在这样的天气条件下，应会感到比较清爽和舒适。</detail>
        </zhishu>
        <zhishu>
            <name>穿衣指数</name>
            <value>舒适</value>
            <detail>建议着长袖T恤、衬衫加单裤等服装。年老体弱者宜着针织长袖衬衫、马甲和长裤。</detail>
        </zhishu>
        <zhishu>
            <name>感冒指数</name>
            <value>少发</value>
            <detail>各项气象条件适宜，无明显降温过程，发生感冒机率较低。</detail>
        </zhishu>
        <zhishu>
            <name>晾晒指数</name>
            <value>适宜</value>
            <detail>天气不错，适宜晾晒。赶紧把久未见阳光的衣物搬出来吸收一下太阳的味道吧！</detail>
        </zhishu>
        <zhishu>
            <name>旅游指数</name>
            <value>适宜</value>
            <detail>天气较好，但丝毫不会影响您出行的心情。温度适宜又有微风相伴，适宜旅游。</detail>
        </zhishu>
        <zhishu>
            <name>紫外线强度</name>
            <value>最弱</value>
            <detail>属弱紫外线辐射天气，无需特别防护。若长期在户外，建议涂擦SPF在8-12之间的防晒护肤品。</detail>
        </zhishu>
        <zhishu>
            <name>洗车指数</name>
            <value>不宜</value>
            <detail>不宜洗车，未来24小时内有雨，如果在此期间洗车，雨水和路上的泥水可能会再次弄脏您的爱车。</detail>
        </zhishu>
        <zhishu>
            <name>运动指数</name>
            <value>适宜</value>
            <detail>天气较好，赶快投身大自然参与户外运动，尽情感受运动的快乐吧。</detail>
        </zhishu>
        <zhishu>
            <name>约会指数</name>
            <value>较适宜</value>
            <detail>虽然有点风，但情侣们可以放心外出，不用担心天气来调皮捣乱而影响了兴致。</detail>
        </zhishu>
        <zhishu>
            <name>雨伞指数</name>
            <value>不带伞</value>
            <detail>天气较好，不会降水，因此您可放心出门，无须带雨伞。</detail>
        </zhishu>
    </zhishus>
</resp>
```

## 图灵机器人

>  智能机器人接口，使用需要注册，官网地址是 [http://www.turingapi.com/](http://www.turingapi.com/)

- 请求地址：http://www.tuling123.com/openapi/api
- 请求方法：post
- 请求参数：key,info

| 参数名 | 参数说明           | 备注     |
| :----- | :----------------- | :------- |
| key    | 申请的机器人key    | 不能为空 |
| info   | 要跟机器人聊的内容 |          |

- 响应内容：聊天的信息

```json
{"code":100000,"text":"你好吗"}
```

测试用key：如果次数都用完了建议自己注册一个机器人即可，免费的

- 2162602fd87240a8b7bba7431ffd379b
- a618e456f0744066840ceafb6a249d9d
- d7c82ebd8b304abeacc73b366e42b9ed
- 7b1cf467c0394dd5b3e49f32663f8b29
- 9fbb98effab142c9bb324f804be542ba