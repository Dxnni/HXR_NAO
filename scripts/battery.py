#!/usr/bin/python2.7
import sys

if sys.version_info[0] > 2:
    raise Exception("Python 2 is required.")

from naoqi import ALProxy
import time
import parse
parser = parse.get_full_parser()
args = parser.parse_args()


battery = ALProxy("ALBattery", args.ip, 9559)
print(battery.getBatteryCharge())
