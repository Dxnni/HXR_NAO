#!/usr/bin/python2.7
import sys
import time
import parse

if sys.version_info[0] > 2:
    raise Exception("Python 2 is required.")


from naoqi import ALProxy

parser = parse.get_base_parser()
args = parser.parse_args()


audioProxy = ALProxy("ALAudioPlayer", args.ip, 9559)
# audioProxy.playFile(filepath)
audioProxy.playFile("/var/persistent/home/nao/AudioPlayback/Glise.m4a")
