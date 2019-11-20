#!/usr/bin/python2.7
import sys
import parse
from naoqi import ALProxy

if sys.version_info[0] > 2:
    raise Exception("Python 2 is required.")

parser = parse.get_full_parser()
args = parser.parse_args()

motion = ALProxy("ALRobotPosture", args.ip, 9559)    
#goToPosture(postureName, 0-1 for speed)
motion.goToPosture(args.posture, 0.5)
