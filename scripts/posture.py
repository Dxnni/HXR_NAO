#!/usr/bin/python2.7
import sys

if sys.version_info[0] > 2:
    raise Exception("Python 2 is required.")

if (len(sys.argv)>1):
    from naoqi import ALProxy
    motion = ALProxy("ALRobotPosture", "10.0.1.133", 9559)
    motion.goToPosture(sys.argv[1], 3.0)