#!/usr/bin/python2.7
import sys
import time
from naoqi import ALProxy
import parse

if sys.version_info[0] > 2:
    raise Exception("Python 2 is required.")

parser =parse.get_base_parser()
args = parser.parse_args()

# filepath = sys.argv[1]
audioProxy = ALProxy("ALAudioPlayer", args.ip, 9559)

# audioProxy.playFile(filepath)
audioProxy.stopAll()
