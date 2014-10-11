# coding=utf-8
__author__ = 'ns'

from flask import Flask, render_template, request
import os
app = Flask(__name__)


def _get_file_path(name):
    return 'save/%s.json' % name


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/pull/<string:name>', methods=['GET'])
def pull(name):
    if os.path.exists(_get_file_path(name)):
        with open(_get_file_path(name), 'r') as fp:
            res = fp.read()
        return res
    return ''


@app.route('/push/<string:name>', methods=['POST'])
def push(name):
    if not os.path.exists('save'):
        os.mkdir('save')
    with open(_get_file_path(name), 'w') as fp:
        fp.write(request.form['q'])
    return ''


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)