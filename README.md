~~用flask教程缝出来的原型~~
# stylePainterWeb

## 0 功能

2021.8.24

已实现：  1.注册登录 2.发帖（纯文字） 3.上传图片 4.主页样式 5.上传图片自动发布到作品圈

待实现：  1.各页面样式 2.发帖带图片 3.部署到云服务器 4.图片处理算法 5.作品圈中用户点击喜欢并按喜欢数排序显示 6.作品圈分页显示

发帖功能考虑砍掉，毕竟不是论坛

## 1 安装（部署到本地）
参考flask安装教程：  <https://dormousehole.readthedocs.io/en/latest/installation.html>

1.安装虚拟环境，下载flask。确保venv和flaskr文件夹在同一级目录下.

    cd styleWeb
    
    python3 -m venv venv
    
    . venv/bin/activate
    
    pip install Flask
    
2.设置环境变量并运行flask

    export FLASK_APP=flaskr
    
    export FLASK_ENV=development
    
3.初始化数据库（flask自带的sqlite，可能以后要换?）

    flask init-db
    
4.运行网站

    flask run
    
5.浏览器打开http://127.0.0.1:5000/

或者安装到本地。参考<https://dormousehole.readthedocs.io/en/latest/tutorial/install.html>

## 2 接口问题

用户点击上传的图片会存在目录  flaskr/static/uploadImg  下，并更名为{用户名_序号.格式}

flaskr/static/backgrounds 目录下是主页的背景图和一些素材

## 3 结构
static文件夹放的是js,css,图片等静态文件  

templates文件夹放html，其模板是jinja2  

各种py文件是实现网页的各模块功能  
