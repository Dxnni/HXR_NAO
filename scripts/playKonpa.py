#!/usr/bin/python2.7
import sys
import time

if sys.version_info[0] > 2:
    raise Exception("Python 2 is required.")


from naoqi import ALProxy
robotIP = "10.0.1.19"
if argv[1]
    robotIP = argv[1]

audioProxy = ALProxy("ALAudioPlayer", robotIP, 9559)

# audioProxy.playFile(filepath)
audioProxy.playFile("/var/persistent/home/nao/AudioPlayback/Glise.m4a")