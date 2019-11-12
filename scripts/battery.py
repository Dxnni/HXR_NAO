import sys

if sys.version_info[0] > 2:
    raise Exception("Python 2 is required.")

from naoqi import ALProxy
import time

battery = ALProxy("ALBattery", "10.0.1.19", 9559)
print battery.getBatteryCharge()