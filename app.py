from flask import Flask
from flask import request,jsonify
import json
from getOpenid import getOpenid
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root@localhost/xiaochengxu'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)

#定义用户表模型
class User(db.Model):
    __tablename__='user'
    id = db.Column(db.Integer, primary_key=True)
    openid = db.Column(db.String(80), unique=True)
    nickName= db.Column(db.String(120), unique=False)
    avatarUrl=db.Column(db.String(255),nullable=False)
    gender=db.Column(db.Integer,nullable=False)

    def __init__(self,openid,nickName,avatarUrl,gender):
        self.openid=openid
        self.nickName=nickName
        self.avatarUrl=avatarUrl
        self.gender=gender

#定义用户评论模型
class Commenttable(db.Model):
    __tablename__='commenttable'
    id=db.Column(db.Integer,primary_key=True)
    panoid=db.Column(db.Integer,nullable=False)
    openid = db.Column(db.String(80),nullable=False)
    comment=db.Column(db.String(255),nullable=False)
    time=db.Column(db.DATETIME,nullable=False)

    def __init__(self,panoid,openid,comment,time):
        self.panoid=panoid
        self.openid=openid
        self.comment=comment
        self.time=time

#定义全景存储模型
class Panos(db.Model):
    __tablename__='panos'
    panoid=db.Column(db.Integer,primary_key=True)
    title=db.Column(db.String(255),nullable=False)
    panolink=db.Column(db.String(255),nullable=False)
    author=db.Column(db.String(80),nullable=False)
    uploadtime=db.Column(db.DATETIME,nullable=False)

    def __init__(self,panoid,title,panolink,author,uploadtime):
        self.panoid=panoid
        self.title=title
        self.panolink=panolink
        self.author=author
        self.uploadtime=uploadtime


#返回用户唯一标识openid
@app.route('/getcode')
def getcode():
    code=request.args.get('code')
    res=getOpenid(code)
    return res['openid']

#获取用户评论信息
@app.route('/comment')
def userComment():
    comment=request.args.get('comment')
    openid=request.args.get('openid')
    print(comment,openid)
    return 'ok'



@app.route('/userInfo')
def userInfo():
    res = request.args.get('userInfo')
    openid=request.args.get('openid')
    booluser = User.query.filter_by(openid=openid).first()
    print("准备插入数据库")
    #如果用户表不存在该用户，则添加至数据表user当中
    if not booluser:
        res = json.loads(res)
        nickName=res['nickName']
        avatarUrl=res['avatarUrl']
        gender=res['gender']
        user=User(openid,nickName,avatarUrl,gender)
        db.session.add(user)
        db.session.commit()
        print("插入数据库成功")
        print(res)
    return "false"

@app.route('/panoInfo')
def panoInfo():
    panos = Panos.query.all()
    panoInfos = []
    for pano in panos:
        panoInfo = {
            "panoid": pano.panoid,
            "title": pano.title,
            "panolink": pano.panolink,
            "author": pano.author,
            "uploadtime": pano.uploadtime
        }
        panoInfos.append(panoInfo)
    return jsonify(panoInfos)

if __name__ == '__main__':
    app.run(debug=True)
