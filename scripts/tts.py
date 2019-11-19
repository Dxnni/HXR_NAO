#!/usr/bin/python2.7
import sys

if sys.version_info[0] > 2:
    raise Exception("Python 2 is required.")


if (len(sys.argv)>1):
    from naoqi import ALProxy
    robotIP = "10.0.1.19"
    if argv[1]
        robotIP = argv[1]

    tts = ALProxy("ALTextToSpeech", robotIP, 9559)
    
    tts.say(sys.argv[1])