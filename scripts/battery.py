import sys

if sys.version_info[0] > 2:
    raise Exception("Python 2 is required.")

from naoqi import ALProxy
robotIP = "10.0.1.19"
if argv[1]
    robotIP = argv[1]

battery = ALProxy("ALBattery", robotIP, 9559)
print battery.getBatteryCharge()
