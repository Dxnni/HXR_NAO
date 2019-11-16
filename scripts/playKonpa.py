#!/usr/bin/python2.7
import sys
import time

if sys.version_info[0] > 2:
    raise Exception("Python 2 is required.")


from naoqi import ALProxy

audioProxy = ALProxy("ALAudioPlayer", "10.0.1.19", 9559)

# audioProxy.playFile(filepath)
audioProxy.playFile("/var/persistent/home/nao/AudioPlayback/Glise.m4a")