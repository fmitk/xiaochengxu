import requests

#获取用户唯一标识
def getOpenid(code):

    url="https://api.weixin.qq.com/sns/jscode2session?appid=wx825e55cc9d08fd1d&secret=0027dbfe1c02476265065937fe9c9cb7&js_code="+code+"&grant_type=authorization_code"
    res=requests.get(url).json()
    return res
