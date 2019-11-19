#!/usr/bin/python2.7
import sys
import parse

from naoqi import ALProxy

if sys.version_info[0] > 2:
    raise Exception("Python 2 is required.")

parser = parse.get_base_parser()
args= parser.parse_args()

memory = ALProxy("ALMemory", args.ip, 9559)
sonar = ALProxy("ALSonar",args.ip, 9559)

#starts ultrasonic sensor
sonar.subscribe("myApplication")

#gets ultrasonic sensor data. max detection distance is 0.5 meters
left = memory.getData("Device/SubDeviceList/US/Left/Sensor/Value")
right = memory.getData("Device/SubDeviceList/US/Right/Sensor/Value")

#stops ultrasonic sensor
sonar.unsubscribe("myApplication")

print(left)
print(right)
