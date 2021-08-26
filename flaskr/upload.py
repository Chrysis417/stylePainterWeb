from flask import Flask,render_template,request,redirect,url_for,make_response,jsonify
import os
from werkzeug.utils import secure_filename
from datetime import timedelta
import time
from flaskr.auth import login_required

from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for
)
from flaskr.db import get_db

ALLOWED_EXTENSIONS = {'pdf', 'png', 'jpg', 'jpeg', 'gif'}

bp = Blueprint('upload', __name__)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
           
bp.send_file_max_age_default = timedelta(seconds=1)
 
@bp.route('/upload', methods=['POST', 'GET'])  # 添加路由
@login_required
def upload():
    if request.method == 'POST':
        f = request.files['file']
 
        if not (f and allowed_file(f.filename)):
            return jsonify({"error": 1001, "msg": "请检查上传的图片类型，仅限于 pdf,png,jpg,jpeg,gif"})
 
        basepath = os.path.dirname(__file__)  # 当前文件所在路径
 
        upload_path = os.path.join(basepath, 'static/uploadImg', secure_filename(f.filename))
        f.save(upload_path)

        title = g.user['username']
        body = ""
        userName = g.user['username']
        userId = g.user['id']
        db = get_db()
        ordinal = db.execute(
            'SELECT COUNT(*) AS ord'
            ' FROM post'
            ' WHERE author_id=?',
            (userId,)
        ).fetchone()

        if ordinal is None :
            ordinal = 1
        
        print(ordinal)
        ordi=ordinal['ord']

        
        imgFilePath=os.path.join(basepath, 'static/uploadImg')
        
        imgSuffix=f.filename.rsplit('.', 1)[1].lower()
        imgRename = (f'{userName}_{ordi}.{imgSuffix}')
        
        newPath=os.path.join(imgFilePath,imgRename)
        os.rename(upload_path,newPath)
        db.execute(
                'INSERT INTO post (title, body, author_id, imgName)'
                ' VALUES (?, ?, ?, ?)',
                (title, body, userId, imgRename)
            )
        db.commit()

        return render_template('uploadImg/upload_done.html',imgName=imgRename)
 
    return render_template('uploadImg/upload.html')
